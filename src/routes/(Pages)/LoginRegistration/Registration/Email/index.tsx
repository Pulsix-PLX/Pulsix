// src/routes/email-verification.tsx
import { createSignal, onMount } from "solid-js";
import axios from "axios";

export default function EmailVerification() {
  const [nome, setNome] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [stato, setStato] = createSignal("idle"); // idle, loading, success, error
  const [token, setToken] = createSignal("");
  const [isVerified, setIsVerified] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal("");
  const [debugInfo, setDebugInfo] = createSignal({});

  // Verifica se l'URL contiene un token
  const checkUrlForToken = () => {
    try {
      // Usa window.location.href per ottenere l'URL completo
      const currentUrl = window.location.href;
      setDebugInfo(prev => ({...prev, currentUrl}));
      
      // Estrai il token direttamente dall'URL
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get("token");
      
      setDebugInfo(prev => ({...prev, tokenFromUrl, searchParams: window.location.search}));
      
      if (tokenFromUrl) {
        // Recupera il token dal localStorage
        const storedToken = localStorage.getItem("verificationToken");
        
        setDebugInfo(prev => ({
          ...prev, 
          storedToken, 
          match: storedToken === tokenFromUrl
        }));
        
        if (storedToken === tokenFromUrl) {
          setIsVerified(true);
          localStorage.removeItem("verificationToken");
        } else {
          // Prova a verificare con il codice hash nell'URL stesso
          // Estratto da #token=VALORE
          const hashParams = new URLSearchParams(window.location.hash.replace('#', ''));
          const hashToken = hashParams.get("token");
          
          setDebugInfo(prev => ({
            ...prev,
            hashParams: window.location.hash,
            hashToken
          }));
          
          if (hashToken && hashToken === storedToken) {
            setIsVerified(true);
            localStorage.removeItem("verificationToken");
          } else {
            setErrorMessage("Il token nell'URL non corrisponde al token salvato. Verifica che stai usando il link più recente.");
          }
        }
      } else {
        // Controlla se il token è nel fragment (hash) dell'URL
        // Formato: #token=VALORE
        if (window.location.hash) {
          const hashParams = new URLSearchParams(window.location.hash.replace('#', ''));
          const hashToken = hashParams.get("token");
          
          setDebugInfo(prev => ({
            ...prev,
            hashPresent: true,
            hashValue: window.location.hash,
            hashToken
          }));
          
          if (hashToken) {
            const storedToken = localStorage.getItem("verificationToken");
            if (storedToken === hashToken) {
              setIsVerified(true);
              localStorage.removeItem("verificationToken");
              return;
            }
          }
        }
        
        console.log("Nessun token nell'URL");
      }
    } catch (error) {
      console.error("Errore durante la verifica del token:", error);
      setErrorMessage(`Errore durante la verifica: ${error.message}`);
    }
  };

  // Invio email con bottone di verifica
  const inviaEmailVerifica = async (e) => {
    e.preventDefault();
    setStato("loading");
    setErrorMessage("");
    
    try {
      // Genera un token più lungo e complesso
      const newToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      setToken(newToken);
      
      // Salva il token in localStorage
      localStorage.setItem("verificationToken", newToken);
      
      setDebugInfo(prev => ({...prev, tokenGenerato: newToken}));
      
      // Usa un URL completamente esplicito per la verifica
      const baseUrl = "https://8c31-95-252-211-63.ngrok-free.app";
      const currentPath = window.location.pathname;
      
      // Crea tre tipi di URL:
      // 1. Con query parameter standard (?token=)
      const queryParamUrl = `${baseUrl}${currentPath}?token=${newToken}`;
      
      // 2. Con hash/fragment (#token=)
      const hashUrl = `${baseUrl}${currentPath}#token=${newToken}`;
      
      // 3. URL diretto alla pagina con parametro speciale
      const directUrl = `${baseUrl}/verify-email/${newToken}`;
      
      // Usa il link con hash che è più robusto nei redirect
      const verificationUrl = hashUrl;
      
      setDebugInfo(prev => ({
        ...prev, 
        verificationUrl,
        queryParamUrl,
        hashUrl,
        directUrl,
        currentPath,
        fullUrl: window.location.href
      }));
      
      console.log("URL di verifica:", verificationUrl);
      
      // Invia l'email usando Brevo API
      const response = await axios.post('https://api.brevo.com/v3/smtp/email', {
        sender: {
          name: "Il Tuo Sistema",
          email: "pallassinimatteo@gmail.com"
        },
        to: [
          {
            email: email(),
            name: nome()
          }
        ],
        subject: "Verifica il tuo indirizzo email",
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              .button {
                background-color: #4CAF50;
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 8px;
              }
            </style>
          </head>
          <body>
            <h2>Verifica il tuo indirizzo email</h2>
            <p>Ciao ${nome()},</p>
            <p>Grazie per esserti registrato. Per completare la verifica, clicca sul pulsante qui sotto:</p>
            
            <a href="${verificationUrl}" class="button">Verifica Email</a>
            
            <p>Se il pulsante non funziona, copia e incolla questo link nel tuo browser:</p>
            <p>${verificationUrl}</p>
            
            <p>Oppure inserisci manualmente questo codice di verifica nella pagina web:</p>
            <p style="font-size: 18px; font-weight: bold; text-align: center; padding: 10px; background-color: #f0f0f0; border-radius: 5px;">${newToken}</p>
            
            <p>Se non hai richiesto questa verifica, puoi ignorare questa email.</p>
            <p>Cordiali saluti,<br>Il tuo team</p>
          </body>
          </html>
        `
      }, {
        headers: {
          'api-key': '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',
          'Content-Type': 'application/json'
        }
      });
      
      setDebugInfo(prev => ({
        ...prev, 
        emailInviata: true, 
        responseStatus: response.status
      }));
      
      setStato("success");
    } catch (error) {
      console.error("Errore invio email:", error);
      setErrorMessage(`Errore invio email: ${error.response ? error.response.data.message : error.message}`);
      setDebugInfo(prev => ({
        ...prev, 
        emailInviata: false, 
        errorDetails: error.response ? error.response.data : error.message
      }));
      setStato("error");
    }
  };

  // Controlla se c'è un token nell'URL quando il componente si carica
  onMount(() => {
    // Verifica immediatamente i parametri URL
    setTimeout(() => {
      checkUrlForToken();
    }, 100); // Piccolo ritardo per assicurarsi che l'URL sia completamente caricato
    
    // Registra anche un listener per gli eventi di navigazione e hash change
    window.addEventListener('hashchange', checkUrlForToken);
    window.addEventListener('popstate', checkUrlForToken);
    
    // Pulisci il listener quando il componente viene smontato
    return () => {
      window.removeEventListener('hashchange', checkUrlForToken);
      window.removeEventListener('popstate', checkUrlForToken);
    };
  });

  // Funzione per inserire manualmente un token (per il debug)
  const verificaTokenManuale = () => {
    const tokenManuale = prompt("Inserisci il token di verifica ricevuto via email:");
    if (tokenManuale) {
      // Verifica direttamente il token senza aggiornare l'URL
      const storedToken = localStorage.getItem("verificationToken");
      if (storedToken === tokenManuale) {
        setIsVerified(true);
        localStorage.removeItem("verificationToken");
      } else {
        setErrorMessage("Token non valido o non corrisponde.");
      }
    }
  };

  return (
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <p class="text-black">FUNZIONA SOLO LA VERIFICA MANUALE</p>
      {isVerified() ? (
        <div class="text-center">
          <h1 class="text-2xl font-bold mb-4">Email Verificata!</h1>
          <div class="bg-green-100 p-4 rounded-lg mb-4">
            <p>La tua email è stata verificata con successo!</p>
            <p class="mt-2">Grazie per aver completato la registrazione.</p>
          </div>
          <button 
            onClick={() => setIsVerified(false)} 
            class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Torna alla Registrazione
          </button>
        </div>
      ) : (
        <>
          <h1 class="text-2xl font-bold mb-6">Verifica Email</h1>
          
          {errorMessage() && (
            <div class="bg-red-100 p-4 rounded-lg mb-4">
              <p class="text-red-700">{errorMessage()}</p>
            </div>
          )}
          
          {stato() === "success" ? (
            <div class="bg-green-100 p-4 rounded-lg">
              <p>Email di verifica inviata a {email()}!</p>
              <p class="mt-2">Controlla la tua casella di posta e clicca sul pulsante di verifica.</p>
              <div class="flex space-x-2 mt-4">
                <button 
                  onClick={() => setStato("idle")} 
                  class="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Nuova Verifica
                </button>
                <button 
                  onClick={verificaTokenManuale} 
                  class="flex-1 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                >
                  Verifica Manuale
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={inviaEmailVerifica} class="space-y-4">
              <div>
                <label class="block mb-1">Nome</label>
                <input
                  type="text"
                  value={nome()}
                  onInput={(e) => setNome(e.target.value)}
                  class="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label class="block mb-1">Email</label>
                <input
                  type="email"
                  value={email()}
                  onInput={(e) => setEmail(e.target.value)}
                  class="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <button
                type="submit"
                class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                disabled={stato() === "loading"}
              >
                {stato() === "loading" ? "Invio in corso..." : "Invia Email di Verifica"}
              </button>
              
              {stato() === "error" && (
                <p class="text-red-500">Si è verificato un errore. Riprova.</p>
              )}
            </form>
          )}
          
          {/* Informazioni di debug - rimuovere in produzione */}
          <div class="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 class="font-bold mb-2">Informazioni di Debug:</h3>
            <pre class="text-xs overflow-auto max-h-40">{JSON.stringify(debugInfo(), null, 2)}</pre>
            
            <div class="mt-4">
              <button 
                onClick={checkUrlForToken}
                class="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 text-sm"
              >
                Ricontrolla Token nell'URL
              </button>
              
              <button 
                onClick={() => {
                  // Forza la lettura del token dall'URL
                  const urlParams = new URLSearchParams(window.location.search);
                  const tokenFromUrl = urlParams.get("token");
                  
                  // Prova anche la lettura dal hash
                  const hashParams = new URLSearchParams(window.location.hash.replace('#', ''));
                  const hashToken = hashParams.get("token");
                  
                  setDebugInfo(prev => ({
                    ...prev,
                    forceCheck: {
                      fullUrl: window.location.href,
                      search: window.location.search,
                      hash: window.location.hash,
                      token: tokenFromUrl,
                      hashToken: hashToken,
                      storedToken: localStorage.getItem("verificationToken")
                    }
                  }));
                }}
                class="ml-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 text-sm"
              >
                Ispeziona URL
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
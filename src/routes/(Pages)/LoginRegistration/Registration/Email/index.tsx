import { createSignal } from "solid-js";
import axios from "axios";

export default function EmailVerification() {
  const [nome, setNome] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [stato, setStato] = createSignal("idle"); // idle, loading, success, error
  const [codiceVerifica, setCodiceVerifica] = createSignal("");
  const [codiceInserito, setCodiceInserito] = createSignal("");
  const [isVerified, setIsVerified] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal("");
  const [debugInfo, setDebugInfo] = createSignal({});

  // Invio email con codice di verifica
  const inviaEmailVerifica = async (e) => {
    e.preventDefault();
    setStato("loading");
    setErrorMessage("");
    
    try {
      // Genera un codice numerico di 6 cifre
      const codice = Math.floor(100000 + Math.random() * 900000).toString();
      setCodiceVerifica(codice);
      
      setDebugInfo(prev => ({...prev, codiceGenerato: codice}));
      
      // Utilizza una variabile d'ambiente per l'API key
      const apiKey = import.meta.env.VITE_BREVO_API_KEY;
      
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
        subject: "Il tuo codice di verifica",
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              .code {
                font-size: 24px;
                font-weight: bold;
                color: #4a4a4a;
                background-color: #f0f0f0;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                letter-spacing: 5px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <h2>Codice di Verifica Email</h2>
            <p>Ciao ${nome()},</p>
            <p>Ecco il tuo codice di verifica:</p>
            
            <div class="code">${codice}</div>
            
            <p>Inserisci questo codice nella pagina di verifica per completare la registrazione.</p>
            <p>Se non hai richiesto questa verifica, puoi ignorare questa email.</p>
            <p>Cordiali saluti,<br>Il tuo team</p>
          </body>
          </html>
        `
      }, {
        headers: {
          'api-key': apiKey,
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

  // Funzione per verificare il codice inserito
  const verificaCodice = (e) => {
    e.preventDefault();
    
    if (codiceInserito() === codiceVerifica()) {
      setIsVerified(true);
      setCodiceVerifica("");
      setCodiceInserito("");
    } else {
      setErrorMessage("Codice non valido. Controlla e riprova.");
    }
  };

  return (
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
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
            <div>
              <div class="bg-green-100 p-4 rounded-lg mb-4">
                <p>Email con codice di verifica inviata a {email()}!</p>
                <p class="mt-2">Controlla la tua casella di posta e inserisci il codice ricevuto.</p>
              </div>
              
              <form onSubmit={verificaCodice} class="space-y-4">
                <div>
                  <label class="block mb-1">Inserisci il codice di verifica</label>
                  <input
                    type="text"
                    value={codiceInserito()}
                    onInput={(e) => setCodiceInserito(e.target.value)}
                    class="w-full p-3 border rounded text-center text-lg tracking-widest"
                    maxLength={6}
                    placeholder="123456"
                    required
                  />
                </div>
                
                <div class="flex space-x-2">
                  <button
                    type="submit"
                    class="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    Verifica Codice
                  </button>
                  
                  <button 
                    type="button"
                    onClick={() => setStato("idle")} 
                    class="flex-1 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                  >
                    Cambia Email
                  </button>
                </div>
              </form>
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
                {stato() === "loading" ? "Invio in corso..." : "Invia Codice di Verifica"}
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
          </div>
        </>
      )}
    </div>
  );
}
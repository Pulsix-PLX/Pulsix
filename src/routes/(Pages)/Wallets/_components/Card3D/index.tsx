// src/components/Card3DResource.tsx

import {
  onCleanup,
  onMount,
  createSignal,
  createEffect,
  Component,
  Show,
  Suspense,
  createResource // Importa createResource
} from "solid-js";
import { Application, SPEObject } from '@splinetool/runtime';
import { A, useNavigate } from "@solidjs/router";

// Interfaccia per oggetti Spline (opzionale, per type safety)
interface SplineObjectWithMaterialColor extends SPEObject {
  material?: {
    color?: { r: number; g: number; b: number; a: number; } | string;
  };
}

// Interfaccia per le Props del componente
interface Properties {
  color: string;
  balance: number;
  name: string;
  currency: string;
  href: string; // Mantenuta ma non usata attivamente in questo esempio
  onClick: () => void; // Mantenuta ma non usata attivamente in questo esempio
  id: number; // ID univoco per logging e gestione
}
import { edit, setEdit } from '../cardHolder';
// --- Componente Card3D con createResource ---
export default function Card3DResource(props: Properties) {
  let canvasRef: HTMLCanvasElement | undefined;
  const [isCanvasReady, setIsCanvasReady] = createSignal(false); // Segnale per tracciare il canvas

  // Determina l'URL della scena in modo reattivo
  // Usiamo una funzione per renderlo un "derived signal" per createResource
  const splineSceneUrl = () => {
    console.log(`[Card3D ${props.id}] Calcolo URL per colore: ${props.color}`);
    switch (props.color) {
      case 'purple':
        return 'https://prod.spline.design/j0mVtZ9nPBu6RBRy/scene.splinecode';
      default:
        return 'https://prod.spline.design/mzKeaOgjz2ILR0uC/scene.splinecode';
    }
  };

  // --- Gestione Montaggio Canvas ---
  onMount(() => {
    if (canvasRef) {
      console.log(`[Card3D ${props.id}] Canvas ref pronto.`);
      setIsCanvasReady(true); // Imposta il segnale
    } else {
      console.error(`[Card3D ${props.id}] Errore: Canvas ref non trovato in onMount!`);
    }
    // Cleanup del segnale (buona pratica)
    onCleanup(() => {
        console.log(`[Card3D ${props.id}] Cleanup: reset isCanvasReady.`);
        setIsCanvasReady(false);
    });
  });

  // --- Creazione della Risorsa Spline ---
  const [splineResource] = createResource(
    // 1. Sorgente: Esegui solo se canvas è pronto e URL è disponibile
    () => isCanvasReady() ? splineSceneUrl() : null,
    // 2. Fetcher: Carica Spline e ritorna l'istanza Application
    async (url): Promise<Application> => {
      if (!canvasRef) {
        console.error(`[Card3D ${props.id}] Fetcher: CanvasRef è nullo! Impossibile caricare.`);
        throw new Error("Canvas element reference is missing.");
      }
      console.log(`[Card3D ${props.id}] createResource Fetcher: Inizio caricamento da ${url}`);

      // Aggiungi un piccolo ritardo artificiale SE vuoi testare lo stato di caricamento
      // await new Promise(resolve => setTimeout(resolve, 1500));

      const app = new Application(canvasRef);
      try {
        await app.load(url);
        console.log(`[Card3D ${props.id}] createResource Fetcher: Spline caricata con successo.`);
        return app; // Risorsa caricata
      } catch (error) {
        console.error(`[Card3D ${props.id}] createResource Fetcher: Errore durante app.load():`, error);
        throw error; // Rilancia per impostare resource.error
      }
    }
  );

  // --- Gestione Cleanup (Dispose) della Risorsa Spline ---
  // Necessario perché createResource non pulisce automaticamente la risorsa stessa
  createEffect((prevAppInstance: Application | undefined) => {
    const currentAppInstance = splineResource(); // Dipendenza dalla risorsa
    if (prevAppInstance && prevAppInstance !== currentAppInstance) {
      console.log(`[Card3D ${props.id}] createEffect[cleanup]: Dispose istanza Spline precedente.`);
      prevAppInstance.dispose();
    }
    return currentAppInstance; // Passa l'istanza corrente al prossimo ciclo
  }, undefined);

  // Cleanup finale quando il componente viene smontato
  onCleanup(() => {
    const lastAppInstance = splineResource.latest; // Ultimo valore senza creare dipendenza
    if (lastAppInstance) {
      console.log(`[Card3D ${props.id}] onCleanup: Dispose istanza Spline finale.`);
      lastAppInstance.dispose();
    } else {
        console.log(`[Card3D ${props.id}] onCleanup: Nessuna istanza Spline da pulire.`);
    }
  });

  // --- Effetto per Aggiornare Variabili e Scala in Spline ---
  createEffect(() => {
    const app = splineResource(); // Ottieni l'app dalla risorsa

    // Esegui solo se l'app è caricata con successo (non loading, non error)
    if (!app || splineResource.loading || splineResource.error) {
      // console.log(`[Card3D ${props.id}] Effetto Variabili: Skip (loading=${splineResource.loading}, error=${!!splineResource.error})`);
      return;
    }

    console.log(`[Card3D ${props.id}] Effetto Variabili: Esecuzione...`);

    // Impostazioni e Logica di aggiornamento Spline (invariata)
    const cardObjectName = 'Group 2';
    const newScaleFactors = { x: 1.2, y: 1.2, z: 1.2 };
    const wallet_name = 'wallet_name';
    const wallet_value = props.name;
    const balance_name = 'balance';
    // Funzione helper interna o logica diretta per il simbolo valuta
    const getCurrencySymbol = (currency: string): string => {
        switch (currency) {
          case 'EUR': return '€';
          case 'USD': return '$';
          case 'GBP': return '£';
          case 'CHF': return 'CHF';
          case 'CAD': return 'C$';
          case 'AUD': return 'A$';
          case 'JPY': return '¥';
          case 'CNY': return '¥'; // Nota: JPY e CNY usano lo stesso simbolo
          case 'INR': return '₹';
          case 'BRL': return 'R$';
          case 'MXN': return '$';
          case 'NZD': return '$';
          case 'SGD': return '$';
          case 'HKD': return '$'; // Nota: diverse valute usano '$'
          case 'SEK': return 'kr';
          case 'NOK': return 'kr';
          case 'DKK': return 'kr'; // Nota: valute scandinave usano 'kr'
          case 'PLN': return 'zł';
          case 'CZK': return 'Kč';
          case 'HUF': return 'Ft';
          case 'RUB': return '₽';
          case 'TRY': return '₺';
          case 'ZAR': return 'R';
          case 'AED': return 'د. إ'; // Dirham degli Emirati Arabi Uniti
            // ... (aggiungi tutti gli altri casi come nell'originale) ...
            default: return currency;
        }
    };
    const balance_value = `${props.balance} ${getCurrencySymbol(props.currency)}`;

    console.log(`[Card3D ${props.id}] -> Aggiorno: ${wallet_name}=${wallet_value}, ${balance_name}=${balance_value}`);

    try {
      app.setVariable(wallet_name, wallet_value);
      app.setVariable(balance_name, balance_value);

      const objectToScale = app.findObjectByName(cardObjectName);
      if (objectToScale) {
        if (typeof (objectToScale as any)?.scale?.x === 'number') {
          Object.assign((objectToScale as any).scale, newScaleFactors);
        } else {
          console.warn(`[Card3D ${props.id}] -> ATTENZIONE: 'scale' non trovato su '${cardObjectName}'.`);
        }
      } else {
        console.warn(`[Card3D ${props.id}] -> ATTENZIONE: Oggetto '${cardObjectName}' non trovato.`);
      }
    } catch (e) {
      console.error(`[Card3D ${props.id}] -> ERRORE durante interazione Spline:`, e);
    }
  });

  const navigate = useNavigate(); // <-- Ottieni la funzione di navigazione
  // --- Stato per la Logica del Click ---

// Lo stato 'open' che vuoi modificare
const [open, setOpen] = createSignal(true);

// Stato per sapere se il pulsante è attualmente premuto SULL'ELEMENTO
const [isMouseDownOnElement, setIsMouseDownOnElement] = createSignal(false);
// Stato per memorizzare l'orario del mousedown
const [mouseDownTime, setMouseDownTime] = createSignal<number>(0);

// Durata massima (in millisecondi) tra mousedown e mouseup per essere considerato un "click" valido
// Un valore comune è tra 200ms e 500ms. Aggiustalo secondo le tue preferenze.
const CLICK_THRESHOLD_MS = 300;

// --- Funzione Gestore Interazione ---

function handleInteraction(eventType: 'down' | 'up' | 'leave') {
  // Usiamo props.id se disponibile per i log, altrimenti un placeholder
  const id = typeof props !== 'undefined' ? props.id : 'Elemento';
  console.log(`[${id}] handleInteraction - Event: ${eventType}, Current open state: ${open()}`);

  if (eventType === 'down') {
    // 1. Mouse è stato premuto SULL'elemento
    setIsMouseDownOnElement(true);
    setMouseDownTime(Date.now());
    // Nota: Non facciamo setOpen(false) qui! Aspettiamo l'mouseup.

  } else if (eventType === 'up') {
    // 2. Mouse è stato rilasciato

    // Controlla se il rilascio è avvenuto DOPO che un mousedown era stato registrato SU QUESTO elemento
    if (isMouseDownOnElement()) {
      const pressDuration = Date.now() - mouseDownTime();
      console.log(`[${id}] Mouse up after ${pressDuration}ms`);

      // Verifica se la durata è abbastanza breve da essere un click
      if (pressDuration < CLICK_THRESHOLD_MS) {
        // CONDIZIONE SODDISFATTA: Mousedown seguito da Mouseup in tempo breve = CLICK!
        console.log(`[${id}] Click detected! Setting open to false.`);
        navigate(props.href); // Naviga alla pagina specificata
        // >>> ESEGUI L'AZIONE RICHIESTA SOLO AL CLICK <<<
        setOpen(false);
      } else {
        // Se la durata è maggiore, è stata una pressione lunga o un trascinamento finito qui
        console.log(`[${id}] Mouse up, but duration (${pressDuration}ms) exceeds threshold for click.`);
        // Non impostiamo setOpen(false) in questo caso.
      }

      // Resetta lo stato di pressione ora che l'interazione up è gestita
      setIsMouseDownOnElement(false);

    } else {
      // Questo mouseup è avvenuto senza un mousedown precedente valido SU QUESTO elemento
      // (es. l'utente ha premuto fuori e rilasciato qui, o ha premuto qui, uscito, e rilasciato fuori)
      console.log(`[${id}] Mouse up without a valid preceding mousedown on this element.`);
    }

  } else if (eventType === 'leave') {
    // 3. Il puntatore ha lasciato l'elemento

    // Se il puntatore esce MENTRE il pulsante era premuto, dobbiamo invalidare
    // il potenziale click, altrimenti un mouseup fuori dall'elemento
    // seguito da un rientro rapido potrebbe essere interpretato male.
    if (isMouseDownOnElement()) {
      console.log(`[${id}] Mouse left while down. Invalidating potential click.`);
      setIsMouseDownOnElement(false); // Annulla lo stato "premuto"
    }
  }
}
  const [hover, setHover] = createSignal<boolean>(false);

  return (

    <div
      class="landing-container"
    >
      <div class="spline-wrapper" style={{ width: '80%', height: '500px', position: 'relative' /* Fallback leggero per vedere area */ }}
>

        {/* 1. Overlay di Caricamento Esplicito (più affidabile del solo Suspense) */}
        <Show when={splineResource.loading}>
          <div style={{
            width: '90%', height: '45%',
           inset: '0', "margin-top": '130px',
            background: 'rgba(0, 0, 0, 0.6)', /* Sfondo semi-trasparente */
            display: 'flex', 'justify-content': 'center', 'align-items': 'center',
            'border-radius': '8px', /* Opzionale */
            'z-index': '10', /* Sopra il canvas */
            color: 'white', 'font-size': '1.1em'
          }}>
            Loading...
          </div>
        </Show>

        {/* 2. Gestione Errori */}
        <Show when={splineResource.error && !splineResource.loading}>
          <div style={{
            position: 'absolute', inset: '0',
            background: 'rgba(255, 200, 200, 0.9)', color: 'darkred',
            display: 'flex', 'flex-direction': 'column',
            'justify-content': 'center', 'align-items': 'center',
            padding: '15px', 'border-radius': '8px', 'z-index': '10',
            'text-align': 'center', 'font-size': '0.9em'
          }}>
            <strong>Errore Caricamento Spline</strong>
            <pre style={{ 'margin-top': '8px', 'white-space': 'pre-wrap', 'max-height': '100px', 'overflow': 'auto' }}>
              {splineResource.error?.message || JSON.stringify(splineResource.error)}
            </pre>
          </div>
        </Show>

        {/* 3. Canvas (reso semi-trasparente durante caricamento/errore) */}
        {/* Suspense è meno critico ora con l'overlay esplicito, ma può rimanere */}
        <Suspense fallback={<>{/* Fallback Suspense minimale o vuoto */}</>}>
          <canvas
                  onmouseenter={() => setHover(true)}
                  onmouseleave={() => setHover(false)}
           onMouseDown={() => handleInteraction('down')}
           onMouseUp={() => handleInteraction('up')}
           onMouseLeave={() => handleInteraction('leave')}
            ref={canvasRef!}
            style={{
              width: '100%', height: '100%',
              display: 'block', // Fondamentale per il layout
              outline: 'none',
              // Opacità per feedback visivo + Sfondo esplicito
              opacity: splineResource.loading || splineResource.error ? 0.3 : 1,
              'background-color': 'transparent', // Evita sfondi neri/bianchi di default del canvas
              transition: 'opacity 0.4s ease-in-out'
            }}
          />
        </Suspense>
  <Show when={hover()}>
                <img
                  class="absolute ml-[20.7vw] -mt-[6vw] w-23"
                  src="/icons/edit.png"
                  onClick={(event) => {
                    setEdit(props.id);
                  }}
                  onmouseenter={() => setHover(true)}
                  onmouseleave={() => setHover(false)}
                ></img>
              </Show>
      </div>
    </div>

  );
}
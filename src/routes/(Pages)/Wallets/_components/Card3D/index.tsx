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
   // --- State per gestione Long Press ---
   const [isPressing, setIsPressing] = createSignal(false);
   const [pressTimerId, setPressTimerId] = createSignal<number | null>(null);
   // Coordinate iniziali per rilevare il movimento (drag/scroll)
   const [startCoords, setStartCoords] = createSignal<{ x: number; y: number } | null>(null);
 
   // --- Costanti Configurabili ---
   const LONG_PRESS_DURATION = 400; // Millisecondi per considerare "pressione lunga"
   const MOVE_THRESHOLD = 10; // Pixel di movimento per considerare "drag" invece di press
 
   const handlePointerDown = (event: PointerEvent) => {
    console.log(`[${props.id}] handlePointerDown - START`); // <-- LOG
    setStartCoords({ x: event.clientX, y: event.clientY });
    setIsPressing(true);

    if (pressTimerId() !== null) {
      console.log(`[${props.id}] handlePointerDown - Clearing previous timer: ${pressTimerId()}`); // <-- LOG
      clearTimeout(pressTimerId()!);
    }

    const timerId = setTimeout(() => {
      console.log(`[${props.id}] ---- Timer Fired (Long Press) ----`); // <-- LOG
      setIsPressing(false); // <-- LOG stato cambiato
      setPressTimerId(null);
    }, LONG_PRESS_DURATION);

    setPressTimerId(timerId as unknown as number);
    console.log(`[${props.id}] handlePointerDown - Timer set: ${timerId}, isPressing: ${isPressing()}`); // <-- LOG
  };

  const handlePointerUp = (event: PointerEvent) => {
    console.log(`[${props.id}] handlePointerUp - START, current isPressing: ${isPressing()}`); // <-- LOG stato attuale
    const timerId = pressTimerId();
    if (timerId !== null) {
      console.log(`[${props.id}] handlePointerUp - Clearing timer: ${timerId}`); // <-- LOG
      clearTimeout(timerId);
      setPressTimerId(null);
    }

    // Controlla lo stato PRIMA di resettare
    const shouldNavigate = isPressing();
    console.log(`[${props.id}] handlePointerUp - Should navigate based on isPressing? ${shouldNavigate}`); // <-- LOG decisione

    if (shouldNavigate) {
        console.log(`[${props.id}] handlePointerUp - Performing navigation/action! Href: ${props.href}`); // <-- LOG azione
        if (props.href) {
            navigate(props.href);
        } else {
            props.onClick?.();
        }
    } else {
        console.log(`[${props.id}] handlePointerUp - No action (long press or drag).`); // <-- LOG
    }

    // Resetta lo stato DOPO il controllo
    setIsPressing(false);
    setStartCoords(null);
    console.log(`[${props.id}] handlePointerUp - END, state reset.`); // <-- LOG
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!isPressing() || !startCoords()) {
      // console.log(`[${props.id}] handlePointerMove - Ignored (not pressing or no start coords)`); // Log opzionale (può essere molto verboso)
      return;
    }

    const deltaX = Math.abs(event.clientX - startCoords()!.x);
    const deltaY = Math.abs(event.clientY - startCoords()!.y);

    if (deltaX > MOVE_THRESHOLD || deltaY > MOVE_THRESHOLD) {
      console.log(`[${props.id}] handlePointerMove - Movement detected! deltaX=${deltaX}, deltaY=${deltaY}`); // <-- LOG
      const timerId = pressTimerId();
      if (timerId !== null) {
        console.log(`[${props.id}] handlePointerMove - Clearing timer due to movement: ${timerId}`); // <-- LOG
        clearTimeout(timerId);
        setPressTimerId(null);
      }
      console.log(`[${props.id}] handlePointerMove - Resetting state due to movement.`); // <-- LOG
      setIsPressing(false);
      setStartCoords(null);
    }
  };

  const handlePointerLeave = (event: PointerEvent) => {
    if (isPressing()) {
      console.log(`[${props.id}] handlePointerLeave - Pointer left while pressing, cancelling.`); // <-- LOG
      const timerId = pressTimerId();
      if (timerId !== null) {
        console.log(`[${props.id}] handlePointerLeave - Clearing timer: ${timerId}`); // <-- LOG
        clearTimeout(timerId);
        setPressTimerId(null);
      }
      console.log(`[${props.id}] handlePointerLeave - Resetting state.`); // <-- LOG
      setIsPressing(false);
      setStartCoords(null);
    }
  };

  const navigate = useNavigate(); // <-- Ottieni la funzione di navigazione
  return (

    <div
      class="landing-container"
      // Mantieni gli handler pointer*
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      // onPointerCancel={handlePointerLeave} // Puoi aggiungere anche questo per robustezza
      style={{ cursor: 'pointer', "touch-action": "pan-y" }}
      // onContextMenu={(e) => e.preventDefault()} // Opzionale
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

      </div>
    </div>

  );
}
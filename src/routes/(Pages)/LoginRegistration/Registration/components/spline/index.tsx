// src/components/Uman.tsx (Nome file aggiornato per chiarezza, o mantieni BasicSplineViewer.tsx se preferisci)

import {
  createResource,
  createSignal,
  onCleanup,
  onMount,
  Show,
  Suspense
} from 'solid-js';
import { Application } from '@splinetool/runtime'; // Importa la classe Application
// Rimuovi l'import di index se non serve: import index from '~/routes';

// --- Interfaccia per le Props ---
interface UmanProps {
  // Prop opzionale per specificare l'URL della scena Spline
  // Se non fornita, verrà usata defaultSplineSceneUrl
  sceneUrl?: string;

  // Puoi aggiungere altre props se necessario, ad esempio per stile o ID
  style?: Record<string, string>; // Esempio: per passare stili al div contenitore
  id?: string; // Esempio: per dare un ID univoco
  class?: string; // Esempio: per passare classi CSS al div contenitore
}

// URL di default se la prop 'sceneUrl' non viene passata
const defaultSplineSceneUrl = 'https://prod.spline.design/JGpFwmmqP1ZyU8pT/scene.splinecode';
// Esempio di un secondo URL che potresti voler caricare
const anotherSplineSceneUrl = 'https://prod.spline.design/TUA_ALTRA_SCENA/scene.splinecode';

// --- Componente Uman (accetta props) ---
// export default function Uman(props: UmanProps) {
//   // Riferimento all'elemento <canvas> nel DOM
//   let canvasRef: HTMLCanvasElement | undefined;

//   // Segnale per sapere quando l'elemento canvas è pronto nel DOM
//   const [isCanvasReady, setIsCanvasReady] = createSignal(false);

//   // Determina l'URL effettivo da usare: o quello passato via prop, o quello di default
//   // Usiamo una funzione per creare un segnale derivato, così createResource reagirà se la prop cambia
//   const urlToLoad = () => props.sceneUrl || defaultSplineSceneUrl;

//   // Log ID se fornito (utile per debug con istanze multiple)
//   const logPrefix = props.id ? `[Uman ${props.id}]` : "[Uman]";

//   // onMount (invariato nel contenuto, usa logPrefix)
//   onMount(() => {
//     if (canvasRef) {
//       console.log(`${logPrefix}: Canvas ref è pronto.`);
//       setIsCanvasReady(true);
//     } else {
//       console.error(`${logPrefix}: Errore critico - Canvas ref non trovato in onMount!`);
//     }
//     onCleanup(() => {
//         console.log(`${logPrefix}: Cleanup onMount - reset isCanvasReady.`);
//         setIsCanvasReady(false);
//     });
//   });

//   // Creazione della risorsa per caricare Spline (MODIFICATA LA SORGENTE)
//   const [splineResource] = createResource(
//     // 1. Sorgente: Ora dipende da isCanvasReady E dall'URL da caricare (urlToLoad)
//     //    Se la prop 'sceneUrl' cambia, questa sorgente cambierà e createResource rieseguirà il fetcher.
//     () => isCanvasReady() ? urlToLoad() : null,

//     // 2. Fetcher: (invariato nel contenuto, usa logPrefix e prende url come argomento)
//     async (url): Promise<Application> => {
//       if (!canvasRef) {
//         console.error(`${logPrefix}: Fetcher - CanvasRef non è disponibile!`);
//         throw new Error("Canvas element reference is missing.");
//       }

//       console.log(`${logPrefix}: createResource Fetcher - Inizio caricamento da ${url}`);
//       const app = new Application(canvasRef);
//       try {
//         await app.load(url);
//         console.log(`${logPrefix}: createResource Fetcher - Scena Spline caricata con successo.`);
//         return app;
//       } catch (error) {
//         console.error(`${logPrefix}: createResource Fetcher - Errore durante app.load():`, error);
//         app.dispose();
//         throw error;
//       }
//     }
//   );

//   // Gestione della pulizia (invariata nel contenuto, usa logPrefix)
//   onCleanup(() => {
//     const lastAppInstance = splineResource.latest;
//     if (lastAppInstance) {
//       console.log(`${logPrefix}: onCleanup - Dispose istanza Spline.`);
//       lastAppInstance.dispose();
//     } else {
//       console.log(`${logPrefix}: onCleanup - Nessuna istanza Spline da pulire.`);
//     }
//   });

//   // --- Render JSX ---
//   // Applica lo stile passato via props al div principale, o usa gli stili di default
//   /*
//   const containerStyle = () => ({
//     width: '100%',
//     height: '100%',
//     position: 'relative',
//     "z-index": -200, // Mantenuto dal tuo esempio
//     "margin-left": "4%", // Mantenuto dal tuo esempio
//     ...(props.style || {}) // Aggiunge/sovrascrive con gli stili passati via props
//   });
// */
//   return (
//     <div style={props.style} class={props.class}>

//       {/* Indicatore di caricamento (invariato) */}
//       <Show when={splineResource.loading}>
//         <div style={{ /* ... stili overlay loading ... */ }}>
//           Caricamento Scena Spline...
//         </div>
//       </Show>

//       {/* Messaggio di errore (invariato) */}
//       <Show when={splineResource.error && !splineResource.loading}>
//         <div style={{ /* ... stili overlay errore ... */ }}>
//           <strong>Errore durante il caricamento della scena!</strong>
//           <pre>{splineResource.error?.message || 'Errore sconosciuto'}</pre>
//         </div>
//       </Show>

//       {/* Canvas (invariato) */}
//       <Suspense>
//         <canvas
//           ref={canvasRef!}
//           style={{
//             width: '100%',
//             height: '100%',
//             display: splineResource.loading || splineResource.error ? 'none' : 'block',
//             outline: 'none',
//           }}
//         />
//       </Suspense>
//     </div>
//   );
// }
export default function Uman(props: UmanProps) {
  console.log("Componente Uman (semplificato) renderizzato");

  onMount(() => {
    console.log("Componente Uman (semplificato) - onMount");
  });

  // Commenta TUTTO il resto: createResource, Show, canvas, etc.

  return (
    <div style={props.style} class={props.class}>
      Contenuto Semplificato Uman Component
      {/* Assicurati che non ci sia NIENTE altro qui per ora */}
    </div>
  );
}
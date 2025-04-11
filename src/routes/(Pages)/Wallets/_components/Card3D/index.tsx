import { onCleanup, onMount, createSignal, createEffect, Component } from "solid-js";
import { Application, SPEObject } from '@splinetool/runtime'; // Importa SPEObject se vuoi un type più specifico

// Interfaccia di base (può essere migliorata con tipi più specifici se necessario)
interface SplineObjectWithMaterialColor extends SPEObject { // Estende SPEObject per avere altre proprietà base
  material?: {
    color?: { r: number; g: number; b: number; a: number; } | string;
    // Potrebbero esserci altre proprietà qui
  };
}
interface properties {
  color: string;
  balance: number;
  name: string;
  currency: string;
  href: string;
  onClick: () => void;
  id:number
}
export default function Card3D(props:properties) {
  let canvasRef: HTMLCanvasElement | undefined;
  const [splineApp, setSplineApp] = createSignal<Application | null>(null);

  var splineSceneUrl:any;
 //Colors
  switch (props.color) {
    case 'purple':
      splineSceneUrl = 'https://prod.spline.design/QZCty9-iOdNiK13w/scene.splinecode';
      break;
      default:
      splineSceneUrl = 'https://prod.spline.design/mzKeaOgjz2ILR0uC/scene.splinecode';
      break;
  }


  onMount(() => {
    if (!canvasRef) return;
    const app = new Application(canvasRef);
    app.load(splineSceneUrl)
      .then(() => {
        setSplineApp(app);
        console.log('Spline caricata.');
      })
      .catch(error => {
        console.error('Errore caricamento Spline:', error);
      });

    onCleanup(() => {
       splineApp()?.dispose?.();
       setSplineApp(null);
    });
  });


  createEffect(() => {
    const app = splineApp();

    // --- Impostazioni ---
    const cardObjectName = 'Group 2'; // Nome del gruppo da scalare\
    const newScaleFactors = { x: 1.2, y: 1.2, z: 1.2 };
    const wallet_name = 'wallet_name';
    const wallet_value = props.name;

    const balance = 'balance';
    const balance_value = props.balance + ' ' + (
      props.currency === 'EUR' ? '€' : 
      props.currency === 'USD' ? '$' : 
      props.currency === 'GBP' ? '£' : 
      props.currency === 'CHF' ? 'CHF' : 
      props.currency === 'CAD' ? 'C$' : 
      props.currency === 'AUD' ? 'A$' : 
      props.currency === 'JPY' ? '¥' : 
      props.currency === 'CNY' ? '¥' : 
      props.currency === 'INR' ? '₹' : 
      props.currency === 'BRL' ? 'R$' : 
      props.currency === 'MXN' ? '$' : 
      props.currency === 'NZD' ? '$' : 
      props.currency === 'SGD' ? '$' : 
      props.currency === 'HKD' ? '$' : 
      props.currency === 'SEK' ? 'kr' : 
      props.currency === 'NOK' ? 'kr' : 
      props.currency === 'DKK' ? 'kr' : 
      props.currency === 'PLN' ? 'zł' : 
      props.currency === 'CZK' ? 'Kč' : 
      props.currency === 'HUF' ? 'Ft' : 
      props.currency === 'RUB' ? '₽' : 
      props.currency === 'TRY' ? '₺' : 
      props.currency === 'ZAR' ? 'R' : 
      props.currency === 'AED' ? 'د. إ' : 
      props.currency
    );
console.log(`-> Bilancio '${balance}':`, balance_value);

    if (!app) return;
    console.log(`--- Effetto Eseguito ---`);

    // --- Modifica Variabili ---
    try {
        app.setVariable(wallet_name, wallet_value);
        app.setVariable(balance, balance_value);

    } catch (e) {
        console.error(`-> ERRORE Var '${wallet_name}':`, e);
    }

    // --- 2. Trova e Scala la Card ---
    const objectToScale = app.findObjectByName(cardObjectName);
    if (objectToScale) {
        try {
            // Usa 'as any' o un tipo più specifico se lo conosci
            if ((objectToScale as any).scale?.x !== undefined) {
            (objectToScale as any).scale.x = newScaleFactors.x;
            (objectToScale as any).scale.y = newScaleFactors.y;
            (objectToScale as any).scale.z = newScaleFactors.z;
            console.log(`-> Scala '${cardObjectName}' impostata a ${JSON.stringify(newScaleFactors)}.`);
            } else {
            console.warn(`-> ATTENZIONE: Prop 'scale' non trovata su '${cardObjectName}'.`);
            }
        } catch (e) {
            console.error(`-> ERRORE Scala '${cardObjectName}':`, e);
        }
    } else {
        console.warn(`-> ATTENZIONE: Oggetto '${cardObjectName}' NON trovato! Controlla nome.`);
    }
  });

  // JSX per il rendering del canvas (invariato)
  return (
    <div class="landing-container">
      <div class="spline-wrapper" style="width: 80%; height: 500px;">
        <canvas ref={canvasRef!} style="width: 100%; height: 100%; display: block; outline: none;" />
      </div>
    </div>
  );
}
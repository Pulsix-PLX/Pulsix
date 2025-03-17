
// HOW TO USE IT
function MioComponente() {
  const [visibile, setVisibile] = createSignal(false);
  
  return (
    <>
      <button onClick={() => setVisibile(!visibile())}>
        Mostra/Nascondi
      </button>
      
      <Fade 
        in={visibile()} 
        fadeInDuration={200}    // Entrata veloce (200ms)
        fadeOutDuration={600}   // Uscita lenta (600ms)
        fadeInEasing="ease-out" // Accelerazione all'inizio, rallentamento alla fine
        fadeOutEasing="cubic-bezier(0.4, 0.0, 0.2, 1)" // Curva personalizzata
      >
        <div>Questo contenuto ha transizioni diverse per entrata e uscita</div>
      </Fade>
    </>
  );
}



import { createEffect, createSignal, onCleanup } from "solid-js";

export default function Fade(props:any) {
  const [opacity, setOpacity] = createSignal(props.in ? 0 : 1);
  const [display, setDisplay] = createSignal(props.in ? "block" : "none");
  const [transition, setTransition] = createSignal("");

  // Valori predefiniti se non specificati
  const fadeInDuration = props.fadeIn || 300;
  const fadeOutDuration = props.fadeOut || 500; // Più lungo per l'uscita
  const fadeInEasing = props.fadeInEasing || "ease-out";
  const fadeOutEasing = props.fadeOutEasing || "ease-in";

  createEffect(() => {
    let timer;
    
    if (props.in) {
      // Configura la transizione per il fade in
      setTransition(`opacity ${fadeInDuration}ms ${fadeInEasing}`);
      setDisplay("block");
      timer = setTimeout(() => setOpacity(1), 10);
    } else {
      // Configura la transizione per il fade out
      setTransition(`opacity ${fadeOutDuration}ms ${fadeOutEasing}`);
      setOpacity(0);
      timer = setTimeout(() => setDisplay("none"), fadeOutDuration);
    }
    
    onCleanup(() => clearTimeout(timer));
  });

  return (
    <div
    class={props.class}
      style={{
        opacity: opacity(),
        display: display(),
        transition: transition(),
        height: display() === "none" ? 0 : "auto",
        overflow: "hidden"
      }}
    >
      {props.children}
    </div>
  );
}
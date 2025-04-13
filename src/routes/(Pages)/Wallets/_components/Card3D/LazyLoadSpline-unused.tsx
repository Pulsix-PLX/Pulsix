// src/components/LazyLoadSpline.tsx
import { createSignal, onMount, onCleanup, Show, Component, ParentProps } from "solid-js";

interface LazyLoadSplineProps extends ParentProps {
  // Props per IntersectionObserver (opzionali)
  rootMargin?: string;      // Es: "200px 0px" (carica 200px prima che entri nel viewport)
  threshold?: number;       // Es: 0.01 (appena 1% è visibile)
  // Props per il placeholder
  placeholderHeight?: string; // Altezza minima per evitare reflow, es: "500px"
  placeholderWidth?: string; // Larghezza, es: "80%" o "100%"
  placeholderContent?: any; // Contenuto personalizzato per il placeholder
}

const LazyLoadSpline: Component<LazyLoadSplineProps> = (props) => {
  const [isIntersecting, setIsIntersecting] = createSignal(false);
  let containerRef: HTMLDivElement | undefined;

  onMount(() => {
    // Fallback per SSR o ambienti senza IntersectionObserver
    if (typeof IntersectionObserver === 'undefined') {
        console.warn("IntersectionObserver non supportato, caricamento immediato.");
        setIsIntersecting(true);
        return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Aggiorna lo stato solo se sta intersecando
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Disconnetti l'observer una volta che l'elemento è visibile per non osservare più
          if (containerRef) {
            observer.unobserve(containerRef);
          }
          observer.disconnect();
        }
      },
      {
        rootMargin: props.rootMargin || "150px 0px", // Carica un po' prima dell'ingresso
        threshold: props.threshold || 0.01,
      }
    );

    if (containerRef) {
      observer.observe(containerRef);
    }

    onCleanup(() => {
      // Non serve più observer.unobserve(containerRef) perché lo facciamo già sopra
      observer.disconnect();
    });
  });

  // Placeholder di default
  const defaultPlaceholder = (
    <div style={{
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        height: '100%', // Occupa l'altezza del contenitore
        width: '100%',
        background: '#eee', // Sfondo leggero
        color: '#aaa',
        'font-size': '1.2em',
        'border-radius': '8px' // Stile simile a una card?
     }}>
      Caricamento Scena 3D...
    </div>
  );

  return (
    // Contenitore che viene osservato
    <div
      ref={containerRef}
      style={{
        "min-height": props.placeholderHeight || "500px", // Altezza minima per placeholder
        width: props.placeholderWidth || "80%", // Larghezza come nel tuo esempio
        position: "relative" // Utile se il placeholder è assoluto
      }}
    >
      {/* Mostra i figli (il tuo Card3D) solo quando interseca */}
      <Show when={isIntersecting()} fallback={props.placeholderContent || defaultPlaceholder}>
        {props.children}
      </Show>
    </div>
  );
};

export default LazyLoadSpline;
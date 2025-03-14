// components/RiveCanvas.jsx
import { createSignal, onMount, onCleanup } from 'solid-js';

export default function RiveCanvas(props: any) {
  const [canvas, setCanvas] = createSignal(null);
  let riveInstance: any = null;

  onMount(async () => {
    if (!canvas()) {
      console.warn("Canvas ref is not yet available.");
      return;
    }

    try {
      const { Rive } = await import('@rive-app/webgl');
      riveInstance = new Rive({
        src: props.src,
        canvas: canvas(),
        autoplay: props.autoplay !== false,
        stateMachines: props.stateMachines,
        artboard: props.artboard,
        fit: props.fit || 'contain',
        onLoad: () => {
          console.log("Rive animation loaded and initialized.");

          // Aggiungi un listener per gli eventi di cambio di stato
          riveInstance.on('statechange', (event) => {
            console.log("State change event:", event); // Log dell'evento completo

            const inputs = riveInstance.stateMachineInputs(props.stateMachines);
            const myInput = inputs.find((input) => input.name === 'Selected C');

            if (myInput) {
              console.log('Value of Selected C:', myInput.value);
              props.onStateChange?.(myInput.value);
            } else {
              console.warn("Input 'Selected C' not found in state machine.");
            }
          });

          props.onLoad?.();
        },
         onError: (error) => {
          console.error("Rive initialization error:", error);
        },
      });
    } catch (err) {
      console.error("Error initializing Rive:", err);
    }
  });

  onCleanup(() => {
    if (riveInstance) {
      try {
        riveInstance.stop();
        riveInstance.cleanup();
        console.log("Rive animation stopped and cleaned up.");
      } catch (err) {
        console.error('Error during Rive cleanup:', err);
      }
    }
  });

  return (
    <canvas
      ref={setCanvas}
      width={props.width || 1800}
      height={props.height || 1800}
      style={{ width: '50%', height: '100%', ...props.style }}
    />
  );
}
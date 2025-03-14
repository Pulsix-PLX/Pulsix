import { createSignal, onMount, onCleanup } from 'solid-js';

export default function RiveCanvas(props: any) {
  const [canvas, setCanvas] = createSignal<any>(null);
  let riveInstance: any = null;
  let toggleInput: any = null; // Memorizza l'input della State Machine

  onMount(async () => {
    if (!canvas()) return;

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
          console.log('Animazione caricata!');

          // Recupera gli input della State Machine
          const inputs = riveInstance.stateMachineInputs(props.stateMachines);
          toggleInput = inputs.find((input: { name: string }) => input.name === 'Trigger 1'); // Sostituisci 'Toggle' con il nome corretto

          console.log('Input trovato:', toggleInput);
        },
        onLoadError: props.onErrorLoad,
      });
    } catch (err) {
      console.error("Errore nell'inizializzazione di Rive:", err);
    }
  });

  onCleanup(() => {
    riveInstance?.stop();
  });

  // Funzione per attivare l'animazione al click
  const handleClick = () => {
    if (toggleInput) {
      toggleInput.value = !toggleInput.value; // Cambia il valore dell'input per attivare l'animazione
    }
  };

  return (
    <canvas
      ref={setCanvas}
      onClick={handleClick}
      width={props.width || 1800}
      height={props.height || 1800}
      style={{ width: '100%', height: '100%', ...props.style }}
    />
  );
}

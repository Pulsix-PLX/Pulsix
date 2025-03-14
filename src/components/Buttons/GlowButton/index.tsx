// Index.tsx
import { createSignal } from 'solid-js';
import RiveCanvas from './riv';

export default function Index() {
  const [isSelectedC, setIsSelectedC] = createSignal('');

  const handleStateChange = (newValue) => {
    console.log("Selected C changed to:", newValue);
    setIsSelectedC(newValue);
  };

  return (
    <>
      <RiveCanvas
        src="/bt.riv" // Assicurati che il percorso sia corretto
        stateMachines="State Machine 1"
        artboard="Light leak button" // Assicurati che sia lo stesso nome nell'editor di Rive
        autoplay={true}
        onLoad={() => console.log("Animation loaded successfully!")}
        onStateChange={handleStateChange}
        onErrorLoad={(error) => console.error("Error loading Rive animation:", error)}
      />

      <div class='text-white ml-100'>Selected C: {isSelectedC()}</div>
    </>
  );
}





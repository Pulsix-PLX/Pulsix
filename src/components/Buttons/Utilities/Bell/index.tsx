// Index.tsx
import { createSignal } from 'solid-js';
import RiveCanvas from './riv';

export default function Bell() {
  const [isSelectedC, setIsSelectedC] = createSignal('');

  const handleStateChange = (newValue) => {
    console.log('Selected C:', newValue);
    setIsSelectedC(newValue);
  };

  return (
    <>
      <RiveCanvas
        src="/rivs/Bell.riv"
        stateMachines="State Machine 1"
        artboard="Artboard" // Assicurati che sia lo stesso nome nell'editor di Rive
        onLoad={() => console.log('Animation loaded!')}
        onStateChange={handleStateChange}
      />
    </>
  );
}

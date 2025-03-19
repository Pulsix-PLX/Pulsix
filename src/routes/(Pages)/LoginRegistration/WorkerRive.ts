import { Rive } from '@rive-app/webgl';

self.onmessage = async (event) => {
  const { src, canvas, autoplay, stateMachines, artboard, fit } = event.data;
  
  try {
    const offscreenCanvas = canvas as OffscreenCanvas;
    const rive = new Rive({
      src,
      canvas: offscreenCanvas,
      autoplay,
      stateMachines,
      artboard,
      fit,
      onLoad: () => {
        self.postMessage({ type: 'loaded' });
        
        // Recupera gli input della State Machine
        const inputs = rive.stateMachineInputs(stateMachines);
        const toggleInput = inputs.find((input) => input.name === 'Monthly');
        
        if (toggleInput) {
          self.postMessage({ 
            type: 'inputReady', 
            hasToggle: true,
            toggleValue: toggleInput.value
          });
        } else {
          self.postMessage({ 
            type: 'inputReady', 
            hasToggle: false
          });
        }
      },
      onLoadError: (err) => self.postMessage({ type: 'error', error: err })
    });
    
    // Gestisci i comandi dal thread principale
    self.onmessage = (innerEvent) => {
      if (innerEvent.data.type === 'toggle' && rive) {
        const inputs = rive.stateMachineInputs(stateMachines);
        const toggleInput = inputs.find((input) => input.name === 'Monthly');
        if (toggleInput) {
          toggleInput.value = !toggleInput.value;
          self.postMessage({ type: 'toggleChanged', value: toggleInput.value });
        }
      }
    };
    
  } catch (err) {
    self.postMessage({ type: 'error', error: err.message });
  }
};
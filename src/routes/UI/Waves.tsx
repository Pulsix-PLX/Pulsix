// File: src/components/CanvasAnimation.jsx
import { onMount, onCleanup } from 'solid-js';

export default function CanvasAnimation() {
  let canvasRef;
  let worker;
  let ctx;
  let width, height;
  let animationFrameId;
  
  // Funzione per inizializzare il canvas
  const setupCanvas = () => {
    if (!canvasRef) return;
    
    width = window.innerWidth;
    height = window.innerHeight;
    
    // Imposta le dimensioni del canvas
    canvasRef.width = width;
    canvasRef.height = height;
    
    ctx = canvasRef.getContext('2d', { 
      alpha: false,
      powerPreference: 'low-power'
    });
    
    // Invia le dimensioni iniziali al worker
    worker.postMessage({
      type: 'init',
      width,
      height
    });
  };
  
  // Funzione per renderizzare i dati ricevuti dal worker
  const renderFrame = (imageData) => {
    if (!ctx) return;
    ctx.putImageData(imageData, 0, 0);
    animationFrameId = requestAnimationFrame(() => {
      worker.postMessage({ type: 'renderFrame' });
    });
  };

  onMount(() => {
    // Crea il web worker
    worker = new Worker(new URL('./WavesWorker.tsx', import.meta.url), { type: 'module' });
    
    // Configura il listener per i messaggi dal worker
    worker.onmessage = (event) => {
      const { type, data } = event.data;
      
      if (type === 'frameReady') {
        renderFrame(data);
      }
    };
    
    // Inizializza il canvas
    setupCanvas();
    
    // Gestione del ridimensionamento
    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvasRef.width = width;
      canvasRef.height = height;
      
      worker.postMessage({
        type: 'resize',
        width,
        height
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Avvia il loop di rendering
    worker.postMessage({ type: 'renderFrame' });
    
    // Cleanup quando il componente viene smontato
    onCleanup(() => {
      worker.terminate();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    });
  });

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        "display": "block",
        "position": "absolute",
        "top": 0,
        "left": 0,
        "z-index": "-1",
        opacity: 0.8  //opacità
      }}
    />
  );
}
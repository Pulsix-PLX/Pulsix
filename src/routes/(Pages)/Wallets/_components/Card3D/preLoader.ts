// src/store/splineLoader.ts (Riepilogo essenziale)
import { createSignal, createRoot } from 'solid-js';
import type { Application as SplineApplicationType } from '@splinetool/runtime';

function createSplineLoader() {
  const [isRuntimeReady, setIsRuntimeReady] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);
  let SplineApp: typeof SplineApplicationType | null = null; // Cache del runtime importato

  // Funzione per avviare il pre-caricamento del SOLO RUNTIME
  const preloadRuntime = async () => {
    if (isRuntimeReady() || isLoading()) return; // Già pronto o in caricamento

    setIsLoading(true);
    console.log("SplineLoader: Starting runtime preload...");
    try {
      // Carica dinamicamente il runtime
      const runtime = await import('@splinetool/runtime');
      SplineApp = runtime.Application; // Salva la classe Application
      if (!SplineApp) throw new Error("Spline runtime module loaded but Application class not found.");
      setIsRuntimeReady(true); // Segnala che il runtime è pronto
      console.log('SplineLoader: Runtime preloaded successfully.');
    } catch (error) {
      console.error("SplineLoader: Runtime preload failed:", error);
      setIsRuntimeReady(false); // Resetta in caso di errore
    } finally {
      setIsLoading(false);
    }
  };

  // Funzione per ottenere la classe Application (potrebbe essere null se non ancora caricata)
  const getRuntime = (): typeof SplineApplicationType | null => SplineApp;

  // Esponi anche lo stato, se utile
  const getRuntimeStatus = () => ({
      isLoading: isLoading(),
      isReady: isRuntimeReady()
  });

  return { preloadRuntime, getRuntime, getRuntimeStatus };
}

export default createRoot(createSplineLoader); // Esporta lo store globale
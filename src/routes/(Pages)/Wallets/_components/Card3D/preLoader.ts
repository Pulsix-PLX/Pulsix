// src/store/splineLoader.ts (Versione Potenziata)
import { createSignal, createRoot } from 'solid-js';
import type { Application as SplineApplicationType } from '@splinetool/runtime';

function createSplineLoader() {
  const [isRuntimeReady, setIsRuntimeReady] = createSignal(false);
  const [runtimeError, setRuntimeError] = createSignal<Error | null>(null);
  const [isLoadingRuntime, setIsLoadingRuntime] = createSignal(false);
  // Teniamo traccia delle scene di cui è stato tentato il prefetch
  const prefetchedScenes = new Set<string>();
  const [isPrefetchingScene, setIsPrefetchingScene] = createSignal(false);

  let SplineApp: typeof SplineApplicationType | null = null;

  // 1. Precarica solo il Runtime (come prima)
  const preloadRuntime = async (): Promise<boolean> => {
    if (isRuntimeReady() || isLoadingRuntime()) return isRuntimeReady();

    setIsLoadingRuntime(true);
    setRuntimeError(null);
    console.log("SplineLoader: Starting runtime preload...");
    try {
      const runtime = await import('@splinetool/runtime');
      SplineApp = runtime.Application;
      if (!SplineApp) throw new Error("Spline runtime module loaded but Application class not found.");
      setIsRuntimeReady(true);
      console.log('SplineLoader: Runtime preloaded successfully.');
      return true;
    } catch (error) {
      console.error("SplineLoader: Runtime preload failed:", error);
      setRuntimeError(error instanceof Error ? error : new Error(String(error)));
      setIsRuntimeReady(false);
      return false;
    } finally {
      setIsLoadingRuntime(false);
    }
  };

  // 2. TENTA di pre-fetchare i dati di una specifica scena URL
  const prefetchSceneData = async (sceneUrl: string) => {
    if (!sceneUrl || prefetchedScenes.has(sceneUrl)) {
       // console.log(`SplineLoader: Skipping prefetch for ${sceneUrl} (invalid or already attempted)`);
       return; // URL non valido o già tentato
    }

    // Assicurati che il runtime sia pronto prima di tentare il fetch della scena?
    // Non strettamente necessario, potremmo fetchare in parallelo, ma aspettare può avere senso
    // if (!isRuntimeReady() && !isLoadingRuntime()) {
    //   await preloadRuntime(); // Attendi il runtime se non è già in caricamento/pronto
    // }

    console.log(`SplineLoader: Attempting to prefetch scene data for ${sceneUrl}...`);
    setIsPrefetchingScene(true); // Potrebbe servire un indicatore per URL
    try {
      // Usa fetch per scaricare il file e metterlo nella cache del browser
      const response = await fetch(sceneUrl, { cache: 'force-cache' }); // Prova a forzare la cache? o default
      if (!response.ok) {
          // Non trattarlo come un errore fatale, il caricamento reale potrebbe funzionare
          console.warn(`SplineLoader: Prefetch for ${sceneUrl} failed with status ${response.status}. The actual load might still work.`);
      } else {
          console.log(`SplineLoader: Prefetch for ${sceneUrl} likely successful (status ${response.status}). Data might be cached.`);
          // Non consumiamo il body (response.blob(), response.arrayBuffer()) per non bloccare il thread
          // Lasciamo che il browser gestisca la cache
      }
    } catch (error) {
      // Anche qui, logga ma non bloccare tutto
      console.warn(`SplineLoader: Prefetch for ${sceneUrl} threw an error:`, error);
    } finally {
      prefetchedScenes.add(sceneUrl); // Segna come tentato (anche se fallito)
      setIsPrefetchingScene(false); // Resetta l'indicatore generico
    }
  };

  // 3. Funzione Combinata: Precarica Runtime E Scene Specifiche
  const preloadRuntimeAndScenes = async (sceneUrls: string[]) => {
      const runtimeSuccess = await preloadRuntime(); // Assicurati che il runtime sia caricato prima
      if (runtimeSuccess) {
          console.log("SplineLoader: Runtime ready, starting scene prefetch...");
          // Avvia i prefetch delle scene in parallelo (senza aspettarli individualmente qui)
          sceneUrls.forEach(url => prefetchSceneData(url));
      } else {
          console.error("SplineLoader: Cannot prefetch scenes because runtime failed to load.");
      }
  };


  const getRuntime = (): typeof SplineApplicationType | null => SplineApp;
  const getRuntimeStatus = () => ({ isLoading: isLoadingRuntime(), isReady: isRuntimeReady(), error: runtimeError() });

  return { preloadRuntime, prefetchSceneData, preloadRuntimeAndScenes, getRuntime, getRuntimeStatus };
}

export default createRoot(createSplineLoader);
// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
import 'pulsix';

// --- Registra Manualmente il Service Worker ---
if ('serviceWorker' in navigator) {
  // Il percorso deve puntare a dove sw.js si trova nell'output servito
  // Dato che hai detto che i file finiscono in _build, questo è probabile:
  const swPath = '/_build/sw.js'; // <--- CONTROLLA E AGGIUSTA QUESTO PATH!

  window.addEventListener('load', () => {
    navigator.serviceWorker.register(swPath) // Usa il percorso corretto
      .then(registration => {
        console.log('Service Worker registrato manualmente con scope:', registration.scope);
      })
      .catch(error => {
        console.error('Errore registrazione manuale Service Worker:', error);
      });
  });
}
// -----------------------------------------

mount(() => <StartClient />, document.getElementById("app")!);

import { defineConfig } from '@solidjs/start/config';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { VitePWA } from 'vite-plugin-pwa'; // Importa il plugin
export default defineConfig({
  middleware: 'src/server/middleware/auth.ts',
  server: {
    preset: 'node',  // Specifica che vuoi usare il server Node.js
    prerender: {
      crawlLinks: true,
      // Puoi anche specificare delle rotte esplicite se necessario
      // routes: ['/', '/about', '/blog/post-1', '/blog/post-2']
    }
  },
  vite: {
    plugins: [
     
      VitePWA({
        // --- Configurazione del Service Worker ---
        registerType: 'autoUpdate', // Aggiorna automaticamente il service worker quando c'è una nuova versione
        injectRegister: 'script', 
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'], // File da mettere in cache
          runtimeCaching: [ // Strategie di caching per le richieste di rete
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 anno
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 anno
                },
                cacheableResponse: {
                  statuses: [0, 200]
                },
              }
            }
            // Aggiungi altre regole di caching se necessario (es. per API)
          ]
        },
        // --- Configurazione del Manifest ---
        // Puoi definire il manifest qui, oppure creare un file manifest.webmanifest nella cartella `public`
        manifest: {
          name: 'Pulsix', // Nome completo dell'app
          short_name: 'MiaApp', // Nome breve (usato sull'icona home)
          description: 'Una fantastica PWA creata con SolidStart', // Descrizione
          theme_color: '#ffffff', // Colore della barra del titolo dell'app
          background_color: '#ffffff', // Colore dello splash screen
          display: 'standalone', // Come viene visualizzata l'app (standalone, fullscreen, minimal-ui, browser)
          scope: '/', // Il contesto di navigazione dell'app
          start_url: '/', // La pagina iniziale quando l'app viene aperta
          icons: [
            {
              // Assicurati che esista public/icons/icon-192x192.png
              src: '/logo-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              // Assicurati che esista public/icons/icon-512x512.png
              src: '/logo-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              // Assicurati che esista public/icons/icon-maskable-512x512.png
              src: '/logo-mask-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable' // Importante per l'icona maskable
            }
            // Aggiungi altre dimensioni se vuoi
          ],
        },
        // Opzionale: Se vuoi generare automaticamente le icone a partire da una sorgente
        // devi installare `pwa-assets-generator` (`npm i -D @vite-pwa/assets-generator`)
        // pwaAssets: {
        //   config: true // Legge la configurazione da `pwa-assets.config.ts` o simili
        //   // oppure
        //   // image: 'public/logo.svg', // Immagine sorgente
        //   // preset: 'minimal-2023' // Preset per le icone da generare
        // },
        devOptions: {
          enabled: true, // Abilita PWA anche in modalità sviluppo (utile per testing)
          type: 'module', // Usa il tipo di service worker 'module' in dev
        }
      }),
      nodePolyfills(),
    ],
    worker: {
      format: 'es',
    },
    optimizeDeps: {
      include: ['simplex-noise'],
    },
  },
});

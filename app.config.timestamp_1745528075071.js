// app.config.ts
import { defineConfig } from "@solidjs/start/config";
import { nodePolyfills } from "vite-plugin-node-polyfills";
var app_config_default = defineConfig({
  middleware: "src/server/middleware/auth.ts",
  server: {
    preset: "node",
    // Specifica che vuoi usare il server Node.js
    prerender: {
      crawlLinks: true
      // Puoi anche specificare delle rotte esplicite se necessario
      // routes: ['/', '/about', '/blog/post-1', '/blog/post-2']
    }
  },
  vite: {
    plugins: [
      nodePolyfills(),
      VitePWA({
        // --- Configurazione del Service Worker ---
        registerType: "autoUpdate",
        // Aggiorna automaticamente il service worker quando c'è una nuova versione
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff,woff2}"],
          // File da mettere in cache
          runtimeCaching: [
            // Strategie di caching per le richieste di rete
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                  // 1 anno
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "gstatic-fonts-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                  // 1 anno
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
            // Aggiungi altre regole di caching se necessario (es. per API)
          ]
        },
        // --- Configurazione del Manifest ---
        // Puoi definire il manifest qui, oppure creare un file manifest.webmanifest nella cartella `public`
        manifest: {
          name: "La Mia App SolidStart PWA",
          // Nome completo dell'app
          short_name: "MiaApp",
          // Nome breve (usato sull'icona home)
          description: "Una fantastica PWA creata con SolidStart",
          // Descrizione
          theme_color: "#ffffff",
          // Colore della barra del titolo dell'app
          background_color: "#ffffff",
          // Colore dello splash screen
          display: "standalone",
          // Come viene visualizzata l'app (standalone, fullscreen, minimal-ui, browser)
          scope: "/",
          // Il contesto di navigazione dell'app
          start_url: "/",
          // La pagina iniziale quando l'app viene aperta
          icons: [
            // Definisci le icone per diverse dimensioni
            // È importante avere almeno 192x192 e 512x512
            {
              src: "/icons/icon-192x192.png",
              // Assicurati che questo file esista in public/icons/
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "/icons/icon-512x512.png",
              // Assicurati che questo file esista in public/icons/
              sizes: "512x512",
              type: "image/png"
            },
            {
              // Icona "maskable" per un aspetto migliore su alcune piattaforme (es. Android)
              src: "/icons/icon-maskable-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable"
              // Importante indicare lo scopo "maskable"
            }
            // Aggiungi altre dimensioni se necessario (es. 72x72, 96x96, 128x128, 144x144, 152x152, 256x256, 384x384)
          ]
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
          enabled: true,
          // Abilita PWA anche in modalità sviluppo (utile per testing)
          type: "module"
          // Usa il tipo di service worker 'module' in dev
        }
      })
    ],
    worker: {
      format: "es"
    },
    optimizeDeps: {
      include: ["simplex-noise"]
    }
  }
});
export {
  app_config_default as default
};

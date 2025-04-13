// app.config.ts
import { defineConfig } from "@solidjs/start/config";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { VitePWA } from "vite-plugin-pwa";
var app_config_default = defineConfig({
  plugins: [
    solid({
      adapter: vercel({})
      // O il tuo adapter
    }),
    // --- Configurazione VitePWA ---
    VitePWA({
      registerType: "autoUpdate",
      // Aggiorna automaticamente il SW quando cambia
      injectRegister: "auto",
      // Inietta automaticamente lo script di registrazione
      devOptions: {
        enabled: false
        // Di solito non serve attivare il SW in dev mode
      },
      // Configurazione del Manifest della Web App
      manifest: {
        name: "La Mia App Solid Spline",
        // Nome completo app
        short_name: "SolidSpline",
        // Nome breve (es. sotto icona)
        description: "Un esempio di SolidJS con Spline 3D e PWA",
        theme_color: "#ffffff",
        // Colore UI browser su mobile
        background_color: "#ffffff",
        // Colore schermata avvio
        display: "standalone",
        // Come si apre l'app (standalone, fullscreen, minimal-ui, browser)
        scope: "/",
        start_url: "/",
        // Pagina iniziale quando apri da icona
        icons: [
          {
            src: "/icons/icon-192x192.png",
            // Percorso relativo a public/
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icons/icon-512x512.png",
            // Percorso relativo a public/
            sizes: "512x512",
            type: "image/png"
          }
          // Puoi aggiungere altre icone (es. maskable)
        ]
      },
      // Configurazione di Workbox (che genera il Service Worker)
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff,woff2}"],
        // File da pre-cachare subito
        globIgnores: ["**/node_modules/**/*", "**/dist/**/*", "**/*.map"],
        // Escludi queste cartelle/file
        // --- Caching Dinamico (Runtime Caching) ---
        // Fondamentale per cachare i file Spline caricati al volo
        runtimeCaching: [
          {
            // Regex per catturare le richieste ai file .splinecode
            // Assicurati che l'URL base sia corretto
            urlPattern: /^https:\/\/prod\.spline\.design\/.*/i,
            // Strategia: Prima cache, poi rete. Se non è in cache, scaricalo e mettilo in cache.
            handler: "CacheFirst",
            options: {
              cacheName: "spline-scenes-cache",
              // Nome della cache
              expiration: {
                maxEntries: 50,
                // Massimo numero di scene in cache
                maxAgeSeconds: 60 * 60 * 24 * 30
                // Cache per 30 giorni
              },
              cacheableResponse: {
                statuses: [0, 200]
                // Cache risposte ok o opache (per CORS)
              }
            }
          },
          // Puoi aggiungere altre regole per API, font, ecc.
          // Esempio: Cache Google Fonts (stile)
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-stylesheets",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              // 1 anno
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          // Esempio: Cache Google Fonts (file font)
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              // 1 anno
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })
    // --- Fine Configurazione VitePWA ---
  ],
  server: {
    prerender: {
      routes: ["/", "/LoginRegistration"]
    }
  },
  vite: {
    server: {
      allowedHosts: true
      // Aggiungi l'host specifico per il test
    },
    plugins: [nodePolyfills()],
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

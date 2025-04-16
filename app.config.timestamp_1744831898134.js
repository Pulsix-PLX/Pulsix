// app.config.ts
import { defineConfig } from "@solidjs/start/config";
import { nodePolyfills } from "vite-plugin-node-polyfills";
var isSsrBuild = process.env.SSR === "true";
var app_config_default = defineConfig({
  // Configurazioni specifiche di SolidStart qui (se presenti)
  vite: {
    server: {
      // ATTENZIONE: Restringi in produzione!
      allowedHosts: true
    },
    plugins: [
      // Includi nodePolyfills SOLO se NON è una build SSR (quindi per il client)
      !isSsrBuild && nodePolyfills({
        // Configura le opzioni del plugin qui se necessario, es:
        protocolImports: true
      })
      // Altri plugin Vite...
      // Il plugin Solid() è generalmente aggiunto implicitamente da SolidStart
    ].filter(Boolean),
    // Rimuove eventuali 'false'
    worker: {
      format: "es"
    },
    optimizeDeps: {
      include: ["simplex-noise"]
    },
    // Configurazione SSR (rimane importante)
    ssr: {
      external: [
        "crypto"
        /* altri moduli nativi */
      ]
      // noExternal: [ /* ... */ ]
    },
    // Configurazione Resolve (rimane utile)
    resolve: {
      conditions: ["node", "import", "module", "browser", "default"]
    }
  }
  // fine vite: {}
});
export {
  app_config_default as default
};

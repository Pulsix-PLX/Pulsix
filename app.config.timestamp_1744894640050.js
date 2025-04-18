// app.config.ts
import { defineConfig } from "@solidjs/start/config";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";
var app_config_default = defineConfig({
  vite: {
    resolve: {
      alias: {
        // Mappa l'alias '~' alla cartella 'src'
        "~": path.resolve(__dirname, "./src"),
        // Mappa gli alias specifici che hai definito in tsconfig.json
        "@components": path.resolve(__dirname, "./src/components"),
        "@API": path.resolve(__dirname, "./src/routes/API"),
        "@server": path.resolve(__dirname, "./src/server"),
        // <-- Mappatura chiave!
        "@store": path.resolve(__dirname, "./src/GlobalStores")
        // Aggiungi altri alias se necessario
      }
      // Mantieni 'conditions' se lo avevi aggiunto prima
      // conditions: ['node', 'import', 'module', 'browser', 'default']
    },
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

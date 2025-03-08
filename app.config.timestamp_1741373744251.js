// app.config.ts
import { defineConfig } from "@solidjs/start/config";
import lightningcss from "vite-plugin-lightningcss";
var app_config_default = defineConfig({
  server: {
    // Configurazione di Nitro
    // Non è necessario specificare nulla qui se non si utilizzano preset personalizzati
  },
  vite: {
    plugins: [
      lightningcss()
    ],
    server: {
      host: "0.0.0.0",
      // L'indirizzo IP della tua macchina nella rete locale
      port: 3002
      // La porta su cui vuoi esporre il server
    }
  }
});
export {
  app_config_default as default
};

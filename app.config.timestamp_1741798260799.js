// app.config.ts
import { defineConfig } from "@solidjs/start/config";
import { nodePolyfills } from "vite-plugin-node-polyfills";
var app_config_default = defineConfig({
  // Invece di utilizzare direttamente plugins
  vite: {
    plugins: [
      nodePolyfills(),
      solidPlugin({
        ssr: true,
        // Enable SSR
        // Make sure solid-js/web is properly configured for hydration
        solid: {
          hydratable: true
        }
      }),
      ssr()
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

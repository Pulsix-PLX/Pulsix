// vite.config.ts o vinxi.config.ts
import { defineConfig } from "@solidjs/start/config";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  // Invece di utilizzare direttamente plugins
  vite: {
    plugins: [nodePolyfills()],
    worker: {
      format: "es"
    },
    optimizeDeps: {
      include: ["simplex-noise"]
    }
  }
});
// app.config.ts
import { defineConfig } from "@solidjs/start/config";
import { nodePolyfills } from "vite-plugin-node-polyfills";
var app_config_default = defineConfig({
  // Invece di utilizzare direttamente plugins
  vite: {
    plugins: [nodePolyfills(), tailwindcss()],
    worker: {
      format: "es"
    },
    optimizeDeps: {
      include: ["simplex-noise"]
    }
  }
});
function tailwindcss() {
  throw new Error("Function not implemented.");
}
export {
  app_config_default as default
};

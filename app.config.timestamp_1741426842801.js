// app.config.ts
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
var app_config_default = defineConfig({
  plugins: [
    solid(),
    nodePolyfills()
  ],
  worker: {
    format: "es"
  },
  optimizeDeps: {
    include: ["simplex-noise"]
  }
});
export {
  app_config_default as default
};

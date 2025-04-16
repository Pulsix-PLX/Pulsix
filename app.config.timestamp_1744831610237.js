// app.config.ts
import { defineConfig } from "vite";
import solid from "solid-start/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
var app_config_default = defineConfig(({ command, mode, ssrBuild }) => {
  const isSsrBuild = ssrBuild === true;
  return {
    plugins: [
      // Applica il plugin SOLO se NON è una build SSR
      !isSsrBuild && nodePolyfills({
        protocolImports: true
        // Spesso necessario per il client
        // Controlla la documentazione per altre opzioni rilevanti
      }),
      solid({ ssr: true })
      // ... altri plugin
    ].filter(Boolean),
    // Non dimenticare questo!
    ssr: {
      external: ["crypto"]
      // Mantieni questo per sicurezza
      // ...
    },
    resolve: {
      conditions: ["node", "import", "module", "browser", "default"]
      // Mantieni questo
    }
    // ...
  };
});
export {
  app_config_default as default
};

// app.config.ts
import { defineConfig } from "vite";
import solid from "solid-start/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
var app_config_default = defineConfig(({ command, mode, ssrBuild }) => {
  const isSsrBuild = ssrBuild === true;
  return {
    plugins: [
      // Applica il plugin solo se NON è una build SSR
      !isSsrBuild && nodePolyfills({
        // Opzioni del plugin, se necessario.
        // Ad esempio, potresti voler escludere crypto anche per il client se non ti serve:
        // exclude: ['crypto'],
        // Controlla la documentazione del plugin per le opzioni esatte.
        // Protocol Imports è spesso necessario per il client:
        protocolImports: true
      }),
      solid({ ssr: true })
      // Configurazione di SolidStart
      // ... altri plugin
    ].filter(Boolean),
    // .filter(Boolean) rimuove eventuali voci false/null/undefined dall'array
    // Potrebbe essere ancora utile esplicitare che crypto è esterno per SSR
    ssr: {
      external: ["crypto"]
      // Considera anche noExternal se alcune dipendenze DEVONO essere processate da Vite per SSR
      // noExternal: [ /* ... */ ]
    },
    // Potrebbe essere utile mantenere le condizioni di resolve
    resolve: {
      conditions: ["node", "import", "module", "browser", "default"]
    }
  };
});
export {
  app_config_default as default
};

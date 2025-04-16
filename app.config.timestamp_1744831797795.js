// app.config.ts
import { defineConfig } from "@solidjs/start/config";
import { nodePolyfills } from "vite-plugin-node-polyfills";
var app_config_default = defineConfig(({ command, mode, ssrBuild }) => {
  const isSsrBuild = ssrBuild === true;
  return {
    // Qui potrebbero andare configurazioni specifiche di SolidStart, se necessario
    // es: server: { preset: '...' }
    vite: {
      server: {
        // ATTENZIONE: 'true' permette qualsiasi host.
        // Per produzione, dovresti specificare gli host permessi.
        // Esempio: allowedHosts: ['iltuodominio.com', 'www.iltuodominio.com']
        // Per sviluppo locale va bene, ma non lasciarlo così in produzione.
        allowedHosts: true
      },
      plugins: [
        // Applica il plugin nodePolyfills SOLO se NON è una build SSR (quindi solo per il client)
        !isSsrBuild && nodePolyfills({
          // Configura le opzioni del plugin qui se necessario, ad esempio:
          // protocolImports: true, // Utile se il codice client usa import tipo 'node:buffer'
        })
        // Altri plugin Vite andrebbero qui...
        // NOTA: Il plugin Solid() è generalmente aggiunto automaticamente da SolidStart
        // quando usi il suo defineConfig, quindi non dovresti aver bisogno di aggiungerlo
        // manualmente a meno di configurazioni avanzate.
      ].filter(Boolean),
      // Rimuove eventuali valori 'false' dall'array (quando isSsrBuild è true)
      worker: {
        format: "es"
      },
      optimizeDeps: {
        include: ["simplex-noise"]
      },
      // Aggiungi configurazioni specifiche per SSR per sicurezza
      ssr: {
        // Dice a Vite di non provare a impacchettare i moduli nativi di Node per il server
        // 'crypto' è il più importante per il tuo problema
        external: [
          "crypto"
          /* altri moduli nativi se necessario, es. 'fs', 'path' */
        ]
        // Di solito non serve 'noExternal' a meno che una dipendenza specifica
        // (spesso CommonJS) DEBBA essere processata da Vite per funzionare in SSR.
        // noExternal: [ /* ... */ ]
      },
      // Opzionale ma consigliato: guida la risoluzione dei moduli, dando priorità a 'node'
      resolve: {
        conditions: ["node", "import", "module", "browser", "default"]
      }
    }
    // fine vite: {}
  };
});
export {
  app_config_default as default
};

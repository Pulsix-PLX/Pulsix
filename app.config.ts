
import { defineConfig } from '@solidjs/start/config';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';
export default defineConfig({
  middleware: "src/server/middleware/auth.ts",

  vite: {

    server: {
      allowedHosts: true, // Aggiungi l'host specifico per il test
    },
    plugins: [nodePolyfills()],
    worker: {
      format: 'es',
    },
    optimizeDeps: {
      include: ['simplex-noise'],
    },
    
  },
});


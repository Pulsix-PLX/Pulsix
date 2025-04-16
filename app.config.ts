
import { defineConfig } from '@solidjs/start/config';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  

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


// vite.config.ts o vinxi.config.ts
import { defineConfig } from '@solidjs/start/config';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  
  server: {
    prerender: {
      routes: ['/', '/LoginRegistration'],
      
    },
  },
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


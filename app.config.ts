import { defineConfig } from '@solidjs/start/config';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  middleware: 'src/server/middleware/auth.ts',
  server: {
    preset: 'node',  // Specifica che vuoi usare il server Node.js
    prerender: {
      crawlLinks: true,
      // Puoi anche specificare delle rotte esplicite se necessario
      // routes: ['/', '/about', '/blog/post-1', '/blog/post-2']
    }
  },
  vite: {
    plugins: [
      nodePolyfills(),
    ],
    worker: {
      format: 'es',
    },
    optimizeDeps: {
      include: ['simplex-noise'],
    },
  },
});

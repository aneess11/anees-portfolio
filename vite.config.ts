import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    // Suppress chunk-size warning (we're handling splitting below)
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        manualChunks: {
          // Split heavy libraries into their own lazy-loaded chunks
          'vendor-three': ['three'],
          'vendor-gsap': ['gsap'],
          'vendor-framer': ['framer-motion'],
        },
      },
    },
  },
});

// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  logLevel: 'info',               // ← affiche pré-bundle, HMR, 404, etc.
  plugins: [vue()],

  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },

  optimizeDeps: {
    include: ['vue', 'pinia'],    // force le pré-bundle de base
  },

  server: {
    watch: { usePolling: true, interval: 100 }, // évite les “freeze” FS
    strictPort: false,           // si 3000 pris → passe à 3001, etc.
  },
})

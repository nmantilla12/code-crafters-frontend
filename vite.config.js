// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Silencia las advertencias de deprecación de Sass (@import y legacy-js-api)
        silenceDeprecations: ['import', 'legacy-js-api'],
      },
    },
  },
})
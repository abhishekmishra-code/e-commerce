import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          // safely isolate framer-motion if desired
          if (id.includes('framer-motion')) return 'framer-motion'
          // keep everything else (React, Tailwind, etc.) together
          return 'vendor'
        }
      },
    },
  },
}
})

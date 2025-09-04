import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/gemini': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/gemini/, ''),
        headers: {
          'x-goog-api-key': 'AIzaSyCc7Y4t3OqmDHj849UFcEVruWk0DhuVcro'
        }
      }
    }
  }
})
import { defineConfig } from 'vite'

export default defineConfig({
  // your existing config
  preview: {
    allowedHosts: ['gobasera-frontend.onrender.com'],
    port:  5173,
    host: '0.0.0.0'
  }
})

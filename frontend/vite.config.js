import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/products': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        // optional rewrite here if needed
      },
    },
    historyApiFallback: true,  // <--- Add this line
  }
})

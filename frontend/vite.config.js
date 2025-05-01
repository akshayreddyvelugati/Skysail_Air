// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // Optional: If your backend API doesn't have '/api' in the actual path, rewrite the path
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
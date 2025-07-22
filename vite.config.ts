import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://suitmedia-backend.suitdev.com',
        changeOrigin: true,
        secure: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
      // Proxy untuk storage assets dari backend
      '/storage': {
        target: 'https://suitmedia-backend.suitdev.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/storage/, '/storage'),
      },
      // Proxy untuk assets domain
      '/assets': {
        target: 'https://assets.suitdev.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/assets/, ''),
      },
    },
  },
  plugins: [
  react(),
],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
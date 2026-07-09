import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { projectsPlugin } from './scripts/vite-plugin-projects';

export default defineConfig({
  plugins: [react(), projectsPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  server: {
    port: 5000,
    host: true,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 5000,
    host: true,
  },
});

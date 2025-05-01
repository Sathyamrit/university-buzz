import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Optional: Set the local development port
  },
  build: {
    outDir: 'dist', // Ensure the output directory is set to 'dist'
  },
  define: {
    'process.env': {}, // Ensure compatibility with environment variables
  },
});

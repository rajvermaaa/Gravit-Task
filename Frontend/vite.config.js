import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Required for proper routing on Vercel
  server: {
    port: 5173,
  },
});

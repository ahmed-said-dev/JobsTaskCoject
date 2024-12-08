import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/',
  server: {
    headers: {
      "x-frame-options": "DENY"
    }
  },
  plugins: [react()],
})
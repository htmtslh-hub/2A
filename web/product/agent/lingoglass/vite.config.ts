import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Force WebAssembly build for Rollup to bypass Windows WDAC binary policy
process.env.ROLLUP_FORCE_WASM = 'true';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  }
});

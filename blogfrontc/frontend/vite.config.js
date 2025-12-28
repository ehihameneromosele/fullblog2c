import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // ✅ Good - disables sourcemaps in production
  },
  server: {
    port: 5173,
  },
})
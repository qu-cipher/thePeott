import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    outDir: 'dist',  // Specify output directory
    rollupOptions: {
      output: {
        dir: 'dist'  // Ensure output directory is set
      }
    }
  }
})
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

const here = p => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: here('index.html'),
        samples: here('samples/index.html'),
        unlock: here('unlock/index.html')
      }
    }
  }
})

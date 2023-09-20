import { defineConfig } from 'vite'
import { join } from 'path'
import { rmSync } from 'fs'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron/simple'
rmSync(join(__dirname, 'dist'), { recursive: true, force: true }) // v14.14.0
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    electron({
      main: {
        entry: 'electron/index.cjs',
        vite: {
          build: {
            sourcemap: false,
            outDir: 'dist/electron',
          },
        },
      },
      preload: {
        input: {
          // You can configure multiple preload scripts here
          preload: join(__dirname, 'electron/preload/preload.cjs'),
          preloadMask: join(__dirname, 'electron/preload/preloadMask.cjs'),
        },
        vite: {
          build: {
            sourcemap: false,
            outDir: 'dist/electron/preload',
          },
        },
      },
    })
],
build:{
  outDir: 'dist/renderer',
  assetsDir:'',
},
base:'./'
})

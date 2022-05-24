import { defineConfig } from 'vite'
import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'
import path from 'path';
import react from '@vitejs/plugin-react'

export default defineConfig({
  // ...
  // optimizeDeps: {
  //   esbuildOptions: {
  //     define: {
  //       global: 'globalThis',
  //     },
  //     plugins: [
  //       GlobalsPolyfills({
  //         process: true,
  //         buffer: true,
  //       }),
  //     ],
  //   },
  // },
  plugins: [react()],
  resolve: { alias: { web3: path.resolve(__dirname, './node_modules/web3/dist/web3.min.js') }, }

})
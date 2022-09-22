import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import electron, { onstart } from 'vite-plugin-electron';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      react(),
      // electron({
      //    main: {
      //       entry: 'electron/electron.js',
      //       vite: {
      //          build: {
      //             // For Debug
      //             sourcemap: true,
      //             outDir: 'dist/electron/main',
      //          },
      //          // Will start Electron via VSCode Debug
      //          plugins: [process.env.VSCODE_DEBUG ? onstart() : null],
      //       },
      //    },
      //    preload: {
      //       input: {
      //          // You can configure multiple preload here
      //          index: path.join(__dirname, 'electron/preload.js'),
      //       },
      //       vite: {
      //          build: {
      //             // For Debug
      //             sourcemap: 'inline',
      //             outDir: 'dist/electron/preload',
      //          },
      //       },
      //    },
      //    // Enables use of Node.js API in the Renderer-process
      //    // https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#electron-renderervite-serve
      //    renderer: {},
      // }),
   ],
});

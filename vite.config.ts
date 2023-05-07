/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import eslint from 'vite-plugin-eslint'
import * as path from 'path'
import { plugin, Mode } from 'vite-plugin-markdown'

export default () => {
  return defineConfig({
    plugins: [react(), tsconfigPaths(), eslint(), plugin({ mode: [Mode.REACT] })],
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
    server: {
      watch: {
        usePolling: true,
      },
      proxy: {
        '/api/': {
          target: 'http://localhost:54321/functions/v1/',
          changeOrigin: true,
          rewrite: (_) => _.replace(/^\/api/, ''),
          secure: false,
          ws: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  })
}

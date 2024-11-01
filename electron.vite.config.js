import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [vue()],
    // server: {
    //   proxy: {
    //     '/userInfo': {
    //       target: 'http://127.0.0.1:8999',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/userInfo/, '/userInfo'),
    //     },
    //   },
    // },
  }
})

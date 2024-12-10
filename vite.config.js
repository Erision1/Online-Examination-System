import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(), //导入vite-plugin-vue-devtools
  ],
  // sever: {
  //     mocks:true, //开启mock功能
  // },
  resolve: {
    alias: { 
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

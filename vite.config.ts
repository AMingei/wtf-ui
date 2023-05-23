import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import defineOptions from 'unplugin-vue-define-options/vite'
import markdown from 'vite-plugin-md'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    include: [/\.vue$/, /\.md$/]
  }), defineOptions(), markdown()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  // build: {
  //   lib: {
  //     name: 'wtf-ui',
  //     entry: './src/packages/index',
  //     fileName: (format) => `wtf-ui.${format}.js`
  //   },
  //   rollupOptions: {
  //     external: ['vue'],
  //     output: {
  //       globals: {
  //         vue: 'vue'
  //       }
  //     }
  //   }
  // },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "./src/packages/style/style.less";'
      }
    }
  }
})

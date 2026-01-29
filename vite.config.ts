import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // ✅ 使用 unplugin-dts 替代 vite-plugin-dts
    dts({
      rollupTypes: true,
      insertTypesEntry: true, // ✅ 自动在 package.json 设置 types 字段
      tsconfigPath: './tsconfig.app.json'
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/DataGridView/index.ts'),
      name: 'DataGridViewVue3',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue', '@visactor/vue-vtable', '@visactor/vtable-editors', '@visactor/vtable-plugins', '@visactor/vrender', 'dayjs'],
      output: {
        globals: {
          vue: 'Vue',
          '@visactor/vue-vtable': 'vueVtable',
          '@visactor/vtable-editors': 'vtableEditors',
          '@visactor/vtable-plugins': 'vtablePlugins',
          '@visactor/vrender': 'vrender',
          'dayjs': 'dayjs'
        },
        assetFileNames: 'index.css'
      }
    },
    // 复制类型声明文件
    copyPublicDir: false,
    assetsDir: '',
    outDir: 'dist'
  }
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// 开发和测试页面配置
export default defineConfig({
  plugins: [
    vue()
  ],
  // 开发服务器配置
  server: {
    port: 3000,
    open: true, // 自动打开浏览器
    cors: true
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  }
})

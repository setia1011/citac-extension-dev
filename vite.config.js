import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from "dotenv"
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
        '^/ext_be/api/.*': {
            target: process.env.VITE_APP_BASE_URL_API,
            ws: true,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/ext_be\/api/, '')
        },
        '^/ima/v1/.*': {
            target: process.env.VITE_APP_BASE_URL_API_IMA,
            ws: true,
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/ima\/v1/, '')
        }
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: process.env.NODE_ENV === 'production' ? '/ext/' : '/'
})


// https://stackoverflow.com/questions/71534594/change-vite-proxy-location-automatically-in-dev-vs-prod-builds
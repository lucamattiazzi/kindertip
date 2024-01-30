import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/.netlify/functions": {
        target: 'https://kindertip.netlify.app',
        changeOrigin: true,
      }
    }
  }
})

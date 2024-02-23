
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'


// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['react/jsx-runtime']
  },
  plugins: [react(), svgr()],
  test: {
    global: true,
    environment: 'jsdom',
    setupFiles: './test/setup-test.js',

  }
})

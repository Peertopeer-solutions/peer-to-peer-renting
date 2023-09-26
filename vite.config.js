import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'




// https://vitejs.dev/config/
console.log(process.env.VITE_FIREBASE_API_KEY)
export default defineConfig({
  optimizeDeps: {
    include: ['react/jsx-runtime']},
  plugins: [react(),svgr()],
  
})


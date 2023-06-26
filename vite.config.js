import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),svgr()],
  define: {
    // Pass environment variables to your application
    'process.env': Object.keys(env).reduce((acc, key) => {
      acc[`import.meta.env.${key}`] = JSON.stringify(env[key]);
      return acc;
    }, {}),
  },

})

// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or vue, etc. — whatever you're using
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  base: 'https://github.com/Chestanisberg-Andersonisburgenson/Markdown-Previewer',
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})
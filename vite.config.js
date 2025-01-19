import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows the server to listen on all network interfaces
    port: 3000, // Ensure you use the correct port, default is 3000
  },
})

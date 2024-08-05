import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'https://chats-tau.vercel.app/socket.io',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/socket.io/, '/socket.io')
      }
    }
  }
});

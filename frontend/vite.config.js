import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const cssMimeFixPlugin = () => ({
  name: 'css-mime-fix',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url && (req.url.includes('.css') || req.url.endsWith('.css'))) {
        res.setHeader('Content-Type', 'text/css');
      }
      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cssMimeFixPlugin()
  ],
})

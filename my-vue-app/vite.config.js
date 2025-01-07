import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(), // This is the essential plugin for Vue files
    {
      name: 'vue-custom',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/create-assistant') {
            // Handle custom logic here
          }
          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        // Ensure your app and components are bundled correctly
        manualChunks: {
          // Define chunk splitting strategy if necessary
        },
      },
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  server: {
    fs: {
      strict: false,
    },
  },
});

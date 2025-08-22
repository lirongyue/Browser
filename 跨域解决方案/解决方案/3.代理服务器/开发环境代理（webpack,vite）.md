// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://target-server.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
}
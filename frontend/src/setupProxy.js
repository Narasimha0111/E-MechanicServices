const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000', // Change this to match your Express backend URL
      changeOrigin: true,
    })
  );
};queueMicrotask

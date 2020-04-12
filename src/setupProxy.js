const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/websiteFront', {
      target: 'https://uedapi.zto.com/',
      changeOrigin: true
    })
  )
}
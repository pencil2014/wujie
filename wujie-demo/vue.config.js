const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? "/micro-app/" : "/",
  devServer: {
    proxy: {
      '/wms': {
        target: 'http://wmstest.com',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      },
      '/': {
        target: 'http://lstest.com',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    open: process.env.NODE_ENV === "development",
    port: "8000",
  },
  transpileDependencies: true
})

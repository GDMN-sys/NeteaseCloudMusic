const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true,
    host: 'localhost',
    // proxy:{
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: { "^/api": "" },
    //     ws: true,
    //     changeOrigin: true
    //   },
    // }
  }
})

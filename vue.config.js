const { defineConfig } = require('@vue/cli-service')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // emscripten use require fs path ...
  // webpack 5 use like import('node:fs')
  configureWebpack: (config) => {
    const fb = config.resolve.fallback || {}
    Object.assign(fb, {
      fs: false,
      path: false,
      crypto: false
    })
    config.resolve.fallback = fb

    config.plugins.push(new CopyPlugin({
      patterns: [
        {
          from: 'filament.wasm',
          to: 'filament.wasm',
          context: 'node_modules/filament'
        },
      ],
    }))
  },
  devServer: {
    proxy: {
      '/geoserver': {
        target: 'http://localhost:8077',
        changeOrigin: true
      }
    }
  }
})

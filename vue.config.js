module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080
  }
}

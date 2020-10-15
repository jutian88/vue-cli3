module.exports = {
  lintOnSave: true,
  outputDir: 'build',
  assetsDir: 'static',
  // baseUrl: '/dcdm-admin',
  devServer: {
    open: true,
    // host: 'test.jutian.com',
    port: 8010,
    https: false,
    hotOnly: false,
    // proxy: {
    //   '/dcdm-admin': {
    //     target: 'http://dcdmsit.cnsuning.com:80',
    //     changeOrigin: true
    //   }
    // }
  }
}

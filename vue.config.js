module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [],
      alias: {
        'assets': '@/assets',
        'views': '@/views',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network'
      }
    }
  }
}
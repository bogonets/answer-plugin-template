const {defineConfig} = require('@vue/cli-service');
const publicPath = require('./package.json').publicPath;

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  lintOnSave: false,

  // All resources are requested with relative paths.
  publicPath: process.env.NODE_ENV === 'production' ? publicPath : '/',

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
      enableBridge: false,
    },
  },

  devServer: {
    historyApiFallback: true,
  },
});

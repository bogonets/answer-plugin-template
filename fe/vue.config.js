const {defineConfig} = require('@vue/cli-service');
const publicPath = require('./package.json').publicPath;

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  lintOnSave: false,
  publicPath,
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
    historyApiFallback: {
      rewrites: [
        {
          from: new RegExp(publicPath.replaceAll('/', '\\/') + '.*'),
          to: publicPath + 'index.html',
        },
      ],
    },
  },
});

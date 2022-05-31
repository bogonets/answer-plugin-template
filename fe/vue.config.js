const {defineConfig} = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  lintOnSave: false,

  publicPath: '', // All resources are requested with relative paths.

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
      enableBridge: false,
    },
  },
});

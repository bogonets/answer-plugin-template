import Vue from 'vue';
import App from '@/App.vue';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import router from '@/router';
import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';
import recc from '@/recc';
import '@/store';

Vue.config.productionTip = false;

(async () => {
  if (process.env.NODE_ENV === 'production') {
    console.debug('[recc-plugin] wait init ...');
    await recc.waitInitialized();
  } else {
    console.debug('[recc-plugin] wait debug init ...');
    await recc.debug();
  }
  console.info(`[recc-plugin] init done (${recc.asParamsText()})`);

  i18n.locale = recc.lang;
  vuetify.framework.lang.current = recc.lang;
  vuetify.framework.theme.dark = recc.dark;

  new Vue({
    router,
    vuetify,
    i18n,
    render: h => h(App),
  }).$mount('#app');
})();

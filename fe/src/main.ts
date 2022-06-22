import Vue from 'vue';
import App from '@/App.vue';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import router from '@/router';
import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';
import {globalRecc} from '@/recc/recc';
import '@/recc';
import '@/store';

Vue.config.productionTip = false;

(async () => {
  if (process.env.NODE_ENV === 'production') {
    globalRecc.ready();
    console.debug('[recc] plugin wait init ...');
    await globalRecc.waitInitialized();
  } else {
    console.debug('[recc] plugin debug');
    await globalRecc.debug();
  }

  const g = globalRecc.group;
  const p = globalRecc.project;
  const l = globalRecc.lang;
  const d = globalRecc.dark;
  console.debug(`[recc] init done (group=${g},project=${p},lang=${l},dark=${d})`);

  new Vue({
    router,
    vuetify,
    i18n,
    render: h => h(App),
  }).$mount('#app');
})();

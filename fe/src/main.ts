import Vue from 'vue';
import App from '@/App.vue';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';
import ReccCwcPluginVuePlugin from '@recc/api/dist/reccCwcPluginVuePlugin';

Vue.use(ReccCwcPluginVuePlugin, {
  origin: window.origin,
  onInit: data => {
    console.debug(`ReccCwcPluginVue.onInit(dark=${data.dark},lang=${data.lang})`);
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app');

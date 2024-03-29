import Vue from 'vue';
import App from '@/App.vue';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import router from '@/router';
import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';
import '@/recc';
import '@/store';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app');

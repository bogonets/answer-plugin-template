import Vue from 'vue';
import VueRecc from '@/recc/recc';

Vue.use(VueRecc, {
  origin: window.origin,
  onInit: data => {
    console.debug(`Initialized API / dark=${data.dark}, lang='${data.lang}'`);
  },
});

import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import en from 'vuetify/lib/locale/en';
import ko from 'vuetify/lib/locale/ko';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: {en, ko},
    current: 'en',
  },
});

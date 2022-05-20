import {createLocalVue, shallowMount} from '@vue/test-utils';
import VueRouter from 'vue-router';
import {Store} from 'vuex';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';
import HelloAnswer from '@/components/HelloAnswer.vue';

describe('HelloAnswer.vue', () => {
  const localVue = createLocalVue();

  let router!: VueRouter;
  let store!: Store<object>;
  let vuetify!: Vuetify;
  let i18n!: VueI18n;

  beforeEach(() => {
    router = new VueRouter({});
    store = new Store({});
    vuetify = new Vuetify({});
    i18n = new VueI18n({silentTranslationWarn: true});
  });

  it('title props', () => {
    const title = 'TEST TITLE';
    const helloTitle = `Welcom to ${title}!`;
    const wrapper = shallowMount(HelloAnswer, {
      localVue,
      router,
      store,
      vuetify,
      i18n,
      propsData: {title},
    });

    expect(wrapper.find('.hello-answer').text()).toMatch(helloTitle);
  });
});

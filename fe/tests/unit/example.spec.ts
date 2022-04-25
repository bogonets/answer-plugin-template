import {shallowMount} from '@vue/test-utils';
import HelloAnswer from '@/components/HelloAnswer.vue';

describe('HelloAnswer.vue', () => {
  it('renders props.title when passed', () => {
    const title = 'TEST TITLE';
    const wrapper = shallowMount(HelloAnswer, {
      propsData: {title},
    });
    expect(wrapper.find('.hello-answer').text()).toMatch(`Welcom to ${title}!`);
  });
});

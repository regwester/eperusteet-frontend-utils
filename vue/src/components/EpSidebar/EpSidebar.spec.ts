import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import EpSidebar from './EpSidebar.vue';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import { Kielet } from '../../stores/kieli';
import { delay } from '../../utils/delay';
import { Kaannos } from '../../plugins/kaannos';
import VueI18n from 'vue-i18n';

Vue.use(BootstrapVue);

describe('EpSidebar component', () => {
  const localVue = createLocalVue();
  localVue.use(VueI18n);
  Kielet.install(localVue);
  localVue.use(new Kaannos());

  test('Renders', async () => {
    const wrapper = mount(EpSidebar, {
      localVue,
      propsData: {
      },
      mocks: {
        $t: x => x,
      },
      stubs: {
        fas: '<div />',
        'router-link': RouterLinkStub,
      },
    });

    expect(wrapper.html()).toBeTruthy();
  });
});

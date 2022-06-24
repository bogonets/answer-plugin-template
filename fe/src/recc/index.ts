import Vue from 'vue';
import type {PluginObject} from 'vue/types/plugin';
import type {ReccCwcPluginOptions} from '@recc/api/dist/reccCwcPlugin';
import Recc from '@/recc/recc';

const recc = new Recc();

class ReccPlugin implements PluginObject<ReccCwcPluginOptions>
{
  static installed = false;

  install(vue: typeof Vue) {
    if (ReccPlugin.installed) {
      console.warn('Already installed recc plugin');
      return;
    }

    ReccPlugin.installed = true;
    vue.prototype.$recc = recc;
  }
}

Vue.use(new ReccPlugin());

export default recc;

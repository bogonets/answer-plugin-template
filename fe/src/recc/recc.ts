import VueInterface from 'vue';
import type {PluginObject} from 'vue/types/plugin';
import type {ReccCwcPluginOptions} from '@recc/api/dist/reccCwcPlugin';
import {ReccCwcPlugin} from '@recc/api/dist/reccCwcPlugin';

export default class Recc
  extends ReccCwcPlugin
  implements PluginObject<ReccCwcPluginOptions>
{
  constructor(options?: ReccCwcPluginOptions) {
    super(window, options ?? {origin: window.origin});
  }

  private static installed = false;

  install(Vue: typeof VueInterface) {
    if (Recc.installed) {
      console.warn('Already installed Recc plugin');
      return;
    }

    Recc.installed = true;
    Vue.prototype.$recc = this;
  }

  // TODO: More APIs
}

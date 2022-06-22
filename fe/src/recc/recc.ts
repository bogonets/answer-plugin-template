import VueInterface from 'vue';
import {PluginObject} from 'vue/types/plugin';
import {ReccCwcPlugin} from '@recc/api/dist/reccCwcPlugin';
import type {ReccCwcPluginOptions} from '@recc/api/dist/reccCwcPlugin';

export class Recc extends ReccCwcPlugin {
  constructor(options?: ReccCwcPluginOptions) {
    super(window, options);
  }

  // TODO: More APIs
}

export const globalRecc = new Recc({origin: window.origin});

export class ReccVuePluginObject implements PluginObject<ReccCwcPluginOptions> {
  install(Vue: typeof VueInterface) {
    Vue.prototype.$recc = globalRecc;
  }
}

const VueRecc = new ReccVuePluginObject();
export default VueRecc;

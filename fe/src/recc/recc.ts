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

export class ReccVuePluginObject implements PluginObject<ReccCwcPluginOptions> {
  install(Vue: typeof VueInterface, options?: ReccCwcPluginOptions) {
    Vue.prototype.$recc = new Recc(options);
    Vue.prototype.$recc.runDebuggingMode();
  }
}

const VueRecc = new ReccVuePluginObject();
export default VueRecc;

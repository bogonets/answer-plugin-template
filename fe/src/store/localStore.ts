import VueInterface from 'vue';
import {PluginObject} from 'vue/types/plugin';
import {StoreBase} from '@/store/storeBase';
import {StoreOptions} from '@/store/storeOptions';
import appearance from '@/store/modules/appearance';

const modules = {
  appearance,
  // TODO: More modules
};

const APPEARANCE_NAVI = 'appearance/navi';

export class LocalStore extends StoreBase {
  constructor(options?: StoreOptions) {
    super(window.localStorage, modules, options);
  }

  get navi() {
    return this.getter(APPEARANCE_NAVI) as boolean;
  }

  set navi(val: boolean) {
    this.setter(APPEARANCE_NAVI, val);
  }

  // TODO: More APIs
}

class LocalStoreVuePluginObject implements PluginObject<StoreOptions> {
  install(Vue: typeof VueInterface, options?: StoreOptions): void {
    Vue.prototype.$localStore = new LocalStore(options);
  }
}

const VueLocalStore = new LocalStoreVuePluginObject();
export default VueLocalStore;

import VueInterface from 'vue';
import {PluginObject} from 'vue/types/plugin';
import {StoreBase} from '@/store/storeBase';
import {StoreOptions} from '@/store/storeOptions';
import session from '@/store/modules/session';
import dev from '@/store/modules/dev';

const modules = {
  session,
  dev,
  // TODO: More modules
};

const SESSION_INIT = 'session/init';
const DEV_SIGNIN = 'dev/signin';

export class SessionStore extends StoreBase {
  constructor(options?: StoreOptions) {
    super(window.sessionStorage, modules, options);
  }

  get init() {
    return this.getter(SESSION_INIT) as boolean;
  }

  set init(val: boolean) {
    this.setter(SESSION_INIT, val);
  }

  get devSignin() {
    return this.getter(DEV_SIGNIN) as object;
  }

  set devSignin(val: object) {
    this.setter(DEV_SIGNIN, val);
  }

  // TODO: More APIs
}

class SessionStoreVuePluginObject implements PluginObject<StoreOptions> {
  install(Vue: typeof VueInterface, options?: StoreOptions): void {
    Vue.prototype.$sessionStore = new SessionStore(options);
  }
}

const VueSessionStore = new SessionStoreVuePluginObject();
export default VueSessionStore;

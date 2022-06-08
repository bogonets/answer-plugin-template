import {Store, CommitOptions, ModuleTree} from 'vuex';
import VuexPersist from 'vuex-persist';
import {DEFAULT_STRICT, DEFAULT_PERSIST_KEY, StoreOptions} from '@/store/storeOptions';

export class StoreBase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  persist: VuexPersist<any>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store: Store<any>;

  defaultCommitOptions: CommitOptions;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(storage: Storage, modules: ModuleTree<any>, options?: StoreOptions) {
    const key = options?.key || DEFAULT_PERSIST_KEY;
    const strict = options?.strict || DEFAULT_STRICT;

    this.persist = new VuexPersist({key, storage});
    this.store = new Store({modules, strict, plugins: [this.persist.plugin]});
    this.defaultCommitOptions = {root: false} as CommitOptions;
  }

  getter(key: string) {
    return this.store.getters[key];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setter(key: string, val: any) {
    return this.store.commit(key, val, this.defaultCommitOptions);
  }

  clear(key: string) {
    return this.setter(key, undefined);
  }
}

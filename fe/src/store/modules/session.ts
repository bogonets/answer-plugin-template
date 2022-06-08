export default {
  namespaced: true,
  state: {
    init: false,
  },
  getters: {
    init: state => {
      return !!state.init;
    },
  },
  mutations: {
    init(state, val) {
      state.init = val;
    },
  },
};

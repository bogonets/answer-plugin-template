export default {
  namespaced: true,
  state: {
    navi: false,
  },
  getters: {
    navi: state => {
      return state.navi;
    },
  },
  mutations: {
    navi(state, val) {
      state.navi = val;
    },
  },
};

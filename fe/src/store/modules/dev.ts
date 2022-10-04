export default {
  namespaced: true,
  state: {
    signin: {
      origin: 'http://localhost:20000',
      username: 'admin',
      password: '0000',
      dark: 0,
      lang: 'ko',
      timezone: 'Asia/Seoul',
    },
  },
  getters: {
    signin: state => {
      return state.signin;
    },
  },
  mutations: {
    signin(state, val) {
      state.signin = val;
    },
  },
};

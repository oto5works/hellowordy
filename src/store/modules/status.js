/*-- status.js --*/
export default {
    namespaced: true,
    // State
    state: {
        isLoading: false,
        welcomeText: false,
    },
    // Mutations
    mutations: {
      setLoading(state, isLoading) {
        state.isLoading = isLoading;
        state.welcomeText = false;
      },
      setWelcomeText(state, welcomeText) {
        state.welcomeText = welcomeText;
      },
    },
    // Actions
    actions: {
      // 로딩 시작
      startLoading({ commit }) {
        commit('setLoading', true);
      },
      // 로딩 종료
      stopLoading({ commit }) {
        commit('setLoading', false);
      },
      updateWelcomeText({ commit }, welcomeText) {
        commit('setWelcomeText', welcomeText);
      },
    },
    // Getters
    getters: {
      isLoading(state) {
        return state.isLoading;
      },
      welcomeText(state) {
        return state.welcomeText;
      },
    },
  };
/*-- status.js --*/
export default {
    namespaced: true,
    // State
    state: {
        isLoading: false,
    },
    // Mutations
    mutations: {
      setLoading(state, isLoading) {
        state.isLoading = isLoading;
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
    },
    // Getters
    getters: {
      isLoading(state) {
        return state.isLoading;
      },
    },
  };
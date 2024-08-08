/*-- status.js --*/
export default {
  namespaced: true,
  // State
  state: {
    isLoading: false,
    welcomeText: false,
    isTranslating: false, // 번역 중 여부 상태
    translationComplete: false, // 번역 완료 여부 상태
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
    SET_IS_TRANSLATING(state, isTranslating) {
      state.isTranslating = isTranslating;
    },
    SET_TRANSLATION_COMPLETE(state, isComplete) {
      state.translationComplete = isComplete;
    },
  },
  // Actions
  actions: {
    // 로딩 시작
    startLoading({ commit }) {
      commit("setLoading", true);
    },
    // 로딩 종료
    stopLoading({ commit }) {
      commit("setLoading", false);
    },
    updateWelcomeText({ commit }, welcomeText) {
      commit("setWelcomeText", welcomeText);
    },
    updateIsTranslating({ commit }, payload) {
      commit('SET_IS_TRANSLATING', payload.isTranslating);
    },
    updateTranslationComplete({ commit }, payload) {
      commit("SET_TRANSLATION_COMPLETE", payload.isComplete);
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
    isTranslating(state) {
      return state.isTranslating;
    },
    translationComplete(state) {
      return state.translationComplete;
    },
  },
};

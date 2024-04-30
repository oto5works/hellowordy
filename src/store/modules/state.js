
export default {
  namespaced: true,
  state: {
    initialized: false,
    showRuby: false,
    showMean: false,
    alwaysRuby: false,
    alwaysMean: false,
    selectWords: false,
  },
  mutations: {
    setInitialized(state, value) {
      state.initialized = value;
    },
    setShowRuby(state) {
        state.showRuby = !state.showRuby;
    },
    setShowMean(state) {
      state.showMean = !state.showMean;
    },
    setReset(state) {
      state.showRuby = false;
      state.showMean = false;
    },
    setSelectWords(state) {
      state.selectWords = !state.selectWords;
  },
  },
  actions: {
    async initialize({ state, commit }) {
      // 이미 초기화가 되어 있다면, 아무것도 하지 않음
      if (state.initialized) {
        console.log("이미 Kuroshiro가 초기화되었습니다.");
        return;
      }
    
      console.log("Kuroshiro 초기화 중...");
      try {
        await initializeKuroshiro();
        console.log("Kuroshiro 초기화 성공.");
        commit("setInitialized", true); // 초기화 성공 시
      } catch (error) {
        console.error("초기화 중 오류 발생:", error);
        commit("setInitialized", false); // 초기화 실패 시
        throw error;
      }
    },
    setShowRuby({ commit }) {
      commit("setShowRuby");
    },
    setShowMean({ commit }) {
      commit("setShowMean");
    },
    setReset({ commit }) {
      commit("setReset");
    },
    setSelectWords({ commit }) {
      commit("setSelectWords");
    },
  },
  getters: {
    getInitialized: (state) => state.initialized,
    getSelectWords: (state) => state.selectWords,
    getShowRuby: (state) => state.showRuby,
    getShowMean: (state) => state.showMean,


    

  },
};

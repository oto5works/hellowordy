export default {
  namespaced: true,
  state: {
    initialized: false,
    showRuby: false,
    showMean: false,
    alwaysRuby: false,
    alwaysMean: false,
    selectWords: false,
    searchWords: false,
    searchWord: 'がいぶ',
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
    
    setSearchWords(state) {
      state.searchWords = !state.searchWords;
    },
    setSearchWord(state, word) {
      // state의 searchWord를 업데이트
      state.searchWord = word;
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
    setSearchWords({ commit }) {
      commit("setSearchWords");
    },
    setSearchWord({ commit }, word) {
      // 여기서는 단순히 mutation을 commit합니다.
      commit('setSearchWord', word);
    }
  },
  getters: {
    getInitialized: (state) => state.initialized,
    getSelectWords: (state) => state.selectWords,
    getSearchWords: (state) => state.searchWords,
    getSearchWord: (state) => state.searchWord,

    getShowRuby: (state) => state.showRuby,
    getShowMean: (state) => state.showMean,
  },
};

/*-- filter.js --*/
export default {
  namespaced: true,
  state: {
    showFilter: false,
    filteredWords: [],
    partSize: 10,
  },
  mutations: {
    setFilteredWords(state, payload) {
      console.log("@MUTATIONS: setFilteredWords");
      state.filteredWords = payload;
    },
    setShowFilter(state) {
      state.showFilter = !state.showFilter;
    },
    setPartSize(state, payload) {
      console.log("@MUTATIONS: setFilteredWords");
      state.partSize = payload;
    },
  },
  actions: {
    fetchFilterWords({ commit, rootGetters, state }) {
      console.log("@ACTIONS: fetchFilterWords");
      const partSize = state.partSize; // 전체 단어 목록을 가져옵니다.

      const words = rootGetters["words/getWords"]; // 전체 단어 목록을 가져옵니다.
      let filteredWords = []; // 파트별 단어들을 담을 2차원 배열을 초기화합니다.

      // 단어들을 50개씩 나누어 filteredWords에 추가합니다.
      for (let part = 0; part < Math.ceil(words.length / partSize); part++) {
        const startIndex = part * partSize;
        const endIndex = startIndex + partSize;
        const partWords = words.slice(startIndex, endIndex);
        filteredWords.push(partWords); // 해당 파트의 단어들을 filteredWords에 추가합니다.
      }

      commit("setFilteredWords", filteredWords); // 최종적으로 필터링된 단어들을 상태에 저장합니다.
    },
    setShowFilter({ commit }) {
      console.log("@ACTIONS: setShowFilter!");
      commit("setShowFilter");
    },
    async setPartSize({ commit, state }, index) {
      try {
        console.log("@ACTIONS: setPartSize!");
        const newIndex = index;
        await commit("setPartSize", newIndex);
      } catch (error) {
        console.error(`An error occurred while setting the index: ${error}`);
        // Additional error handling logic can be added here.
      }
    },
  },
  getters: {
    getFilteredWords: (state) => state.filteredWords,
    getShowFilter: (state) => state.showFilter,
    getPartSize: (state) => state.partSize,

  },
};

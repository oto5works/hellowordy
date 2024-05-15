/*-- filter.js --*/
export default {
  namespaced: true,
  state: {
    showFilter: false,
    filteredWords: [],
    partSize: 50,
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
      const partSize = state.partSize;
      // 단어를 가져오고 createdAt으로 오름차순 정렬
      const words = rootGetters["words/getWords"].sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
      let filteredWords = [];

      for (let part = 0; part < Math.ceil(words.length / partSize); part++) {
        const startIndex = part * partSize;
        const endIndex = startIndex + partSize;
        const partWords = words.slice(startIndex, endIndex);
        filteredWords.push(partWords);
      }

      commit("setFilteredWords", filteredWords);
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

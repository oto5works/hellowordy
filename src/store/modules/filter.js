/*-- filter.js --*/
export default {
  namespaced: true,
  state: {
    showFilter: false,
    words: [],
    filteredWords: [],
    partSize: 50,
  },
  mutations: {
    setWords(state, payload) {
      state.words = payload;
    },
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
    // 완료
    async fetchFilterWordsByPayload({ commit, dispatch, state }, vocaID) {
      console.log ('보낸다...', vocaID)
      try {
        const words = await dispatch("words/returnWordsByPayload", vocaID, { root: true })
    
        // words가 비어있거나 undefined이면 함수 실행 중지
        if (!words || words.length === 0) {
          console.error("No words found for the provided vocaID:", vocaID);
          commit("setFilteredWords", []);
        }
    
        const sortWords = words.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)
    
        const partSize = state.partSize;
        let filteredWords = [];
    
        for (let part = 0; part < Math.ceil(sortWords.length / partSize); part++) {
          const startIndex = part * partSize;
          const endIndex = startIndex + partSize;
          const partWords = sortWords.slice(startIndex, endIndex);
          filteredWords.push(partWords);
        }
        commit("setFilteredWords", filteredWords);
      } catch (error) {
        console.error("fetchFilterWordsByPayload:", error);
        throw error;
      }
    },
    
    

    

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

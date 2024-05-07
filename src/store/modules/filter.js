/*-- filter.js --*/
export default {
  namespaced: true,
  state: {
    showFilter: false,
    filteredWords: [],
    part: null,
  },
  mutations: {
    setFilteredWords(state, words) {
      console.log ('@MUTATIONS: setFilteredWords')
      state.filteredWords = words;
    },
    setPart(state, value) {
      console.log ('@MUTATIONS: setPart', value)
      state.part = value;
    },
    setShowFilter(state) {
      state.showFilter = !state.showFilter;
    },
  },
  actions: {
    fetchFilterWords({ commit, rootGetters, dispatch, state }) {
      console.log ('@ACTIONS: fetchFilterWords')

      const words = rootGetters["words/getWords"];
      const part = state.part; // words 모듈의 현재 part 값을 가져옵니다.
      const startIndex = (part - 1) * 50;
      const endIndex = part * 50;
      const filteredWords = words.slice(startIndex, endIndex);
      commit("setFilteredWords", filteredWords); // 필터링된 단어들을 상태에 저장합니다.
    },
    setPart({ commit, dispatch }, value) {
      console.log('@ACTIONS: setPart', value);
      commit("setPart", value); // Commit that value using the mutation
    },
    setShowFilter({ commit }) {
      console.log("@ACTIONS: setShowFilter!");
      commit("setShowFilter");
    },
  },
  getters: {
    getFilteredWords: (state) => state.filteredWords,
    getPart: (state) => state.part,
    getShowFilter: (state) => state.showFilter,
  },
};

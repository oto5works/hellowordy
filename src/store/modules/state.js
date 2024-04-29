/*-- state.js --*/
// Kuroshiro 인스턴스를 모듈 수준에서 정의한다.
const kuroshiro = new Kuroshiro.default();

// 초기화 메서드를 정의한다.
async function initializeKuroshiro() {
  try {
    console.log("hello world!");
    await kuroshiro.init(
      new KuromojiAnalyzer({
        dictPath: "https://oto5works.github.io/ankitoki/dict", // 사전 파일 위치 지정
        //   dictPath: "https://oto5works.github.io/ankitoki/dict"
        // build 할떄는 이것으로 바꾸기   dictPath: "/ankitoki/dict"
      })
    );
  } catch (error) {
    console.error("Error occurred during Kuroshiro initialization:", error);
    throw error;
  }
}
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

/*-- filter.js --*/
const kuroshiro = new Kuroshiro.default();

// 초기화 메서드를 정의한다.
async function initializeKuroshiro() {
  try {
    console.log("hello world!");
    await kuroshiro.init(
      new KuromojiAnalyzer({
        dictPath:
          "https://firebasestorage.googleapis.com/v0/b/ankitoki.appspot.com/o/dict", // 사전 파일 위치 지정
        //   dictPath: "https://oto5works.github.io/ankitoki/dict"
        //  dictPath: "/ankitoki/dict"
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

    filteredWords: [],
    index: null,
    word: null,
    mean: null,
    examples: null,
  },
  mutations: {
    setInitialized(state, value) {
      state.initialized = value;
    },
    setFilteredWords(state, words) {
      state.filteredWords = words;
    },
    setConvertedText(state, { word, mean }) {
      state.mean = mean;
      state.word = word;
    },
    setExamples(state, examples) {
      state.examples = examples;
    },
    setIndex(state, newIndex) {
      state.index = newIndex;
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
    filterWords({ commit, rootState }) {
      const part = rootState.words.part; // words 모듈의 현재 part 값을 가져옵니다.
      const allWords = rootState.words.words; // words 모듈의 전체 단어 목록을 가져옵니다.
      const startIndex = (part - 1) * 10;
      const endIndex = part * 10;
      const filteredWords = allWords.slice(startIndex, endIndex);
      commit("setFilteredWords", filteredWords); // 필터링된 단어들을 상태에 저장합니다.
    },

    async convertToRuby({ commit, state }, { newIndex }) {
      console.log("convertToRuby");
      try {
        // state.words에서 현재 인덱스에 해당하는 단어를 가져옵니다.
        const currentWord = state.filteredWords[newIndex]?.word;
        const currentMean = state.filteredWords[newIndex]?.mean;

        // 가져온 단어가 유효한 경우에만 변환 작업을 수행합니다.
        if (currentWord) {
          // 이미 초기화된 Kuroshiro 인스턴스를 사용하여 변환 작업을 수행합니다.
          const result = await kuroshiro.convert(currentWord, {
            mode: "furigana",
            to: "hiragana",
          });
          commit("setConvertedText", {
            word: result,
            mean: currentMean,
          });
        } else {
          console.warn("현재 인덱스에 해당하는 단어가 없습니다.");
        }
      } catch (error) {
        commit("setConvertedText", error.message || "에러가 발생했습니다.");
        console.error("Error:", error);
      }
    },
    async convertExamples({ commit, state }, { newIndex }) {
      console.log("convert Example Sentence");
      try {
        // 'words' 배열에서 현재 인덱스에 해당하는 단어의 예제들을 가져옵니다.
        const currentExamples = state.filteredWords[newIndex]?.examples;

        // 가져온 예제 배열이 유효한 경우에만 변환 작업을 수행합니다.
        if (currentExamples && Array.isArray(currentExamples)) {
          // 예제 배열의 각 항목에 대해 변환 작업을 비동기적으로 수행합니다.
          const convertedExamples = await Promise.all(
            currentExamples.map(async (example) => {
              if (example.sentence) {
                // Kuroshiro를 사용하여 'sentence' 데이터를 변환합니다.
                const result = await kuroshiro.convert(example.sentence, {
                  mode: "furigana",
                  to: "hiragana",
                });

                // 변환된 일본어 예제와 기존의 한국어 번역을 반환합니다.
                return {
                  sentence: result, // 변환된 일본어
                  translation: example.translation, // 기존의 한국어 번역
                };
              }
              return example; // 'sentence' 데이터가 없는 경우, 원본 예제를 반환합니다.
            })
          );
          // 변환된 예제들을 'state.examples'에 저장합니다.
          commit("setExamples", convertedExamples);
        } else {
          console.warn(
            "현재 인덱스에 해당하는 예제가 없거나, 예제 형식이 배열이 아닙니다."
          );
        }
      } catch (error) {
        console.error("Error:", error);
        // 에러 발생 시, 에러 메시지를 'state.examples'에 저장합니다.
        commit("setExamples", []);
        // 선택적으로 추가적인 에러 핸들링을 수행할 수 있습니다.
      }
    },
    setConvertedText({ commit }, text) {
      commit("setConvertedText", text);
    },
    setNext({ commit, state }) {
      const newIndex = state.index + 1;
      if (newIndex < state.filteredWords.length) {
        commit("setIndex", newIndex);
      } else {
        // Handle when reaching the end of the word list (optional)
        console.warn("Reached the end of the word list.");
      }
    },
    setPrevious({ commit, state }) {
      const newIndex = state.index - 1;
      if (newIndex >= 0) {
        commit("setIndex", newIndex);
      } else {
        // Handle when reaching the beginning of the word list (optional)
        console.warn("Reached the beginning of the word list.");
      }
    },
    setRandom({ commit, state }) {
      const newIndex = Math.floor(Math.random() * state.filteredWords.length);
      commit("setIndex", newIndex);
    },
    setIndex({ commit, dispatch }, newIndex) {
      commit("setIndex", newIndex);
      dispatch("convertToRuby", { newIndex });
      dispatch("convertExamples", { newIndex });
      dispatch("setReset");
    },
    setReset({ dispatch }) {
      dispatch("state/setReset", null, { root: true });
    },
  },
  getters: {
    getFilteredWords: (state) => state.filteredWords,
    getIndex: (state) => state.index,
    getWord: (state) => state.word,
    getMean: (state) => state.mean,
    getExamples: (state) => state.examples,
  },
};

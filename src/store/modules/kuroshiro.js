/*-- kuroshiro.js --*/
const kuroshiro = new Kuroshiro.default();

const dictPath = import.meta.env.VITE_DICT_PATH;

// 초기화 메서드를 정의한다.
async function initializeKuroshiro() {
  try {
    console.log("hello world!");
    await kuroshiro.init(
      new KuromojiAnalyzer({
        dictPath: dictPath, // 사전 파일 위치 지정
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
  },
  mutations: {
    setInitialized(state, value) {
      state.initialized = value;
    },
  },
  actions: {
    async initializeKuroshiro({ state, commit }) {
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
    async convertToRuby({ commit, state }, currentWord) {
      console.log('@ACTIONS: convertToRuby!', currentWord);
      try {
        // 가져온 단어가 유효한 경우에만 변환 작업을 수행합니다.
        if (currentWord) {
          // 이미 초기화된 Kuroshiro 인스턴스를 사용하여 변환 작업을 수행합니다.
          const result = await kuroshiro.convert(currentWord, {
            mode: "furigana",
            to: "hiragana",
          });
          return result
        } else {
          console.warn("현재 인덱스에 해당하는 단어가 없습니다.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async convertExamples({ commit, state }) {
      console.log("convert Example Sentence");
      try {
        // 'words' 배열에서 현재 인덱스에 해당하는 단어의 예제들을 가져옵니다.
        const currentExamples = state.filteredWords[state.index]?.examples;

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
  },
  getters: {
    getInitialized: (state) => state.initialized,
  },
};



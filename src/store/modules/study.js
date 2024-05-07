/*-- filter.js --*/
export default {
  namespaced: true,
  state: {
    currentIndex: null,
    lastIndex: null,
    word: null,
    mean: null,
    examples: [],
    showRuby: false,
    showMean: false,
    alwaysRuby: false,
    alwaysMean: false,
  },
  mutations: {
    setCurrentIndex(state, index) {
      console.log("@MUTATIONS: setCurrentIndex", index);
      state.currentIndex = index;
    },
    setLastIndex(state, index) {
      console.log("@MUTATIONS: setLastIndex", index);
      state.lastIndex = index; // 마지막 인덱스 설정
    },
    setWord(state, payload) {
      state.word = payload;
    },
    setMean(state, payload) {
      state.mean = payload;
    },
    setExamples(state, payload) {
      state.examples = payload;
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
  },
  actions: {
    async setWord({ commit, rootGetters, dispatch, state }) {
      try {
        console.log("@ACTIONS: setWord!");
        const filteredWords = rootGetters["filter/getFilteredWords"];
        const currentWord = filteredWords[state.currentIndex]?.word;
        // 현재 단어가 없는 경우, 추가적인 처리나 경고를 할 수 있습니다.
        if (!currentWord) {
          console.warn("Current word is undefined.");
          return; // 현재 단어가 없으면 함수 실행을 중단합니다.
        }
        const convertToRuby = await dispatch(
          "kuroshiro/convertToRuby",
          currentWord,
          { root: true }
        );
        commit("setWord", convertToRuby); // 변환된 단어를 상태에 저장합니다.
      } catch (error) {
        console.error("An error occurred in setWord:", error);
        // 에러 발생 시, 사용자에게 알리는 등의 추가적인 처리를 할 수 있습니다.
      }
    },

    setMean({ commit, rootGetters, state }) {
      try {
        console.log("@ACTIONS: setMean");
        const filteredWords = rootGetters["filter/getFilteredWords"];
        const currentMean = filteredWords[state.currentIndex]?.mean;
        commit("setMean", currentMean); // Commit that value using the mutation
      } catch (error) {
        console.error("An error occurred in setWord:", error);
        // 에러 발생 시, 사용자에게 알리는 등의 추가적인 처리를 할 수 있습니다.
      }
    },

    async setExamples({ commit, rootGetters, state, dispatch }) {
      try {
        console.log("@ACTIONS: setExamples!");
        const filteredWords = rootGetters["filter/getFilteredWords"];
        const currentExamples = filteredWords[state.currentIndex]?.examples;

        if (!currentExamples) {
          console.log("No current examples to convert.");
          return;
        }

        const convertedExamples = await Promise.all(
          currentExamples.map(async (example) => {
            // 'sentence'를 Ruby 문자로 변환합니다. 'kuroshiro/convertToRuby'는 가정된 함수입니다.
            const convertToRuby = await dispatch(
              "kuroshiro/convertToRuby",
              example.sentence,
              { root: true }
            );
            // 'translation'은 변환되지 않고 그대로 유지합니다.
            return { ...example, sentence: convertToRuby }; // 변환된 'sentence'와 변환되지 않은 'translation'을 포함하는 새 객체를 반환합니다.
          })
        );

        // 변환된 데이터를 상태에 저장하기 위해 뮤테이션을 커밋합니다.
        commit("setExamples", convertedExamples);
      } catch (error) {
        console.error("Error converting current examples to Ruby:", error);
        // 에러 처리 로직
      }
    },

    setPart({ commit, dispatch }, value) {
      console.log("@ACTIONS: setPart", value);
      commit("setPart", value); // Commit that value using the mutation
    },

    async configureWord({ commit, rootGetters, dispatch, state }) {
      try {
        console.log("@ACTIONS: configureWord!");
        commit("setReset");
        dispatch("study/setWord", null, { root: true });
        dispatch("study/setMean", null, { root: true });
        dispatch("study/setExamples", null, { root: true });
      } catch (error) {
        // Error handling logic
        console.error(`Error occurred during initializeStudy: ${error}`);
        // Here you can add more actions for handling the error, such as notifying the user.
      }
    },

    async initializeStudy({ commit, dispatch }) {
      try {
        console.log("@ACTIONS: initializeStudy!");
        commit("setReset");
        await dispatch("filter/fetchFilterWords", null, { root: true });
        commit("setCurrentIndex", 0);
        dispatch("study/setLastIndex", null, { root: true });
        dispatch("study/configureWord", null, { root: true });
      } catch (error) {
        // Error handling logic
        console.error(`Error occurred during initializeStudy: ${error}`);
        // Here you can add more actions for handling the error, such as notifying the user.
      }
    },

    async setNext({ commit, dispatch, state, rootGetters }) {
      try {
        const filteredWords = rootGetters["filter/getFilteredWords"];
        const newIndex = state.currentIndex + 1;
        if (newIndex < filteredWords.length) {
          await commit("setCurrentIndex", newIndex);
          dispatch("study/configureWord", null, { root: true });
        } else {
          // 필터링된 단어 목록의 끝에 도달했을 때의 처리 방법 (선택적)
          console.warn("Reached the end of the word list.");
        }
      } catch (error) {
        // 오류 처리 로직
        console.error(`Error occurred in setNext: ${error}`);
        // 여기서 사용자에게 오류를 알리는 등의 추가적인 처리를 할 수 있습니다.
      }
    },
    async setPrevious({ commit, dispatch, state }) {
      try {
        const newIndex = state.currentIndex - 1;
        if (newIndex >= 0) {
          await commit("setCurrentIndex", newIndex);
          await dispatch("study/configureWord", null, { root: true });
        } else {
          // 단어 리스트의 처음에 도달했을 때 처리 (선택적)
          console.warn("Reached the beginning of the word list.");
          // 사용자에게 단어 리스트의 처음에 도달했음을 알리는 로직 추가 가능
        }
      } catch (error) {
        // 예외 처리 로직
        console.error(`Error occurred in setPrevious: ${error}`);
        // 사용자에게 오류 발생을 알리는 로직 추가 가능
      }
    },
    async setRandom({ commit, dispatch, state, rootGetters }) {
      try {
        console.log("@ACTIONS: setRandom!");
        const filteredWords = rootGetters["filter/getFilteredWords"];
        if (filteredWords.length === 0)
          throw new Error("필터된 단어가 없습니다.");
        const newIndex = Math.floor(Math.random() * filteredWords.length);
        await commit("setCurrentIndex", newIndex);
        await dispatch("study/configureWord", null, { root: true });
      } catch (error) {
        console.error(`setRandom에서 오류 발생: ${error}`);
        // 오류 처리 로직 (예: 사용자에게 알림 등)
      }
    },
    async setIndex({ commit, state }, index) {
      try {
        console.log("@ACTIONS: setIndex!");
        const newIndex = index;
        if (newIndex < state.lastIndex) {
          await commit("setCurrentIndex", newIndex);
          await dispatch("study/configureWord", null, { root: true });
        } else {
          // Handle when reaching the end of the word list (optional)
          console.warn("Reached the end of the word list.");
        }
      } catch (error) {
        console.error(`An error occurred while setting the index: ${error}`);
        // Additional error handling logic can be added here.
      }
    },
    setLastIndex({ commit, dispatch, state, rootGetters }) {
      console.log("@ACTIONS: setLastIndex");
      const filteredWords = rootGetters["filter/getFilteredWords"];
      const lastIndex = filteredWords.length;
      if (lastIndex) {
        commit("setLastIndex", lastIndex);
      } else {
        // Handle when reaching the end of the word list (optional)
        console.warn("Reached the end of the word list.");
      }
    },
    setShowRuby({ commit }) {
      console.log("@ACTIONS: setShowRuby!");
      commit("setShowRuby");
    },
    setShowMean({ commit }) {
      console.log("@ACTIONS: setShowMean!");
      commit("setShowMean");
    },
  },
  getters: {
    getFilteredWords: (state) => state.filteredWords,
    getCurrentIndex: (state) => state.currentIndex,
    getLastIndex: (state) => state.lastIndex,
    getWord: (state) => state.word,
    getMean: (state) => state.mean,
    getExamples: (state) => state.examples,
    getShowRuby: (state) => state.showRuby,
    getShowMean: (state) => state.showMean,
  },
};

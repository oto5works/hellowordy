/*-- filter.js --*/
export default {
  namespaced: true,
  state: {
    wordID: null,
    currentWord: null,
    currentIndex: -1,
    lastIndex: 100,
    word: null,
    mean: null,
    part: null,
    examples: [],
    showRuby: false,
    showMean: false,
    alwaysRuby: false,
    alwaysMean: false,
    showDict: false,
    viewChecked: false,
  },
  mutations: {
    setWordID(state, payload) {
      state.wordID = payload;
    },
    setCurrentWord(state, payload) {
      state.currentWord = payload;
    },
    setCurrentIndex(state, payload) {
      console.log("@MUTATIONS: setCurrentIndex", payload);
      state.currentIndex = payload;
    },
    setLastIndex(state, payload) {
      console.log("@MUTATIONS: setLastIndex", payload);
      state.lastIndex = payload; // 마지막 인덱스 설정
    },
    setPart(state, payload) {
      console.log("@MUTATIONS: setPart", payload);
      state.part = payload;
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
    setAlwaysRuby(state) {
      state.alwaysRuby = !state.alwaysRuby;
    },
    setAlwaysMean(state) {
      state.alwaysMean = !state.alwaysMean;
    },
    setShowDict(state) {
      state.showDict = !state.showDict;
    },
    setReset(state) {
      state.showRuby = false;
      state.showMean = false;
    },
  },
  actions: {
    async initializeStudy({ commit, dispatch }) {
      try {
        console.log("@ACTIONS: initializeStudy!");
        commit("setReset");
        await dispatch("filter/fetchFilterWords", null, { root: true });
        await commit("setCurrentIndex", -1);
        await dispatch("study/setLastIndex", null, { root: true });
        await dispatch("study/setNext", null, { root: true });
        dispatch("study/configureWord", null, { root: true });
      } catch (error) {
        // Error handling logic
        console.error(`Error occurred during initializeStudy: ${error}`);
        // Here you can add more actions for handling the error, such as notifying the user.
      }
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
    async setWord({ commit, rootGetters, dispatch, state }) {
      try {
        console.log("@ACTIONS: setWord!");
        const filteredWords = rootGetters["filter/getFilteredWords"];
        const currentWord = filteredWords[state.part][state.currentIndex]?.word;
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
        commit("setCurrentWord", currentWord); // 변환된 단어를 상태에 저장합니다.
        commit("setWord", convertToRuby); // 변환된 단어를 상태에 저장합니다.
      } catch (error) {
        console.error("An error occurred in setWord:", error);
        // 에러 발생 시, 사용자에게 알리는 등의 추가적인 처리를 할 수 있습니다.
      }
    },
    async setWordID({ commit, rootGetters, dispatch, state }) {
      try {
        const filteredWords = rootGetters["filter/getFilteredWords"];
        const wordID = filteredWords[state.part][state.currentIndex]?.id;

        console.log("@ACTIONS: setWordID!", wordID);

        // 현재 단어가 없는 경우, 추가적인 처리나 경고를 할 수 있습니다.
        if (!wordID) {
          console.warn("Current word is undefined.");
          return; // 현재 단어가 없으면 함수 실행을 중단합니다.
        }
        commit("setWordID", wordID); // 변환된 단어를 상태에 저장합니다.
      } catch (error) {
        console.error("An error occurred in setWordID:", error);
        // 에러 발생 시, 사용자에게 알리는 등의 추가적인 처리를 할 수 있습니다.
      }
    },
    setMean({ commit, rootGetters, state }) {
      try {
        console.log("@ACTIONS: setMean");
        const filteredWords = rootGetters["filter/getFilteredWords"];
        const currentMean = filteredWords[state.part][state.currentIndex]?.mean;

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
        const currentExamples =
          filteredWords[state.part][state.currentIndex]?.examples;

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

    async setNext({ commit, dispatch, state, rootGetters }) {
      console.log('setNext');
      try {
        const filteredWords = rootGetters["filter/getFilteredWords"];
        const proceedToNextWord = async (newIndex) => {
          if (newIndex < filteredWords[state.part].length) {
            await commit("setCurrentIndex", newIndex);
            await dispatch("study/setWordID", null, { root: true });
            
            // state.viewChecked가 true일 경우 isChecked를 바로 false로 설정
            let isChecked = false; 
            if (!state.viewChecked) {
              isChecked = await dispatch("checkedWords/verifyChecked", null, { root: true });
              console.log('isChecked', isChecked);
            }
            
            if (!isChecked) {
              // isChecked가 false일 경우 바로 실행
              dispatch("study/configureWord", null, { root: true });
            } else {
              // isChecked가 true일 경우 다시 proceedToNextWord 함수를 호출하여 다음 단어로 넘어감
              await proceedToNextWord(newIndex + 1);
            }
          } else {
            // 필터링된 단어 목록의 끝에 도달했을 때의 처리 방법 (선택적)
            console.warn("Reached the end of the word list.");
          }
        };
    
        await proceedToNextWord(state.currentIndex + 1);
      } catch (error) {
        // 오류 처리 로직
        console.error(`Error occurred in setNext: ${error}`);
        // 여기서 사용자에게 오류를 알리는 등의 추가적인 처리를 할 수 있습니다.
      }
    },
    
    
    async setPrevious({ commit, dispatch, state, rootGetters }) {
      console.log('setPrevious');
      try {
        const filteredWords = rootGetters["filter/getFilteredWords"];
        const proceedToPreviousWord = async (newIndex) => {
          if (newIndex >= 0) { // 인덱스가 0 이상인지 확인
            await commit("setCurrentIndex", newIndex);
            await dispatch("study/setWordID", null, { root: true });
    
            // state.viewChecked가 true일 경우 isChecked를 바로 false로 설정
            let isChecked = false;
            if (!state.viewChecked) {
              isChecked = await dispatch("checkedWords/verifyChecked", null, { root: true });
              console.log('isChecked', isChecked);
            }
    
            if (!isChecked) {
              // isChecked가 false일 경우 바로 실행
              dispatch("study/configureWord", null, { root: true });
            } else {
              // isChecked가 true일 경우 다시 proceedToPreviousWord 함수를 호출하여 이전 단어로 넘어감
              await proceedToPreviousWord(newIndex - 1);
            }
          } else {
            // 필터링된 단어 목록의 시작에 도달했을 때의 처리 방법 (선택적)
            console.warn("Reached the start of the word list.");
          }
        };
    
        await proceedToPreviousWord(state.currentIndex - 1);
      } catch (error) {
        // 오류 처리 로직
        console.error(`Error occurred in setPrevious: ${error}`);
        // 여기서 사용자에게 오류를 알리는 등의 추가적인 처리를 할 수 있습니다.
      }
    },
    
    

    
    
    async setRandom({ commit, dispatch, state, rootGetters }) {
      console.log('setRandom');
      try {
        const filteredWords = rootGetters["filter/getFilteredWords"][state.part];
        const maxAttempts = 10; // 최대 재시도 횟수
        let attempts = 0; // 현재 시도 횟수
    
        let randomIndex;
        let isChecked = true;
    
        // isChecked가 true이면서 최대 시도 횟수에 도달하지 않고, 현재 인덱스와 다른 인덱스를 찾는 경우 반복
        while(isChecked && attempts < maxAttempts) {
          do {
            randomIndex = Math.floor(Math.random() * filteredWords.length);
          } while(randomIndex === state.currentIndex) // 현재 인덱스와 다를 때까지 반복
    
          await commit("setCurrentIndex", randomIndex);
          await dispatch("study/setWordID", null, { root: true });
    
          isChecked = await dispatch("checkedWords/verifyChecked", null, { root: true });
          attempts += 1; // 시도 횟수 증가
        }
    
        if (!isChecked) {
          // isChecked가 false인 경우, 즉 체크되지 않은 단어를 찾은 경우
          dispatch("study/configureWord", null, { root: true });
        } else {
          // 최대 시도 횟수에 도달했지만 적절한 단어를 찾지 못한 경우
          console.warn("A new random unchecked word could not be found within the attempt limit.");
        }
      } catch (error) {
        console.error(`Error occurred in setRandom: ${error}`);
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

      const lastIndex = filteredWords[state.part].length;

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
    setAlwaysRuby({ commit }) {
      console.log("@ACTIONS: setAlwaysRuby!");
      commit("setAlwaysRuby");
    },
    setAlwaysMean({ commit }) {
      console.log("@ACTIONS: setAlwaysMean!");
      commit("setAlwaysMean");
    },
    setShowDict({ commit }) {
      console.log("@ACTIONS: setShowDict!");
      commit("setShowDict");
    },
  },
  getters: {
    getWordID: (state) => state.wordID,
    getCurrentWord: (state) => state.currentWord,

    getFilteredWords: (state) => state.filteredWords,
    getCurrentIndex: (state) => state.currentIndex,
    getLastIndex: (state) => state.lastIndex,
    getWord: (state) => state.word,
    getMean: (state) => state.mean,
    getExamples: (state) => state.examples,
    getShowRuby: (state) => state.showRuby,
    getShowMean: (state) => state.showMean,
    getAlwaysRuby: (state) => state.alwaysRuby,
    getAlwaysMean: (state) => state.alwaysMean,
    getShowDict: (state) => state.showDict,
    getPart: (state) => state.part,
  },
};

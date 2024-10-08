/*-- wordData.js --*/
import { GoogleGenerativeAI } from "@google/generative-ai";

export default {
  namespaced: true,
  // State
  state: {
    partOfSpeech: null,
    word: null,
    reading: null,
    meaning: null,
    generatedWords: [], // 생성된 단어 목록
    error: null, // 에러 상태
  },
  // Mutations
  mutations: {
    SET_WORD_DATA(state, wordData) {
      console.log("wordData", wordData);
      state.partOfSpeech = wordData.partOfSpeech;
      state.word = wordData.word;
      state.reading = wordData.reading;
      state.meaning = wordData.meaning;
    },
    ADD_GENERATED_WORD(state, word) {
      state.generatedWords.push(word);
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
  },
  // Actions
  actions: {
    async generateWord({ commit, state, dispatch, rootGetters }) {
      dispatch("prompts/clearPrompts", {}, { root: true });
      commit("CLEAR_ERROR"); // Clear any existing errors

      const settings = rootGetters["settings/settings"];
      dispatch("status/startLoading", {}, { root: true });

      console.log("generate START!");
      console.log("settings:", settings.nativeLanguage);

      const genAI = new GoogleGenerativeAI(
        "AIzaSyBrdNobChTsFJ-ai5e3LlaTm1NZDogpWzM"
      ); // API 키
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" }  });

      let reading = "English phonetic symbols"; // 기본값: 영어 발음 기호
      if (settings.targetLanguage === "japanese") {
        reading = "hiragana";
      } else if (settings.targetLanguage === "korean") {
        reading = "Revised Romanization of Korean";
      } else if (settings.targetLanguage === "chinese") {
        reading = "Pinyin";
      }

      let purpose = `Generate words related to ${settings.goal} in ${settings.targetLanguage}.`;
      if (settings.goalType === "general") {
        // 품사 목록 (확률 포함)
        const partsOfSpeech = [
          { part: "noun", probability: 0.3 }, // 명사 30%
          { part: "pronoun", probability: 0.1 }, // 대명사 10%
          { part: "numeral", probability: 0.05 }, // 수사 5%
          { part: "verb", probability: 0.2 }, // 동사 20%
          { part: "adjective", probability: 0.15 }, // 형용사 15%
          { part: "determiner", probability: 0.05 }, // 한정사 5%
          { part: "adverb", probability: 0.1 }, // 부사 10%
          { part: "particle", probability: 0.05 }, // 조사 5%
        ];

        // 랜덤 품사 선택 (확률 적용)
        let totalProbability = 0;
        for (const item of partsOfSpeech) {
          totalProbability += item.probability;
        }

        let randomValue = Math.random() * totalProbability;
        let selectedPartOfSpeech = "";

        for (const item of partsOfSpeech) {
          randomValue -= item.probability;
          if (randomValue <= 0) {
            selectedPartOfSpeech = item.part;
            break;
          }
        }
        purpose = `
  Difficulty levels are defined as: beginner, intermediate, advanced.
  Selected difficulty: ${settings.difficulty}.
  Generate a word in ${settings.targetLanguage} that is a ${selectedPartOfSpeech}.
  `;
      } else if (settings.goalType === "topic") {
        purpose = `Give me one ${settings.targetLanguage} phrase that is useful for ${settings.goal}.`;
      }

      // 프롬프트 수정

      const prompt = `

${purpose}
The 'word' should be in ${settings.targetLanguage}.
The 'meaning' should be in ${settings.nativeLanguage}.
The 'reading' should be in ${reading} phonetic symbols.
The 'part of speech' should be written in ${settings.nativeLanguage}.

Do not include words that have already been generated.
Previously generated words: ${state.generatedWords.join(", ")}. 

Output the word information using this JSON schema:
{ "type": "object",
  "wordData": {
    "partOfSpeech": { "type": "string" },
    "word": { "type": "string" },
    "reading": { "type": "string" },
    "meaning": { "type": "string" },
  }
}`;

      let retryCount = 0;
      const maxRetries = 3; // 최대 재시도 횟수

      console.log ('명령어: ', prompt)
      while (retryCount < maxRetries) {
        try {
          const result = await model.generateContent(prompt);
          const response = await result.response.text();
          console.log(response);

          // 정규 표현식으로 JSON 객체 추출
          const regex =
            /{"wordData": {"partOfSpeech": "(.*)", "word": "(.*)", "reading": "(.*)", "meaning": "(.*)"}}/;
          const match = regex.exec(response);

          if (match) {
            const wordData = {
              partOfSpeech: match[1],
              word: match[2],
              reading: match[3],
              meaning: match[4],
            };

            // 생성된 단어 목록에 존재하는지 확인
            if (!state.generatedWords.includes(wordData.word)) {
              console.log("wordData:", wordData);
              commit("SET_WORD_DATA", wordData);
              commit("ADD_GENERATED_WORD", wordData.word); // 생성된 단어 목록에 추가
              dispatch("status/stopLoading", {}, { root: true });
              dispatch("prompts/generatePrompts", {}, { root: true });

              return; // 성공 시 반복 종료
            } else {
              console.log("이미 생성된 단어입니다.");
            }
          } else {
            console.error("JSON 데이터를 찾을 수 없습니다.");
            throw new Error("JSON 데이터를 찾을 수 없습니다."); // 에러 발생
          }
        } catch (error) {
          console.error("오류 발생:", error);
          commit("SET_ERROR", error.message); // 에러 상태 업데이트
          retryCount++;

          // 503 에러일 경우만 재시도
          if (error.message.includes("503")) {
            console.log(`재시도 ${retryCount}회`);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // 2초 대기
          } else {
            throw error; // 다른 에러는 다시 발생시켜 처리
          }
        }
      }

      // 최대 재시도 횟수 초과 시 에러 처리
      console.error("최대 재시도 횟수 초과");
      commit("SET_ERROR", "최대 재시도 횟수 초과"); // 에러 상태 업데이트
      dispatch("status/stopLoading", {}, { root: true });
    },
  },
  // Getters
  getters: {
    getWord: (state) => state,
    error: (state) => state.error,
  },
};

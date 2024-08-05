/*-- prompt.js --*/
import { GoogleGenerativeAI } from "@google/generative-ai";

export default {
  namespaced: true,
  state: {
    prompts: [], // JSON 데이터를 저장할 상태
    currentPrompt: { title: "", prompt: "" },
    response: "",
    loadingPrompts: {}, // 프롬프트별 로딩 상태
  },
  mutations: {
    SET_PROMPTS(state, promptsData) {
      state.prompts = promptsData.prompts; // JSON 객체에서 'prompts' 배열을 저장
    },
    SET_PROMPT_LOADING(state, { title, isLoading }) {
      state.loadingPrompts = {
        ...state.loadingPrompts,
        [title]: isLoading,
      };
    },
    CLEAR_PROMPTS(state) {
      state.prompts = []; // prompts 배열 초기화
      state.loadingPrompts = {}; // 프롬프트별 로딩 상태 초기화
    },
    SET_CURRENT_PROMPT(state, prompt) {
      state.currentPrompt = prompt;
    },
    SET_RESPONSE(state, response) {
      state.response = response;
    },
    CLEAR_RESPONSE(state) {
      state.response = ""; // prompts 배열 초기화
    },
  },
  actions: {
    async generatePrompts({ commit, rootGetters }) {
      const word = rootGetters["wordData/getWord"];
      const settings = rootGetters["settings/settings"];

      const genAI = new GoogleGenerativeAI(
        "AIzaSyBrdNobChTsFJ-ai5e3LlaTm1NZDogpWzM"
      ); // API 키
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" },
      });

      const prompt = `
        Please provide an AI prompt that can be used for language learning with the word '${word.word}'. example : {"title": "Sentence Examples", "prompt": "Please use '${word.word}' to generate various example sentences."}. The "prompts" should be written in '${settings.nativeLanguage}' and there should be no more than 4 prompts. The output using this JSON schema: { "type": "object", "prompts": { "title": { "type": "string" }, "prompt": { "type": "string" }, } } 
        `;

      let retryCount = 0;
      const maxRetries = 3; // 최대 재시도 횟수

      console.log("명령어: ", prompt);
      while (retryCount < maxRetries) {
        try {
          const result = await model.generateContent(prompt);
          const response = await result.response.text();
          console.log("response:", response);

          const regex =
            /{"prompts":\s*\[({\s*"title":\s*"(.*?)",\s*"prompt":\s*"(.*?)"})\s*(,\s*{\s*"title":\s*"(.*?)",\s*"prompt":\s*"(.*?)"})*\]}/g;
          const match = regex.exec(response);

          if (match) {
            const jsonString = match[0];

            try {
              const promptsData = JSON.parse(jsonString);
              console.log("추출된 JSON 데이터:", promptsData);

              commit("SET_PROMPTS", promptsData);
              return;
            } catch (error) {
              console.error("JSON 파싱 오류:", error);
              throw error;
            }
          } else {
            console.error("JSON 데이터를 찾을 수 없습니다.");
            throw new Error("JSON 데이터를 찾을 수 없습니다.");
          }
        } catch (error) {
          console.error("오류 발생:", error);
          retryCount++;

          if (error.message.includes("503")) {
            console.log(`재시도 ${retryCount}회`);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // 2초 대기
          } else {
            throw error;
          }
        }
      }
      console.error("최대 재시도 횟수 초과");
    },
    async fetchResponse({ commit, state, dispatch }) {
      commit("SET_RESPONSE", ""); // 이전 응답 초기화
      const { currentPrompt } = state;
      dispatch("status/startLoading", {}, { root: true });

      if (!currentPrompt.prompt) {
        console.error("currentPrompt.prompt가 설정되지 않았습니다.");
        return;
      }

      commit("SET_PROMPT_LOADING", {
        title: currentPrompt.title,
        isLoading: true,
      });

      try {
        const genAI = new GoogleGenerativeAI(
          "AIzaSyBrdNobChTsFJ-ai5e3LlaTm1NZDogpWzM"
        );
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
          ${currentPrompt.prompt}
          Please respond in JSON format. The response should be a JSON object with the following structure:
          {
            "response": "<Response Content>"
          }
          Ensure the JSON is well-formatted and includes only this JSON object with no additional text or formatting.
        `;
        const result = await model.generateContent(prompt);
        let responseText = await result.response.text();

        // 응답 JSON 포맷을 정리합니다
        // 예를 들어, 응답이 '```json ...```'과 같은 형식을 포함할 수 있으므로 이를 처리합니다.
        const jsonMatch = responseText.match(/^\s*```json\s*([\s\S]+?)\s*```/);
        if (jsonMatch) {
          responseText = jsonMatch[1];
        }

        let parsedResponse;
        try {
          parsedResponse = JSON.parse(responseText);
          console.log("Parsed JSON response:", parsedResponse); // 로그 추가

          // 'response' 필드가 포함된 경우 상태에 저장
          if (parsedResponse.response) {
            commit("SET_RESPONSE", parsedResponse.response);
          } else {
            console.error("응답 JSON의 'response' 필드가 누락되었습니다.");
            commit(
              "SET_RESPONSE",
              "응답 JSON의 'response' 필드가 누락되었습니다."
            );
          }
        } catch (error) {
          console.error("응답 JSON 파싱 오류:", error);
          commit("SET_RESPONSE", "응답 형식 오류");
        }
      } catch (error) {
        console.error("응답을 가져오는 중 오류 발생:", error);
      } finally {
        commit("SET_PROMPT_LOADING", {
          title: currentPrompt.title,
          isLoading: false,
        });
        dispatch("status/stopLoading", {}, { root: true });
      }
    },

    setCurrentPrompt({ commit }, prompt) {
      commit("SET_CURRENT_PROMPT", prompt);
    },
    startLoading({ commit }) {
      commit("SET_LOADING", true);
    },
    stopLoading({ commit }) {
      commit("SET_LOADING", false);
    },
    clearPrompts({ commit }) {
      commit("CLEAR_PROMPTS");
    },
    clearResponse({ commit }) {
      commit("CLEAR_RESPONSE");
    },
  },
  getters: {
    prompts: (state) => state.prompts,
    loadingPrompts: (state) => state.loadingPrompts,
    currentPrompt: (state) => state.currentPrompt,
    response: (state) => state.response,
  },
};

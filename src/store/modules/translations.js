/*-- translations.js --*/
import { GoogleGenerativeAI } from "@google/generative-ai";

// 언어 이름을 ISO 639-1 코드로 변환하는 매핑
const languageCodeMap = {
  "english": "en",
  "spanish": "es",
  "chinese": "zh",
  "french": "fr",
  "german": "de",
  "japanese": "ja",
  "korean": "ko",
  "italian": "it",
  "portuguese": "pt",
  "russian": "ru",
  "arabic": "ar",
  "hindi": "hi",
  "vietnamese": "vi",
  "thai": "th",
  "turkish": "tr",
  "swedish": "sv",
  "dutch": "nl",
  "polish": "pl",
  "greek": "el",
  "hebrew": "he",
};

// 언어 이름을 코드로 변환하는 함수
function getLanguageCode(languageName) {
  return languageCodeMap[languageName.toLowerCase()] || "en"; // 기본값은 영어
}

export default {
  namespaced: true,
  state: {
    translations: {
      common: {
        button: {
          signin: "Sign in",
          signup: "Sign up",
          signout: "Sign Out",
          generate: "AI Generate",
          generating: "AI Generating..",
          retry: "Retry",
        },
        message: {
          welcome: "Master multiple languages with AI !",
          error: "An error occurred. Please try again.",
          empty: "No content available",
        },
      },
      settings: {
        button: {
          next: "Next Step",
          previous: "Previous",
          search: "Search",
        },
        option: {
          general: "General",
          topic: "Topic",
          exam: "Exam",
          word: "Word",
          vocabulary: "Vocabulary",
          conversation: "Conversation",
          grammar: "Grammar",
          travel: "Travel",
          dining: "Dining",
          shopping: "Shopping",
          work: "Work",
          social: "Social",
          culture: "Culture",
          it: "IT",
          medical: "Medical",
          family: "Family",
          easy: "Easy",
          hard: "Hard",
          beginner: "Beginner",
          intermediate: "Intermediate",
          advanced: "Advanced",
        },
        message: {
          step1: "Please select your native language.",
          step2: "Please select the language you want to learn.",
          step3: "Please specify your purpose for learning this language.",
          step4: "Please select your current language level.",
          native: "Native Language",
          language: "Choose Language",
          purpose: "Purpose",
          level: "Language Level",
        },
      },
    },
  },
  mutations: {
    SET_TRANSLATIONS(state, translations) {
      state.translations = translations;
    },
  },
  actions: {
    async generateTranslations({ commit, rootGetters, state }) {
      const settings = rootGetters["settings/settings"];
      const translations = state;

      const languageCode = getLanguageCode(settings.nativeLanguage);
console.log ('nativeLanguage: ', settings.nativeLanguage)
console.log ('languageCode: ', languageCode)

      // Google Generative AI 초기화
      const genAI = new GoogleGenerativeAI("AIzaSyBrdNobChTsFJ-ai5e3LlaTm1NZDogpWzM"); // API 키
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // 번역할 translations 데이터 생성
      const textToTranslate = JSON.stringify(translations);

      let retryCount = 0;
      const maxRetries = 3;

      console.log("텍스트:", textToTranslate);
      while (retryCount < maxRetries) {
        try {
          const prompt = `Translate the following text into '${languageCode}': ${textToTranslate}`;
          const result = await model.generateContent(prompt);
          const responseText = await result.response.text();
          console.log("응답 전체:", responseText);

          // JSON 데이터 앞부분의 마크업 제거
          const jsonString = responseText
            .replace(/^```json\s*/, '') // ```json 으로 시작하는 부분 제거
            .replace(/\s*```$/, '') // ```으로 끝나는 부분 제거
            .trim(); // 양쪽 공백 제거

          // JSON 문자열 파싱
          try {
            const jsonResponse = JSON.parse(jsonString);
            console.log("파싱된 JSON 데이터:", jsonResponse);

            if (jsonResponse && jsonResponse.translations) {
              commit("SET_TRANSLATIONS", jsonResponse.translations);
              return;
            } else {
              console.error("translations 데이터를 찾을 수 없습니다.");
              throw new Error("translations 데이터를 찾을 수 없습니다.");
            }
          } catch (parseError) {
            console.error("JSON 파싱 오류:", parseError);
            throw parseError;
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
  },
  getters: {
    translations: (state) => state.translations,
    common: (state) => state.translations.common,
    settings: (state) => state.translations.settings,

  },
};

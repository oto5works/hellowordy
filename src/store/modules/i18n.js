/*-- i18n.js --*/
export default {
  namespaced: true,
  state: {
    i18n: {
      common: {
        button: {
          signin: "Sign in",
          signup: "Sign up",
          signout: "Sign Out",
          generate: "Generate",
          generating: "Generating..",
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
  getters: {
    i18n: (state) => state,
  },
};

/*-- options.js --*/
export default {
  namespaced: true,
  state: {
    options: {
      language: [
        { label: "English", value: "english" },
        { label: "Español", value: "spanish" },
        { label: "中文", value: "chinese" },
        { label: "Français", value: "french" },
        { label: "Deutsch", value: "german" },
        { label: "日本語", value: "japanese" },
        { label: "한국어", value: "korean" },
        { label: "Italiano", value: "italian" },
        { label: "Português", value: "portuguese" },
        { label: "Русский", value: "russian" },
        { label: "العربية", value: "arabic" },
        { label: "हिन्दी", value: "hindi" },
        { label: "Tiếng Việt", value: "vietnamese" },
        { label: "ไทย", value: "thai" },
        { label: "Türkçe", value: "turkish" },
        { label: "Svenska", value: "swedish" },
        { label: "Nederlands", value: "dutch" },
        { label: "Polski", value: "polish" },
        { label: "Ελληνικά", value: "greek" },
        { label: "עברית", value: "hebrew" },
      ],
      goalType: [
        { label: "English", value: "general" },
        { label: "English", value: "exam" },
        { label: "English", value: "general" },
      ],
      general: [
        { label: "English", value: "vocabulary" },
        { label: "English", value: "conversation" },
        { label: "English", value: "grammar" },
      ],
      topic: [
        { label: "English", value: "travel" },
        { label: "English", value: "dining" },
        { label: "English", value: "shopping" },
        { label: "English", value: "work" },
        { label: "English", value: "social" },
        { label: "English", value: "culture" },
        { label: "English", value: "it" },
        { label: "English", value: "medical" },
        { label: "English", value: "family" },
      ],
      exam: [
        { label: "toefl", value: "toefl" },
        { label: "IELTS", value: "ielts" },
        { label: "toeic", value: "toeic" },
        { label: "JLPT", value: "jlpt" },
        { label: "HSK", value: "hsk" },
        { label: "TOPIK", value: "topik" },
        { label: "KLAT", value: "klat" },
        { label: "DELF DALF", value: "delf, dalf" },
        { label: "TestDaf", value: "testdaf" },
      ],
    },
  },
  getters: {
    language: (state) => state.options.language,

  },
};

<template>
  <div class="wordDataContainer">
    <div
      v-if="word.word && !error"
      class="wordData text-align_center"
      :class="{ 'fade-in': !isLoading, 'fade-out': isLoading }"
    >
      <div class="font-size_14 color_on-background">
        {{ word.partOfSpeech }}
      </div>
      <div class="spacing-1" />
      <div class="font-size_52 font-weight_700 color_on-background">
        {{ word.word }}
      </div>
      <div class="spacing-2" />
      <div
        class="cursor_pointer display_flex gap_4 align-items_center font-size_14 color_on-background-70"
        @click="pronounceWord"
      >
        {{ word.reading }}
        <icon class="icon_16" ><speaker /></icon>
      </div>
      <div class="spacing-3" />
      <div class="font-size_18 font-weight_500 color_on-background">
        {{ word.meaning }}
      </div>
    </div>
    <div v-else-if="error" class="errorContainer">
      <div class="errorMessage font-size_24 font-weight_700 color_error text-align_center width_70">
        {{ common.message.error }}
      </div>
      <div class="spacing-1" />
      <div class="font-size_12 text-align_center width_70">{{ error }}</div>
      <div class="spacing-3" />
      <div class="height_40">
        <buttonOutline @click="generateWord">{{
          common.button.retry
        }}</buttonOutline>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import speaker from "@/components/icon/speaker.vue";

export default {
  components: {
    speaker,
  },
  data() {
    return {
      dialog: false,
      searchTerm: "",
    };
  },
  computed: {
    ...mapGetters({
      word: "wordData/getWord",
      isLoading: "status/isLoading",
      error: "wordData/error",
      common: "translations/common",
      settings: "settings/settings",
    }),
  },
  methods: {
  ...mapActions({
    generateWord: "wordData/generateWord",
  }),
  pronounceWord() {
    const { word, meaning } = this.word;
    const { targetLanguage, nativeLanguage } = this.settings;

    if (!window.speechSynthesis) {
      console.error("SpeechSynthesis is not supported in this browser.");
      return;
    }

    // Define language-to-voice mappings
    const languageToVoice = {
      english: 'Google US English',
      korean: 'Google 한국의',
      spanish: 'Google español',
      chinese: 'Google 普通话',
      french: 'Google français',
      german: 'Google Deutsch',
      japanese: 'Google 日本語',
      italian: 'Google italiano',
      portuguese: 'Google português',
      russian: 'Google русский',
      arabic: 'Google العربية',
      hindi: 'Google हिंदी',
      vietnamese: 'Google tiếng Việt',
      thai: 'Google ภาษาไทย',
      turkish: 'Google Türkçe',
      swedish: 'Google svenska',
      dutch: 'Google nederlands',
      polish: 'Google polski',
      greek: 'Google ελληνικά',
      hebrew: 'Google עברית',
    };

    const getVoiceByLanguage = (language) => {
      const voices = window.speechSynthesis.getVoices();
      const voiceName = languageToVoice[language] || '';
      return voices.find(voice => voice.name.includes(voiceName));
    };

    const utteranceWord = new SpeechSynthesisUtterance(word);
    const utteranceMeaning = new SpeechSynthesisUtterance(meaning);

    const wordVoice = getVoiceByLanguage(targetLanguage);
    const meaningVoice = getVoiceByLanguage(nativeLanguage);

    if (wordVoice) {
      utteranceWord.voice = wordVoice;
    }
    if (meaningVoice) {
      utteranceMeaning.voice = meaningVoice;
    }

    // Speak the word and then the meaning
    window.speechSynthesis.speak(utteranceWord);
    utteranceWord.onend = () => {
      window.speechSynthesis.speak(utteranceMeaning);
    };
  },
},
};
</script>


<style scoped>
.wordDataContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  width: 100%;
  height: 50vh;
  word-break: break-all;
  overflow-wrap: break-work;
}

.wordData {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease;
  height: 50vh;
}

.errorContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 100%;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.fade-in {
  opacity: 1;
  transform: translateY(0);
  animation: fadeInUp 0.5s ease-out forwards;
}

.fade-out {
  opacity: 0;
  transform: translateY(0);
  animation: fadeOut 0.3s ease-in forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px); /* Adjust as needed for the desired effect */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(0);
  }
}

.spacing-1 {
  height: 5.2%;
}
.spacing-2 {
  height: 1.7%;
}
.spacing-3 {
  height: 10%;
}
</style>

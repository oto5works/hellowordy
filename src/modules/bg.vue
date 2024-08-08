<template>
    <teleport to="#app">
  <div class="loading-container">
    <div class="loading-image "
      :class="{ 'loading': isLoading || welcomeText, 'loaded': !isLoading && !welcomeText }">
    <img
      :src="currentSrc"
    />
  </div>
    <div class="gradient"/>
    <div class="translationsMessage">
      <span 
      v-if="isTranslating"
      :class="{ 'fade-in': isTranslating, 'fade-out': !isTranslating }"
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="15" stroke-dashoffset="15" stroke-linecap="round" stroke-width="2" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
      
      
      {{common.message.isTranslating}} | {{ settings.nativeLanguage }}
      </span>
      <span 
      v-if="translationComplete && !isTranslating"
      :class="{ 'fade-in': translationComplete, 'fade-out': !translationComplete }"
      ><icon class="icon_14"><check /></icon>{{common.message.translationComplete}}</span>
    </div>
  </div>
  </teleport>
</template><script>
import { mapActions, mapGetters } from "vuex";
import check from "@/components/icon/check.vue";

export default {
  components: {
    check,
  },
  data() {
    return {
      loadedSrc: "https://hello-wordy.web.app/image/bg.png",
      loadingSrc: "https://hello-wordy.web.app/image/bg.gif",
      showTranslationComplete: false,
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "status/isLoading",
      welcomeText: "status/welcomeText",
      common: "translations/common",
      isTranslating: "status/isTranslating",
      translationComplete: "status/translationComplete",
      settings: "settings/settings",
    }),
    currentSrc() {
      return (this.isLoading || this.welcomeText) ? this.loadingSrc : this.loadedSrc;
    },
  },
  watch: {
    translationComplete(newVal) {
      if (newVal) {
        this.showTranslationComplete = true;
        setTimeout(() => {
          this.updateTranslationComplete(false);
        }, 2000);
      }
    },
  },
  methods: {
    ...mapActions({
      generateWord: "wordData/generateWord",
      updateTranslationComplete: "status/updateTranslationComplete",
    }),
  },
};
</script>

<style scoped>
.loading-container {
  position: fixed;
  width: 100%;
  height: 100%;
  padding-top: 64px;
  z-index: 0;
}

.loading-image {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s ease;
  filter: blur(0px);
}

.loaded {
  top: 60vh;
    height: 86vh;
  filter: blur(4px);
}

.loading {
  top: 64px;
  height: 50vh;
}
.loading-image img{
  transition: all 0.3s ease;
}
.loading-image.loading img{
  height: 80%;
  width: auto;
}
.loading-image.loaded img{
  height: 100%;
  width: auto;
}
.gradient {
  position: absolute;
  bottom: 0%;
  width: 100%;
  height: 30%;
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
}

.translationsMessage {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  top: 0;
  height: 32px;
}
.translationsMessage span {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  color: rgb(var(--mio-theme-color-on-background));
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
    transform: translateY(6px);
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
</style>

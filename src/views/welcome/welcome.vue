<template>
  <div class="routerView">
    <wordData />

    <div class="bottom-wrap">
      <welcomeText v-if="welcomeText" />
      <div class="button-wrap">
        <buttonOutline icon="top" class="sign" @click="handleSignInWithGoogle">
          <icon class="icon_24"><google /></icon>
          <span>{{common.button.signin}} / {{common.button.signup}}</span>
        </buttonOutline>

        <buttonOutline
          icon="top"
          class="generate"
          :class="{ disabled: isLoading }"
          @click="goToSettings"
        >
          <svg
            class="loading"
            v-if="isLoading"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-dasharray="15"
              stroke-dashoffset="15"
              stroke-linecap="round"
              stroke-width="2.4"
              d="M12 3C16.9706 3 21 7.02944 21 12"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.3s"
                values="15;0"
              />
              <animateTransform
                attributeName="transform"
                dur="1.5s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              />
            </path>
          </svg>
          <icon v-else class="icon_24"><generate /></icon>
          <span v-if="isLoading">{{common.button.generating}}</span>
          <span v-else>{{common.button.generate}}</span>
        </buttonOutline>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import wordData from "@/modules/wordData.vue";
import google from "@/components/icon/google.vue";
import generate from "@/components/icon/generate.vue";
import welcomeText from "@/views/welcome/welcomeText.vue";

export default {
  components: {
    wordData,
    google,
    generate,
    welcomeText,
  },
  data() {
    return {
      dialog: false,
      userLanguage: navigator.language || navigator.userLanguage,
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "status/isLoading",
      welcomeText: "status/welcomeText",
      common: "translations/common",
    }),
    userLanguageName() {
      const languageMap = {
        en: "english",
        es: "spanish",
        zh: "chinese",
        fr: "french",
        de: "german",
        ja: "japanese",
        ko: "korean",
        it: "italian",
        pt: "portuguese",
        ru: "russian",
        ar: "arabic",
        hi: "hindi",
        vi: "vietnamese",
        th: "thai",
        tr: "turkish",
        sv: "swedish",
        nl: "dutch",
        pl: "polish",
        el: "greek",
        he: "hebrew",
      };
      return languageMap[this.userLanguage.split("-")[0]] || this.userLanguage;
    },
  },
  methods: {
    ...mapActions({
      generateWord: "wordData/generateWord",
      signInWithGoogle: "users/signInWithGoogle",
      updateNativeLanguage: "settings/updateNativeLanguage",
      updateWelcomeText: "status/updateWelcomeText",
      generateTranslations: "translations/generateTranslations",

    }),
    async handleSignInWithGoogle() {
      try {
        await this.signInWithGoogle(); // 수정된 부분: 함수 인자가 객체로 전달되도록 괄호 사용
        //this.$router.push({ name: "my" }); // 로그인 성공 후 홈으로 리다이렉트
      } catch (error) {
        //this.error = error.message; // 로그인 실패시 에러 메시지 저장
      }
    },

    goToSettings() {
      this.$router.push({ name: "settings" });
    },
  },
  created() {
    this.updateNativeLanguage(this.userLanguageName);
    this.updateWelcomeText(true);
    this.generateTranslations()
  },
  beforeRouteLeave(to, from, next) {
    this.updateWelcomeText(false);
    next();
  },
};
</script>

<style scoped>
.bottom-wrap {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 4vh;
  width: 100%;
  height: fit-content;
  bottom: 0;
}
.button-wrap {
  display: grid;
  bottom: 0;
  left: 0;
  width: 100%;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  padding: 16px;
  height: 20vh;
  align-items: stretch;
}
.sign {
  grid-column: span 4;
  height: 100%;
}

.generate {
  grid-column: span 2;
  height: 100%;
}
.loading {
  color: rgb(var(--mio-theme-color-on-background));
}
</style>

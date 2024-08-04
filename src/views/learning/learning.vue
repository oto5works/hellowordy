<template>
  <div class="routerView">
    <wordData />

    <promptFlicking />

    <div class="button-wrap">
      <buttonOutline
        icon="left"
        class="generate"
        :class="{ disabled: isLoading }" 
        @click="generateWord"
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
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import wordData from "@/modules/wordData.vue";
import google from "@/components/icon/google.vue";
import generate from "@/components/icon/generate.vue";
import promptFlicking from "@/views/prompt/promptFlicking.vue";

export default {
  components: {
    wordData,
    google,
    generate,
    promptFlicking
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "status/isLoading",
      settings: "settings/settings",
      common: "translations/common",
    }),
  },
  methods: {
    ...mapActions({
      generateWord: "wordData/generateWord",
      signInWithGoogle: "users/signInWithGoogle",
      updateNativeLanguage: "settings/updateNativeLanguage",
      updateLogoText: "status/updateLogoText",
    }),
    async handleSignInWithGoogle() {
      try {
        await this.signInWithGoogle();
        alert("로그인 성공!");
      } catch (error) {
        // Handle error if necessary
      }
    },
  },
  mounted() {
   this.generateWord();
  },
};
</script>

<style scoped>
.button-wrap {
  position: absolute;
  display: grid;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10%;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  padding: 16px;
}
.loading {
  color: rgb(var(--mio-theme-color-on-background));
}
.generate {
  grid-column: span 6;
}
</style>

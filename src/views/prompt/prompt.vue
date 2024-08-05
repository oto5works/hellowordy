<template>
  <div class="routerView">

    <div class="response-wrap">
      <promptInput />
      <promptResponse />
    </div>


<div class="bottom-wrap">
  <promptFlicking />
</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import wordData from "@/modules/wordData.vue";
import google from "@/components/icon/google.vue";
import generate from "@/components/icon/generate.vue";
import promptFlicking from "@/views/prompt/promptFlicking.vue";
import promptResponse from "@/views/prompt/promptResponse.vue";
import promptInput from "@/views/prompt/promptInput.vue";


export default {
  components: {
    wordData,
    google,
    generate,
    promptFlicking,
    promptResponse,
    promptInput
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
        await this.signInWithGoogle(); // 수정된 부분: 함수 인자가 객체로 전달되도록 괄호 사용
        //this.$router.push({ name: "my" }); // 로그인 성공 후 홈으로 리다이렉트
        alert("로그인 성공!");
      } catch (error) {
        //this.error = error.message; // 로그인 실패시 에러 메시지 저장
      }
    },
  },
};
</script>


<style scoped>
.routerView {
  padding-top: 0;
}
.loading {
  color: rgb(var(--mio-theme-color-on-background));
}
.generate {
  grid-column: span 6;
}
.response-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 48px 16px;
  height: 80vh;
  overflow-x: hidden;
  overflow-y: auto;
}
/* Scrollbar styles */
.response-wrap::-webkit-scrollbar {
  width: 8px;
}

.response-wrap::-webkit-scrollbar-thumb {
  background: rgba(var(--mio-theme-color-on-background-40), 1);
  border-radius: 8px;
}

.response-wrap::-webkit-scrollbar-track {
  background: rgba(var(--mio-theme-color-on-background-20), .24);
}

.bottom-wrap {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 16px 0;
  overflow: hidden;
}
</style>

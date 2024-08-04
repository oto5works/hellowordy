<template>
  <div class="routerView">

   <promptFlicking />
   
<promptResponse />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import wordData from "@/modules/wordData.vue";
import google from "@/components/icon/google.vue";
import generate from "@/components/icon/generate.vue";
import promptFlicking from "@/views/prompt/promptFlicking.vue";
import promptResponse from "@/views/prompt/promptResponse.vue";


export default {
  components: {
    wordData,
    google,
    generate,
    promptFlicking,
    promptResponse
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

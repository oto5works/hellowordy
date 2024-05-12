<template>
  <div class="routerView">
    <div class="width_100">
      <div class="display_flex  flex-direction_column align-items_center width_100 pa_16">
        
        <div class="logo">
          <rabbit1 />
        </div>
        <div class="font-size_14 kr font-weight_500 line-height_130">
          읽고, 암기하고, 연결되는
        </div>
      </div>
      <div class="sp_32" />
      <buttonDefault
        class="height_64 width_100 gap_8"
        @click="handleSignInWithGoogle()"
        ><icon><google /></icon><span>구글로 시작하기</span></buttonDefault
      >
      <div class="sp_128" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import rabbit1 from "@/components/icon/rabbit1.vue";
import google from "@/components/icon/google.vue";

export default {
  components: {
    rabbit1,
    google,
  },
  methods: {
    ...mapActions({
      signInWithGoogle: "users/signInWithGoogle", // Vuex의 네임스페이스에서 'signIn' 액션을 매핑함
    }),
    async handleSignInWithGoogle() {
      try {
        await this.signInWithGoogle(); // 수정된 부분: 함수 인자가 객체로 전달되도록 괄호 사용
        this.$router.push({ name: "my" }); // 로그인 성공 후 홈으로 리다이렉트
        alert("로그인 성공!");
      } catch (error) {
        this.error = error.message; // 로그인 실패시 에러 메시지 저장
      }
    },
  },
};
</script>
<style scoped>
.logo {
  width: 80%;
}
.logo svg {
  width: 100%;
  height: auto;
}
.routerView {
  display: flex;
  align-items: center;
  justify-content: center;
 
}
</style>

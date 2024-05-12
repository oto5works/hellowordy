<template>
  <div class="routerView">
    <div class="sp_64" />
    <!--<div class="font-size_24 kr font-weight_500 line-height_130">
      읽고, 발견하고, 연결되는<br />
      소셜 독서 플랫폼
    </div>-->
    <div class="display_flex justify-content_center width_100">
      <div class="logo">
        <rabbit1 />
      </div>
    </div>
    <div class="sp_128" />
    <textField label="이메일" type="email" v-model="email" />
    <textField label="password" type="password" v-model="password" />

    <p v-if="error">{{ error }}</p>

    <buttonDefault class="height_40 width_100" @click="handleSignIn()"
      ><span>로그인</span></buttonDefault
    >
    <div class="sp_8" />
    <buttonDefault class="height_40 width_100 gap_8" @click="handleSignInWithGoogle()"
      ><icon><google/></icon><span>구글로 시작하기</span></buttonDefault
    >
    <div class="sp_64" />
    <buttonText class="selected height_40 width_100" @click="handleRegister()"
      ><span>회원 가입</span></buttonText
    >
  </div>
</template>

<script>
import { mapActions } from "vuex";
import rabbit1 from "@/components/icon/rabbit1.vue";
import google from "@/components/icon/google.vue";


export default {
  components: {
    rabbit1, google
  },
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    ...mapActions({
      signIn: "users/signIn", // Vuex의 네임스페이스에서 'signIn' 액션을 매핑함
      signInWithGoogle: "users/signInWithGoogle", // Vuex의 네임스페이스에서 'signIn' 액션을 매핑함


      
    }),
    async handleSignIn() {
      try {
        await this.signIn({ email: this.email, password: this.password }); // 수정된 부분: 함수 인자가 객체로 전달되도록 괄호 사용
        this.$router.push({ name: "home" }); // 로그인 성공 후 홈으로 리다이렉트
        alert("로그인 성공!");
      } catch (error) {
        this.error = error.message; // 로그인 실패시 에러 메시지 저장
      }
    },
    async handleSignInWithGoogle() {
      try {
        await this.signInWithGoogle(); // 수정된 부분: 함수 인자가 객체로 전달되도록 괄호 사용
        this.$router.push({ name: "home" }); // 로그인 성공 후 홈으로 리다이렉트
        alert("로그인 성공!");
      } catch (error) {
        this.error = error.message; // 로그인 실패시 에러 메시지 저장
      }
    },
    async handleRegister() {
      this.$router.push({ name: "usersRegister" }); // 로그인 성공 후 홈으로 리다이렉트
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
</style>

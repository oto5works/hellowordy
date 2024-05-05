<template>
  <div class="signIn-container">
    <h1>signIn</h1>

    <textField label="이메일" type="email" v-model="email" />
    <textField label="password" type="password" v-model="password" />

    <p v-if="error">{{ error }}</p>

    <button @click="handleSignIn()">로그인</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
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
    }),
    async handleSignIn() {
      try {
        await this.signIn({ email: this.email, password: this.password }); // 수정된 부분: 함수 인자가 객체로 전달되도록 괄호 사용
        this.$router.push({ name: "home" }); // 로그인 성공 후 홈으로 리다이렉트
        alert('로그인 성공!')
      } catch (error) {
        this.error = error.message; // 로그인 실패시 에러 메시지 저장
      }
    },
  },
};
</script>

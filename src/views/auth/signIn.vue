<template>
  <div class="signIn-container">
    <h1>signIn</h1>
    <form @submit.prevent="signIn">
      <div>
        <label for="email">이메일:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">비밀번호:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div>
        <button type="submit">로그인</button>
      </div>
    </form>
    <p v-if="error">{{ error }}</p>
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
      setSignIn: "firebase/setSignIn", // Vuex의 네임스페이스에서 'signIn' 액션을 매핑함
    }),
    async signIn() {
      try {
        await this.setSignIn({ email: this.email, password: this.password }); // 수정된 부분: 함수 인자가 객체로 전달되도록 괄호 사용
        //this.$router.push({ name: "home" }); // 로그인 성공 후 홈으로 리다이렉트
      } catch (error) {
        this.error = error.message; // 로그인 실패시 에러 메시지 저장
      }
    },
  },
};
</script>


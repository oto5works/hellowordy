<template>
  <div>
    <h2>회원가입</h2>
    <input v-model="email" type="email" placeholder="이메일" />
    <input v-model="username" type="text" placeholder="사용자 이름" />
    <input v-model="password" type="password" placeholder="비밀번호" />
    <input
      v-model="passwordConfirm"
      type="password"
      placeholder="비밀번호 확인"
    />
    <button @click="register">회원가입</button>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
      error: "",
    };
  },
  methods: {
    ...mapActions({
      checkUsernameExists: "firebase/checkUsernameExists",
      signUp: "firebase/signUp",
    }),
    async register() {
      if (this.password !== this.passwordConfirm) {
        this.error = "비밀번호가 일치하지 않습니다.";
        return;
      }
      this.error = "";

      try {
        // 사용자 이름 중복 확인
        const usernameExists = await this.checkUsernameExists(this.username);
        if (usernameExists) {
          this.error = "이미 존재하는 사용자 이름입니다.";
          return;
        }
        // 회원가입 진행
        await this.signUp({
          email: this.email,
          password: this.password,
          username: this.username,
        });
        // 회원가입 성공 후 처리 로직 (예: 로그인 페이지로 리다이렉션)
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

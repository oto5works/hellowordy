<template>
  <div>
    <h2>회원가입</h2>

    <textField label="이메일" type="email" v-model="email" />
    <textField label="사용자 이름" type="text" v-model="displayName" />
    <textField label="비밀번호" type="password" v-model="password" />
    <textField 
      label="비밀번호 확인" 
      type="password" 
      v-model="passwordConfirm" 
    />

    <!-- 프로필 사진 입력 필드 추가 -->
    <div>
      <label for="profilePicture">프로필 사진:</label>
      <input 
        type="file" 
        id="profilePicture" 
        @change="handleFileUpload" 
      />
    </div>
    
    <button @click="handleRegister">회원가입</button>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      displayName: "",
      password: "",
      passwordConfirm: "",
      error: "",
      file: null, // 프로필 사진 파일을 저장할 data 속성 추가
    };
  },
  methods: {
    ...mapActions({
      checkDisplayName: "users/checkDisplayName",
      register: "users/register",
    }),
    handleFileUpload(event) {
      this.file = event.target.files[0]; // 선택된 파일을 저장
    },
    async handleRegister() {
      if (this.password !== this.passwordConfirm) {
        this.error = "비밀번호가 일치하지 않습니다.";
        return;
      }
      this.error = "";

      try {
        // 사용자 이름 중복 확인
        const displayNameExists = await this.checkDisplayName(this.displayName);
        if (displayNameExists) {
          this.error = "이미 존재하는 사용자 이름입니다.";
          return;
        }
        // 회원가입 진행
        await this.register({
          email: this.email,
          password: this.password,
          displayName: this.displayName,
          file: this.file, // 프로필 사진 파일도 함께 전달
        });
        this.$router.push({ name: "home" }); // 로그인 성공 후 홈으로 리다이렉트
        alert('회원가입 성공!')
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

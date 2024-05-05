<template>
  <buttonText class="height_64 width_100" @click="handleSignOut()">로그아웃</buttonText>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({
      signOut: "users/signOut",
    }),
    async handleSignOut() {
      try {
        await this.signOut();
        this.$router.push({ name: "home" }); // 로그인 성공 후 홈으로 리다이렉트
        alert('로그아웃!')

      } catch (error) {
        console.error("로그아웃 중 오류가 발생했습니다:", error.message);
      }
    },
  },
};
</script>

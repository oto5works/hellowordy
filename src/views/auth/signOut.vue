<template>
  <div>
    <h1>로그아웃</h1>
    <button @click="signOut">로그아웃</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isAuthenticated: "firebase/isAuthenticated",
    }),
  },
  methods: {
    ...mapActions({
      setSignOut: "firebase/setSignOut",
    }),
    async signOut() {
      try {
        await this.setSignOut();
        // 로그아웃 후 리다이렉션 등 필요한 작업 수행
        // 예: this.$router.push("/signIn");
      } catch (error) {
        console.error("로그아웃 중 오류가 발생했습니다:", error.message);
      }
    },
  },
  // 사용자가 이미 로그아웃되었을 때 로그아웃 페이지에 접근하지 못하도록 합니다.

};
</script>

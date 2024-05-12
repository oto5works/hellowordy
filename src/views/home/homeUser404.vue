<template>
  <card>
    <div class="rabbit404-image"><rabbit2 /></div>
    <div class="sp_12" />
    <div class="rabbit404-text font-size_13 kr font-weight_400 line-height_130">
      로그인이 되어 있지 않습니다.<br/>
      아래 버튼을 클릭하여 로그인 또는 회원가입을 해주세요.
    </div>
    <div class="sp_24" />
    <buttonOutline class="height_40 pa_16" @click="navigateToAuth()">
      <span class="font-weight_500">로그인/회원가입</span>
    </buttonOutline>
  </card>
</template>

<script>
import rabbit2 from "@/components/icon/rabbit2.vue";

export default {
  components: { rabbit2 },
  data() {
    return {
      shouldRenderFlip: true,
    };
  },
  methods: {
    navigateToAuth() {
      this.$router.push({ name: "auth" });
    },
  },
};
</script>

<style scoped>
.home-card {
  width: 100%;
  background-color: rgb(var(--mio-theme-color-on-background), 0.16);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
}
.rabbit404-image {
  position: relative;
  width: 70%;
  height: auto;
}
.rabbit404-text {
  max-width: 80%;
}
</style>

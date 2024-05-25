<template>
  <div class="headerView">
    <div class="header">
      <div class="header-left">
        <buttonIcon>
          <icon><squares /></icon>
        </buttonIcon>
      </div>
      <div class="header-center">
        <div class="logo" @click="navigateToHome()">
          <logo />
        </div>
      </div>

      <div class="header-right"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import "@/modules/common/header.scss";
import logo from "@/components/icon/logo";
import squares from "@/components/icon/squares";

export default {
  components: {
    logo,
    squares,
  },
  methods: {
    ...mapActions({
      initialize: "filter/initialize",
    }),
    navigateToHome() {
      this.$router.push({ name: "home" });
    },
    navigateToBack() {
      this.$router.go(-1); // 현재 페이지에서 한 단계 뒤로 가는 기능
    },
    handleClickAnki() {
      if (this.anki) {
        this.$router.go(-1);
      } else {
        this.$router.push({ name: "anki" });
      }
    },
  },
};
</script>

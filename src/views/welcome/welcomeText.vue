<template>
  <div class="welcomeText">
    <logo class="logo" />
    
    <div class="font-size_14 font-weight_400 line-height_148 text-align_center opacity_80">
      {{common.message.welcome}}
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import logo from "@/components/logo.vue";

export default {
  components: {
    logo,
  },
  computed: {
    ...mapGetters({
      common: "translations/common",

    }),
  },
};
</script>

<style scoped>
.welcomeText {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
  width: 100%;
  color: rgb(var(--mio-theme-color-on-background));
overflow: hidden;
}
.welcomeText svg {
  width: 42vh;
}
.welcomeText div {
  width: 70%;
}
</style>

<template>
  <div class="welcomeText">
    <logo class="logo" />
    <div class="font-size_18 font-weight_400 line-height_168 text-align_center width_50 opacity_90">
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
  gap: 6%;
  width: 100%;
  height: 40%;
  color: rgb(var(--mio-theme-color-on-background));
overflow: hidden;
}
.welcomeText svg {
  width: 70%;
}
.welcomeText div {
  width: 60%;
}
</style>

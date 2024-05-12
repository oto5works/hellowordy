<template>
  <div class="header">
    <div class="header-left">
      <div v-if="!anki" class="logo" @click="navigateToHome()">
        <logo />
      </div>
      <studyVocabulary v-if="anki" />
    </div>
    <div class="header-right">
      <buttonToggle class="height_32 gap_8 pa_12" :class="{ selected: anki }" @click="handleClickAnki()">
        <icon v-if="anki" class="icon_18"><x/></icon>
       <icon v-else class="icon_18"><anki/></icon>
       <span class="font-size_14 en">Anki</span>
      </buttonToggle>
      <buttonIcon v-if="!anki">
        <icon><squares /></icon>
      </buttonIcon>
      <studyIndex v-if="anki" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import studyVocabulary from "@/views/study/studyVocabulary.vue";
import studyIndex from "@/views/study/studyIndex.vue";

import logo from "@/components/icon/logo";
import caretLeft from "@/components/icon/caretLeft";
import squares from "@/components/icon/squares";
import anki from "@/components/icon/anki";

export default {
  components: { logo, caretLeft, squares, anki, studyVocabulary, studyIndex },
  computed: {
    anki() {
      return this.$route.name === "anki";
    },
  },
  methods: {
    ...mapActions({
      initialize: "filter/initialize",
    }),
    navigateToHome() {
      this.$router.push({ name: "home" });
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

<style scoped>
.header {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--mio-theme-header);
  padding: 0 var(--mio-theme-padding-2);
  color: rgb(var(--mio-theme-color-on-background));
  background-color: rgb(var(--mio-theme-color-background));
  z-index: 1000;
}
.header-left,
.header-right {
  display: flex;
  align-items: center;
  height: 100%;
}
.header-left {
  flex: 1 1 60%;
}
.header-right {
  flex: 1 1 40%;
  gap: 8px;
  justify-content: flex-end;
}
.header .logo {
  width: auto;
  height: 18px;
}
.header .logo svg {
  width: auto;
  height: 100%;
}
.buttonText {
  width: 32px;
  height: 32px;
}
</style>

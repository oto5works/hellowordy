<template>
  <div class="header">
    <div class="header-left">
      <div v-if="!isStudyView" class="logo" @click="navigateToHome()">
        <logo />
      </div>
      <studyVocabulary v-if="isStudyView" />
    </div>
    <div class="header-right">
      <buttonToggle class="height_32 gap_8 pa_12" :class="{ selected: isStudyView }" @click="handleClickAnki()">
        <icon v-if="isStudyView" class="icon_18"><x/></icon>
       <icon v-else class="icon_18"><anki/></icon>
       <span class="font-size_14 en">Anki</span>
      </buttonToggle>
      <buttonIcon v-if="!isStudyView">
        <icon><squares /></icon>
      </buttonIcon>
      <studyIndex v-if="isStudyView" />
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
    // 현재 라우터의 이름을 확인하여 'study'인지 여부를 반환합니다
    isStudyView() {
      return this.$route.name === "studyView";
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
      if (this.isStudyView) {
        this.$router.push({ name: "home" });
      } else {
        this.$router.push({ name: "studyView" });
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
  height: 56px;
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

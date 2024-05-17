<template>
  <div class="headerView">
    <div class="header">
      <div class="header-left">
        <div v-if="!ankiID" class="logo" @click="navigateToHome()">
          <logo />
        </div>
        <buttonIcon v-if="ankiID"  class="back" @click="navigateToBack()">
                  <icon><caretLeft /></icon>
                </buttonIcon>
        <headerAnkiVoca v-if="ankiID" />
      </div>

      
      <div class="header-right">
        <!--
        <buttonToggle
          class="height_32 gap_8 pa_12"
          :class="{ selected: ankiID }"
          @click="handleClickAnki()"
        >
          <icon v-if="ankiID" class="icon_18"><x /></icon>
          <icon v-else class="icon_18"><anki /></icon>
          <span class="font-size_14 en">Anki</span>
        </buttonToggle>
        -->
        <buttonIcon class="menu" v-if="!ankiID">
          <icon><squares /></icon>
        </buttonIcon>
        <headerAnkiIndex class="headerAnkiIndex" v-if="ankiID" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import headerAnkiVoca from "@/modules/common/headerAnkiVoca.vue";
import headerAnkiIndex from "@/modules/common/headerAnkiIndex.vue";

import logo from "@/components/icon/logo";
import caretLeft from "@/components/icon/caretLeft";
import squares from "@/components/icon/squares";
import anki from "@/components/icon/anki";

export default {
  components: { logo, caretLeft, squares, anki, headerAnkiVoca, headerAnkiIndex },
  computed: {
    ankiID() {
      return this.$route.name === "ankiID";
    },
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

<style scoped>
.headerView {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgb(var(--mio-theme-color-background));
  z-index: 1000;
}
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 480px;
  height: var(--mio-theme-header);
  
  color: rgb(var(--mio-theme-color-on-background));
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
  margin-left: var(--mio-theme-padding-2);
}
.header .logo svg {
  width: auto;
  height: 100%;
}
.buttonText {
  width: 32px;
  height: 32px;
}
.headerAnkiIndex {
  margin-right: var(--mio-theme-padding-2);
}
.back {
}
.menu {
  margin-right: var(--mio-theme-padding-1);
}
</style>

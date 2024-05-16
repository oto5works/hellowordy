<template>
  <div class="studyFuctionView">
    <div class="studyFuction">
      <buttonDefault
        class="show --mio-theme-font-family-kr"
        :class="{ selected: showMean || alwaysMean }"
        @click="setShowMean()"
        ><span>가</span></buttonDefault
      >
      <buttonDefault
        class="show --mio-theme-font-family-jp"
        :class="{ selected: showRuby || alwaysRuby }"
        @click="setShowRuby()"
        ><span>あ</span></buttonDefault
      >
      <buttonDefault
        class="show"
        @click="toggleCheckedWordByPayload(this.$route.params.id)"
        :class="{ selected: isChecked }"
        ><icon><check /></icon
      ></buttonDefault>
     
      <buttonDefault class="show dice selected" @click="setRandom()"
        ><icon><dice /></icon
      ></buttonDefault>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dice from "@/components/icon/dice";
import check from "@/components/icon/check";

export default {
  components: { dice, check },
  computed: {
    ...mapGetters({
      showRuby: "study/getShowRuby",
      showMean: "study/getShowMean",

      alwaysRuby: "study/getAlwaysRuby",
      alwaysMean: "study/getAlwaysMean",

      wordID: "study/getWordID",
      checkedWords: "checkedWords/getCheckedWords",
    }),
    isChecked() {
    if (!this.checkedWords) {
      // checkedWords가 undefined 또는 null일 경우, false를 반환
      return false;
    }
    let checkedWordsArray = Object.values(this.checkedWords);
    return checkedWordsArray.some(word => word.wordID === this.wordID);
  },
  },
  methods: {
    ...mapActions({
      setRandom: "study/setRandom",
      setShowMean: "study/setShowMean",
      setShowRuby: "study/setShowRuby",
      toggleCheckedWordByPayload: "checkedWords/toggleCheckedWordByPayload",
    }),
  },
};
</script>
<style scoped>
.studyFuctionView {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  bottom: 32px;
  left: 0;
  z-index: 10;
}
.studyFuction {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 380px;
  padding: 0 var(--mio-theme-padding-1);
}
.show {
  width: 64px;
  height: 64px;
}
.show span {
  font-size: 18px;
  font-weight: 700;
}
.dice svg {
  width: 26px;
  height: 26px;
}
</style>

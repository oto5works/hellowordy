<template>
  <div>
    <buttonDefault class="height_40" @click="setNext()"
      ><span>NEXT</span></buttonDefault
    >
    <buttonDefault class="height_40" @click="setPrevious()"
      ><span>PREVIOUS</span></buttonDefault
    >
    <div class="studyFuction display_flex justify-content_space-between">
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
        @click="toggleCheckedWord()"
        :class="{ selected: isCurrentWordChecked }"
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

      currentWordID: "study/getCurrentWordID",
      checkedWords: "checkedWords/getCheckedWords",
    }),
    isCurrentWordChecked() {
    if (!this.checkedWords) {
      // checkedWords가 undefined 또는 null일 경우, false를 반환
      return false;
    }
    let checkedWordsArray = Object.values(this.checkedWords);
    return checkedWordsArray.some(word => word.wordID === this.currentWordID);
  },
  },
  methods: {
    ...mapActions({
      setNext: "study/setNext",
      setPrevious: "study/setPrevious",
      setRandom: "study/setRandom",
      setShowMean: "study/setShowMean",
      setShowRuby: "study/setShowRuby",
      toggleCheckedWord: "checkedWords/toggleCheckedWord",

    }),
  },
};
</script>
<style scoped>
.studyFuction {
  position: fixed;
  width: 100%;
  bottom: 32px;
  left: 0;
  z-index: 10;
  padding: 0 var(--mio-theme-padding-1);
}
.show {
  width: 72px;
  height: 72px;
}
.show span {
  font-size: 20px;
  font-weight: 700;
}
.dice svg {
  width: 28px;
  height: 28px;
}
</style>

<template>
  <div class="studyFuction">
    <div class="studyFuction-wrap">
      <buttonAnki
        @click="setPrevious()"
        action="previous"
        :disabled="currentIndex === 0"
        :arrow="true"
      />

      <div class="studyFuction-items">
        <ankiIDCheckedButton />

        <buttonAnki
          :class="{ selected: showMean || alwaysMean }"
          @click="setShowMean()"
          action="mean"
        />
        <buttonAnki
          :class="{ selected: showRuby || alwaysRuby }"
          @click="setShowRuby()"
          action="furi"
        />
      </div>

      <buttonAnki
        @click="setNext()"
        action="next"
        :disabled="currentIndex === lastIndex"
        :arrow="true"
      />
    </div>
    <buttonDefault
      :config="true"
      class="gap_8 pa_12 height_32"
      @click="setRandom()"
      ><icon class="icon_18"><shuffle /></icon
      ><span class="font-size_12">shuffle</span></buttonDefault
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import shuffle from "@/components/icon/shuffle";
import ankiIDCheckedButton from "@/views/ankiID/ankiIDCheckedButton.vue";
export default {
  components: {
    shuffle,
    ankiIDCheckedButton,
  },
  computed: {
    ...mapGetters({
      showRuby: "study/getShowRuby",
      showMean: "study/getShowMean",
      alwaysRuby: "study/getAlwaysRuby",
      alwaysMean: "study/getAlwaysMean",
      wordID: "study/getWordID",
      checkedWords: "checkedWords/getCheckedWords",
      currentIndex: "study/getCurrentIndex",
      lastIndex: "study/getLastIndex",
    }),
    isChecked() {
      if (!this.checkedWords) {
        // checkedWords가 undefined 또는 null일 경우, false를 반환
        return false;
      }
      let checkedWordsArray = Object.values(this.checkedWords);
      return checkedWordsArray.some((word) => word.wordID === this.wordID);
    },
  },
  mounted() {
    // 이 컴포넌트가 마운트되었을 때 키보드 이벤트 리스너를 추가합니다.
    document.addEventListener("keyup", this.handleKeyDown);
  },
  beforeDestroy() {
    // 이 컴포넌트가 제거되기 전에 키보드 이벤트 리스너를 제거합니다.
    document.removeEventListener("keyup", this.handleKeyDown);
  },
  methods: {
    ...mapActions({
      setRandom: "study/setRandom",
      setShowMean: "study/setShowMean",
      setShowRuby: "study/setShowRuby",
      toggleCheckedWordByPayload: "checkedWords/toggleCheckedWordByPayload",
      setNext: "study/setNext",
      setPrevious: "study/setPrevious",
    }),
    handleKeyDown(e) {
      e.preventDefault(); // 기본 동작 막기
      if (e.key === "ArrowLeft") {
        this.setPrevious();
      }
      if (e.key === "ArrowRight") {
        this.setNext();
      }
      if (e.key === " ") {
        this.setRandom();
      }
      if (e.key === ".") {
        this.setShowMean();
      }
      if (e.key === "/") {
        this.setShowRuby();
      }
    },
  },
};
</script>
<style scoped>
.studyFuction {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  bottom: 0;
  gap: 3.4vh;
  left: 0px;
  z-index: 10;
  padding: 6vh 0;

  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 70%,
    rgba(255, 255, 255, 0) 100%
  );
}
.studyFuction-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 480px;
  width: 100%;
  padding: 0 var(--mio-theme-padding-2);
}

.studyFuction-items {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>

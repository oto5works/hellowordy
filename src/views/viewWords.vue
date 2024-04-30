<template>
  <div
    class="routerView"
    @touchstart="startSwipe"
    @touchmove="moveSwipe"
    @touchend="endSwipe"
    @mousedown="startSwipe"
    @mousemove="moveSwipe"
    @mouseup="endSwipe"
    @mouseleave="endSwipe"
  >
    <headers />

    <div class="spacing-1" />
    <div class="jp" v-if="!part" @click="setSelectWords">단어가 선택되지 않았어요</div>
    <div class="jp" @click="setClipboard" v-else :class="{ ruby: showRuby }" v-html="word" />

    <div class="spacing-2" />
    <div class="kr">
      <div class="kr-item" v-for="(item, index) in mean" :key="index">
        <h4>{{ index + 1 }}.</h4>
        <h5>{{ showMean ? item : "□□□" }}</h5>
      </div>
    </div>
    <div class="spacing-2" />

    <div class="example">
      <div
        class="example-item"
        v-for="(item, index) in examples"
        :key="index"
      >
        <div
          class="example-jp"
          :class="{ ruby: showRuby }"
          v-html="item.sentence"
        />
        <div v-if="item.translation" class="example-kr">
          {{ showMean ? item.translation : "□□□□□" }}
        </div>
      </div>
    </div>

      <buttonGroup />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import headers from "@/components/headers.vue";
import buttonGroup from "@/components/buttonGroup.vue";

export default {
  components: { buttonGroup, headers },
  mounted() {
    this.handleInitialize();
    document.body.classList.add("no-scroll");
  },
  beforeDestroy() {
    document.body.classList.remove("no-scroll");
  },
  computed: {
    ...mapGetters({
      showRuby: "state/getShowRuby",
      showMean: "state/getShowMean",

      word: "filter/getWord",
      mean: "filter/getMean",
      examples: "filter/getExamples",
      
      category: "words/getCategory",
      part: "words/getPart",

      
    }),
  },
  methods: {
    ...mapActions({
      initialize: "filter/initialize",
      setNext: "filter/setNext",
      setPrevious: "filter/setPrevious",
      setSelectWords: "state/setSelectWords",
      setClipboard: "filter/setClipboard",

      
    }),


    async handleInitialize() {
  await this.initialize();

  // category 또는 part 값이 비어있는지 확인합니다.
  if (!this.category || !this.part) {
    // setSelectWords 함수를 호출합니다.
    // 이때, 필요한 값을 인자로 전달할 수 있습니다.
    // 예제에서는 인자를 전달하지 않는 형태로 남겨두었습니다.
    // 필요한 값을 전달해야 하는 경우에는 해당 값을 적절히 조정하세요.
    this.setSelectWords();
  }
},


    startSwipe(event) {
      if (!this.swipeInProgress) {
        this.swipeInProgress = true;
        this.swipeStartX = event.clientX || event.touches[0].clientX;
      }
    },
    moveSwipe(event) {
      if (this.swipeInProgress) {
        const swipeEndX = event.clientX || event.touches[0].clientX;
        const swipeDiff = swipeEndX - this.swipeStartX;
        if (swipeDiff > 50) {
          this.setPrevious(); // Swipe right, go to previous
          this.swipeInProgress = false; // Reset swipe flag
        } else if (swipeDiff < -50) {
          this.setNext(); // Swipe left, go to next
          this.swipeInProgress = false; // Reset swipe flag
        }
      }
    },
    endSwipe() {
      this.swipeInProgress = false; // Reset swipe flag
    },
  },
  data() {
    return {
      swipeStartX: null,
      swipeInProgress: false,
    };
  },
};
</script>
<style scoped>

.jp {
  position: relative;
  width: 100%;
}
.kr {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}
.kr .kr-item {
  display: flex;
  gap: 6px;
  align-items: center;
}
.example {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
.example .example-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.hihi {
  position: absolute;
  width: 100%;
  height: auto;
  top: 0;
  border: 1px solid aqua;

}
</style>

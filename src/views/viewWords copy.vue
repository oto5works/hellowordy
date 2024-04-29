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
    <div class="jp" :class="{ ruby: state.showRuby }" v-html="state.japanese" />
    <div class="spacing-2" />
    <div class="kr">
      <div class="kr-item" v-for="(item, index) in state.korean" :key="index">
        <h4>{{ index + 1 }}.</h4>
        <h5>{{ state.showKr ? item : "□□□" }}</h5>
      </div>
    </div>
    <div class="spacing-2" />

    <div class="example">
      <div
        class="example-item"
        v-for="(item, index) in state.examples"
        :key="index"
      >
        <div
          class="example-jp"
          :class="{ ruby: state.showRuby }"
          v-html="item.japanese"
        />
        <div v-if="item.korean" class="example-kr">
          {{ state.showKr ? item.korean : "□□□□□" }}
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
      state: "getState",
    }),
  },
  methods: {
    ...mapActions(["setRandom", "fetchWords", "setNext", "setPrevious"]),

    async handleInitialize() {
      await this.fetchWords();
      this.setRandom(); // call handleConvert() after initialize() completes
    },
    handleNext() {
      this.setNext();
    },
    handlePrevious() {
      this.setPrevious();
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
          this.handlePrevious(); // Swipe right, go to previous
          this.swipeInProgress = false; // Reset swipe flag
        } else if (swipeDiff < -50) {
          this.handleNext(); // Swipe left, go to next
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

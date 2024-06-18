<template>
  <div class="ankiIDExample" v-if="examples.length !== 0 || originExamples.length !== 0">
    <div
      class="examples"
      v-for="item in showRuby || alwaysRuby ? examples : originExamples"
      :key="item.id"
      :examples="item"
    >
      <div class="examples-item">
        <div class="sentence" v-html="item.sentence"></div>
        <div class="translation" :class="{ showMean: showMean || alwaysMean }">
          {{ item.translation }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      originExamples: "study/getOriginExamples",
      examples: "study/getExamples",
      showRuby: "study/getShowRuby",
      showMean: "study/getShowMean",
      alwaysRuby: "study/getAlwaysRuby",
      alwaysMean: "study/getAlwaysMean",
    }),
  },
};
</script>

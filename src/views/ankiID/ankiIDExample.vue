<template>
  <div class="ankiIDExample">
    <div
      class="examples"
      v-for="item in examples"
      :key="item.id"
      :examples="item"
    >
      <div class="examples-item">
        <div v-if="showRuby || alwaysRuby" class="sentence" v-html="item.sentence"></div>

        <div v-else class="sentence">
          {{ item.originalSentence }}
        </div>
        <div v-if="showMean || alwaysMean" class="translation">
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
      examples: "study/getExamples",
      showRuby: "study/getShowRuby",
      showMean: "study/getShowMean",
      alwaysRuby: "study/getAlwaysRuby",
      alwaysMean: "study/getAlwaysMean",
    }),
  },
};
</script>

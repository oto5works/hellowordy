<template>
  <div>
    <div class="spacing-1" />
    <ankiIDIndex />
    <div class="spacing-2" />
    <ankiIDWord />
    <div class="spacing-3" />
    <ankiIDExample />
    <div class="spacing-4" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ankiIDIndex from "@/views/ankiID/ankiIDIndex.vue";

import ankiIDWord from "@/views/ankiID/ankiIDWord.vue";
import ankiIDExample from "@/views/ankiID/ankiIDExample.vue";

import "@/views/ankiID/ankiID.scss";

export default {
  components: { ankiIDIndex, ankiIDWord, ankiIDExample },
  computed: {
    ...mapGetters({
      wordID: "study/getWordID",
      word: "study/getWord",
      mean: "study/getMean",
      examples: "study/getExamples",
      showRuby: "study/getShowRuby",
      showMean: "study/getShowMean",
      alwaysRuby: "study/getAlwaysRuby",
      alwaysMean: "study/getAlwaysMean",
    }),
  },
  methods: {
    ...mapActions({
      //updateCurrentVocaID: "study/updateCurrentVocaID",
    }),
  },
};
</script>

<style scoped>
.spacing-1 {
  height: 3vh;
}
.spacing-2 {
  height: 12.4vh;
}
.spacing-3 {
  height: 8.8vh;
}
.spacing-4 {
  height: 32vh;
}
</style>
<template>
  <div>
    <ankiIDWord />

    <div class="sp_80" />
    <ankiIDExample />
    <div class="sp_24" />
    <ankiIDFooter />

    <div class="sp_128" />
    <div class="sp_128" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ankiIDWord from "@/views/ankiID/ankiIDWord.vue";
import ankiIDFooter from "@/views/ankiID/ankiIDFooter.vue";
import ankiIDExample from "@/views/ankiID/ankiIDExample.vue";

import "@/views/ankiID/ankiID.scss";

export default {
  components: { ankiIDWord, ankiIDFooter, ankiIDExample },
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

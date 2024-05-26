<template>
  <div>
    <ankiIDIndex />
    <div class="sp_56"/>

    <ankiIDWord />

    <div class="sp_80" />
    <ankiIDExample />
    <div class="sp_24" />
    <ankiIDFooter />

    <div class="sp_128" />
    <div class="sp_64" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ankiIDIndex from "@/views/ankiID/ankiIDIndex.vue";

import ankiIDWord from "@/views/ankiID/ankiIDWord.vue";
import ankiIDFooter from "@/views/ankiID/ankiIDFooter.vue";
import ankiIDExample from "@/views/ankiID/ankiIDExample.vue";

import "@/views/ankiID/ankiID.scss";

export default {
  components: { ankiIDIndex, ankiIDWord, ankiIDFooter, ankiIDExample },
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

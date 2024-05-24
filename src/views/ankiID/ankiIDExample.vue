<template>
  <div v-if="examples.length !== 0">
    <ul class="japanese">
      <li
        class="examples"
        v-for="item in examples"
        :key="item.id"
        :examples="item"
      >
        <div
          class="sentence"
          :class="{ showRuby: showRuby || alwaysRuby }"
          v-html="item.sentence"
        ></div>
        <div class="sp_2" />
        <div class="translation" :class="{ showMean: showMean || alwaysMean }">
          {{ item.translation }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},
  computed: {
    ...mapGetters({
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
.card {
  align-items: flex-start;
  padding-left: 4px;
}



</style>

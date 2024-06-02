<template>
  <div class="ankiIDExample" v-if="examples.length !== 0">
    <div
      class="examples"
      v-for="item in examples"
      :key="item.id"
      :examples="item"
    >
    <!--
     <div class="star"><icon class="icon_16"><star /></icon></div> 
     -->
      <div class="examples-item">
        <div
          class="sentence"
          :class="{ showRuby: showRuby || alwaysRuby }"
          v-html="item.sentence"
        ></div>
        <div class="sp_2" />
        <div class="translation" :class="{ showMean: showMean || alwaysMean }">
          {{ showMean || alwaysMean ? item.translation : "----" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import star from "@/components/icon/star";

export default {
  components: { star },
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

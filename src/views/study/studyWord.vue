<template>
  <div>
    <div class="word" :class="{ showRuby: showRuby || alwaysRuby }" v-html="word" />
    <div class="sp_12" />
    <div class="display_flex flex-wrap_wrap gap_12">
      <div
        class="mean display_flex align-items_center gap_4"
        v-for="(item, index) in mean"
        :key="index"
      >
        <div class="font-size_12 en font-weight_700">{{ index + 1 }}.</div>
        <div class="item" :class="{ showMean: showMean || alwaysMean  }" >{{ item }}</div>
      </div>
    </div>
    <div class="sp_32" />
    <div class="display_flex flex-direction_column gap_8">
      <div
        class="examples"
        v-for="item in examples"
        :key="item.id"
        :examples="item"
      >
        <div class="sentence" :class="{ showRuby: showRuby || alwaysRuby }" v-html="item.sentence"></div>
        <div class="translation" :class="{ showMean: showMean || alwaysMean }">
          {{ item.translation }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},
  computed: {
    ...mapGetters({
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
      //updateCurrentVocabularyID: "study/updateCurrentVocabularyID",
    }),
  },
};
</script>
<style scoped>
.mean {
  font-family: var(--mio-theme-font-family-kr);
}
.mean .item,
.translation {
  color: rgb(var(--mio-theme-color-primary));
  background-color: rgb(var(--mio-theme-color-primary));
  border-radius: 24px;
  padding: 0 2px;
}
.mean .item.showMean,
.translation.showMean {
  color: rgb(var(--mio-theme-color-on-background));
  background-color: unset;
}
.translation {
  font-family: var(--mio-theme-font-family-kr);
  font-weight: 400;
  width: fit-content;
  line-height: 130%;
  font-size: 13px;
}
</style>
<style>
.word {
  font-family: var(--mio-theme-font-family-jp);
  font-weight: 700;
  font-size: 48px;
  line-height: 130%;
}
.word ruby > rt {
  opacity: 0;
  font-weight: 400;
  font-size: 15px;
  line-height: 120%;
  color: rgb(var(--mio-theme-color-primary));
  transition: all 0.2s ease-in-out;
}
.word.showRuby rt {
  opacity: 1;
}
.sentence {
  font-family: var(--mio-theme-font-family-jp);
  font-weight: 500;
  line-height: 130%;
  font-size: 16px;
  color: rgb(var(--mio-theme-color-on-background));
}
.sentence ruby > rt {
  opacity: 0;
  margin-top: 1px;
  font-weight: 400;
  font-size: 11px;
  line-height: 100%;
  color: rgb(var(--mio-theme-color-primary));
  transition: all 0.2s ease-in-out;
}
.sentence.showRuby rt {
  opacity: 1;
}

</style>

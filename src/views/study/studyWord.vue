<template>
  <div>
    <div class="word" :class="{ showRuby: showRuby || alwaysRuby }" v-html="word" />
    <div class="sp_12" />
    <div class="display_flex flex-wrap_wrap gap_12">
      <div
        class="mean display_flex gap_4"
        v-for="(item, index) in mean"
        :key="index"
      >
        <div class="font-size_12 font-weight_700">{{ index + 1 }}.</div>
        <div class="item" :class="{ showMean: showMean || alwaysMean  }" >{{ item }}</div>
      </div>
    </div>
    <div class="sp_24" />
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
  color: rgb(var(--mio-theme-color-on-background));
}
.mean .item {
  background-color: rgba(var(--mio-theme-color-on-background), 1);
  transition: all 0.2s ease-in-out;
}
.mean .item.showMean {
  background-color: rgba(var(--mio-theme-color-on-background), 0);
}
.translation {
  font-family: var(--mio-theme-font-family-kr);
  font-weight: 400;
  width: fit-content;
  line-height: 130%;
  font-size: 13px;
  background-color: rgba(var(--mio-theme-color-on-background), 1);
}
.translation.showMean {
  background-color: rgba(var(--mio-theme-color-on-background), 0);
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

<template>
  <div class="ankiIDWord">
    <div class="card">
      <div class="content">
        <div class="item">
          <div
            class="word"
            :class="{ showRuby: showRuby || alwaysRuby }"
            v-html="word"
          />
          <div class="sp_8" />
          <div class="display_flex flex-wrap_wrap gap_8 justify-content_center">
            <div
              class="mean display_flex align-items_center gap_2"
              v-for="(item, index) in mean"
              :key="index"
            >
              <div class="index">
                {{ index + 1 }}
              </div>
              <div class="item" :class="{ showMean: showMean || alwaysMean }">
                {{ showMean || alwaysMean ? item : '----' }}
              </div>
            </div>
          </div>
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
      showRuby: "study/getShowRuby",
      showMean: "study/getShowMean",
      alwaysRuby: "study/getAlwaysRuby",
      alwaysMean: "study/getAlwaysMean",
    }),
  },
  methods: {},
};
</script>
<style scoped>
.ankiIDWord {
  padding: 0 var(--mio-theme-padding-2);
}
</style>
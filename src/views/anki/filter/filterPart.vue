<template>
  <buttonDefault class="flex-direction_column height_56 width_100 pa_32 gap_4">
    <div class="display_flex align-items_flex-end justify-content_space-between width_100">
      <div class="font-size_14">Part {{ part + 1 }}</div>
      <div class="font-size_14">{{ matchedWords.length }} / {{ total }}</div>
    </div>

    <div class="progress-bar">
      <div class="progress" :style="{ width: progressWidth }"></div>
    </div>
  </buttonDefault>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  props: {
    part: { type: Number },
    total: { type: Number },
  },
  computed: {
    ...mapGetters({
      checkedWords: "checkedWords/getCheckedWords",
      filteredWords: "filter/getFilteredWords",
    }),
    matchedWords() {
      // checkedWords, filteredWords, part가 모두 정의되어 있는지 확인
      if (
        !this.checkedWords ||
        !this.filteredWords ||
        typeof this.part === "undefined"
      ) {
        return [];
      }

      // checkedWords에서 wordID만 추출
      const checkedWordIDs = Object.values(this.checkedWords).map(
        (item) => item.wordID
      );

      // part가 정의되지 않았거나 filteredWords에 part가 없는 경우 빈 배열 반환
      if (!this.filteredWords[this.part]) {
        return [];
      }

      // filteredWords[part]에서 checkedWordIDs에 포함된 항목만 필터링
      return this.filteredWords[this.part].filter((word) =>
        checkedWordIDs.includes(word.id)
      );
    },
    progressWidth() {
      const progress = this.matchedWords.length / this.total;
      return `${Math.min(100, progress * 100)}%`; // 최대 100%
    },
  },
  methods: {
    ...mapActions({
      getCheckedWordsByCurrentVocaID:
        "checkedWords/getCheckedWordsByCurrentVocaID",
    }),
  },
};
</script>
<style>
.progress-bar {
  width: 100%;
  background-color: rgba(var(--mio-theme-color-on-background), 0.4);
  border-radius: 4px;
}
.progress {
  background-color: rgba(var(--mio-theme-color-on-background), 1);
  height: 4px;
  border-radius: 4px;
}

</style>

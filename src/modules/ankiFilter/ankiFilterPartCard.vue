<template>
  <buttonCard class="card">
    <div class="content">
      <div class="index">Part {{ part + 1 }}</div>

      <div
        class="item"
      >
        <div class="word">
          {{ this.filteredWords[this.part][0].word }} ~
        </div>
        <div class="mean">
          <div class="font-size_12 line-height_100">
            {{ matchedWords.length }} / {{ total }}
          </div>
          <div class="sp_2"/>
          <div class="progress-bar">
            <div class="progress" :style="{ width: progressWidth }"></div>
            <div class="underlay"/>
          </div>
        </div>
      </div>
    </div>
  </buttonCard>
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

<style scoped>
.card {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 24px;
}
.card .content {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}
.card.selected .index {
  color: currentColor;
}
.card .index {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  font-family: var(--mio-theme-font-family-en);
  color: rgb(var(--mio-theme-color-primary));
}
.card .item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  transform: translateY(12%);
  width: 100%;
}
.card .word {
  font-family: var(--mio-theme-font-family-jp);
  font-weight: 700;
  font-size: 20px;
  line-height: 120%;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  height: fit-content;
}
.card .mean {
  text-align: center;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  font-size: 13px;
  opacity: 0.6;
  font-weight: 400;
  font-family: var(--mio-theme-font-family-kr);
}
.progress-bar {
  position: relative;
  width: 100%;
  height: 4px;
  border-radius: 4px;
}
.progress {
  background-color: currentColor;
  height: 4px;
  border-radius: 4px;
  z-index: 2;
}
.progress-bar .underlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: currentColor;
  border-radius: inherit;
  opacity: 0.4;
}
</style>

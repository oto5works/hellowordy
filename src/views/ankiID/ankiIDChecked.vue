<template>
  <div class="display_flex align-items_center gap_8" @click="dialog = true">
    <div class="font-size_14 kr font-weight_500">학습한 단어</div>
    <div class="font-size_15 en font-weight_700 length">
      {{ matchedWords.length }}
    </div>

    <!-- 
        <li v-for="word in matchedWords" :key="word.id">{{ word }}</li>
-->

    <ankiIDCheckedDialog
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
      :checkedWords = matchedWords
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { defineAsyncComponent } from "vue";

export default {
  components: {
    ankiIDCheckedDialog: defineAsyncComponent(() =>
      import("@/views/ankiID/ankiIDCheckedDialog.vue")
    ),
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
      checkedWords: "checkedWords/getCheckedWords",
      filteredWords: "filter/getFilteredWords",
      part: "study/getPart",
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
  },
  created() {
    // this.getCheckedWordsByCurrentVocaID();
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
.length {
  color: rgb(var(--mio-theme-color-primary));
}
</style>

<template>
  <div class="ankiIDHeaderChecked" @click="dialog = true">
    <buttonIcon>
      <icon><checkList /></icon>
    </buttonIcon>

    <div class="length">
      {{ matchedWords.length }}
    </div>
    <checkedWordsDialog
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
      :checkedWords="matchedWords"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { defineAsyncComponent } from "vue";
import checkList from "@/components/icon/checkList";

export default {
  components: {
    checkList,
    checkedWordsDialog: defineAsyncComponent(() =>
      import("@/modules/checkedWords/checkedWordsDialog.vue")
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
.ankiIDHeaderChecked {
  position: relative;
  width: 48px;
  height: 48px;
}
.length {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  min-width: 16px;
  height: 16px;
  font-size: 9px;
  padding: 2px 0;
  border-radius: 24px;
  color: rgb(var(--mio-theme-color-on-primary));
  background-color: rgb(var(--mio-theme-color-primary));
  z-index: 2;
}
</style>

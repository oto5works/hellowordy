<template>
  <div >
    <li v-for="word in matchedWords" :key="word.id">{{ word }}</li>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  computed: {
    ...mapGetters({
      checkedWords: "checkedWords/getCheckedWords",
      filteredWords: "filter/getFilteredWords",
      part: "study/getPart",
      
    }),
    matchedWords() {
    // checkedWords, filteredWords, part가 모두 정의되어 있는지 확인
    if (!this.checkedWords || !this.filteredWords || typeof this.part === 'undefined') {
      return [];
    }

    // checkedWords에서 wordID만 추출
    const checkedWordIDs = Object.values(this.checkedWords).map(item => item.wordID);

    // part가 정의되지 않았거나 filteredWords에 part가 없는 경우 빈 배열 반환
    if (!this.filteredWords[this.part]) {
      return [];
    }

    // filteredWords[part]에서 checkedWordIDs에 포함된 항목만 필터링
    return this.filteredWords[this.part].filter(word => checkedWordIDs.includes(word.id));
  }
  },
  created() {
    // this.getCheckedWordsByCurrentVocabularyID();
  },
  methods: {
    ...mapActions({
      getCheckedWordsByCurrentVocabularyID:
        "checkedWords/getCheckedWordsByCurrentVocabularyID",
    }),
  },
};
</script>

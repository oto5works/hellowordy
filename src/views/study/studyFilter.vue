<template>
  <div class="vocabulary-list">
    <div class="vocabulary-1 display_flex flex-direction_column gap_4">
      <buttonDefault
        v-for="item in vocabularies"
        :key="item.id"
        @click="handleFetchWords(item.id)"
        class="height_64 width_100"
        :class="{ selected: item.id === currentVocabularyID }"
        ><span>Part {{ item.title }}</span></buttonDefault
      >
    </div>

    <div class="vocabulary-2 display_flex flex-direction_column gap_4">
      <div v-for="item in partOptions" :key="`part-${item}`">
        <buttonDefault
          class="height_40 width_100"
          :class="{ selected: item === part }"
          @click="handleUpdatePart(item)"
          ><span>Part {{ item }}</span></buttonDefault
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  computed: {
    ...mapGetters({
      vocabularies: "vocabularies/getVocabularies",
      currentVocabularyID: "vocabularies/getCurrentVocabularyID",
      words: "words/getWords",
      part: "filter/getPart",
    }),

    partOptions() {
      if (this.words && this.words.length > 0) {
        const partsCount = Math.ceil(this.words.length / 50);
        return Array.from({ length: partsCount }, (_, i) => i + 1);
      } else {
        return [];
      }
    },
  },

  methods: {
    ...mapActions({
      updateCurrentVocabularyID: "vocabularies/updateCurrentVocabularyID",
      fetchWords: "words/fetchWords",
      setPart: "filter/setPart",
      initializeStudy: "study/initializeStudy",
      getVocabularyByCurrentVocabularyID:
        "vocabularies/getVocabularyByCurrentVocabularyID",
        setShowFilter: "filter/setShowFilter",
    }),
    handleFetchWords(vocabularyID) {
      this.updateCurrentVocabularyID(vocabularyID);
      this.getVocabularyByCurrentVocabularyID();
      this.setPart(null);
      this.fetchWords();
    },

    async handleUpdatePart(item) {
      await this.setPart(item);
      await this.initializeStudy();
      this.setShowFilter()
    },
  },
};
</script>

<style scoped>
.vocabulary-list {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
}

.vocabulary-1,
.vocabulary-2 {
  position: relative;
  flex: 1 1 50%;
  height: 100%;
  overflow: auto;
}
</style>

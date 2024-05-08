<template>
  <div class="vocabulary-list">
    <div class="vocabulary-1 display_flex flex-direction_column gap_4">
      <div class="sp_120"/>
      <buttonDefault
        v-for="item in vocabularies"
        :key="item.id"
        @click="handleFetchWords(item.id)"
        class="height_64 width_100"
        :class="{ selected: item.id === currentVocabularyID }"
        ><span>{{ item.title }}</span></buttonDefault
      >
    </div>
    <div class="vocabulary-2 display_flex flex-direction_column gap_4">
      <div class="sp_80"/>
      <studyFilterPartSize />
      <studyFilterPart
        v-for="(wordsInPart, index) in filteredWords"
        :key="index"
        @click="handleUpdatePart(index)"
        :class="{ selected: index === part }"
        :part="index"
        :total="wordsInPart.length"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import studyFilterPart from "@/views/study/studyFilterPart.vue";
import studyFilterPartSize from "@/views/study/studyFilterPartSize.vue";


export default {
  components: { studyFilterPart, studyFilterPartSize },
  computed: {
    ...mapGetters({
      vocabularies: "vocabularies/getVocabularies",
      currentVocabularyID: "vocabularies/getCurrentVocabularyID",
      words: "words/getWords",
      part: "study/getPart",
      filteredWords: "filter/getFilteredWords",
    }),
  },

  methods: {
    ...mapActions({
      updateCurrentVocabularyID: "vocabularies/updateCurrentVocabularyID",
      fetchWords: "words/fetchWords",
      fetchFilterWords: "filter/fetchFilterWords",

      setPart: "study/setPart",
      initializeStudy: "study/initializeStudy",
      getVocabularyByCurrentVocabularyID:
        "vocabularies/getVocabularyByCurrentVocabularyID",
      setShowFilter: "filter/setShowFilter",
      getCheckedWordsByCurrentVocabularyID:
        "checkedWords/getCheckedWordsByCurrentVocabularyID",
    }),
    async handleFetchWords(vocabularyID) {
      console.log("@CLIENT: handleFetchWords!", vocabularyID);
      this.setPart(null);
      await this.updateCurrentVocabularyID(vocabularyID);
      await this.getVocabularyByCurrentVocabularyID();
      await this.fetchWords();
      await this.fetchFilterWords();
      await this.getCheckedWordsByCurrentVocabularyID();
    },

    async handleUpdatePart(item) {
      await this.setPart(item);
      await this.initializeStudy();
      this.setShowFilter();
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

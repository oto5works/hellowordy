<template>
  <div class="vocabulary-list">
    <div>userID: {{ userID }}</div>
    <div>currentVocabularyID: {{ currentVocabularyID }}</div>
    <div>currentWordID: {{ currentWordID }}</div>
    <div>part: {{ part }}</div>
    <div>currentIndex: {{ currentIndex }}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  computed: {
    ...mapGetters({
      userID: "users/getUserID",
      currentVocabularyID: "vocabularies/getCurrentVocabularyID",
      part: "study/getPart",
      currentWordID: "study/getCurrentWordID",
      currentIndex: "study/getCurrentIndex",
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
    }),
    async handleFetchWords(vocabularyID) {
      console.log("@CLIENT: handleFetchWords!", vocabularyID);
      this.setPart(null);
      await this.updateCurrentVocabularyID(vocabularyID);
      await this.getVocabularyByCurrentVocabularyID();
      await this.fetchWords();
      await this.fetchFilterWords();
    },

    async handleUpdatePart(item) {
      await this.setPart(item);
      await this.initializeStudy();
      this.setShowFilter();
    },
  },
};
</script>

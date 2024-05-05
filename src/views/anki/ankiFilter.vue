<template>
  <div class="vocabulary-filter">
    <div class="vocabulary-list">
      <div class="vocabulary-1">
        <div
          v-for="item in vocabularies"
          :key="item.id"
          @click="handleFetchWords(item.id)"
        >
          <div>id: {{ item.id }}</div>
          <div>{{ item.title }}</div>
        </div>
      </div>

      <div class="vocabulary-2">
        <div v-for="item in partOptions" :key="`part-${item}`">
          <button @click="updatePart(item)">Part {{ item }}</button>
        </div>
      </div>
    </div>
    <div class="vocabulary-word">
      <div>currentVocabularyID::: {{ currentVocabularyID }}</div>
      <div>words:::{{ words }}</div>
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
    }),

    partOptions() {
      if (this.words && this.words.length > 0) {
        const partsCount = Math.ceil(this.words.length / 10);
        return Array.from({ length: partsCount }, (_, i) => i + 1);
      } else {
        return [];
      }
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapActions({
      initializeKuroshiro: "kuroshiro/initializeKuroshiro",
      fetchUserVocabularies: "vocabularies/fetchUserVocabularies",
      updateCurrentVocabularyID: "vocabularies/updateCurrentVocabularyID",
      fetchWords: "words/fetchWords",
    }),
    handleFetchWords(vocabularyID) {
      this.updateCurrentVocabularyID(vocabularyID);
      this.fetchWords();
    },
    async initialize() {
      await this.fetchUserVocabularies();
      await this.initializeKuroshiro();
    },
  },
};
</script>

<style scoped>
.vocabulary-filter {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: aqua;
}

.vocabulary-list {
  position: relative;
  display: flex;
  width: 100%;
  height: 60%;
  background: aqua;
}

.vocabulary-1,
.vocabulary-2 {
  position: relative;
  flex: 1 1 50%;
  height: 100%;
  overflow: auto;
  border: 1px solid black;
}

.vocabulary-word {
  position: relative;
  width: 100%;
  height: 40%;
  background: yellow;
}
</style>

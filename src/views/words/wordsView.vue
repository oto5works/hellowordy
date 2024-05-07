<template>
  <div class="words-view">
    <vocabulariesCurrentInfo />
    <div class="sp_24"/>
    <wordsButton />
    <div class="sp_12"/>

    <div class="words-list">
      <wordsCard v-for="item in words" :key="item.id" :word="item" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import wordsCard from "@/views/words/wordsCard.vue";
import wordsButton from "@/views/words/wordsButton.vue";
import vocabulariesCurrentInfo from "@/views/vocabularies/vocabulariesCurrentInfo.vue";

export default {
  components: {
    wordsCard,
    wordsButton, vocabulariesCurrentInfo
  },
  computed: {
    ...mapGetters({
      words: "words/getWords",
      currentVocabulary: "words/getWords",

    }),
    vocabularyID() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions({
      fetchWords: "words/fetchWords",
      resetWords: "words/resetWords",
      updateCurrentVocabularyID: "vocabularies/updateCurrentVocabularyID",
      resetCurrentVocabularyID: "vocabularies/resetCurrentVocabularyID",
    }),
  },
  created() {
    this.updateCurrentVocabularyID(this.vocabularyID);

    this.fetchWords();
  },
  beforeRouteLeave(to, from, next) {
    this.resetCurrentVocabularyID(); // 페이지를 떠날 때 선택된 단어장의 ID를 null로 설정
    this.resetWords(); // 페이지를 떠날 때 선택된 단어장의 ID를 null로 설정
    next();
  },
};
</script>
<style scoped>
.words-view {
  padding: 16px;
}
.words-list {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
</style>
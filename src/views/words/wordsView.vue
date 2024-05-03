<template>
  <div>
    <wordsButton />
    <h2>단어장</h2>
    <wordsCard
      v-for="item in words"
      :key="item.id"
      :word="item"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import wordsCard from "@/views/words/wordsCard.vue";
import wordsButton from "@/views/words/wordsButton.vue";

export default {
  components: {
    wordsCard,
    wordsButton,
  },
  computed: {
    ...mapGetters({
      words: "words/getWords",
    }),
    vocabularyID() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions({
      fetchWords: "words/fetchWords",
      updateCurrentVocabularyID: "vocabularies/updateCurrentVocabularyID",

    }),
  },
  created() {
    this.updateCurrentVocabularyID(this.vocabularyID);

    this.fetchWords(this.vocabularyID);
  },
};
</script>
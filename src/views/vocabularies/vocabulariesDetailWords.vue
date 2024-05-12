<template>
  <div class="routerView">
    <vocabulariesCurrentInfo />
    <div class="sp_24" />
    <wordsButton />
    <div class="sp_12" />
    <div class="words-list">
      <wordsCard v-for="item in words" :key="item.id" :word="item" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import wordsCard from "@/views/words/wordsCard.vue";

export default {
  components: {
    wordsCard,
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "users/isAuthenticated",
      userID: "users/getUserID",
    }),
    vocabularyID() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      words: [],
    };
  },
  created() {
    this.fetchWords();
  },
  watch: {
    vocabularyID(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchWords();
      }
    },
  },
  methods: {
    ...mapActions({
      returnWordsByPayload: "words/returnWordsByPayload",
    }),
    async fetchWords() {
      try {
        const wordsData = await this.returnWordsByPayload(this.vocabularyID);
        if (wordsData) {
          this.words = wordsData;
        } else {
          alert("단어장을 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("단어장을 가져오는 중 오류가 발생했습니다:", error);
      }
    },
  },
};
</script>
<style scoped>
.words-list {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
</style>

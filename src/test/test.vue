<template>
  <div>
    <div class="sp_80"/>
    <button @click="generateWord">단어 생성</button>
    <div>
      <p>{{ isLoading }}</p>
      <p>{{ word.partOfSpeech }}</p>
      <p>{{ word.word }}</p>
      <p>{{ word.reading }}</p>
      <p>{{ word.meaning }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  created() {
   this.generateWord();
  },
  data() {
    return {
      dialog: false,
      searchTerm: '',
    };
  },
  computed: {
    ...mapGetters({
      word: "wordData/getWord",
      isLoading: "status/isLoading",

    }),
  },
  methods: {
    ...mapActions({
      generateWord: "wordData/generateWord",
    }),
  }
};
</script>
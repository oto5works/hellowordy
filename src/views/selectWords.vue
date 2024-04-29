<template>
  <modalDialog :dialog="selectWords" @update:dialog="updateDialog">
    <p>category: {{ category }} part: {{ part }}</p>

    <div v-for="(value, index) in categoryOptions" :key="index">
      <button @click="updateCategory(value)">{{ value }}</button>
    </div>
    <div v-for="part in partOptions" :key="`part-${part}`">
      <button @click="updatePart(part)">Part {{ part }}</button>
    </div>
    <p>{{ words.length }}</p>
    {{ filteredWords }}
  </modalDialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  computed: {
    ...mapGetters({
      selectWords: "state/getSelectWords",
      categoryOptions: "words/getCategoryOptions",
      category: "words/getCategory",
      part: "words/getPart",
      words: "words/getWords",
      filteredWords: "filter/getFilteredWords",
    }),
    partOptions() {
      const partsCount = Math.ceil(this.words.length / 10);
      return Array.from({ length: partsCount }, (_, i) => i + 1);
    },
  },
  methods: {
    ...mapActions({
      setSelectWords: "state/setSelectWords",
      fetchWords: "words/fetchWords",
      setCategory: "words/setCategory",
      setPart: "words/setPart",
    }),
    updateDialog(value) {
      this.setSelectWords();
    },
    updateCategory(value) {
      this.setCategory(value); // Dispatch the setCategory action with the option as payload
       this.fetchWords();
    },
    updatePart(value) {
      console.log ('눌러요', value)
      this.setPart(value); // Dispatch the setCategory action with the option as payload
    },
  },
};
</script>





<template>
  <bottomDialog title="단어 선택" :dialog="searchWords" @update:dialog="updateDialog">
    
    <iframe :src="`https://ja.dict.naver.com/#/mini/search?query=${searchWord}`" width="100%" height="100%"></iframe>

   
  </bottomDialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";


export default {
  components: {},
  computed: {
    ...mapGetters({
      searchWords: "state/getSearchWords",
      searchWord: "state/getSearchWord",
    }),
  },
  methods: {
    ...mapActions({
      setSearchWords: "state/setSearchWords",
    }),
    updateDialog(value) {
      this.setSearchWords();
    },
  },
};
</script>

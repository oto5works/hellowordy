



<template>
  <fullDialog title="단어 선택" :dialog="searchWords" @update:dialog="updateDialog">
    
    <iframe src="https://ja.dict.naver.com/#/main" width="100%" height="100%"></iframe>

   
  </fullDialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  computed: {
    ...mapGetters({
      searchWords: "state/getSearchWords",
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

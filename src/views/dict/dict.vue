<template>
  <fullDialog
    title="단어 선택"
    :dialog="showDict"
    @update:dialog="updateDialog"
  >
  <div class="sp_48"/>
    <iframe
      :src="`https://ja.dict.naver.com/#/mini/search?query=${word}`"
      width="100%"
      height="100%"
    ></iframe>
  </fullDialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  props: {
    word: { type: String },
  },
  computed: {
    ...mapGetters({
      showDict: "study/getShowDict",
    }),
  },
  methods: {
    ...mapActions({
      setShowDict: "study/setShowDict",
    }),
    updateDialog(value) {
      this.setShowDict();
    },
  },
};
</script>

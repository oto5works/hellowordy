<template>
  <fullDialog
    title="단어 선택"
    :dialog="showDict"
    @update:dialog="updateDialog"
  >
    <div class="sp_48"/>
    <object
      :data="`https://ja.dict.naver.com/#/mini/search?query=${word}`"
      width="100%"
      height="100%"
      type="text/html">
      <!-- 대체 컨텐츠 -->
      <p>페이지를 표시할 수 없습니다.</p>
    </object>
  </fullDialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  props: {
    word: { type: String, default: '' },
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
      this.setShowDict(value);
    },
  },
};
</script>

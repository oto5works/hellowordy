<template>
  <modalDialog :dialog="dialog" @update:dialog="updateDialog">
    <button @click="handleUpdateWord()">수정</button>
    <button @click="handleDeleteWord()">삭제</button>
    <wordsForm
      v-if="appDialog"
      :dialog="appDialog"
      @update:dialog="appDialog = $event"
      @close="updateDialog(false)"
    />
  </modalDialog>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions } from "vuex";

export default {
  components: {
    wordsForm: defineAsyncComponent(() =>
      import("@/views/words/wordsForm.vue")
    ),
  },
  props: {
    dialog: { type: Boolean },
    wordID: { type: String },
  },
  data() {
    return {
      appDialog: false,
    };
  },
  methods: {
    ...mapActions({
      deleteCurrentWordID: "words/deleteCurrentWordID",
      updateCurrentWordID: "words/updateCurrentWordID",
    }),
    async handleDeleteWord() {
      try {
        // Vuex 액션을 통해 단어장을 삭제합니다.
        const wordID = this.wordID;
        this.updateCurrentWordID(wordID);
        await this.deleteCurrentWordID(); // 'wordId'로 수정
        // 단어장 목록을 최신 상태로 갱신합니다.
        alert("단어장이 삭제.");
      } catch (error) {
        console.error("단어장 삭제 중 오류 발생:", error);
      }
    },
    handleUpdateWord() {
      const wordID = this.wordID;
      this.updateCurrentWordID(wordID);
      this.appDialog = true;
      //this.updateDialog(false);
    },
    updateDialog(value) {
      console.log("닫아요");
      this.$emit("update:dialog", value);
    },
  },
};
</script>

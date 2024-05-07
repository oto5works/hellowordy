<template>
  <modalDialog :dialog="dialog" @update:dialog="updateDialog">
    <button @click="handleUpdateVocabulary()">수정</button>
    <button @click="handleDeleteVocabulary()">삭제</button>
    <vocabulariesForm
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
    vocabulariesForm: defineAsyncComponent(() =>
      import("@/views/vocabularies/vocabulariesForm.vue")
    ),
  },
  props: {
    dialog: { type: Boolean },
    vocabularyID: { type: String },
  },
  data() {
    return {
      appDialog: false,
    };
  },
  methods: {
    ...mapActions({
      deleteVocabularyByCurrentVocabularyID: "vocabularies/deleteVocabularyByCurrentVocabularyID",
      updateCurrentVocabularyID: "vocabularies/updateCurrentVocabularyID",
    }),
    async handleDeleteVocabulary() {
      const vocabularyID = this.vocabularyID;
      this.updateCurrentVocabularyID(vocabularyID);
      try {
        // Vuex 액션을 통해 단어장을 삭제합니다.
        await this.deleteVocabularyByCurrentVocabularyID(); // 'vocabularyID'로 수정
        // 단어장 목록을 최신 상태로 갱신합니다.
        alert("단어장이 삭제.");
      } catch (error) {
        console.error("단어장 삭제 중 오류 발생:", error);
      }
    },
    handleUpdateVocabulary() {
      const vocabularyID = this.vocabularyID;
      this.updateCurrentVocabularyID(vocabularyID);
      this.appDialog = true;
      //this.updateDialog(false);
    },

    updateDialog(value) {
      console.log ('닫아요')
      this.$emit("update:dialog", value);
    },
  },
};
</script>

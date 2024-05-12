<template>
  <bottomDialog :dialog="dialog" @update:dialog="updateDialog">
    <buttonList @click="handleUpdateVocabulary()"
      ><icon><pencil /></icon><span>수정</span></buttonList
    >
    <buttonList @click="handleDeleteVocabulary()"
      ><icon><trash /></icon><span>삭제</span></buttonList
    >
    <vocabulariesForm
      v-if="appDialog"
      :dialog="appDialog"
      @update:dialog="appDialog = $event"
      :vocabularyID="vocabularyID"
      @close="updateDialog(false)"
    />
  </bottomDialog>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions } from "vuex";
import trash from "@/components/icon/trash";
import pencil from "@/components/icon/pencil";

export default {
  components: {
    trash,
    pencil,
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
      deleteVocabularyByPayload:
        "vocabularies/deleteVocabularyByPayload",
    }),
    async handleDeleteVocabulary() {
      try {
        await this.deleteVocabularyByPayload(this.vocabularyID); // 'vocabularyID'로 수정
        alert("단어장이 삭제.");
      } catch (error) {
        console.error("단어장 삭제 중 오류 발생:", error);
      }
    },
    handleUpdateVocabulary() {
      this.appDialog = true;
    },

    updateDialog(value) {
      console.log("닫아요");
      this.$emit("update:dialog", value);
    },
  },
};
</script>

<template>
  <bottomDialog :dialog="dialog" @update:dialog="updateDialog">
    <buttonList @click="appDialog = true"
      ><icon><pencil /></icon><span>수정</span></buttonList
    >
    <buttonList @click="handleDeleteWord()"
      ><icon><trash /></icon><span>삭제</span></buttonList
    >
    <wordsForm
      v-if="appDialog"
      :dialog="appDialog"
      @update:dialog="appDialog = $event"
      :wordID="wordID"
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
    wordsForm: defineAsyncComponent(() =>
      import("@/modules/words/wordsForm.vue")
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
      deleteWordByPayload: "words/deleteWordByPayload",
    }),
    async handleDeleteWord() {
      try {
        const wordID = this.wordID;
        await this.deleteWordByPayload(wordID);
        alert("단어장이 삭제.");
      } catch (error) {
        console.error("단어장 삭제 중 오류 발생:", error);
      }
    },
    updateDialog(value) {
      console.log("닫아요");
      this.$emit("update:dialog", value);
    },
  },
};
</script>

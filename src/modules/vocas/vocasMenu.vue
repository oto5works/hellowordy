<template>
  <bottomDialog :title="title" :dialog="dialog" @update:dialog="updateDialog">
    <buttonList @click="handleUpdateVoca()"
      ><icon><pencil /></icon><span>수정</span></buttonList
    >
    <buttonList @click="handleDeleteVoca()"
      ><icon><trash /></icon><span>삭제</span></buttonList
    >
    <vocasForm
      v-if="appDialog"
      :dialog="appDialog"
      @update:dialog="appDialog = $event"
      :vocaID="vocaID"
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
    vocasForm: defineAsyncComponent(() =>
      import("@/modules/vocas/vocasForm.vue")
    ),
  },
  props: {
    dialog: { type: Boolean },
    vocaID: { type: String },
    title: { type: String },
  },
  data() {
    return {
      appDialog: false,
    };
  },
  methods: {
    ...mapActions({
      deleteVocaByPayload:
        "vocas/deleteVocaByPayload",
    }),
    async handleDeleteVoca() {
      try {
        console.log ('땅어삭제!')
        await this.deleteVocaByPayload(this.vocaID); // 'vocaID'로 수정
        alert("단어장이 삭제.");
      } catch (error) {
        console.error("단어장 삭제 중 오류 발생:", error);
      }
    },
    handleUpdateVoca() {
      this.appDialog = true;
    },

    updateDialog(value) {
      console.log("닫아요");
      this.$emit("update:dialog", value);
    },
  },
};
</script>

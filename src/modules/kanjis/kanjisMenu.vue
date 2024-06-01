<template>
  <bottomDialog :dialog="dialog" @update:dialog="updateDialog">
    <buttonList @click="appDialog = true"
      ><icon><pencil /></icon><span>수정</span></buttonList
    >
    <buttonList @click="handleDeleteKanji()"
      ><icon><trash /></icon><span>삭제</span></buttonList
    >
    <kanjisForm
      v-if="appDialog"
      :dialog="appDialog"
      @update:dialog="appDialog = $event"
      :kanjiID="kanjiID"
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
    kanjisForm: defineAsyncComponent(() =>
      import("@/modules/kanjis/kanjisForm.vue")
    ),
  },
  props: {
    dialog: { type: Boolean },
    kanjiID: { type: String },
  },
  data() {
    return {
      appDialog: false,
    };
  },
  methods: {
    ...mapActions({
      deleteKanjiByPayload: "kanjis/deleteKanjiByPayload",
    }),
    async handleDeleteKanji() {
      try {
        const kanjiID = this.kanjiID;
        await this.deleteKanjiByPayload(kanjiID);
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

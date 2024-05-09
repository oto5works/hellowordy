<template>
  <modalDialog title="추가" :dialog="dialog" @update:dialog="updateDialog">
    <wordsForm />
  </modalDialog>
</template>

<script>
import wordsForm from "@/views/words/wordsForm.vue";

export default {
  components: { wordsForm },
  props: {
    dialog: { type: Boolean },
  },
  emits: ["update:dialog", "close"],
  methods: {
    updateDialog(value) {
      this.$emit("update:dialog", value);
    },
  },
};
</script>

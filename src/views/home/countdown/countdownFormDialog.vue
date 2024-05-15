<template>
  <modalDialog title="추가" :dialog="dialog" @update:dialog="updateDialog">
    <countdownForm @close="updateDialog(false)" />
  </modalDialog>
</template>

<script>
import countdownForm from "@/views/home/countdown/countdownForm.vue";

export default {
  components: { countdownForm },
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

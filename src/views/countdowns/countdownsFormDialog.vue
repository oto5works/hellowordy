<template>
  <modalDialog title="추가" :dialog="dialog" @update:dialog="updateDialog">
    <countdownsForm @close="updateDialog(false)" />
  </modalDialog>
</template>

<script>
import countdownsForm from "@/views/countdowns/countdownsForm.vue";

export default {
  components: { countdownsForm },
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

<template>
  <div class="promptInput-wrap">
    <button class="promptInput">
      <div class="font-size_15 font-weight_700">{{ currentPrompt.title }}</div>
      <div class="font-size_14 font-weight_400">{{ currentPrompt.prompt }}</div>

      
      <div class="underlay"/>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      currentPrompt: "prompts/currentPrompt",
    }),
  },
};
</script>

<style scoped>
.promptInput-wrap {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.promptInput {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  color: rgb(var(--mio-theme-color-on-background));
  font-size: 15px;
  border-radius: 24px;
  width: 80%;
  text-align: left;
}
.promptInput .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-40), 0.24);
  backdrop-filter: blur(8px);
}
</style>

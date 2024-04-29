<template>
  <div class="header">
    <div class="category" @click="setSelectWords()">
      <h1>{{ category }}</h1>
      <caretDown />
    </div>
    <div class="index">
      <h2>{{ index + 1 }}</h2>
      <h3>/{{ filteredWords.length }}</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import caretDown from "@/components/icon/caretDown.vue";

export default {
  components: { caretDown },

  computed: {
    ...mapGetters({
      category: "words/getCategory",
      index: "filter/getIndex",
      filteredWords: "filter/getFilteredWords",
    }),
  },
  methods: {
    ...mapActions({
      setSelectWords: "state/setSelectWords",
    }),
  },
};
</script>

<style scoped>
.header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  top: 0;
  width: 100%;
  height: 64px;
  padding: 16px var(--mio-theme-padding) 0 var(--mio-theme-padding);

  color: var(--mio-theme-color-on-background);
}
.category {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
}
.category span {
  font-size: 16px;
  font-weight: 400;
}
.category svg {
  width: 16px;
  height: 16px;
}
.index {
  display: flex;
  flex-direction: column;
  text-align: right;
}

@media all and (max-width: 479px) {
  .buttonGroup,
  .line-1 {
    gap: 16px;
  }
  .random {
    width: 144px;
    height: 64px;
  }
  .show {
    width: 64px;
    height: 64px;
  }
}
</style>

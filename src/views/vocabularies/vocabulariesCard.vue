<template>
  <div class="card" @click="handleWordsView()">
    <h3>{{ vocabulary.title }}</h3>
    <p>{{ vocabulary.category }}</p>
    <p>{{ vocabulary.content }}</p>
    <!-- vocabulariesMenu 컴포넌트를 포함합니다. -->
    <button @click.stop="handleClickEvent()">설정</button>
    <vocabulariesMenu
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
      :vocabularyID="vocabulary.id"
    />
  </div>
</template>

<script>
import vocabulariesMenu from "@/views/vocabularies/vocabulariesMenu.vue";

export default {
  components: {
    vocabulariesMenu,
  },
  props: {
    vocabulary: { type: Object },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    handleWordsView() {
      this.$router.push({
        name: "wordsView",
        params: { id: this.vocabulary.id },
      });
    },
    handleClickEvent() {
      this.dialog = true;
    },
  },
};
</script>
<style scoped>
.card {
  padding: 16px;
  border: 1px solid black;
}
</style>

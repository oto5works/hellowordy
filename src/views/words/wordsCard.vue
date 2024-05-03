<template>
  <div class="card">
    {{ word.index }}. {{ word.id }}
    <p><strong>단어:</strong> {{ word.word }}</p>
    <div v-for="(item, index) in word.mean" :key="index">
      {{ index + 1 }}. {{ item }}
    </div>

    <p><strong>예문:</strong></p>
    <div v-for="item in word.examples" :key="item">{{ item }}</div>
    <button @click.stop="handleClickEvent()">설정</button>
    <wordsMenu
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
      :wordID="word.id"
    />
  </div>
</template>
<script>
import wordsMenu from "@/views/words/wordsMenu.vue";

export default {
  components: {
    wordsMenu,
  },
  props: {
    word: { type: Object },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
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

<template>
  <modalDialog title="단어 선택" :dialog="dialog" @update:dialog="updateDialog">
    <div class="modal-content">
      <h2>{{ kanji }}</h2>
      <div v-if="kanjiInfo">
        <p v-if="kanjiInfo.jlpt">JLPT {{ kanjiInfo.jlpt }}</p>
        <p v-if="kanjiInfo.mean">뜻: {{ kanjiInfo.mean }}</p>
        <p v-if="kanjiInfo.goon">음독: {{ kanjiInfo.goon }}</p>
        <p v-if="kanjiInfo.kun">훈독: {{ kanjiInfo.kun }}</p>
        <div v-if="kanjiInfo.comment" v-html="kanjiInfo.comment" />
      </div>
      <div v-else>
        <p>한자 정보를 가져올 수 없습니다.</p>
      </div>
    </div>
  </modalDialog>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: {
    kanji: { type: String, required: true },
    dialog: { type: Boolean, required: true },
  },
  data() {
    return {
      kanjiInfo: null,
    };
  },
  watch: {
    kanji: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.fetchKanjiInfo(newValue);
        }
      },
    },
  },
  methods: {
    ...mapActions({
      returnKanjiByPayload: "kanjis/returnKanjiByPayload",
    }),
    async fetchKanjiInfo(kanji) {
      const unicode = kanji.charCodeAt(0).toString(16);
      const payload = unicode;
      try {
        const info = await this.returnKanjiByPayload(payload);
        if (info) {
          info.kanji = kanji;
          this.kanjiInfo = info;
        } else {
          this.kanjiInfo = null;
        }
      } catch (error) {
        console.error(`Error fetching info for ${kanji}:`, error);
        this.kanjiInfo = null;
      }
    },
    updateDialog() {
      this.$emit("update:dialog", false);
    }
  },
};
</script>

<style scoped></style>

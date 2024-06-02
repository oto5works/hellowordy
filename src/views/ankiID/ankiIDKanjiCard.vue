<template>
  <div class="kanji-card">
    <div class="line" />
    <div class="display_flex align-items_flex-end gap_12">
      <div class="font-size_24 font-weight_400 line-height_100">
        {{ info.kanji }}
      </div>
      <div class="jlpt">JLPT {{ info.jlpt }}</div>
    </div>

    <table class="info-table">
      <tr>
        <td>훈음</td>
        <td>{{ info.hoon }}</td>
      </tr>
      <tr>
        <td>뜻</td>
        <td>{{ info.mean }}</td>
      </tr>
      <tr>
        <td>음독</td>
        <td>{{ info.goon }}</td>
      </tr>
      <tr>
        <td>훈독</td>
        <td>{{ info.kun }}</td>
      </tr>
    </table>

    <div class="comment">
      <div class="font-size_16 font-weight_700">Mnemonic</div>
      <div class="sp_8" />
      <div v-html="info.comment" @click="handleCommentClick" />
    </div>
    <ankiIDKanjiModal
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
      :kanji="selectedKanji"
    />

    
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    ankiIDKanjiModal: defineAsyncComponent(() =>
      import("@/views/ankiID/ankiIDKanjiModal.vue")
    ),
  },
  props: {
    info: { type: Object },
  },
  data() {
    return {
      dialog: false,
      selectedKanji: "",
    };
  },
  methods: {
    handleCommentClick(event) {
      const target = event.target;
      if (target.tagName === "MARK") {
        const kanji = target.textContent;
        this.selectedKanji = kanji;
        this.dialog = true;
      }
    },
  },
};
</script>
<style scoped>
.kanji-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.info-table {
  border-collapse: collapse;
  width: 100%;
  font-size: 13px;
}
.info-table td:first-child {
  opacity: 0.7;
  width: 40px;
}
.info-table td {
  padding: 2px 0px;
  border: none;
}
.jlpt {
  font-size: 9px;
  color: rgb(var(--mio-theme-color-background));
  background-color: rgb(var(--mio-theme-color-on-background));
  border-radius: 24px;
  padding: 2px 4px;
}
</style>

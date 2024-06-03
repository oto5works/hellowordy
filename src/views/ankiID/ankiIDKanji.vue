<template>
  <fullDialog :title="kanjiWithRuby" :dialog="dialog" @update:dialog="updateDialog">
    <div class="content" v-if="kanjiInfo.length > 0">
      <ankiIDKanjiRuby :ruby="ruby" :kanji="kanji" :mean="mean" />
      <div class="sp_48" />
      <div v-for="info in kanjiInfo" :key="info.kanji">
        <div v-if="info.found">
          <ankiIDKanjiCard :info="info" />
        </div>
        <div v-else>
          <h2>{{ info.kanji }}</h2>
          <p>정보 없음</p>
        </div>
        <div class="sp_48" />
      </div>
    </div>
    <div v-else>
      <p>선택된 단어가 없습니다.</p>
    </div>
  </fullDialog>
</template>

<script>
import { mapActions } from "vuex";
import { defineAsyncComponent } from "vue";
import ankiIDKanjiCard from "@/views/ankiID/ankiIDKanjiCard.vue";
import ankiIDKanjiRuby from "@/views/ankiID/ankiIDKanjiRuby.vue";

export default {
  components: {
    ankiIDKanjiCard,
    ankiIDKanjiRuby,
  },
  props: {
    kanji: { type: String },
    ruby: { type: String },
    mean: { type: Array },
    dialog: { type: Boolean },
  },
  data() {
    return {
      kanjiInfo: [],
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
    updateDialog(value) {
      this.$emit("update:dialog", value);
    },
    async fetchKanjiInfo(kanji) {
      const kanjiArray = kanji.split("");
      this.kanjiInfo = [];
      for (const char of kanjiArray) {
        const unicode = char.charCodeAt(0).toString(16);
        const payload = unicode;
        try {
          const info = await this.returnKanjiByPayload(payload);
          if (info) {
            info.kanji = char; // 한자 정보를 추가
            info.found = true; // 정보가 있음
            this.kanjiInfo.push(info);
          } else {
            this.kanjiInfo.push({ kanji: char, found: false }); // 정보 없음
          }
        } catch (error) {
          console.error(`Error fetching info for ${char}:`, error);
          this.kanjiInfo.push({ kanji: char, found: false }); // 정보 없음
        }
      }
    },
  },
  computed: {
    kanjiWithRuby() {
      return `${this.ruby} [${this.kanji}]`;
    },
  },
};
</script>

<style scoped></style>

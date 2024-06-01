<template>
  <fullDialog title="단어 선택" :dialog="dialog" @update:dialog="updateDialog">
    <h5>{{ ruby }}</h5>
    <div class="font-size_28 font-weight_400">{{ kanji }}</div>
    <div class="sp_40" />
    <div v-if="kanjiInfo.length > 0">
      <div v-for="info in kanjiInfo" :key="info.kanji">
        <div class="line" />
        <div class="sp_12" />
        <div v-if="info.found">
          <div class="font-size_12 font-weight_400">JLPT {{ info.jlpt }}</div>
          <div class="font-size_24 font-weight_400">{{ info.kanji }}</div>
          <div class="font-size_14 font-weight_400">
            <div class="display_flex gap_8">
              <div class="font-weight_700">뜻</div>
              <div class="font-weight_400">{{ info.mean }}</div>
            </div>
            <div class="display_flex gap_8">
              <div class="font-weight_700">음독</div>
              <div class="font-weight_400">{{ info.goon }}</div>
            </div>
            <div class="display_flex gap_8">
              <div class="font-weight_700">훈독</div>
              <div class="font-weight_400">{{ info.kun }}</div>
            </div>
          </div>
        
          <div class="sp_12" />
          <div class="font-size_18 font-weight_700">한자 해석</div>
          <div v-html="info.comment" @click="handleCommentClick" />
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
    <ankiIDKanjiModal
      v-if="appDialog"
      :dialog="appDialog"
      @update:dialog="appDialog = $event"
      :kanji="selectedKanji"
    />
  </fullDialog>
</template>

<script>
import { mapActions } from "vuex";
import { defineAsyncComponent } from "vue";

export default {
  components: {
    ankiIDKanjiModal: defineAsyncComponent(() =>
      import("@/views/ankiID/ankiIDKanjiModal.vue")
    ),
  },
  props: {
    kanji: { type: String },
    ruby: { type: String },
    dialog: { type: Boolean },
  },
  data() {
    return {
      appDialog: false,
      selectedKanji: "",
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
    handleCommentClick(event) {
      const target = event.target;
      if (target.tagName === "MARK") {
        const kanji = target.textContent;
        this.selectedKanji = kanji;
        this.appDialog = true;
      }
    },
  },
};
</script>

<style scoped></style>

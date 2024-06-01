<template>
  <div class="ankiIDWord">
    <div class="card">
      <div class="content">
        {{ kanji }} ///<br />
        {{ ruby }}
        <div class="item">
          <div
            class="word"
            :class="{ showRuby: showRuby || alwaysRuby }"
            v-html="word"
            @click="extractWord"
          />
          <div class="sp_8" />
          <div class="display_flex flex-wrap_wrap gap_8 justify-content_center">
            <div
              class="mean display_flex align-items_center gap_2"
              v-for="(item, index) in mean"
              :key="index"
            >
              <div class="index">
                {{ index + 1 }}
              </div>
              <div class="item" :class="{ showMean: showMean || alwaysMean }">
                {{ showMean || alwaysMean ? item : "----" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ankiKanji
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
      :kanji="kanji"
      :ruby="ruby"
    />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ankiKanji: defineAsyncComponent(() =>
      import("@/views/ankiID/ankiIDKanji.vue")
    ),
  },
  data() {
    return {
      dialog: false,
      kanji: null,
      ruby: null,
    };
  },
  computed: {
    ...mapGetters({
      word: "study/getWord",
      mean: "study/getMean",
      showRuby: "study/getShowRuby",
      showMean: "study/getShowMean",
      alwaysRuby: "study/getAlwaysRuby",
      alwaysMean: "study/getAlwaysMean",
    }),
  },
  methods: {
    extractWord(event) {
      const target = event.target.closest("ruby");
      if (target) {
        const plainWord = target.textContent.replace(/\(.*?\)/g, "").trim();
        const rubyText = target.querySelector("rt")
          ? target.querySelector("rt").textContent
          : null;
        this.kanji = plainWord;
        this.ruby = rubyText;
        console.log("Extracted word:", this.kanji);
        console.log("Extracted ruby text:", this.ruby);
        // 추출한 단어와 루비 텍스트를 사용하는 로직을 추가하세요
        this.dialog = true
      }
    },
  },
};
</script>

<style scoped>
.ankiIDWord {
  padding: 0 var(--mio-theme-padding-2);
}
</style>

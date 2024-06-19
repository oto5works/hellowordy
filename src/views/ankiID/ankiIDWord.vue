<template>
  <div class="ankiIDWord">
    <div class="card">
      <div class="content">
        <div class="item">
          <div
            class="word"
            :class="[wordClass, { showRuby: showRuby || alwaysRuby }]"
            v-html="word"
            @click="extractWord"
          />
          <div class="display_flex flex-wrap_wrap gap_8 justify-content_center">
            <div
              class="mean display_flex align-items_center gap_2"
            >
         
              <div class="item" :class="{ showMean: showMean || alwaysMean }">
                {{ mean }}
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
    wordClass() {
      const length = this.word ? this.word.length : 0;
      if (length > 70) {
        return 'long-text-70';
      } else if (length > 50) {
        return 'long-text-50';
      } else {
        return 'normal-text';
      }
    },
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

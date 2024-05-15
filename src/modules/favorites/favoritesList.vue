<template>
  <div class="vocasList" @click="handleVocaID()">
    <buttonCard
      class="cover"
      :style="{
        backgroundImage: `url(${voca.coverURL})`,
      }"
    >
    </buttonCard>

    <div class="content">
      <div class="more"></div>

      <div
        class="display_flex align-items_center justify-content_space-between"
      >
        <div class="title font-size_18 font-weight_700">
          {{ voca.title }}
        </div>

        <buttonIcon>
          <favorites :vocaID="vocaID" />
        </buttonIcon>
      </div>

      <div class="sp_4" />
      <div class="content font-size_13 opacity_60">
        {{ voca.content }}
      </div>

      <div class="sp_16" />
      <div class="display_flex gap_8 font-size_12">
        <span class="opacity_60">언어</span>
        <span class="font-weight_500">{{ languageDisplay }}</span>
      </div>
      <div class="sp_2" />
      <div class="display_flex gap_8 font-size_12">
        <span class="opacity_60">단어 수</span>
        <span class="font-weight_500">{{ words.length }}</span>
      </div>
      <div class="sp_8" />
    </div>
    <div class="overlay"  />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

import favorites from "@/modules/favorites/favorites.vue";
import dots from "@/components/icon/dots.vue";
import arrowRight from "@/components/icon/arrowRight.vue";

export default {
  components: {
    favorites,
    dots,
    arrowRight,
    vocasMenu: defineAsyncComponent(() =>
      import("@/modules/vocas/vocasMenu.vue")
    ),
  },
  props: {
    vocaID: { type: String },
  },
  data() {
    return {
      voca: {
        language: null,
        title: null,
        content: null,
        id: null,
        coverURL: null,
      },
      words: []
    };
  },
  computed: {
    ...mapGetters({
      userID: "users/getUserID",
    }),
    languageDisplay() {
      switch (this.voca.language) {
        case "english":
          return "English";
        case "japanese":
          return "日本語";
        default:
          return this.voca.language; // 기본값으로 voca.language 반환
      }
    },
  },
  created() {
    this.loadVoca();
    this.loadWords();
  },
  watch: {
    vocaID: {
      immediate: true, // 컴포넌트가 마운트될 때 즉시 실행
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          //this.loadVoca();
        }
      }
    }
  },
  methods: {
    ...mapActions({
      returnVocaByPayload: "vocas/returnVocaByPayload",
      returnWordsByPayload: "words/returnWordsByPayload",
    }),
    async loadVoca() {
      if (this.vocaID) {
        console.log ('vocaID', this.vocaID)
        const vocaData = await this.returnVocaByPayload(this.vocaID);
        if (vocaData) {
          this.voca.language = vocaData.language;
          this.voca.title = vocaData.title;
          this.voca.content = vocaData.content;
          this.voca.share = vocaData.share;
          this.voca.coverURL = vocaData.coverURL;
        } else {
          alert("단어장을 불러오는데 실패했습니다.");
        }
      }
    },
    async loadWords() {
      if (this.vocaID) {
        console.log ('vocaID', this.vocaID)
        const wordsData = await this.returnWordsByPayload(this.vocaID);
        if (wordsData) {
          this.words = wordsData;
        } else {
          alert("단어장을 불러오는데 실패했습니다.");
        }
      }
    },
    updateDialog(value) {
      this.$emit("update:dialog", value);
    },
    handleVocaID() {
      this.$router.push({
        name: "vocaID",
        params: { id: this.vocaID },
      });
    },
  },
};
</script>

<style scoped>
.cover {
  position: relative;
  width: 96px;
  aspect-ratio: 3 / 4;
  border-radius: 16px;
  overflow: hidden;
}
.content {
  position: relative;
  width: 100%;
}
.more {
  position: absolute;
  top: 0;
  right: 0;
}
.title,
.content {
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  height: fit-content;
} 
.vocasList {
  position: relative;
  display: flex;
  gap: 16px;
  width: 100%;
  padding: var(--mio-theme-padding-1);
  border-radius: 24px;
  cursor: pointer;
}
.vocasList .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(var(--mio-theme-color-primary), 0.16);
  opacity: 0;
  z-index: -1;
}
.vocasList:hover .overlay {
  opacity: 1;
}
</style>

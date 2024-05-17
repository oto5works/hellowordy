<template>
  <div class="card">
    <buttonCard
      class="card-cover"
      :style="{
        backgroundImage: `url(${voca.coverURL})`,
      }"
      @click="handleVocaID()"
    >
    </buttonCard>
    <div class="sp_8" />

    <div
      class="display_flex align-items_flex-start justify-content_space-between gap_4 pa_4"
    >
      <div class="font-size_14 kr font-weight_700" @click="handleVocaID()">
        {{ voca.title }}
      </div>
    </div>
    <div class="sp_2" />
    <div class="language pa_4">
      <div v-if="voca.language === 'japanese'">日本語</div>
      <div v-if="voca.language === 'english'">English</div>
    </div>

    <div class="sp_12" />
    <vocasMenu
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
      :vocaID="voca.id"
      :title="voca.title"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import vocasMenu from "@/modules/vocas/vocasMenu.vue";

export default {
  components: {
    vocasMenu,
  },
  props: {
    vocaID: { type: Object },
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
    };
  },
  computed: {
    ...mapGetters({
      //userID: "users/getUserID",
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
    //this.loadWords();
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
.card {
  width: 128px;
  margin-right: 8px;
}
.card-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 16px;
  overflow: hidden;
}
.language {
  font-size: 11px;
  font-weight: 500;
  border-radius: 24px;
  opacity: 0.6;
}
</style>

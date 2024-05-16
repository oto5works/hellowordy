<template>
  <div class="card" @click="handleVocaID()">
    <buttonCard
      class="card-cover"
      :style="{
        backgroundImage: `url(${voca.coverURL})`,
      }"
    >
    </buttonCard>
    <div class="sp_8" />
    <div
      class="display_flex align-items_flex-start justify-content_space-between gap_4 pa_4"
    >
      <div class="font-size_13 kr font-weight_700">
        {{ voca.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},
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
  },
  created() {
    this.loadVoca();
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
    handleVocaID() {
      this.$router.push({
        name: "ankiID",
        params: { id: this.vocaID },
      });
    },
  },
};
</script>
<style scoped>
.card {
  width: 100%;
  cursor: pointer;
}
.card-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 16px;
  overflow: hidden;
}
</style>

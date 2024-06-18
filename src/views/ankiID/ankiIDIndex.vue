<template>
  <div class="ankiIDTitle" @click="setShowFilter()">
    <div class="title">
      {{ title }} #{{ part + 1 }}  
    </div>
    <div class="index">
<span>{{ currentIndex + 1 }}</span><span class="font-weight_400 opacity_40">/{{ lastIndex }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      title: "unSelected",
    };
  },
  computed: {
    ...mapGetters({
      currentIndex: "study/getCurrentIndex",
      lastIndex: "study/getLastIndex",
      part: "study/getPart",
    }),
    vocaID() {
      return this.$route.params.id;
    },
  },
  created() {
    this.loadVoca();
  },
  methods: {
    ...mapActions({
      setIndex: "study/setIndex",
      setShowFilter: "filter/setShowFilter",
      returnVocaByPayload: "vocas/returnVocaByPayload",
      returnWordsByPayload: "words/returnWordsByPayload",
    }),
    handleUpdatePart(index) {
      this.setIndex(index);
    },
    async loadVoca() {
      if (this.vocaID) {
        console.log("vocaID", this.vocaID);
        const vocaData = await this.returnVocaByPayload(this.vocaID);
        if (vocaData) {
          this.title = vocaData.title;
        } else {
          alert("단어장을 불러오는데 실패했습니다.");
        }
      }
    },
  },
};
</script>
<style scoped>
.ankiIDTitle {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  gap: 4px;
  font-size: 13px;
  line-height: 130%;
}
.ankiIDTitle .title {
  text-align: right;
  width: 40%;
  font-weight: 700;
}
.ankiIDTitle .index {
  position: relative;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  width: 40%;
  font-weight: 700;
}
</style>

<template>
  <fullDialog
    title="단어 선택"
    :dialog="showFilter"
    @update:dialog="updateDialog"
  >
    <div class="voca-list">
      <div class="voca-1 display_flex flex-direction_column gap_4">
        <div class="sp_120" />
        <buttonDefault
          v-for="item in vocas"
          :key="item.id"
          @click="handleFetchWords(item.id)"
          class="height_64 width_100"
          :class="{ selected: item.id === vocaID }"
          ><span>{{ item.title }}</span></buttonDefault
        >
        <div>북마크</div>
        <buttonDefault
          v-for="item in favorites"
          :key="item.id"
          @click="handleFetchWords(item.vocaID)"
          class="height_64 width_100"
          :class="{ selected: item.vocaID === vocaID }"
          ><span>{{ item.vocaID }}</span></buttonDefault
        >
      </div>
      <div class="voca-2 display_flex flex-direction_column gap_4">
        <div class="sp_80" />

        <studyFilterPartSize />
        <studyFilterPart
          v-for="(wordsInPart, index) in filteredWords"
          :key="index"
          @click="handleUpdatePart(index)"
          :class="{ selected: index === part }"
          :part="index"
          :total="wordsInPart.length"
        />
      </div>
    </div>
  </fullDialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import studyFilterPart from "@/views/study/studyFilterPart.vue";
import studyFilterPartSize from "@/views/study/studyFilterPartSize.vue";

export default {
  components: { studyFilterPart, studyFilterPartSize },
  computed: {
    ...mapGetters({
      vocas: "vocas/getVocas",
      vocaID: "vocas/getVocaID",
      words: "words/getWords",
      favorites: "favorites/getFavorites",
      filteredWords: "filter/getFilteredWords",
      showFilter: "filter/getShowFilter",

      part: "study/getPart",
    }),
  },

  methods: {
    ...mapActions({
      setShowFilter: "filter/setShowFilter",
      getWordsByPayload: "words/getWordsByPayload",
      updateVocaIDByPayload: "vocas/updateVocaIDByPayload",
      fetchFilterWords: "filter/fetchFilterWords",
      setPart: "study/setPart",
      initializeStudy: "study/initializeStudy",
    }),

    async handleFetchWords(vocaID) {
      this.setPart(null);
      await this.getWordsByPayload(vocaID);
      await this.updateVocaIDByPayload(vocaID);
      await this.fetchFilterWords();
    },

    async handleUpdatePart(item) {
      await this.setPart(item);
      await this.initializeStudy();
      this.setShowFilter();
    },
    updateDialog(value) {
      this.setShowFilter();
    },
  },
};
</script>

<style scoped>
.voca-list {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
}

.voca-1,
.voca-2 {
  position: relative;
  flex: 1 1 50%;
  height: 100%;
  overflow: auto;
}
</style>

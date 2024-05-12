<template>
  <div class="routerView">
    <study404 v-if="this.part === null" />

    <div v-if="this.part !== null">
      <studySubHeader />
      <div class="sp_24" />
      <studyWord />
      <div class="sp_48" />
      <studyFooter />
      <studyFuction />
    </div>
    <div class="sp_128" />

    <studyFilterDialog v-if="showFilter" />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";

import studyWord from "@/views/study/studyWord.vue";
import studyFuction from "@/views/study/studyFuction.vue";
import studyFooter from "@/views/study/studyFooter.vue";

import studyData from "@/views/study/studyData.vue";
import studySubHeader from "@/views/study/studySubHeader.vue";
import study404 from "@/views/study/study404.vue";

export default {
  components: {
    studyWord,
    studyFuction,
    studyFooter,
    studyData,
    studySubHeader,
    study404,
    studyFilterDialog: defineAsyncComponent(() =>
      import("@/views/study/studyFilterDialog.vue")
    ),
  },
  created() {
    this.initializeKuroshiro()
    this.handleInitialize();
  },
  computed: {
    ...mapGetters({
      currentVocabularyID: "vocabularies/getCurrentVocabularyID",
      part: "study/getPart",
      showFilter: "filter/getShowFilter",
      filteredWords: "filter/getFilteredWords",
      currentWordID: "study/getCurrentWordID",
      initialized: "kuroshiro/getInitialized"
    }),
  },
  methods: {
    ...mapActions({
      setShowFilter: "filter/setShowFilter",
      initializeKuroshiro: "kuroshiro/initializeKuroshiro",
      fetchUserVocabularies: "vocabularies/fetchUserVocabularies",
    }),
    async handleInitialize() {
      //if (!this.currentVocabularyID || !this.part) {
      //  this.setShowFilter();
      //}
      await this.fetchUserVocabularies();
    },
  },
};
</script>
<style scoped>
.header {
  height: 56px;
}
</style>

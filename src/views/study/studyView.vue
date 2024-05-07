<template>
  <div class="studyView width_100">
    <div class="header display_flex align-items_center width_100">
      <div
        class="display_flex align-items_flex-start justify-content_space-between width_100"
        v-if="this.currentVocabularyID || this.part"
      >
        <studyPart />
        <studyIndex />
      </div>
    </div>
    <div v-if="!this.part">
      <div class="font-size_24">
        PART 가 선택되지 않았어요
      </div>
      <div class="sp_12" />

      <buttonText @click="setShowFilter()">
       <span>PART 선택하기</span> 
      </buttonText>
      
      
      </div>

    <studyWord v-if="this.currentVocabularyID || this.part" />
    <div class="sp_48" />
    <div class="sp_48" />
    <studyFuction v-if="this.currentVocabularyID || this.part" />
    <div class="sp_48" />
    <studyFilterDialog v-if="showFilter" />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";

import studyIndex from "@/views/study/studyIndex.vue";
import studyWord from "@/views/study/studyWord.vue";
import studyPart from "@/views/study/studyPart.vue";
import studyFuction from "@/views/study/studyFuction.vue";

export default {
  components: {
    studyIndex,
    studyWord,
    studyPart,
    studyFuction,
    studyFilterDialog: defineAsyncComponent(() =>
      import("@/views/study/studyFilterDialog.vue")
    ),
  },
  created() {
    this.handleInitialize();
  },
  computed: {
    ...mapGetters({
      currentVocabularyID: "vocabularies/getCurrentVocabularyID",
      part: "filter/getPart",
      showFilter: "filter/getShowFilter",
    }),
  },
  methods: {
    ...mapActions({
      setShowFilter: "filter/setShowFilter",
      initializeKuroshiro: "kuroshiro/initializeKuroshiro",
      fetchUserVocabularies: "vocabularies/fetchUserVocabularies",
    }),
    async handleInitialize() {
      if (!this.currentVocabularyID || !this.part) {
        this.setShowFilter();
      }
      await this.fetchUserVocabularies();
      await this.initializeKuroshiro();
    },
  },
};
</script>
<style scoped>
.header {
  height: 56px;
}
.studyView {
  padding: 0 var(--mio-theme-padding-2);
}
</style>

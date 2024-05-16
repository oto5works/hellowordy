<template>
  <div class="routerView">

   

    <div v-if="this.part !== null">
      <ankiHeader />
      <div class="sp_24" />
      <ankiWord />
      <div class="sp_48" />
      <studyFooter />
      <studyFuction />
    </div>
    <div class="sp_128" />

    <filter v-if="showFilter" :dialog="showFilter" />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import ankiHeader from "@/views/anki/ankiHeader.vue";
import ankiWord from "@/views/anki/ankiWord.vue";

import ankiFuction from "@/views/anki/ankiFuction.vue";
import ankiFooter from "@/views/anki/ankiFooter.vue";

export default {
  components: {
    ankiHeader,
    ankiWord,
    ankiFuction,
    ankiFooter,
    filter: defineAsyncComponent(() =>
      import("@/views/anki/filter/filter.vue")
    ),
  },
  created() {
    this.handleFetchWords()
  },
  computed: {
    ...mapGetters({
      part: "study/getPart",
      showFilter: "filter/getShowFilter",
      fetchFilterWordsByPayload: "filter/fetchFilterWordsByPayload"
    }),
  },
  methods: {
    ...mapActions({
      initializeKuroshiro: "kuroshiro/initializeKuroshiro",
    }),
    async handleFetchWords(vocaID) {
      await this.fetchFilterWordsByPayload(vocaID);
      await this.updateVocaIDByPayload(vocaID);
      await this.fetchFilterWords();
    },
  },
};
</script>
<style scoped>
.header {
  height: 56px;
}
</style>

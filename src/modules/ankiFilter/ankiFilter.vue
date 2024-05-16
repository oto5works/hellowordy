<template>
  <fullDialog
    title="Select"
    :dialog="showFilter"
    @update:dialog="updateDialog"
  >
    <div class="content">

    
  
      <ankiFilterOption />
      <div class="sp_8" />
      <div class="words-list">
        <ankiFilterPartCard
        v-for="(item, index) in filteredWords"
        :key="index"
        @click="handleUpdatePart(index)"
        :class="{ selected: index === part }"
        :part="index"
        :total="item.length"
      />
      </div>
    </div>
  </fullDialog>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import ankiFilterPartCard from "@/modules/ankiFilter/ankiFilterPartCard.vue";
import ankiFilterOption from "@/modules/ankiFilter/ankiFilterOption.vue";

export default {
  components: {
    ankiFilterPartCard,
    ankiFilterOption
  },
  created() {
    
  },
  computed: {
    ...mapGetters({
      part: "study/getPart",
      filteredWords: "filter/getFilteredWords",
      showFilter: "filter/getShowFilter",
    }),
  },
  methods: {
    ...mapActions({
      setShowFilter: "filter/setShowFilter",
      fetchFilterWordsByPayload: "filter/fetchFilterWordsByPayload",
      setPart: "study/setPart",
      initializeStudy: "study/initializeStudy",
      
    }),
    
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
.words-list {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--mio-theme-padding-3);
}
</style>

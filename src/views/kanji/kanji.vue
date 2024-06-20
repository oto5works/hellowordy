<template>
  <div>
    <div class="sp_64"/>

    <div class="search">
    <div class="display_flex">
      <input v-model="searchTerm" placeholder="검색어를 입력하세요" />
    <button @click="executeSearch()">검색</button>

    </div>

    <button @click="dialog = true">추가</button>

  </div>
    <div v-if="searchResults.length">
      <kanjiCard
          v-for="(item) in searchResults"
          :key="item.id"
          :kanji="item"
        />
    </div>
    <div v-else>
      <p>검색 결과가 없습니다.</p>
    </div>
    <div class="sp_64"/>
    <editForm
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
    />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

import { mapActions, mapGetters } from "vuex";
import kanjiCard from "@/views/kanji/kanjiCard.vue";

export default {
  components: {
    kanjiCard,
    editForm: defineAsyncComponent(() =>
      import("@/views/kanji/edit/editForm.vue")
    ),
  },
  data() {
    return {
      dialog: false,
      searchTerm: '',
    };
  },
  computed: {
    ...mapGetters({
      searchResults: "kanjis/getSearchResults",
    }),
  },
  methods: {
    ...mapActions({
      searchKanjis: "kanjis/searchKanjis",
      deleteKanjiByPayload: "kanjis/deleteKanjiByPayload",
    }),
    async executeSearch() {
      try {
        await this.searchKanjis(this.searchTerm);
      } catch (error) {
        console.error("검색 실패:", error);
      }
    }
  }
};
</script>
<style scoped>
.search {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
}
</style>
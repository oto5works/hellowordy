<template>
  <div class="routerView" @dblclick.prevent>
    <ankiIDHeader />
    <!--
    part = {{ this.part }}<br />
    showFilter = {{ this.showFilter }}<br/>
    word = {{this.word}}
        <buttonDefault @click="this.setShowFilter()">filtetrrr</buttonDefault>
    -->
    <div v-if="filteredWords.length === 0">
      <div class="sp_128" />
      <noData content="암기장에 등록된 단어가 없습니다." image="rabbit3">
        <buttonDefault class="height_40 pa_16" @click="navigateToAnki()">
          <span class="font-weight_500">암기장 선택하기</span>
        </buttonDefault>
      </noData>
    </div>
    <div v-else>
      <div v-if="part === null">
        <div class="sp_128" />
        <noData
          content="선택된 파트가 없습니다.<br/>아래 버튼을 눌러서 파트를 선택해 주세요."
          image="rabbit3"
        >
          <buttonDefault class="height_40 pa_16" @click="this.setShowFilter()">
            <span class="font-weight_500">파트 선택하기</span>
          </buttonDefault>
        </noData>
      </div>
      <div v-else>
        <div class="sp_56"/>
        <ankiIDView />
        <ankiIDFuction />
      </div>
    </div>

    <ankiFilter v-if="showFilter" />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";


export default {
  components: {
    noData: defineAsyncComponent(() => import("@/modules/noData/noData.vue")),
    ankiIDHeader: defineAsyncComponent(() =>
      import("@/views/ankiID/ankiIDHeader.vue")
    ),
    ankiIDFuction: defineAsyncComponent(() =>
      import("@/views/ankiID/ankiIDFuction.vue")
    ),
    ankiIDView: defineAsyncComponent(() =>
      import("@/views/ankiID/ankiIDView.vue")
    ),
    ankiFilter: defineAsyncComponent(() =>
      import("@/modules/ankiFilter/ankiFilter.vue")
    ),
  },
  created() {
    this.initializeKuroshiro();
    this.handleFetchWords();
    document.addEventListener('dblclick', this.preventDoubleClickZoom);
  },
  beforeDestroy() {
    document.removeEventListener('dblclick', this.preventDoubleClickZoom);
  },
  computed: {
    ...mapGetters({
      part: "study/getPart",
      showFilter: "filter/getShowFilter",
      word: "study/getWord",
      filteredWords: "filter/getFilteredWords",
    }),
  },
  methods: {
    ...mapActions({
      initializeKuroshiro: "kuroshiro/initializeKuroshiro",
      fetchFilterWordsByPayload: "filter/fetchFilterWordsByPayload",
      setShowFilter: "filter/setShowFilter",
      setResetPart: "study/setResetPart",
    }),
    async handleFetchWords() {
      await this.setResetPart();
      await this.fetchFilterWordsByPayload(this.$route.params.id);

      if (this.filteredWords && this.filteredWords.length !== 0) {
        this.setShowFilter();
      }
    },
    navigateToAnki() {
      this.$router.push({ name: "anki" });
    },
    preventDoubleClickZoom(event) {
      event.preventDefault();
    },
  },
};
</script>

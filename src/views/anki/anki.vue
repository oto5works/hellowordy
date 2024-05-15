<template>
  <div class="routerView">
    <ankiRecent />
    <div class="sp_48"/>
    <div class="display_flex">
      <buttonTap :class="{ selected: tap === 'my' }" @click="tap = 'my'">
        <span>내 암기장</span>
      </buttonTap>
      <buttonTap
        :class="{ selected: tap === 'favofites' }"
        @click="tap = 'favofites'"
      >
        <span>북마크</span>
      </buttonTap>
    </div>
    <div class="sp_8"/>
    <div class="voca-list" v-if="tap === 'my'">
      <ankiMyCard v-for="item in vocas" :key="item.id" :voca="item" />
    </div>
    <div v-if="tap === 'favofites'">
      {{ favorites }}
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import ankiMyCard from "@/views/anki/ankiMyCard.vue";
import ankiRecent from "@/views/anki/ankiRecent.vue";



import anki404 from "@/views/anki/anki404.vue";
import ankiHeader from "@/views/anki/ankiHeader.vue";
import ankiWord from "@/views/anki/ankiWord.vue";

import ankiFuction from "@/views/anki/ankiFuction.vue";
import ankiFooter from "@/views/anki/ankiFooter.vue";

export default {
  components: {
    ankiMyCard,
    ankiRecent,
    anki404,
    ankiHeader,
    ankiWord,
    ankiFuction,
    ankiFooter,
    filter: defineAsyncComponent(() =>
      import("@/views/anki/filter/filter.vue")
    ),
  },
  data() {
    return {
      tap: "my",
    };
  },
  created() {
    this.initializeKuroshiro();
  },
  computed: {
    ...mapGetters({
      vocas: "vocas/getVocas",
      favorites: "favorites/getFavorites",
      showFilter: "filter/getShowFilter",
      initialized: "kuroshiro/getInitialized",
    }),
  },
  methods: {
    ...mapActions({
      initializeKuroshiro: "kuroshiro/initializeKuroshiro",
    }),
  },
};
</script>
<style scoped>
.voca-list {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}

</style>

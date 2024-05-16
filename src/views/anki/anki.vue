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
    <div class="voca-list" v-if="tap === 'favofites'">
      
      <ankiFavoriteCard v-for="item in favorites" :key="item.id" :vocaID="item.vocaID" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import ankiMyCard from "@/views/anki/ankiMyCard.vue";
import ankiFavoriteCard from "@/views/anki/ankiFavoriteCard.vue";

import ankiRecent from "@/views/anki/ankiRecent.vue";

export default {
  components: {
    ankiMyCard,
    ankiRecent,
    ankiFavoriteCard
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
  gap: 12px;
}

</style>

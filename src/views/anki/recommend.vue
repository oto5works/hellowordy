<template>
  <div class="flicking">
    <div class="flicking-title">
      <span class="font-size_24 font-weight_500">추천 암기장</span>
    </div>
    <div class="sp_16" />
    <Flicking
      v-if="vocas"
      ref="flicking"
      :options="{ moveType: 'snap', bound: true }"
      :plugins="plugins"
    >
      <recommendCard v-for="item in recommends" :key="item.vocaID" :vocaID="item.vocaID" />
      <template #viewport>
        <div class="flicking-pagination"></div>
      </template>
    </Flicking>
  </div>
</template>
<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";
import Flicking from "@egjs/vue3-flicking";
import { Pagination } from "@egjs/flicking-plugins";
import recommendCard from "@/views/anki/recommendCard.vue";

export default {
  components: {
    Flicking,
    recommendCard,
  },
  data: function () {
    return {
      plugins: [new Pagination({ type: "bullet" })],
      recommends: [
        {vocaID: "9ISbn44vNNG6KM8JUFdw"},
        {vocaID: "uLkrSD9Jx9p6wkRTR06Q"},
        {vocaID: "ZLep3mGXOYMhojtJTH6C"},
        {vocaID: "mly7rDRRDKgdDnnaOYqA"},
        {vocaID: "AONW1Lh9jRcVF58fnRNw"},
      ],
    };
  },
  computed: {
    ...mapGetters({
      vocas: "vocas/getVocas",
    }),
  },
  methods: {},
};
</script>
<style scoped></style>

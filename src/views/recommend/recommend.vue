<template>
  <div class="flicking">
    <div class="--mio-theme-padding-3">
    <div class="flicking-title">
      <span class="font-size_16 font-weight_500">추천 암기장</span>
      <buttonText
        class="selected height_24 gap_8 pa_8"
        @click="vocasDialog = true"
      >
        <span class="font-size_12">모두 보기</span>
      </buttonText>
    </div>
  </div>
    <div class="sp_16" />
    <Flicking
      v-if="vocas"
      ref="flicking"
      :options="{ moveType: 'snap', bound: true }"
      :plugins="plugins"
    >
      <recommendCard v-for="item in recommends" :key="item" :vocaID="item" />
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
import recommendCard from "@/views/recommend/recommendCard.vue";

export default {
  components: {
    Flicking,
    recommendCard,
  },
  data: function () {
    return {
      plugins: [new Pagination({ type: "bullet" })],
      recommends: ['9ISbn44vNNG6KM8JUFdw', 'uLkrSD9Jx9p6wkRTR06Q', 'kpoSXTOeq3Sl1gQkCdX8', '4Ekjcs9RgWYc01TF6xC4'],
    };
  },
  computed: {
    ...mapGetters({
      vocas: "vocas/getVocas",
    }),
  },
  methods: {
   
  },
};
</script>
<style scoped>
.flicking-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--mio-theme-padding-2);
}
</style>

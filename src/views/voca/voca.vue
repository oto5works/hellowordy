<template>
  <div class="routerView">
    <div class="--mio-theme-padding-2">
      <textField label="Search"> </textField>
    </div>
    <div class="sp_12" />
    <recommend />
    <div class="sp_80" />
    

    <allVocas />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import recommend from "@/views/recommend/recommend.vue";
import allVocas from "@/views/allVocas/allVocas.vue";

export default {
  components: {
    recommend,
    allVocas,
  },
  data() {
    return {
      tap: "my",
    };
  },
  computed: {},
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
.routerView {
  padding-left: 0;
  padding-right: 0;
}
</style>

<template>
  <div class="display_flex flex-direction_column align-items_flex-end gap_4 en line-height_100">
    <div class="font-size_24 font-weight_700">
      {{ currentIndex + 1 }}
    </div>
    <div class="font-size_14 opacity_40">/ {{ lastIndex }}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  computed: {
    ...mapGetters({
      currentIndex: "study/getCurrentIndex",
      lastIndex: "study/getLastIndex",
    }),
  },
  methods: {
    ...mapActions({
      setIndex: "study/setIndex",
    }),
    handleUpdatePart(index) {
      this.setIndex(index);
    },
  },
};
</script>
<style scoped>
.gg {
  flex-direction: column;
}
</style>

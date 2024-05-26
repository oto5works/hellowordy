<template>
  <div class="index">
    <span class="font-weight_700">
      {{ currentIndex + 1 }}
    </span>
    <span class="font-weight_400 opacity_40">/{{ lastIndex }}</span>
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
.index {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 2px;
  font-size: 12px;
}
</style>

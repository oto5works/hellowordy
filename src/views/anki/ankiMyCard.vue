<template>
  <div class="card" @click="handleVocaID()">
    <buttonCard
      class="card-cover"
      :style="{
        backgroundImage: `url(${voca.coverURL})`,
      }"
    >
    </buttonCard>
    <div class="sp_8" />
    <div
      class="display_flex align-items_flex-start justify-content_space-between gap_4 pa_4"
    >
      <div class="font-size_13 kr font-weight_700">
        {{ voca.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    voca: { type: Object },
  },
  methods: {
    handleVocaID() {
      this.$router.push({
        name: "ankiID",
        params: { id: this.voca.id },
      });
    },
  },
};
</script>
<style scoped>
.card {
  width: 100%;
  cursor: pointer;
}
.card-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 16px;
  overflow: hidden;
}
</style>

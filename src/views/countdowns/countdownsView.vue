<template>
  <div class="countdownsView width_100">
    <flip />
  </div>
</template>

<script>
import "@/views/countdowns/flip.scss";
import flip from "@/views/countdowns/flip.vue";

export default {
  components: { flip },
  data() {
    return {
      shouldRenderFlip: true,
    };
  },
  /*
  watch: {
    date: function () {
      this.reloadFlip();
    },
    time: function () {
      this.reloadFlip();
    },
  },
  */
  methods: {
    reloadFlip() {
      this.shouldRenderFlip = false;
      this.$nextTick(() => {
        this.shouldRenderFlip = true;
      });
    },
  },
};
</script>

<style scoped>
.countdownsView {
  width: 100%;
  height: 200px;
  background-color: aqua;
}
</style>
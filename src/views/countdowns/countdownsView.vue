<template>
  <div class="width_100">
    <flip v-if="shouldRenderFlip" :date="date" :time="time" />
  </div>
</template>

<script>
import "@/modules/countdown/flip.scss";
import flip from "@/modules/countdown/flip.vue";

export default {
  components: { flip },
  props: {
    date: { type: String },
    time: { type: String },
  },
  data() {
    return {
      shouldRenderFlip: true,
    };
  },
  watch: {
    date: function () {
      this.reloadFlip();
    },
    time: function () {
      this.reloadFlip();
    },
  },
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

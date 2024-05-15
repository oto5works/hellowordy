<template>
  <div class="display_flex flex-direction_column align-items_center width_100">
    <div class="rabbit404-image" :class="image"><component :is="image" /></div>
    <div class="sp_12" />
    <div
      class="rabbit404-text font-size_13 kr font-weight_400 line-height_130 text-align_center"
      v-html="content"
    ></div>
    <div class="sp_24" />
    <slot />
  </div>
</template>

<script>
import rabbit2 from "@/components/icon/rabbit2.vue";
import rabbit3 from "@/components/icon/rabbit3.vue";
import rabbit4 from "@/components/icon/rabbit4.vue";

export default {
  components: { rabbit2, rabbit3, rabbit4 },
  props: {
    content: { type: String },
    image: { type: String },
  },
  methods: {
    handleClickEvent() {
      this.$emit("click-event");
    },
  },
};
</script>

<style scoped>
.rabbit404-image {
  position: relative;
  height: auto;
}
.rabbit404-image.rabbit2,
.rabbit404-image.rabbit3 {
  width: 60%;
}
.rabbit404-image.rabbit4 {
  width: 40%;
}
.rabbit404-text {
  max-width: 80%;
}
</style>

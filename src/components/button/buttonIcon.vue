<template>
  <button class="buttonIcon" :style="buttonStyle">
    <slot></slot>
    <div class="underlay" />
  </button>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: "none" }, // top, left, none
    size: { type: String, default: "40" },
  },
  computed: {
    buttonStyle() {
      // Convert size prop to a number for CSS unit consistency
      const sizeValue = `${parseInt(this.size, 10)}px`;
      return {
        width: sizeValue,
        height: sizeValue,
      };
    }
  }
};
</script>

<style scoped>
.buttonIcon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--mio-theme-color-on-background));
  border-radius: 16px;
}

.buttonIcon .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-20), 0.6);
}
.buttonIcon:hover .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-20), 0.8);
}

</style>

<template>
  <button
    :class="['buttonOutline', { 'icon-top': icon === 'top', 'icon-left': icon === 'left' }]"
    :style="{ height: height + 'px' }"
  >
    <slot></slot>
    <div class="outline" />
    <div class="underlay" />
  </button>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: 'none' }, // top, left, none
    height: { type: Number, default: 40 }, // Default height is 40px
  },
};
</script>

<style scoped>
.buttonOutline {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 0 24px;
  color: rgb(var(--mio-theme-color-on-background));
  font-size: 13px;
  font-weight: 500;
  border-radius: 24px;
}
.buttonOutline.icon-top {
  flex-direction: column;
}
.buttonOutline.icon-left {
  flex-direction: row;
}
.buttonOutline .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-40), 0.32);
  backdrop-filter: blur(8px);
}
.buttonOutline:hover .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-40), 0.4);
}

.buttonOutline .outline {
  border: 1px solid rgba(var(--mio-theme-color-on-background-70), 0.4);
}
.buttonOutline:hover .outline {
  border: 1px solid rgba(var(--mio-theme-color-on-background-70), 0.7);
}
</style>

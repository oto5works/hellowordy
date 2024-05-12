<template>
  <button class="buttonText">
      <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
.buttonText {
  position: relative;
  font-weight: 500;
  color: rgb(var(--mio-theme-color-on-background));
}
.buttonText.selected {
  color: rgb(var(--mio-theme-color-primary));
}
.buttonText:hover {
  text-decoration: underline;
  font-weight: 700;
}
</style>

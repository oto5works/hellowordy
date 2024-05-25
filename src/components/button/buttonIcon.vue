<template>
  <button class="buttonIcon">
      <slot></slot>
    <div class="overlay" />
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
.buttonIcon {
  position: relative;
  display: flex;
  transition: all 0.4s ease-in-out;
  color: rgb(var(--mio-theme-color-on-background));
  align-items: center;
  border-radius: 24px;
  width: 48px;
  height: 48px;
}
.buttonIcon:hover {
  color: rgb(var(--mio-theme-color-primary));
}

/*-- overlay --*/
.buttonIcon .overlay {
  background-color: rgb(var(--mio-theme-color-primary), 0);
}
.buttonIcon:hover .overlay {
  background-color: rgb(var(--mio-theme-color-primary), 0.16);
}
</style>

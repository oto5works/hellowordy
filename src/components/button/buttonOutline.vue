<template>
  <button class="buttonOutline">
    <slot></slot>
    <div class="outline" />
    <div class="overlay" />
  </button>
</template>

<script>
export default {

};
</script>

<style scoped>
.buttonOutline {
  position: relative;
  display: flex;
  align-items: center;
  transition: all 0.4s ease-in-out;
  color: rgb(var(--mio-theme-color-on-background));
  border-radius: 24px;
  font-size: 14px;
  font-weight: 400;
}
.buttonOutline.selected {
  color: rgb(var(--mio-theme-color-primary));
}
/*-- overlay --*/
.buttonOutline .overlay {
  background-color: currentColor;
  opacity: 0;
}
.buttonOutline.selected .overlay {
  background-color: currentColor;
}
.buttonOutline:hover .overlay {
  opacity: 0.16;
}

/*-- outline --*/
.buttonOutline .outline {
  border-style: solid;
  border-width: 1px;
  border-color: inherit;
}

</style>

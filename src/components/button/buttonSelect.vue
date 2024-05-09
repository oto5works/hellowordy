<template>
  <button class="buttonSelect">
      <slot></slot>

    <div class="outline" />
    <div class="overlay" />
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
.buttonSelect {
  position: relative;
  display: flex;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.4s ease-in-out;
  color: rgb(var(--mio-theme-color-on-background));
  border-radius: 24px;
}
.buttonSelect.selected {
  color: rgb(var(--mio-theme-color-primary));
  font-weight: 700;
}
/*-- overlay --*/
.buttonSelect .overlay {
  background-color: rgb(var(--mio-theme-color-on-background));
  opacity: 0;
}
.buttonSelect:hover .overlay {
  opacity: 0.16;
}
.buttonSelect.selected .overlay {
  background-color: rgb(var(--mio-theme-color-primary));
  opacity: 0.12;
}
/*-- outline --*/
.buttonSelect .outline {
  border-style: solid;
  border-width: 1px;
  border-color: rgb(var(--mio-theme-color-on-background));
  opacity: 0.16;
}
.buttonSelect:hover .outline {
  opacity: 1;
}
.buttonSelect.selected .outline {
  border-color: rgb(var(--mio-theme-color-primary));
  opacity: 1;
}
</style>

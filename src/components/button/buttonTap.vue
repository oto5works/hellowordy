<template>
  <button class="buttonTap">
    <div class="slot">
      <slot></slot>
    </div>
          <div class="overlay" />
    <div class="underlay" />
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
.buttonTap {
  position: relative;
  display: flex;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.4s ease-in-out;
  color: rgb(var(--mio-theme-color-on-background));
  border-radius: 24px;
  height: 40px;
  padding: 0 16px;
}
.buttonTap.selected {
  color: rgb(var(--mio-theme-color-primary));
  font-weight: 700;
}
.buttonTap .slot {
  opacity: 0.7;
}
.buttonTap.selected .slot {
  opacity: 1;
}
/*-- underlay --*/
.buttonTap .underlay {
  background-color: rgb(var(--mio-theme-color-on-background));
  opacity: 0;
}
.buttonTap.selected .underlay {
  background-color: rgb(var(--mio-theme-color-primary));
  opacity: 0.24;
}
/*-- overlay --*/
.buttonTap .overlay {
  background-color: rgb(var(--mio-theme-color-primary));
  opacity: 0;
}
.buttonTap:hover .overlay {
  opacity: 0.12;
}
.buttonTap.selected .overlay {
  background-color: rgb(var(--mio-theme-color-on-background));
}
</style>

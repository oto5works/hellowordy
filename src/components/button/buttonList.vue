<template>
  <button class="buttonList">
    <slot></slot>

    <div class="overlay" />
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
.buttonList {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  border-radius: 36px;
  font-size: 15px;
  color: rgb(var(--mio-theme-color-on-background));
  transition: all 0.4s ease-in-out;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100%;
  height: 48px;
  padding: 0 var(--mio-theme-padding-2);
}
.buttonList.selected {
  color: rgb(var(--mio-theme-color-primary));
}
/*-- overlay --*/
.buttonList .overlay {
  background-color: rgb(var(--mio-theme-color-primary));
  opacity: 0;
}
.buttonList:hover .overlay {
  opacity: 0.16;
}
</style>

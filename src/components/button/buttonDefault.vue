<template>
  <button class="buttonDefault">
    <slot></slot>

    <div class="overlay" />
    <div class="underlay" />
    <div class="shadow" />
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
/*--- 공통사항 ---*/
.buttonDefault .shadow {
  z-index: -2;
}
.buttonDefault .underlay {
  z-index: -1;
}
.buttonDefault .overlay {
  z-index: 0;
}
.buttonDefault .fnOption-text {
  z-index: 3;
}
.buttonDefault .more {
  z-index: 5;
}
.buttonDefault span,
.buttonDefault svg,
.buttonDefault p {
  z-index: 6;
}
.buttonDefault .overlay,
.buttonDefault .underlay,
.buttonDefault .shadow {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: inherit;
  pointer-events: none;
}
.buttonDefault .overlay {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: inherit;
  transition: all 0.2s ease-in-out;
  opacity: 0;
}
.buttonDefault:hover .overlay {
  opacity: 0.08;
}

.buttonDefault {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  z-index: 1;
  border-radius: 36px;
  color: rgb(var(--mio-theme-color-on-background));
  transition: all 0.4s ease-in-out;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: rgb(var(--mio-theme-color-background));
}
.buttonDefault:hover svg {
  stroke-width: 26;
}
.buttonDefault:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.buttonDefault.selected {
  color: rgb(var(--mio-theme-color-on-primary));
}
/*-- overlay --*/
.buttonDefault .overlay {
  background-color: rgba(var(--mio-theme-color-on-background), 0.02);
}
.buttonDefault:hover .overlay {
  background-color: rgba(var(--mio-theme-color-on-background), 0.04);
}
.buttonDefault.selected .overlay {
  background-color: rgba(var(--mio-theme-color-primary), 0.12);
}
/*-- underlay --*/
.buttonDefault .underlay {
  background-color: rgba(var(--mio-theme-color-on-background), 0.12);
}
.buttonDefault.selected .underlay {
  background-color: rgba(var(--mio-theme-color-primary), 1);
}
/*-- shadow --*/
.buttonDefault .shadow {
  box-shadow: 0 0 0 0 rgba(var(--mio-theme-color-primary), 0);
}
.buttonDefault.selected .shadow {
  box-shadow: 0px 7px 29px 0px rgba(var(--mio-theme-color-primary), 0.3);
}
</style>

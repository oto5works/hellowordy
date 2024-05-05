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
  color: var(--mio-theme-color-on-background);
  transition: all 0.4s ease-in-out;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
  
}
.buttonDefault:hover svg {
  stroke-width: 26;
}
.buttonDefault:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.buttonDefault.selected {
  color: var(--mio-theme-color-on-primary);
}
/*-- overlay --*/
.buttonDefault .overlay {
  background-color: var(--mio-theme-color-on-background);
  opacity: 0.02;
}
.buttonDefault:hover .overlay {
  opacity: 0.04;
}
.buttonDefault.selected .overlay {
  background-color: var(--mio-theme-color-primary);
  opacity: 0.12;
}
/*-- underlay --*/
.buttonDefault .underlay {
  background-color: var(--mio-theme-color-on-background);
  opacity: .12;
}
.buttonDefault.selected .underlay {
  background-color: var(--mio-theme-color-primary);
  opacity: 1;
}
/*-- shadow --*/
.buttonDefault .shadow {
  box-shadow: 0 0 0 0 var(--mio-theme-color-primary);
  opacity: 0;
}
.buttonDefault.selected .shadow {
  box-shadow: 0px 7px 29px 0px var(--mio-theme-color-primary);
  opacity: 0.2;
}
</style>

<template>
  <button>
    <div class="slot">
      <slot></slot>
    </div>

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
button .shadow {
  z-index: -2;
}
button .underlay {
  z-index: -1;
}
button .overlay {
  z-index: 0;
}
button .fnOption-text {
  z-index: 3;
}
button .more {
  z-index: 5;
}
button span,
button svg,
button p {
  z-index: 6;
}
button .overlay,
button .underlay,
button .shadow {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: inherit;
  pointer-events: none;
}
button .overlay {
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
button:hover .overlay {
  opacity: 0.08;
}

button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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
button:hover svg {
  stroke-width: 26;
}
button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
button span {
  color: currentColor;
  font-size: 14px;
  font-family: var(--mio-theme-font-family);
  font-weight: 400;
}
button .slot {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
}
button.selected {
  color: var(--mio-theme-color-on-primary);
}
/*-- overlay --*/
button .overlay {
  background-color: var(--mio-theme-color-on-background);
  opacity: 0.02;
}
button:hover .overlay {
  opacity: 0.04;
}
button.selected .overlay {
  background-color: var(--mio-theme-color-primary);
  opacity: 0.12;
}
/*-- underlay --*/
button .underlay {
  background-color: var(--mio-theme-color-on-background);
  opacity: .12;
}
button.selected .underlay {
  background-color: var(--mio-theme-color-primary);
  opacity: 1;
}
/*-- shadow --*/
button .shadow {
  box-shadow: 0 0 0 0 var(--mio-theme-color-primary);
  opacity: 0;
}
button.selected .shadow {
  box-shadow: 0px 7px 29px 0px var(--mio-theme-color-primary);
  opacity: 0.2;
}
</style>

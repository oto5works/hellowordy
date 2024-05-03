<template>
  <button class="buttonText">
    <div class="slot">
      <slot></slot>
    </div>
    <div class="overlay" />

  </button>
</template>

<script>
export default {};
</script>

<style scoped>
.buttonText {
  position: relative;
  display: flex;
  cursor: pointer;
  padding: 8px;
  font-size: 13px;
  transition: all 0.4s ease-in-out;
  color: var(--mio-theme-color-primary);
  align-items: center;
}
.buttonText .slot {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
}
/*-- overlay --*/
.buttonText .overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  background-color: var(--mio-theme-color-primary);
  opacity: 0;
}
.buttonText:hover .overlay {
  opacity: 0.04;
}
/*-- span --*/
.buttonText .slot {
  opacity: 1;
}
span {
  font-size: inherit;
}
</style>

<template>
  <button class="buttonCard">
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
.buttonCard {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: rgb(var(--mio-theme-color-on-background));
  transition: all 0.4s ease-in-out;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgb(var(--mio-theme-color-background));
}
/*-- overlay --*/
.buttonCard .overlay {
  background-color: rgb(var(--mio-theme-color-primary));
  opacity: 0;
}
.buttonCard:hover .overlay {
  opacity: 0.16;
}
/*-- underlay --*/
.buttonCard .underlay {
  background-color: rgba(var(--mio-theme-color-on-background), 0.12);
}
.buttonCard.selected .underlay {
  background-color: rgba(var(--mio-theme-color-primary), 1);
}
.buttonCard.selected {
  color: rgba(var(--mio-theme-color-on-primary), 1);
}
/*-- shadow --*/
.buttonCard .shadow {
  -webkit-box-shadow: 0 10px 20px -10px rgba(var(--mio-theme-color-primary), 0);
  box-shadow: 0 10px 20px -10px rgba(var(--mio-theme-color-primary), 0);
}
.buttonCard.selected .shadow {
  -webkit-box-shadow: 0 10px 20px -10px rgba(var(--mio-theme-color-primary), 1);
  box-shadow: 0 10px 20px -10px rgba(var(--mio-theme-color-primary), 1);
}
</style>

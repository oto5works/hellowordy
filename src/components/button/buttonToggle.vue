<template>
  <button class="buttonToggle">
    <slot></slot>
    <div class="outline" />
    <div class="overlay" />
    <div class="underlay" />
    <div class="shadow" />
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
.buttonToggle {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  color: rgb(var(--mio-theme-color-primary));
  border-radius: 24px;
  font-size: 14px;
  font-weight: 700;
}
.buttonToggle.selected {
  color: rgb(var(--mio-theme-color-on-primary));
}
/*-- overlay --*/
.buttonToggle .overlay {
  background-color: rgb(var(--mio-theme-color-primary));
  opacity: 0;
}
.buttonToggle.selected .overlay {
  background-color: rgb(var(--mio-theme-color-on-background));
}
.buttonToggle:hover .overlay {
  opacity: 0.16;
}

/*-- underlay --*/
.buttonToggle .underlay {
  background-color: rgba(var(--mio-theme-color-background), 1);
}
.buttonToggle.selected .underlay {
  background-color: rgba(var(--mio-theme-color-primary), 1);
}
/*-- outline --*/
.buttonToggle .outline {
  border-style: solid;
  border-width: 1px;
  border-color: rgba(var(--mio-theme-color-primary));
}
/*-- shadow --*/
.buttonToggle .shadow {
  -webkit-box-shadow: 0 10px 20px -10px rgba(var(--mio-theme-color-primary),0);
  box-shadow: 0 10px 20px -10px rgba(var(--mio-theme-color-primary),0);
}
.buttonToggle.selected .shadow {
  -webkit-box-shadow: 0 10px 20px -10px rgba(var(--mio-theme-color-primary),1);
  box-shadow: 0 10px 20px -10px rgba(var(--mio-theme-color-primary),1);
  }
</style>

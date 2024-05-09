<template>
  <button class="buttonSelect">
    <div class="slot">
      <slot></slot>
    </div>

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
.buttonSelect {
  position: relative;
  display: flex;
  cursor: pointer;
  padding: 6px 10px;
  font-size: 13px;
  transition: all 0.4s ease-in-out;
  color: rgb(var(--mio-theme-color-on-background));
  border-radius: 24px;
}
.buttonSelect .slot {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
}
.buttonSelect.selected {
  color: rgb(var(--mio-theme-color-primary));
  font-weight: 700;
}
/*-- overlay --*/
.buttonSelect .overlay {
  background-color: rgb(var(--mio-theme-color-on-background));
  opacity: 0.02;
}
.buttonSelect:hover .overlay {
  opacity: 0.04;
}
.buttonSelect.selected .overlay {
  background-color: rgb(var(--mio-theme-color-primary));
  opacity: 0.12;
}
/*-- underlay --*/
.buttonSelect .underlay {
  background-color: rgb(var(--mio-theme-color-background));
  opacity: 0;
}
/*-- outline --*/
.buttonSelect .outline {
  border-style: solid;
  border-width: 1px;
  border-color: rgb(var(--mio-theme-color-on-background));
  opacity: 0.12;
}
.buttonSelect:hover .outline {
  opacity: 0.16;
}
.buttonSelect.selected .outline {
  border-width: 2px;
  border-color: rgb(var(--mio-theme-color-primary));
  opacity: 1;
}
/*-- shadow --*/
.buttonSelect .shadow {
  box-shadow: 0 0 0 0 rgb(var(--mio-theme-color-on-background));
  opacity: 0;
}
.buttonSelect.selected .shadow {
  box-shadow: 0px 7px 29px 0px rgb(var(--mio-theme-color-primary));
  opacity: 0.2;
}

/*-- span --*/
.buttonSelect .slot {
  opacity: 0.6;
}
.buttonSelect:hover .slot,
.buttonSelect.selected .slot {
  opacity: 1;
}
</style>

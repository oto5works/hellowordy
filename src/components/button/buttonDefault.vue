<template>
  <button class="buttonDefault"
  :class="{ config: config }"
  >
    <slot></slot>

    <div class="overlay" />
    <div class="underlay" />
    <div class="shadow" />
  </button>
</template>

<script>
export default {
  props: {
    config: { type: Boolean },
  },
};
</script>

<style scoped>
.buttonDefault {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 36px;
  font-size: 14px;
  font-weight: 500;
  color: rgb(var(--mio-theme-color-on-background));
  transition: all 0.4s ease-in-out;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.buttonDefault.selected {
  color: rgb(var(--mio-theme-color-on-primary));
  font-weight: 700;
}
/*-- overlay --*/
.buttonDefault .overlay {
  background-color: rgb(var(--mio-theme-color-primary));
  opacity: 0;
}
.buttonDefault:hover .overlay {
  opacity: 0.16;
}
.buttonDefault.selected .overlay {
  background-color: rgb(var(--mio-theme-color-on-background));
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
  -webkit-box-shadow: 0 10px 20px -10px rgba(var(--mio-theme-color-primary), 0);
  box-shadow: 0 10px 20px -10px rgba(var(--mio-theme-color-primary), 0);
}
.buttonDefault.selected .shadow {
  -webkit-box-shadow: 0 10px 20px -10px rgba(var(--mio-theme-color-primary), 1);
  box-shadow: 0 10px 20px -10px rgba(var(--mio-theme-color-primary), 1);
}
</style>


<style scoped>
.buttonDefault.config {
  color: rgb(var(--mio-theme-color-background));
}
/*-- overlay --*/
.buttonDefault.config .overlay {
  background-color: rgb(var(--mio-theme-color-on-background));
  opacity: 0;
}
/*-- underlay --*/
.buttonDefault.config .underlay {
  background-color: rgba(var(--mio-theme-color-on-background), 1);
}
/*-- shadow --*/
.buttonDefault.config .shadow {
  -webkit-box-shadow: 0 10px 20px -10px rgba(var(--mio-theme-color-on-background), 1);
  box-shadow: 0 10px 20px -10px rgba(var(--mio-theme-color-on-background), 1);
}
</style>
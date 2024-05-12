<template>
  <button class="buttonNav">
    <div class="icon">
      <slot></slot>
      <div class="overlay" />
      <div class="underlay" />
    </div>

    <span>{{ title }}</span>
  </button>
</template>

<script>
export default {
  props: {
    title: { type: String },
  },
};
</script>

<style scoped>
.buttonNav {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
  color: rgb(var(--mio-theme-color-on-background));
  transition: all 0.4s ease-in-out;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
}
.buttonNav .icon {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 28px;
  border-radius: 36px;
}
.buttonNav span {
  font-size: 12px;
  font-weight: 500;
}
/*-- overlay --*/
.buttonNav .icon .overlay {
  background-color: rgb(var(--mio-theme-color-primary));
  opacity: 0;
}
.buttonNav:hover .icon .overlay {
  opacity: 0.16;
}
.buttonNav.selected .icon .overlay {
  background-color: rgb(var(--mio-theme-color-on-background));
}
/*-- underlay --*/
.buttonNav .icon .underlay {
  background-color: rgba(var(--mio-theme-color-on-background), 0);
}
.buttonNav.selected .icon .underlay {
  background-color: rgba(var(--mio-theme-color-primary), 0.4);
}
</style>

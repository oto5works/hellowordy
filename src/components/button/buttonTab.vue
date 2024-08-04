<template>
    <button class="buttonTab">
    <slot></slot>
    <div class="underlay" />
    <div class="outline" />
  </button>
</template>

<script>
export default {
  props: {
  },
};
</script>

<style scoped>
.buttonTab {
  position: relative;
  display: flex;
  flex-direction: row;
  flex: 1 1 100%;
  color: rgb(var(--mio-theme-color-on-background-70));
  font-size: 14px;
  font-weight: 500;
  border-radius: 16px;
  min-height: 48px;
  padding: 0 24px;
}
.buttonTab .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-20), 0);
}
.buttonTab:hover .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-40), 0.24);
}

.buttonTab .outline {
  border-radius: 0px;
  border-bottom: 2px solid rgba(var(--mio-theme-color-primary), 0);
}
.buttonTab.selected {
  color: rgb(var(--mio-theme-color-primary));
}
.buttonTab.selected .outline {
  border-bottom: 2px solid rgba(var(--mio-theme-color-primary), 1);
}

</style>

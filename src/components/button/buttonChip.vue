<template>
    <button class="buttonChip">
      <div class="display_flex align-items_center gap_12">
        <slot></slot>
      </div>
    

    <icon class="check icon_16"><check/></icon>
    <div class="underlay" />
  </button>
</template>




<script>
import check from "@/components/icon/check.vue";

export default {
  components: {
    check,
  },
  props: {
  },
};
</script>

<style>


</style>

<style scoped>
.buttonChip {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
  color: rgb(var(--mio-theme-color-on-background-70));
  font-size: 13px;
  font-weight: 400;
  border-radius: 12px;
  min-height: 48px;
  width: 100%;
  padding: 0 24px;
}
.buttonChip .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-20), 0);
}
.buttonChip:hover .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-40), 0.24);
}


.buttonChip.selected {
  color: rgb(var(--mio-theme-color-on-background));
}
.buttonChip.selected .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-40), 0.8);
}
.check {
  display: none;
}
.buttonChip.selected .check {
  display: block;
}
</style>

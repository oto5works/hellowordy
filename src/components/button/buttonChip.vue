<template>
    <button class="buttonChip">
      <icon class="check icon_14"><check/></icon>

      <div class="display_flex align-items_center gap_4">
        <slot></slot>
      </div>
    

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
  gap: 4px;
  color: rgb(var(--mio-theme-color-on-background-70));
  font-size: 13px;
  font-weight: 400;
  border-radius: 12px;
  padding: 0 12px;
  height: 32px;
  text-transform: unset;

}
.buttonChip .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-20), 0.24);
}
.buttonChip:hover .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-40), 0.24);
}


.buttonChip.selected {
  font-weight: 500;
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

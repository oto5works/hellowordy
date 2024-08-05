<template>
    <button class="buttonChip">

        <slot></slot>
    

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
  gap: 8px;
  color: rgb(var(--mio-theme-color-on-background-70));
  font-size: 15px;
  font-weight: 400;
  border-radius: 12px;
  padding: 0 12px;
  height: 36px;
  text-transform: unset;

}
.buttonChip .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-20), 0.5);
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

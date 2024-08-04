<template>
    <button class="buttonOption">
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
.buttonOption {
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
.buttonOption .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-20), 0);
}
.buttonOption:hover .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-40), 0.24);
}


.buttonOption.selected {
  font-weight: 500;
  color: rgb(var(--mio-theme-color-on-background));
}
.buttonOption.selected .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-40), 0.8);
}
.check {
  display: none;
}
.buttonOption.selected .check {
  display: block;
}
</style>

<template>
  <button class="buttonAnki"
  :class="{ arrow: arrow }"
  >
    <icon><component :is="action" /></icon>
    <span v-if="!arrow">{{ action }}</span>
      <div class="overlay"/>
      <div class="underlay"/>
  </button>
</template>

<script>
import check from "@/components/icon/check";
import mean from "@/components/icon/kr";
import furi from "@/components/icon/jp";
import previous from "@/components/icon/caretLineLeft";
import next from "@/components/icon/caretLineRight";
export default {
  components: {
    check,
    mean,
    furi,
    previous,
    next,
  },
  props: {
    action: { type: String },
    arrow: { type: Boolean },
  },
};
</script>

<style scoped>
.buttonAnki {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  font-size: 12px;
  color: rgb(var(--mio-theme-color-on-background));
  width: 48px;
  height: 72px;
  border-radius: 24px;
}
.buttonAnki svg {
  width: 18px;
  height: 18px;
  opacity: 0.4;
}
.buttonAnki span {
  content: '';
  height: 12px;
}

.buttonAnki.selected svg {
  opacity: 1;
  stroke-width: 26;
}
.buttonAnki .underlay {
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
.buttonAnki:hover {
  font-weight: 700;
}
.buttonAnki .overlay {
  background-color: rgba(var(--mio-theme-color-primary),0.12) ;
  opacity: 0;
}
.buttonAnki:hover .overlay {
  opacity: 1;
}

.buttonAnki.arrow svg {
  opacity: 1;
}
</style>

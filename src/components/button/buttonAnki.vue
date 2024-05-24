<template>
  <button class="buttonAnki"
  :class="{ arrow: arrow }"
  >
   <div class="icon"><icon><component :is="action" /></icon>
    <div class="overlay"/>
   </div> 
    <span v-if="!arrow">{{ action }}</span>
      
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
  gap: 2px;
  font-weight: 500;
  font-size: 12px;
  color: rgb(var(--mio-theme-color-on-background));
  width: 48px;
  height: 72px;
  border-radius: 24px;
}
.buttonAnki .icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 24px;
}
.buttonAnki .icon svg {
  width: 18px;
  height: 18px;
  opacity: 0.4;
}
.buttonAnki.selected .icon svg {
  opacity: 1;
  stroke-width: 26;
}
.buttonAnki span {
  content: '';
  height: 12px;
}


.buttonAnki .underlay {
  
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

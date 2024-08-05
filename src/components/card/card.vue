<template>
  <button class="card">

    <div class="display_flex gap_4 align-items_center">
      <icon class="icon_16 selected-icon"><check/></icon>
      <div class="title font-size_15 font-weight_700">{{ title }}</div>

    </div>
    <div class="prompt font-size_13 font-weight_400">{{ prompt }}</div>

    <slot></slot>
    <div class="outline" />
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
    title: { type: String, default: "none" },
    prompt: { type: String, default: "none" },
    loading: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: unset;
  justify-content: unset;
  text-align: left;
  gap: 12px;
  padding: 24px;
  color: rgb(var(--mio-theme-color-on-background));
  border-radius: 24px;
  min-height: 120px;
  width: 240px;
  text-transform: unset;

}

.card .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-40), 0.24);
  backdrop-filter: blur(8px);
}

.card:hover .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-40), 0.4);
}

.card .outline {
  border: 1px solid rgba(var(--mio-theme-color-on-background-70), 0.4);
}

.card:hover .outline {
  border: 1px solid rgba(var(--mio-theme-color-on-background-70), 0.7);
}

.card.disabled {
  color: rgb(var(--mio-theme-color-on-background-40));
  cursor: wait;
}

.card.disabled .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-40), 0.24);
}

.card.disabled .outline {
  border: 1px solid rgba(var(--mio-theme-color-on-background-70), 0.32);
}
.card.textLoading .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-40), 0.08);
}

.card.textLoading .outline {
  border: 1px solid rgba(var(--mio-theme-color-on-background-70), 0.12);
}
.card.textLoading {
  pointer-events: none;
  cursor: wait;
}

/* Skeleton loading styles */
.card.textLoading .title,
.card.textLoading .prompt {
  background: linear-gradient(90deg, #3C3C3C 25%, #646464 50%, #3C3C3C 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 12px;
  opacity: .4;
}

.card.textLoading .title {
  color: transparent;
}

.card.textLoading .prompt {
  color: transparent;
}

@keyframes loading {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}

.prompt {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

/*-- selected --*/
.card .selected-icon {
  display: none;
}
.card.selected .selected-icon {
  display: block;
}
.card.selected {
  color: rgb(var(--mio-theme-color-primary));
}

.card.selected .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-40), 0.4);
}

.card.selected .outline {
  border: 1px solid rgba(var(--mio-theme-color-primary), 0.32);
}


</style>

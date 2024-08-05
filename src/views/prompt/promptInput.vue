<template>
  <div class="promptInput-wrap">
    <transition name="slide">
      <button class="promptInput" v-if="showPrompt" :key="promptKey">
        <div class="font-size_15 font-weight_700">{{ currentPrompt.title }}</div>
        <div class="font-size_14 font-weight_400">{{ currentPrompt.prompt }}</div>
        <div class="underlay"/>
      </button>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      promptKey: 0,
      showPrompt: true
    };
  },
  computed: {
    ...mapGetters({
      currentPrompt: "prompts/currentPrompt",
    }),
  },
  watch: {
    currentPrompt: {
      handler() {
        this.showPrompt = false; // 기존 컴포넌트를 숨깁니다.
        setTimeout(() => {
          this.promptKey += 1; // 컴포넌트 키를 변경하여 새로운 인스턴스를 생성합니다.
          this.showPrompt = true; // 새로운 컴포넌트를 표시합니다.
        }, 0); // 다음 틱에서 새로운 컴포넌트를 표시합니다.
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
@keyframes slideIn {
  from {
    transform: translateY(10%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.promptInput-wrap {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.promptInput {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  color: rgb(var(--mio-theme-color-on-background));
  font-size: 15px;
  border-radius: 24px;
  width: 80%;
  text-align: left;
}
.promptInput .underlay {
  background-color: rgba(var(--mio-theme-color-on-background-40), 0.24);
  backdrop-filter: blur(8px);
}
.slide-enter-active {
  animation: slideIn 0.5s ease-out forwards;
}
</style>

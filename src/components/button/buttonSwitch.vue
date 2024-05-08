<template>
  <div class="switch-button" :class="{ 'selected': modelValue }" @click="toggleSwitch">
    <!-- modelValue prop을 사용하여 클래스 바인딩 -->
    <div class="switch-circle" :class="{ 'selected': modelValue }"></div>
  </div>
</template>

<script>
export default {
  name: 'SwitchButton',
  props: {
    modelValue: Boolean, // Vue 3에서 v-model을 사용하기 위해 modelValue prop 사용
  },
  emits: ['update:modelValue'], // modelValue 업데이트를 위한 이벤트 정의
  methods: {
    toggleSwitch() {
      // modelValue 값을 반전시켜 update:modelValue 이벤트와 함께 부모 컴포넌트에 전달
      this.$emit('update:modelValue', !this.modelValue);
    },
  },
};
</script>

<style>
.switch-button {
  width: 28px;
  height: 16px;
  background-color: rgba(var(--mio-theme-color-on-background),.4);
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
}

.switch-circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(var(--mio-theme-color-on-background),.8);
  transition: transform 0.2s ease;
}

.switch-button.selected {
  background-color: rgba(var(--mio-theme-color-primary),.6);
}

.switch-circle.selected {
  transform: translateX(12px);
  background-color: rgb(var(--mio-theme-color-primary));
}
</style>

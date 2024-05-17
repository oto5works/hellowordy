<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.card {
  width: 100%;
  background-color: rgb(var(--mio-theme-color-on-background), 0.04);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
}
</style>
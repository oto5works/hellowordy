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
  background-color: rgb(var(--mio-theme-color-on-background), 0.16);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
}
</style>
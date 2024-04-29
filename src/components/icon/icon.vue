<template>
  <svg xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 256 256" 
    role="presentation"
  >
    <g>
      <slot />
    </g>
  </svg>
</template>

<script>
export default {}
</script>

<style scoped>
svg {
  fill: none;
  display: inline-block;
  vertical-align: baseline;
  flex-shrink: 0;
  stroke-linecap:round;
  stroke-linejoin:round;
  stroke-miterlimit:10;
  stroke-width: 20;
  stroke: currentColor;
  }
</style>
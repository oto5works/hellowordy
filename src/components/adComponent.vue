<template>
  <div class="ad-container">
    <!-- AdSense 광고 코드를 여기에 삽입합니다. -->
    <ins class="adsbygoogle"
    style="display:inline-block;width:320px;height:50px"
         data-ad-client="ca-pub-3365711295624526"
         data-ad-slot="4074778003"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  </div>
</template>

<script>
export default {
  mounted() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
}
</script>

<style scoped>
.ad-container {
  position: fixed;
  bottom: 0;
  height: 160px;
  width: 100%;
  left: 0;
}
</style>

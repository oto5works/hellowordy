<template>
  <div class="google-ad">
    <ins class="adsbygoogle"
         style="display:block"
         :data-ad-client="adClient"
         :data-ad-slot="adSlot"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  </div>
</template>

<script>
export default {
  name: 'GoogleAd',
  props: {
    adClient: {
      type: String,
      required: true,
      default: 'ca-pub-3365711295624526'
    },
    adSlot: {
      type: String,
      required: true,
      default: '4288979542'
    }
  },
  mounted() {
    // Ensure the adsbygoogle array is defined
    (adsbygoogle = window.adsbygoogle || []).push({});
  }
}
</script>

<style scoped>
.google-ad {
  /* Add any specific styling for your ad container */
}
</style>

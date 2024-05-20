<template>
  <div>
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-3365711295624526"
         data-ad-slot="4288979542"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  </div>
</template>

<script>
export default {
  name: 'GoogleAdComponent',
  mounted() {
    // 광고 스크립트가 이미 페이지에 추가되었는지 확인합니다.
    if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
      window.adsbygoogle.push({});
    } else {
      // Google AdSense 스크립트를 동적으로 추가합니다.
      const adScript = document.createElement('script');
      adScript.async = true;
      adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      adScript.setAttribute('data-ad-client', 'ca-pub-3365711295624526');
      adScript.crossOrigin = 'anonymous';
      document.head.appendChild(adScript);

      // 광고 스크립트가 로드된 후 광고를 초기화합니다.
      adScript.onload = () => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      };
    }
  }
}
</script>
<style scoped>
.adsbygoogle {
  border: 1px solid black;
  background-color: rgb(var(--mio-theme-color-primary), 0.3);
  width: 100%;
  min-height: 320px;
}
</style>
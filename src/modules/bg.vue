<template>
    <teleport to="#app">
  <div class="loading-container">
    <img
      :src="currentSrc"
      class="loading-image"
      :class="{ 'loading': isLoading || welcomeText, 'loaded': !isLoading && !welcomeText }"
    />
    <div class="gradient"/>
  </div>
  </teleport>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      loadedSrc: "https://hello-wordy.web.app/image/bg.png",
      loadingSrc: "https://hello-wordy.web.app/image/bg.gif",
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "status/isLoading",
      welcomeText: "status/welcomeText",
    }),
    currentSrc() {
      return (this.isLoading || this.welcomeText) ? this.loadingSrc : this.loadedSrc;
    },
  },
  methods: {
    ...mapActions({
      generateWord: "wordData/generateWord",
    }),
  },
};
</script>

<style scoped>
.loading-container {
  position: fixed;
  width: 100%;
  height: 100%;
}

.loading-image {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
  filter: blur(0px);
}
/*
.loaded {
  bottom: 24%;
  width: 90%;
}
*/

.loaded {
  bottom: -72vh;
  height: 76vh;
  filter: blur(2px);
}
.loading {
  bottom: 24vh;
  height: 44vh;
}
  
.gradient {
  position: absolute;
  bottom: 0%;
  width: 100%;
  height: 30%;
  background: rgb(0,0,0);
background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
}
</style>

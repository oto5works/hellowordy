<template>
  <div class="loading-container">
    <img
      :src="currentSrc"
      class="loading-image"
      :class="{ 'loading': isLoading, 'loaded': !isLoading }"
    />
    <div class="gradient"/>

  </div>
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
    }),
    currentSrc() {
      return this.isLoading ? this.loadingSrc : this.loadedSrc;
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
  max-width: 480px;
  background-color: #000;
  overflow: hidden;
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
  bottom: -66%;
  width: 140%;
  filter: blur(2px);
}
.loading {
  bottom: 24%;
  width: 90%;
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

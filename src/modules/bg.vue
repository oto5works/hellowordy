<template>
  <div class="loading-container">
    <img
      :src="imageSrc"
      :class="{ 'loading-image': isLoading, 'loaded-image': !isLoading }"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      searchTerm: "",
      imageSrc: "https://hellowordy.web.app/image/bg.gif",
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "status/isLoading",
    }),
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
  background-color: aqua;
  overflow: hidden;
}

.loaded-image {
  position: absolute;
  bottom: -80%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 160%;
  transition: all 0.3s ease;
}

.loading-image {
  position: absolute;
  transition: all 0.3s ease;
  width: 80%;
  bottom: 0;
}
</style>

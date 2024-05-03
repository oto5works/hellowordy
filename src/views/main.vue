<template>
  <div>
    <button style="color: white" @click="navigateToViewWords">
      Go to Kuromoji
    </button>
    <p>{{ message }}</p>
    <p v-if="initializationProgress > 0 && initializationProgress < 100">
      진행률: {{ initializationProgress }}%
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      message: "",
      initializationProgress: 0,
    };
  },
  mounted() {
    this.handleInitialize();
  },
  computed: {
    ...mapGetters({
      initialized: "filter/getInitialized",
    }),
  },
  methods: {
    ...mapActions({
      initialize: "filter/initialize",
    }),
    async handleInitialize() {
      this.message = "사전 정보를 불러오고 있어요.";
      let progressInterval = setInterval(() => {
        if (this.initializationProgress >= 100) {
          clearInterval(progressInterval);
        } else {
          this.initializationProgress += 30;
        }
      }, 500);
      try {
        await this.initialize(); // ensure initialize() finishes before proceeding
        this.message = "사전 정보 불러오기 완료";
        this.initializationProgress = 100;
      } catch (error) {
        console.error(error);
        this.message = "사전 정보 불러오기 실패";
      }
    },

    navigateToViewWords() {
      this.$router.push({ name: "viewWords" });
    },
  },
};
</script>

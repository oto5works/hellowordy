<template>
  <div class="currentMessage font-size_32 font-weight_700 pa_24">
    {{ currentMessage }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    currentStep: { type: [String, Number], default: "1" },
  },
  computed: {
    ...mapGetters({
      settings: "translations/settings",
    }),
    currentMessage() {
      const stepMessages = {
        "1": this.settings.message.step1,
        "2": this.settings.message.step2,
        "3": this.settings.message.step3,
        "4": this.settings.message.step4,
      };
      return stepMessages[this.currentStep] || "";
    },
  },
};
</script>

<style scoped>
.currentMessage {
  
}
</style>

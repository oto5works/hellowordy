<template>
  <div
    class="settingsSaving"
    :class="{ 'fade-in': isLoading, 'fade-out': !isLoading }"
  >
    <div class="font-size_24 font-weight_700 text-align_center width_70">
      <span v-show="saveError">{{ settings.message.isError }}</span>
      <span v-show="!saveError">{{ settings.message.isSaving }}</span>
    </div>
    <div class="spacing-1" />
    <div v-show="saveError" class="height_40">
      <buttonOutline @click="retrySaveSettings">{{
        common.button.retry
      }}</buttonOutline>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    saveError: { type: Boolean },
  },
  computed: {
    ...mapGetters({
      isLoading: "status/isLoading",
      common: "translations/common",
      settings: "translations/settings",
    }),
  },
  methods: {
    retrySaveSettings() {
      this.$emit("retry-save");
    },
  },
};
</script>

<style scoped>
.settingsSaving {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  width: 100%;
  height: 50vh;
  backdrop-filter: blur(6px);
}
.fade-in {
  opacity: 1;
  animation: fadeInUp 0.5s ease-out forwards;
}
.fade-out {
  opacity: 0;
  animation: fadeOut 0.3s ease-in forwards;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.spacing-1 {
  height: 10%;
}
</style>

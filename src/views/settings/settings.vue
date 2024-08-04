<template>
  <div class="learning-data">
    <settingsMessage :currentStep="currentStep" />
    <!-- Step Navigation -->
    <settingsLanguage
      v-if="currentStep === 1"
      :language="form.nativeLanguage"
      @update:language="form.nativeLanguage = $event"
    />
    <settingsLanguage
      v-if="currentStep === 2"
      :language="form.targetLanguage"
      @update:language="form.nativeLanguage = $event"
    />
    <settingsGoal
      v-if="currentStep === 3"
      :goalType="form.goalType"
      @update:goalType="form.goalType = $event"
      :goal="form.goal"
      @update:goal="form.goal = $event"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import settingsMessage from "@/views/settings/settingsMessage.vue";
import settingsLanguage from "@/views/settings/settingsLanguage.vue";
import settingsGoal from "@/views/settings/settingsGoal.vue";

export default {
  components: {
    settingsMessage,
    settingsLanguage,
    settingsGoal,
  },
  data() {
    return {
      currentStep: 1,
      form: {
        nativeLanguage: "",
        targetLanguage: "",
        goalType: "22",
        goal: "",
        difficulty: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      settings: "translations/settings",
    }),
  },
  methods: {
    ...mapActions({
      updateSettings: "settings/updateSettings",
    }),
    nextStep() {
      if (this.currentStep < 4) {
        this.currentStep++;
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    async saveSettings() {
      try {
        // Save the settings via Vuex action
        await this.updateSettings(this.settings);
        alert(this.translations.settings.message.saved);
      } catch (error) {
        console.error(this.translations.settings.message.saveError, error);
        alert(this.translations.settings.message.error);
      }
    },
  },
  async created() {
    // Load settings if necessary
    // await this.getSettings();
  },
};
</script>

<template>
  <div class="learning-data">

    <!-- Step Navigation -->
    <settingsLanguage v-if="currentStep === 1" :language="form.nativeLanguage" />
    <settingsLanguage v-if="currentStep === 2" :language="form.targetLanguage" />
    <settingsGoal :goalType="form.goalType" :goal="form.goal" />



    

   
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
        targetLanguage: "random language",
        goalType: "topic",
        goal: "",
        difficulty: "beginner",
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

<style scoped>
.learning-data {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #11296f;
  z-index: 10;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #11296f;
  border-radius: 4px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.chip {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: background-color 0.3s;
}

.chip.selected {
  background-color: #007bff;
  color: white;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>

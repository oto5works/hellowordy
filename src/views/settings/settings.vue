<template>
  <div class="routerView">
    <div class="font-size_14 pa_24">
      STEP {{ currentStep }}
    </div>
    <div class="sp_8"/>
    <settingsMessage :currentStep="currentStep" />
    <div class="spacing-1"/>
    <!-- Step Navigation -->
    <settingsLanguage
      v-if="currentStep === 1"
      :language="form.nativeLanguage"
      @update:language="form.nativeLanguage = $event"
    />
    <settingsLanguage
      v-if="currentStep === 2"
      :language="form.targetLanguage"
      @update:language="form.targetLanguage = $event"
    />
    <settingsGoal
      v-if="currentStep === 3"
      :goalType="form.goalType"
      @update:goalType="form.goalType = $event"
      :goal="form.goal"
      @update:goal="form.goal = $event"
    />


    <div class="button-wrap">
      <buttonOutline
        class="prevStep"
        @click="prevStep"
      >
        <span>{{settingsText.button.previous}}</span>
      </buttonOutline>

    <buttonOutline
        class="nextStep"
        @click="nextStep"
      >
        <span>{{settingsText.button.next}}</span>
      </buttonOutline>
    </div>
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
        goalType: "",
        goal: "",
        difficulty: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      settingsText: "translations/settings",
      settings: "settings/settings",
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
    updateFormWithSettings() {
      // Assuming `savedSettings` matches the structure of `form`
      this.form = { ...this.settings };
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
    await this.updateFormWithSettings();
    // Load settings if necessary
    // await this.getSettings();
  },
};
</script>

<style scoped>
.spacing-1 {
  height: 2vh;
}

.button-wrap {
  position: absolute;
  display: grid;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10%;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  padding: 16px;
}
.prevStep {
  grid-column: span 2;
}
.nextStep {
  grid-column: span 4;
}

</style>
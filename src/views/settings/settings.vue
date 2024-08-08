<template>
  <div class="routerView">
    <settingsSaving
      v-if="isSaving"
      :saveError="saveError"
      @retry-save="saveSettings"
    />

    <div v-else class="settings">
      <div class="font-size_14 pa_24">STEP {{ currentStep }}</div>
      <div class="sp_8" />
      <settingsMessage :currentStep="currentStep" />
      <div class="spacing-1" />
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
    </div>

    <div class="button-wrap" v-if="!isSaving">
      <buttonOutline
        v-if="currentStep === 1"
        class="nextStep1"
        @click="nextStep"
        :class="{ disabled: form.nativeLanguage === '' }"
      >
        <span>{{ settingsText.button.next }}</span>
      </buttonOutline>

      <buttonOutline
        v-if="currentStep === 2"
        class="prevStep"
        @click="prevStep"
      >
        <span>{{ settingsText.button.previous }}</span>
      </buttonOutline>

      <buttonOutline
        v-if="currentStep === 2"
        class="nextStep"
        @click="nextStep"
        :class="{ disabled: form.targetLanguage === '' }"
      >
        <span>{{ settingsText.button.next }}</span>
      </buttonOutline>

      <buttonOutline
        v-if="currentStep === 3"
        class="prevStep"
        @click="prevStep"
      >
        <span>{{ settingsText.button.previous }}</span>
      </buttonOutline>

      <buttonOutline
        v-if="currentStep === 3"
        class="nextStep"
        @click="saveSettings"
        :class="{ disabled: form.goal === '' }"
      >
        <span>{{ settingsText.button.save }}</span>
      </buttonOutline>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import settingsMessage from "@/views/settings/settingsMessage.vue";
import settingsLanguage from "@/views/settings/settingsLanguage.vue";
import settingsGoal from "@/views/settings/settingsGoal.vue";
import settingsSaving from "@/views/settings/settingsSaving.vue";

export default {
  components: {
    settingsMessage,
    settingsLanguage,
    settingsGoal,
    settingsSaving,
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
      isSaving: false,
      saveError: false,
    };
  },
  computed: {
    ...mapGetters({
      settingsText: "translations/settings",
      settings: "settings/settings",
      isAuthenticated: "users/isAuthenticated",
    }),
  },
  methods: {
    ...mapActions({
      updateSettings: "settings/updateSettings",
      updateSettingsWithoutAuth: "settings/updateSettingsWithoutAuth",
      generateTranslations: "translations/generateTranslations",
      startLoading: "status/startLoading",
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
      this.startLoading();
      this.isSaving = true;
      this.saveError = false;
      try {
        if (this.isAuthenticated) {
          // Save the settings via Vuex action with authentication
          await this.updateSettings(this.form);
          await this.generateTranslations();
        } else {
          // Save the settings via Vuex action without authentication
          await this.updateSettingsWithoutAuth(this.form);
          await this.generateTranslations();
        }
        this.isSaving = false;
        this.$router.push({ name: "learning" });
      } catch (error) {
        this.saveError = true;
        console.error("Settings save failed:", error);
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
.settings {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.spacing-1 {
  height: 2vh;
}

.button-wrap {
  position: absolute;
  display: grid;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 11%;
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
.nextStep1 {
  grid-column: span 6;
}
</style>

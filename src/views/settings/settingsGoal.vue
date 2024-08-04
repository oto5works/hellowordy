<template>
  <div class="learning-data">
    <div class="display_flex pa_16">
      <buttonTab
        :class="{ selected: goalType === 'general' }"
        @click="updateGoalType('general')"
        >{{ settings.option.general }}</buttonTab
      >
      <buttonTab
        :class="{ selected: goalType === 'topic' }"
        @click="updateGoalType('topic')"
        >{{ settings.option.topic }}</buttonTab
      >
      <buttonTab
        :class="{ selected: goalType === 'exam' }"
        @click="updateGoalType('exam')"
        >{{ settings.option.exam }}</buttonTab
      >
    </div>

    <div class="form-group" v-if="settings.learningGoalType">
      <label for="learningGoal">{{
        translations.settings.message.purpose
      }}</label>
      <input
        type="text"
        id="learningGoalSearch"
        v-model="learningGoalSearch"
        :placeholder="translations.settings.button.search"
      />
      <div class="chips">
        <button
          v-for="option in filteredLearningGoals"
          :key="option.value"
          :class="[
            'chip',
            { selected: settings.learningGoal === option.value },
          ]"
          @click="settings.learningGoal = option.value"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    goalType: { type: String },
    goal: { type: String },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      settings: "translations/settings",
    }),
  },
  methods: {
    updateGoalType(value) {
      this.$emit("update:goalType", value);
    },
  },
};
</script>

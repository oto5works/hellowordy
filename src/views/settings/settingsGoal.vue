<template>
  <div class="learning-data">


 <button @click="this.goalType = 'general'">{{ settings.option.general }}</button>
 <button @click="this.goalType = 'topic'">{{ settings.option.topic }}</button>
 <button @click="this.goalType = 'exam'">{{ settings.option.exam }}</button>





      <div class="form-group" v-if="settings.learningGoalType">
        <label for="learningGoal">{{ translations.settings.message.purpose }}</label>
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
            :class="['chip', { selected: settings.learningGoal === option.value }]"
            @click="settings.learningGoal = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </div>


    
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    goalType: { type: String },
    goal: { type: String },

  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      settings: "translations/settings",
    }),
  },
};
</script>



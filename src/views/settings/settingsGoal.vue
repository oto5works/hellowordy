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

<div v-if="goalType === 'general'" class="button-wrap">
  <buttonChip
      :class="{ selected: goal === 'word' }"
      @click="updateGoal('word')"
      >{{ settings.option.word }}</buttonChip
    >
    <buttonChip
      :class="{ selected: goal === 'vocabulary' }"
      @click="updateGoal('vocabulary')"
      >{{ settings.option.vocabulary }}</buttonChip
    >
    <buttonChip
      :class="{ selected: goal === 'conversation' }"
      @click="updateGoal('conversation')"
      >{{ settings.option.conversation }}</buttonChip
    >
    <buttonChip
      :class="{ selected: goal === 'grammar' }"
      @click="updateGoal('grammar')"
      >{{ settings.option.grammar }}</buttonChip
    >
  </div>


  <div v-if="goalType === 'topic'" class="button-wrap">
    <buttonChip
      :class="{ selected: goal === 'travel' }"
      @click="updateGoal('travel')"
      >{{ settings.option.travel }}</buttonChip
    >
    <buttonChip
      :class="{ selected: goal === 'dining' }"
      @click="updateGoal('dining')"
      >{{ settings.option.dining }}</buttonChip
    >
    <buttonChip
      :class="{ selected: goal === 'shopping' }"
      @click="updateGoal('shopping')"
      >{{ settings.option.shopping }}</buttonChip
    >
    <buttonChip
      :class="{ selected: goal === 'work' }"
      @click="updateGoal('work')"
      >{{ settings.option.work }}</buttonChip
    >
    <buttonChip
      :class="{ selected: goal === 'social' }"
      @click="updateGoal('social')"
      >{{ settings.option.social }}</buttonChip
    >
    <buttonChip
      :class="{ selected: goal === 'culture' }"
      @click="updateGoal('culture')"
      >{{ settings.option.culture }}</buttonChip
    >
    <buttonChip
      :class="{ selected: goal === 'it' }"
      @click="updateGoal('it')"
      >{{ settings.option.it }}</buttonChip
    >
    <buttonChip
      :class="{ selected: goal === 'medical' }"
      @click="updateGoal('medical')"
      >{{ settings.option.medical }}</buttonChip
    >
    <buttonChip
      :class="{ selected: goal === 'family' }"
      @click="updateGoal('family')"
      >{{ settings.option.family }}</buttonChip
    >
  </div>

  <div v-if="goalType === 'exam'" class="button-wrap">
    <buttonChip
        v-for="option in exam"
        :key="option.value"
        :class="{ selected: goal === option.value }"
        @click="updateGoal(option.value)"
      >
        <img
          class="icon_24"
          :src="`https://hello-wordy.web.app/image/${option.value}.png`"
        />
        <span>{{ option.label }}</span>
      </buttonChip>
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
      exam: "options/exam",

    }),
  },
  methods: {
    updateGoalType(value) {
      this.$emit("update:goalType", value);
    },
    updateGoal(value) {
      this.$emit("update:goal", value);
    },
  },
};
</script>

<template>
  <div class="settingsGoal">
    <div class="display_flex">
      <buttonTab
        v-for="type in goalTypes"
        :key="type.value"
        :class="{ selected: goalType === type.value }"
        @click="updateGoalType(type.value)"
      >
        {{ settings.option[type.label] }}
      </buttonTab>
    </div>

    <div v-if="goalType === 'general'" class="button-wrap">
      <buttonChip
        v-for="chip in generalGoals"
        :key="chip.value"
        :class="{ selected: goal === chip.value }"
        @click="updateGoal(chip.value)"
      >
        <icon class="check icon_20">
          <component :is="goal === chip.value ? 'check' : chip.icon" />
        </icon>
        <span>{{ settings.option[chip.label] }}</span>
      </buttonChip>
    </div>

    <div v-if="goalType === 'topic'" class="button-wrap">
      <buttonChip
        v-for="chip in topicGoals"
        :key="chip.value"
        :class="{ selected: goal === chip.value }"
        @click="updateGoal(chip.value)"
      >
        <icon class="check icon_20">
          <component :is="goal === chip.value ? 'check' : chip.icon" />
        </icon>
        <span>{{ settings.option[chip.label] }}</span>
      </buttonChip>
    </div>

    <div v-if="goalType === 'exam'" class="button-wrap">
      <buttonChip
        v-for="option in exam"
        :key="option.value"
        :class="{ selected: goal === option.value }"
        @click="updateGoal(option.value)"
      >
        <img
          class="icon_36"
          :src="`https://hello-wordy.web.app/image/${option.value}.png`"
        />
        <span>{{ option.label }}</span>
      </buttonChip>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import word from "@/components/icon/word.vue";
import vocabulary from "@/components/icon/vocabulary.vue";
import conversation from "@/components/icon/conversation.vue";
import grammar from "@/components/icon/grammar.vue";
import travel from "@/components/icon/travel.vue";
import dining from "@/components/icon/dining.vue";
import shopping from "@/components/icon/shopping.vue";
import work from "@/components/icon/work.vue";
import social from "@/components/icon/social.vue";
import culture from "@/components/icon/culture.vue";
import it from "@/components/icon/it.vue";
import medical from "@/components/icon/medical.vue";
import family from "@/components/icon/family.vue";
import mathematics from "@/components/icon/mathematics.vue";
import movie from "@/components/icon/movie.vue";
import animation from "@/components/icon/animation.vue";
import game from "@/components/icon/game.vue";
import reptile from "@/components/icon/reptile.vue";
import animal from "@/components/icon/animal.vue";
import insect from "@/components/icon/insect.vue";
import check from "@/components/icon/check.vue";

export default {
  components: {
    word, vocabulary, conversation, grammar,
    travel, dining, shopping, work, social, culture,
    it, medical, family, mathematics, movie, animation,
    game, reptile, animal, insect, check
  },
  props: {
    goalType: { type: String },
    goal: { type: String },
  },
  computed: {
    ...mapGetters({
      settings: "translations/settings",
      exam: "options/exam",
    }),
    goalTypes() {
      return [
        { value: 'general', label: 'general' },
        { value: 'topic', label: 'topic' },
        { value: 'exam', label: 'exam' }
      ];
    },
    generalGoals() {
      return [
        { value: 'word', icon: word, label: 'word' },
        { value: 'vocabulary', icon: vocabulary, label: 'vocabulary' },
        { value: 'conversation', icon: conversation, label: 'conversation' },
        { value: 'grammar', icon: grammar, label: 'grammar' }
      ];
    },
    topicGoals() {
      return [
        { value: 'travel', icon: travel, label: 'travel' },
        { value: 'dining', icon: dining, label: 'dining' },
        { value: 'shopping', icon: shopping, label: 'shopping' },
        { value: 'work', icon: work, label: 'work' },
        { value: 'social', icon: social, label: 'social' },
        { value: 'culture', icon: culture, label: 'culture' },
        { value: 'it', icon: it, label: 'it' },
        { value: 'mathematics', icon: mathematics, label: 'mathematics' },
        { value: 'medical', icon: medical, label: 'medical' },
        { value: 'family', icon: family, label: 'family' },
        { value: 'movie', icon: movie, label: 'movie' },
        { value: 'animation', icon: animation, label: 'animation' },
        { value: 'game', icon: game, label: 'game' },
        { value: 'animal', icon: animal, label: 'animal' },
        { value: 'reptile', icon: reptile, label: 'reptile' },
        { value: 'insect', icon: insect, label: 'insect' }
      ];
    }
  },
  methods: {
    updateGoalType(value) {
      this.$emit("update:goalType", value);
    },
    updateGoal(value) {
      this.$emit("update:goal", value);
    }
  }
};
</script>

<style scoped>
.settingsGoal {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 24px;
}
.button-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>

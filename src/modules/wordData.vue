<template>
  <div
    v-if="word.word"
    class="wordData text-align_center"
    :class="{ 'fade-in': !isLoading, 'fade-out': isLoading }"
  >
    <div class="font-size_14 color_on-background">{{ word.partOfSpeech }}</div>
    <div class="sp_24" />
    <div class="font-size_52 font-weight_700 color_on-background">
      {{ word.word }}
    </div>
    <div class="sp_8" />
    <div class="display_flex gap_4 align-items_center font-size_14 color_on-background-70">
      {{ word.reading }}
      <icon class="icon_16"><speaker /></icon>
    </div>
    <div class="sp_56" />
    <div class="font-size_18 font-weight_500 color_on-background">
      {{ word.meaning }}
    </div>
  </div>
</template>



<script>
import { mapActions, mapGetters } from "vuex";
import speaker from "@/components/icon/speaker.vue";

export default {
  components: {
    speaker,
  },
  created() {
    if (this.$route.name !== 'welcome') {
      this.generateWord();
    }
  },
  data() {
    return {
      dialog: false,
      searchTerm: "",
    };
  },
  computed: {
    ...mapGetters({
      word: "wordData/getWord",
      isLoading: "status/isLoading",
    }),
  },
  methods: {
    ...mapActions({
      generateWord: "wordData/generateWord",
    }),
  },
};
</script>
<style scoped>
.wordData {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 16px;
  height: 54%;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease;
}

.fade-in {
  opacity: 1;
  transform: translateY(0);
  animation: fadeInUp 0.5s ease-out forwards;
}

.fade-out {
  opacity: 0;
  transform: translateY(0);
  animation: fadeOut 0.3s ease-in forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px); /* Adjust as needed for the desired effect */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(0);
  }
}
</style>

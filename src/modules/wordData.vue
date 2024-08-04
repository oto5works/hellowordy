<template>
  <div
    v-if="word.word"
    class="wordData text-align_center"
    :class="{ 'fade-in': !isLoading, 'fade-out': isLoading }"
  >
    <div class="font-size_14 color_on-background">{{ word.partOfSpeech }}</div>
    <div class="spacing-1" />
    <div class="font-size_52 font-weight_700 color_on-background">
      {{ word.word }}
    </div>
    <div class="spacing-2" />
    <div class="display_flex gap_4 align-items_center font-size_14 color_on-background-70">
      {{ word.reading }}
      <icon class="icon_16"><speaker /></icon>
    </div>
    <div class="spacing-3" />
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
    //if (this.$route.name !== 'welcome') {
      //this.generateWord();
    //}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  width: 100%;
  height: 50vh;
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


.spacing-1 {
  height: 5.2%;
}
.spacing-2 {
  height: 1.7%;
}
.spacing-3 {
  height: 10%;
}
</style>

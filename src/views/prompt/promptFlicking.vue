<template>
  <div class="flicking">
    <Flicking
      v-if="word.word"
      ref="flicking"
      :options="{ moveType: 'snap', bound: true }"
      :plugins="plugins"
    >
      <card
        class="animated-card"
        v-for="(item, index) in displayPrompts"
        :key="item.title"
        :class="{ 
          loading: loadingPrompts[item.title], 
          selected: item === this.currentPrompt,
          textLoading: textLoading 
        }"
        :title="item.title"
        :prompt="item.prompt"
        @click="handlePromptClick(item, index)"
      />
      <template #viewport>
        <div class="flicking-pagination"></div>
      </template>
    </Flicking>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Flicking from "@egjs/vue3-flicking";
import { Pagination } from "@egjs/flicking-plugins";
import "@/styles/flicking.scss";

export default {
  components: {
    Flicking,
  },
  data() {
    return {
      plugins: [new Pagination({ type: "bullet" })],
      fakePrompt: {
        title: "Loading 1",
        prompt: "This is a fake prompt for loading...",
      },
      firstPrompt: {
        title: "Sentence Examples",
        prompt:
          "Please use 'this.word.word' to generate various example sentences.",
      },
      fakePrompts: [
        { title: "Loading 1", prompt: "This is a fake prompt for loading..." },
        { title: "Loading 2", prompt: "This is a fake prompt for loading..." },
        { title: "Loading 3", prompt: "This is a fake prompt for loading..." },
      ],
      actualPrompts: [],
      textLoading: true,
    };
  },
  computed: {
    ...mapGetters({
      prompts: "prompts/prompts",
      isLoading: "status/isLoading",
      loadingPrompts: "prompts/loadingPrompts", // 프롬프트별 로딩 상태
      currentPrompt: 'prompts/currentPrompt',

      word: "wordData/getWord",
    }),
    displayPrompts() {
      const promptsToDisplay =
        this.actualPrompts.length > 0 ? this.actualPrompts : this.fakePrompts;
      return [...promptsToDisplay];
    },
  },
  methods: {
    ...mapActions({
      generatePrompts: "prompts/generatePrompts",
      fetchResponse: "prompts/fetchResponse",
      setCurrentPrompt: "prompts/setCurrentPrompt",
      clearResponse: "prompts/clearResponse",

      
    }),
    async handlePromptClick(prompt, index) {
      //this.clearResponse();

      this.$router.push({ name: 'chat' });
      this.setCurrentPrompt(prompt);
      await this.fetchResponse();
    },
  },
  watch: {
    prompts: {
      handler(newPrompts) {
        this.actualPrompts = newPrompts;
        this.textLoading = newPrompts.length === 0;
      },
      immediate: true,
    },
  },
  created() {
    //this.generatePrompts(); // 컴포넌트가 생성될 때 프롬프트를 로드
  },
};
</script>

<style scoped>
@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animated-card {
  opacity: 0;
  animation: slideUp 0.5s ease forwards;
}

.animated-card:nth-child(1) {
  animation-delay: 0.3s;
}

.animated-card:nth-child(2) {
  animation-delay: 0.6s;
}

.animated-card:nth-child(3) {
  animation-delay: 0.9s;
}

/* 로딩 상태 스타일 */
.loading .title,
.loading .prompt {
  background: linear-gradient(90deg, #3c3c3c 25%, #646464 50%, #3c3c3c 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 12px;
  color: transparent;
}

@keyframes loading {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}

/* 선택된 카드 스타일 */

</style>

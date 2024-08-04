<template>
  <div class="promptResponse">
    <div v-if="displayText" class="response" v-html="displayText"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      currentPrompt: 'prompts/currentPrompt',
      response: 'prompts/response',
    }),
    displayText() {
      // 줄바꿈을 <br>로 변환
      if (this.response) {
        return this.response.replace(/\n/g, '<br>');
      }
      return '';
    },
  },
  data() {
    return {
      displayedResponse: '',
      responseIndex: 0,
      typingSpeed: 10, // 글자 하나를 보여주는 속도 (밀리초 단위)
    };
  },
  methods: {
    ...mapActions({
      fetchResponse: 'prompts/fetchResponse',
    }),
    typeResponse() {
      if (this.response && this.response.length > 0) {
        setTimeout(() => {
          this.displayedResponse += this.response[this.responseIndex];
          this.responseIndex++;
          if (this.responseIndex < this.response.length) {
            this.typeResponse(); // 재귀 호출하여 다음 글자 타이핑
          }
        }, this.typingSpeed);
      }
    },
  },
  watch: {
    response(newResponse) {
      if (newResponse) {
        // 응답이 변경되면 타이핑 시작
        this.displayedResponse = '';
        this.responseIndex = 0;
        this.typeResponse();
      }
    },
  },
  created() {
    if (!this.currentPrompt.prompt) {
      this.$router.push({ name: 'learning' });
    }
  },
};
</script>

<style scoped>
.promptResponse {
  padding: 24px;
}
.response {
  font-size: 15px;
  line-height: 168%;
  text-align: left;
}
</style>

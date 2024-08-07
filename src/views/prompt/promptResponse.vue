<template>
  <div class="promptResponse" v-if="displayText">
    <button class="profile">
      <img src="https://hello-wordy.web.app/image/bg.png" />
    </button>
    <div  class="response" v-html="displayText"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      currentPrompt: "prompts/currentPrompt",
      response: "prompts/response",
    }),
    displayText() {
      // 줄바꿈을 <br>로 변환
      if (this.response) {
        return this.response.replace(/\n/g, "<br>");
      }
      return "";
    },
  },
  data() {
    return {
      displayedResponse: "",
      responseIndex: 0,
      typingSpeed: 10, // 글자 하나를 보여주는 속도 (밀리초 단위)
    };
  },
  methods: {
    ...mapActions({
      fetchResponse: "prompts/fetchResponse",
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
        this.displayedResponse = "";
        this.responseIndex = 0;
        this.typeResponse();
      }
    },
  },
  created() {
    if (!this.currentPrompt.prompt) {
      this.$router.push({ name: "learning" });
    }
  },
};
</script>

<style scoped>
.promptResponse {
  position: relative;
  display: flex;
  gap: 8px;
  padding: 24px 0;
}
.profile {
  width: 36px;
  height: 36px;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid rgba(var(--mio-theme-color-on-background-40), 1);
}
.profile img {
  width: 24px;
  height: 24px;
}
.response {
  position: relative;
  padding: 16px;
  width: 80%;
  font-size: 15px;
  line-height: 168%;
  text-align: left;
  background-color: rgba(var(--mio-theme-color-on-background-40), 0.32);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 16px;
  word-break: break-all;
  overflow-wrap: break-work;
}
</style>

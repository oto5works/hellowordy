<template>
  <div class="apap">
    <div>
      <label for="input-prompt">프롬프트 입력:</label>
      <input type="text" id="input-prompt" v-model="prompt">
      <button @click="generateText">생성</button>
    </div>
    <div v-if="response">
      <h2>결과:</h2>
      <div v-if="wordData">
        <p>단어: {{ wordData.word }}</p>
        <p>발음: {{ wordData.read }}</p>
        <p>의미: {{ wordData.meaning }}</p>
      </div>
      <p>{{ response }}</p>
    </div>
  </div>
</template>

<script>
import { GoogleGenerativeAI } from '@google/generative-ai';

export default {
  // toefl 2급 에 해당하는 단어 하나를 한국어 뜻과 함께 answer: {       word: '',       read: '',       meaning: ''     } 형태로 보여줘.
  data() {
    return {
      prompt: '',
      response: null,
      API_KEY: 'AIzaSyBrdNobChTsFJ-ai5e3LlaTm1NZDogpWzM',
      wordData: null,
    };
  },
  methods: {
    async generateText() {
      const genAI = new GoogleGenerativeAI(this.API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      try {
        const result = await model.generateContent(this.prompt);
        this.response = await result.response.text();

        // 응답에서 '```json' 및 '```' 제거하고 JSON 파싱
        const cleanResponse = this.response.replace('```json', '').replace('```', '');
        this.wordData = JSON.parse(cleanResponse);

      } catch (error) {
        console.error('오류 발생:', error);
        this.response = '오류 발생. 다시 시도해주세요.';
      }
    }
  }
};
</script>

<style scoped>
.apap {
  margin-top: 80px;
}
</style>
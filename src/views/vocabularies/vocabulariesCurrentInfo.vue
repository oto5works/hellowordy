<template>
  <div>
    language: {{ vocabulary.language }}<br />
    title: {{ vocabulary.title }}<br />
    content: {{ vocabulary.content }}
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      vocabulary: {
        language: null,
        title: null,
        content: null,
      },
    };
  },
  mounted() {
    this.fetchVocabulary();
  },
  methods: {
    ...mapActions({
      getVocabularyById: "vocabularies/getVocabularyById",
    }),
    async fetchVocabulary() {
      try {
        // getVocabularyById 액션을 호출하고 결과를 vocabularyData 변수에 저장합니다.
        const vocabularyData = await this.getVocabularyById();
        // 가져온 데이터를 컴포넌트의 데이터 속성에 할당합니다.
        this.vocabulary = vocabularyData;
      } catch (error) {
        console.error("단어장을 가져오는 중 오류가 발생했습니다:", error);
      }
    },
  },
};
</script>

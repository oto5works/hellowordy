<template>
  <div class="display_flex gap_12 width_100">

    <img class="wiwi" :src="vocabulary.coverURL" />

<div>
    language: {{ vocabulary.language }}<br />
    title: {{ vocabulary.title }}<br />
    content: {{ vocabulary.content }}

    <profile
      :userID="vocabulary.userID"
      :photoURL="vocabulary.photoURL"
      :displayName="vocabulary.displayName"
    />
  </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import profile from "@/components/profile/profile.vue";

export default {
  components: {
    profile,
  },
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

<style scoped>
.wiwi {
  position: relative;
  width: 120px;
  height: 160px;
  object-fit: cover;
}
</style>
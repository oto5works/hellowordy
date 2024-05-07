<template>
  <div class="display_flex width_100">
    <div class="flex1">
      <table>
        <thead>
          <tr>
            <th>Word</th>
            <th>Meaning</th>
            <th>Examples</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in words" :key="item.id">
            <td>{{ item.word }}</td>
            <td>{{ item.mean }}</td>
            <td>{{ item.examples }}</td>
            <td><button @click="handleDeleteWord(item.id)">삭제</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex2">
      <wordsForm />
    </div>
    <div class="flex3">
      <iframe
        :src="`https://ja.dict.naver.com/#/mini/search?query=${searchWord}`"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import wordsForm from "@/views/words/wordsForm.vue";

export default {
  components: {
    wordsForm,
  },
  computed: {
    ...mapGetters({
      words: "words/getWords",
      currentVocabulary: "words/getWords",
    }),
    vocabularyID() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions({
      fetchWords: "words/fetchWords",
      resetWords: "words/resetWords",
      updateCurrentVocabularyID: "vocabularies/updateCurrentVocabularyID",
      resetCurrentVocabularyID: "vocabularies/resetCurrentVocabularyID",
      deleteCurrentWordID: "words/deleteCurrentWordID",
      updateCurrentWordID: "words/updateCurrentWordID",
    }),
    async handleDeleteWord(wordID) {
      try {
        // Vuex 액션을 통해 단어장을 삭제합니다.
        this.updateCurrentWordID(wordID);
        await this.deleteCurrentWordID(); // 'wordId'로 수정
        // 단어장 목록을 최신 상태로 갱신합니다.
        alert("단어장이 삭제.");
      } catch (error) {
        console.error("단어장 삭제 중 오류 발생:", error);
      }
    },
  },
  created() {
    this.updateCurrentVocabularyID(this.vocabularyID);

    this.fetchWords();
  },
  beforeRouteLeave(to, from, next) {
    this.resetCurrentVocabularyID(); // 페이지를 떠날 때 선택된 단어장의 ID를 null로 설정
    this.resetWords(); // 페이지를 떠날 때 선택된 단어장의 ID를 null로 설정
    next();
  },
};
</script>
<style scoped>
.display_flex {
  height: 100%;
}
.flex1,
.flex2,
.flex3 {
  flex: 1 1 30%;
  height: 100%;
}
table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f2f2f2;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:nth-child(even){background-color: #f9f9f9;}

tr:hover {background-color: #ddd;}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}
</style>

<template>
  <div class="routerView">
    <div class="spacing-1" />
    <button @click="setSearchWords">네이버 사전 보기 {{ searchWords }}</button>
    <h2>단어 ㅂㅈㅇㅂㅈㅇㅂ</h2>
    <div class="width_100">
      <h1>category</h1>
      <select id="category" v-model="newWord.category" required>
        <option disabled value="">선택해주세요</option>
        <option value="basic">기본</option>
        <option value="n3">JLPT N3</option>
        <option value="n2">JLPT N2</option>
        <option value="n1">JLPT N1</option>
      </select>
    </div>

    <div class="width_100">
      <h1>word</h1>
      <textField
        label="Enter Word"
        v-model="newWord.word"
        type="text"
        required
      />
      <div v-for="(mean, index) in newWord.mean" :key="index">
        <textField
          :label="`Enter Meaning ${index + 1}`"
          v-model="newWord.mean[index]"
          type="text"
          required
        />
      </div>
      <btn class="word-button" type="button" @click="addMean"><icon><plus /></icon></btn>
    </div>

    <div class="width_100">
      <div>
        <h1></h1>
      </div>

      <div class="spacing-2" />

      <h1>example sentence</h1>
      <div
        v-for="(example, index) in newWord.examples"
        :key="'example' + index"
      >
        <textField
          :label="`Enter Sentence ${index + 1}`"
          v-model="example.sentence"
          type="text"
          required
        />

        <textField
          :label="`Enter Translation ${index + 1}`"
          v-model="example.translation"
          type="text"
          required
        />
      </div>

      <btn type="button" @click="addExample">예문 추가</btn>
    </div>

    <div class="buttonGroup">
      <btn class="submit selected" type="submit" @click="addWord"
        ><span>submit</span></btn
      >
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";

import db from "@/firebase/init.js";
import { collection, addDoc } from "firebase/firestore";
import plus from "@/components/icon/plus.vue";


export default {
  components: { plus },

  data() {
    return {
      newWord: {
        Word: "",
        mean: [""], // 뜻을 문자열 배열로 초기화
        examples: [], // 예문을 객체 배열로 초기화
        category: "",
      },
    };
  },

  computed: {
    ...mapGetters({
      searchWords: "state/getSearchWords",

    }),
  },
  methods: {
    ...mapActions({
      setSearchWords: "state/setSearchWords",
    }),
    addMean() {
      this.newWord.mean.push(""); // 뜻 입력 필드 추가
    },
    addExample() {
      this.newWord.examples.push({ sentence: "", translation: "" }); // 예문 입력 필드 추가
    },
    async addWord() {
      try {
        await addDoc(collection(db, "words"), {
          word: this.newWord.word,
          mean: this.newWord.mean,
          examples: this.newWord.examples,
          category: this.newWord.category,
        });
        this.newWord.word = "";
        this.newWord.mean = [""];
        this.newWord.examples = [];

        alert("단어가 추가되었습니다.");
      } catch (e) {
        console.error("Error adding document: ", e);
        alert("단어 추가에 실패했습니다.");
      }
    },
  },
};
</script>

<style scoped>
.word-button {
  width: 40px;
  height: 40px;
}
.word-button svg {
  width: 20px;
  height: 20px;
}
.submit {
  width: 100%;
  height: 72px;
}
</style>

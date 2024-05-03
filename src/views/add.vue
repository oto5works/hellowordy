<template>
  <div class="routerView">
    <div class="title">Add Word</div>
    <div class="width_100">
      <div class="sub-title">category</div>

      <textField class="width_100 height_40">
        <select
          style="height: 40px"
          class="width_100"
          id="category"
          v-model="newWord.category"
          required
        >
          <option value="basic"><span>기본</span></option>
          <option value="n3">JLPT N3</option>
          <option value="n2">JLPT N2</option>
          <option value="n1">JLPT N1</option>
        </select>
      </textField>
    </div>

    <div class="width_100">
      <div class="sub-title">word</div>

      <div class="word-field">
        <textField
          label="Enter Word"
          v-model="newWord.word"
          type="text"
          required
        >
          <buttonText @click="handleSearchWord(newWord.word)"
            ><icon><book /></icon><span>사전 검색</span></buttonText
          >
        </textField>
      </div>

      <div class="mean-field">
        <textField
          v-for="(mean, index) in newWord.mean"
          :key="index"
          :label="`Enter Meaning ${index + 1}`"
          v-model="newWord.mean[index]"
          type="text"
          required
        />
        <buttonText @click="addMean"
          ><icon class="icon_16"><plus /></icon><span>뜻 추가</span></buttonText
        >
      </div>
    </div>

    <div class="width_100">
      <div class="sub-title">example sentence</div>

      <div class="example-wrap">
        <div
          class="example-content"
          v-for="(example, index) in newWord.examples"
          :key="'example' + index"
        >
          <div class="example-index">
            <span>example {{ index + 1 }}</span>

            <button @click="deleteExample(index)">
              <icon class="icon_16"><x /></icon>
            </button>
          </div>
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
      </div>

      <buttonText @click="addExample"
        ><icon class="icon_16"><plus /></icon><span>예문 추가</span></buttonText
      >

      <div class="sp_160" />
    </div>
    <div class="spacing-1" />
    <div class="buttonGroup">
      <btn class="submit selected" @click="addWord"
        ><icon><save /></icon><span>저장</span></btn
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import db from "@/firebase/init.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import plus from "@/components/icon/plus.vue";
import x from "@/components/icon/x.vue";
import book from "@/components/icon/book.vue";
import save from "@/components/icon/save.vue";

export default {
  components: { plus, x, book, save },

  data() {
    return {
      newWord: {
        Word: "",
        mean: [""], // 뜻을 문자열 배열로 초기화
        examples: [], // 예문을 객체 배열로 초기화
        category: "basic",
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
      setSearchWord: "state/setSearchWord",
    }),
    addMean() {
      this.newWord.mean.push(""); // 뜻 입력 필드 추가
    },
    addExample() {
      this.newWord.examples.push({ sentence: "", translation: "" }); // 예문 입력 필드 추가
    },
    async handleSearchWord(word) {
      // 먼저 'setSearchWord' action을 실행합니다. 이 작업은 비동기적이기 때문에 'await'를 사용해야 완료되기를 기다립니다.
      await this.setSearchWord(word);

      // 'setSearchWords' action을 실행합니다. 이전 작업이 완료된 후에 실행되어야 하므로, 이 줄은 'await' 다음에 있습니다.
      // 'setSearchWords'가 어떤 파라미터를 필요로 하는지, 또는 동기적으로만 작동하는지에 따라 이 호출 코드는 달라질 수 있습니다.
      // 일단 여기서는 단순호출로 가정합니다. 필요하다면 파라미터를 추가해주세요.
      this.setSearchWords();
    },
    deleteExample(index) {
      this.newWord.examples.splice(index, 1); // 해당 인덱스의 예문 삭제
    },
    async addWord() {
      try {
        await addDoc(collection(db, "words"), {
          word: this.newWord.word,
          mean: this.newWord.mean,
          examples: this.newWord.examples,
          category: this.newWord.category,
          createdAt: serverTimestamp(), // 여기에 생성 시간 필드를 추가합니다.
        });
        this.newWord.word = "";
        this.newWord.mean = [""];
        this.newWord.examples = [];
        // 다시 초기화해줍니다.

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
.title {
  position: relative;
  width: 100%;
  top: -2px;
  font-family: var(--mio-theme-font-family-jp);
  font-weight: 600;
  font-size: 24px;
  margin-top: 40px;
  margin-bottom: 20px;
}
.sub-title {
  font-family: var(--mio-theme-font-family);
  font-weight: 300;
  text-transform: uppercase;
  font-size: 15px;
  margin-top: 40px;
  margin-bottom: 17px;
}
.word-button {
  flex: 1 1 50%;
}
.submit {
  width: 72px;
  height: 72px;
  flex-direction: column;
}
.word-field {
  position: relative;
  display: flex;
  gap: 12px;
  width: 100%;
  flex-wrap: wrap;
}

.word-field button {
  height: 40px;
  padding: 0 12px;
}

.example-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.example-index {
  margin-bottom: 9px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.buttonGroup {
  justify-content: flex-end;
}
</style>

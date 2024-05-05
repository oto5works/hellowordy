<template>
  <modalDialog title="추가" :dialog="dialog" @update:dialog="updateDialog">
    {{ currentWordID }}<br />
    {{ isEditMode }}
    <div class="word-field">
      <textField label="Enter Word" v-model="word" type="text">
        <buttonText
          ><icon><book /></icon><span>사전 검색</span></buttonText
        >
      </textField>
    </div>
    <div v-for="(item, index) in mean" :key="index">
      <textField
        :label="`Enter Meaning ${index + 1}`"
        v-model="mean[index]"
        type="text"
        required
      />
    </div>

    <buttonText @click="handleAddMean"
      ><icon class="icon_16"><plus /></icon><span>뜻 추가</span></buttonText
    >

    <div class="width_100">
      <div class="sub-title">example sentence</div>

      <div class="example-wrap">
        <div
          class="example-content"
          v-for="(item, index) in examples"
          :key="'example' + index"
        >
          <div class="example-index">
            <span>example {{ index + 1 }}</span>

            <buttonDefault @click="handleDeleteExample(index)">
              <icon class="icon_16"><x /></icon>
            </buttonDefault>
          </div>
          <textField
            :label="`Enter Sentence ${index + 1}`"
            v-model="item.sentence"
            type="text"
            required
          />
          <textField
            :label="`Enter Translation ${index + 1}`"
            v-model="item.translation"
            type="text"
            required
          />
        </div>
      </div>

      <buttonText @click="handleAddExample"
        ><icon class="icon_16"><plus /></icon><span>예문 추가</span></buttonText
      >
    </div>
    <buttonDefault v-if="!isEditMode" @click="handleCreateWord">단어장 생성</buttonDefault>
    <buttonDefault v-else @click="handleUpdateWord">단어장 수정</buttonDefault>
  </modalDialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import plus from "@/components/icon/plus.vue";
import x from "@/components/icon/x.vue";
import book from "@/components/icon/book.vue";

export default {
  components: { plus, x, book },
  props: {
    dialog: { type: Boolean },
  },
  emits: ["update:dialog", "close"],
  data() {
    return {
      word: "",
      mean: [""], // 뜻을 문자열 배열로 초기화
      examples: [], // 예문을 객체 배열로 초기화
      isEditMode: false,
    };
  },
  created() {
    this.loadWord();
  },
  computed: {
    ...mapGetters({
      currentWordID: "words/getCurrentWordID",
    }),
  },
  methods: {
    ...mapActions({
      createWord: "words/createWord", // Vuex의 네임스페이스에서 'signIn' 액션을 매핑함
      updateWord: "words/updateWord",
      getWordById: "words/getWordById",
    }),
    handleAddMean() {
      this.mean.push(""); // 뜻 입력 필드 추가
    },
    handleAddExample() {
      this.examples.push({ sentence: "", translation: "" }); // 예문 입력 필드 추가
    },
    handleDeleteExample(index) {
      this.examples.splice(index, 1); // 해당 인덱스의 예문 삭제
    },
    async handleCreateWord() {
      try {
        await this.createWord({
          word: this.word,
          mean: this.mean,
          examples: this.examples,
        });
        alert("단어가 생성되었습니다.");
        (this.word = ""),
          (this.mean = [""]),
          (this.examples = []),
          this.updateDialog(false);
      } catch (error) {
        console.error("단어 생성 중 오류 발생:", error);
        alert("단어 생성에 실패했습니다.");
      }
    },

    async handleUpdateWord() {
      const fieldsToUpdate = {
        word: this.word,
        mean: this.mean,
        examples: this.examples,
      };
      // 값이 유효한(즉, 변경되어야 하는) 필드만을 필터링합니다.
      const updateData = Object.entries(fieldsToUpdate).reduce(
        (acc, [key, value]) => {
          if (value) acc[key] = value;
          return acc;
        },
        {}
      );
      try {
        console.log("updateData: ", updateData);
        await this.updateWord(updateData);
        this.closeForm();
      } catch (error) {
        console.error("단어장 수정 중 오류 발생:", error);
        alert("단어장 수정에 실패했습니다.");
      }
    },

    async loadWord() {
      if (this.currentWordID) {
        this.isEditMode = true;
        const wordData = await this.getWordById(this.currentWordID);
        if (wordData) {
          this.word = wordData.word;
          this.mean = wordData.mean;
          this.examples = wordData.examples;
        } else {
          alert("단어 불러오는데 실패했습니다.");
        }
      }
    },
    updateDialog(value) {
      this.$emit("update:dialog", value);
    },
    closeForm() {
      // 'close' 이벤트 발생
      this.$emit("close");
    },
  },
};
</script>

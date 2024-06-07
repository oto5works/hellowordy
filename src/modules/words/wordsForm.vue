<template>
  <fullDialog :title="isEditMode ? '단어 수정' : '단어 추가'" :dialog="dialog" @update:dialog="updateDialog">
    <template v-slot:header>
      <buttonIcon v-if="!isEditMode" @click="handleCreateWord()">추가</buttonIcon>
      <buttonIcon v-else @click="handleUpdateWord()">수정</buttonIcon>
    </template>
    
    <div class="content">
      <textField label="단어" v-model="word" type="text">
        <buttonText class="selected gap_4"><icon><book /></icon><span>사전 검색</span></buttonText>
      </textField>
      
      <textField
        label="단어 뜻"
        v-model="mean"
        type="text"
        required
      >
      </textField>
      
      <div class="sp_48"/>
      
      <div class="example-wrap">
        <div class="example-content" v-for="(item, index) in examples" :key="'example' + index">
          <div class="display_flex align-items_center justify-content_space-between">
            <span class="font-size_14 kr font-weight_500">예문 {{ index + 1 }}</span>
          </div>
          <div class="sp_8"/>
          <textField
            :label="`예문 ${index + 1}`"
            v-model="item.sentence"
            type="text"
          >
          <buttonText class="selected" @click="handleDeleteExample(index)"><icon><x /></icon></buttonText>
          </textField>
          <textField
            :label="`해석 ${index + 1}`"
            v-model="item.translation"
            type="text"
          />
        </div>
      </div>
      
      <buttonText class="selected gap_4" @click="handleAddExample"><icon class="icon_16"><plus /></icon><span>예문 추가</span></buttonText>
    
    </div>

    <div class="sp_128"/>
  </fullDialog>
</template>

<script>
import { mapActions } from "vuex";
import plus from "@/components/icon/plus.vue";
import x from "@/components/icon/x.vue";
import book from "@/components/icon/book.vue";

export default {
  components: { plus, x, book },
  emits: ["update:dialog", "close"],
  props: {
    dialog: { type: Boolean },
    vocaID: { type: String },
    wordID: { type: String },
  },
  data() {
    return {
      word: "",
      mean: "", // 뜻을 문자열로 초기화
      examples: [], // 예문을 객체 배열로 초기화
      isEditMode: false,
    };
  },
  created() {
    this.loadWord();
  },
  methods: {
    ...mapActions({
      createWord: "words/createWord",
      updateWordByPayload: "words/updateWordByPayload",
      returnWordByPayload: "words/returnWordByPayload",
    }),

    async handleCreateWord() {
      try {
        await this.createWord({
          word: this.word,
          mean: this.mean,
          examples: this.examples,
          vocaID: this.vocaID,
        });
        this.word = "";
        this.mean = "";
        this.examples = [];
        this.updateDialog(false);
      } catch (error) {
        console.error("단어 생성 중 오류 발생:", error);
        alert("단어 생성에 실패했습니다.");
      }
    },

    updateDialog(value) {
      this.$emit("update:dialog", value);
    },
    handleAddExample() {
      this.examples.push({ sentence: "", translation: "" });
    },
    handleDeleteExample(index) {
      this.examples.splice(index, 1);
    },

    async handleUpdateWord() {
      const fieldsToUpdate = {
        word: this.word,
        mean: this.mean,
        examples: this.examples,
      };
      const updateData = Object.entries(fieldsToUpdate).reduce((acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      }, {});
      try {
        await this.updateWordByPayload({
          wordID: this.wordID,
          payload: updateData,
        });
        this.closeForm();
      } catch (error) {
        console.error("단어장 수정 중 오류 발생:", error);
        alert("단어장 수정에 실패했습니다.");
      }
    },

    async loadWord() {
      if (this.wordID) {
        this.isEditMode = true;
        const wordData = await this.returnWordByPayload(this.wordID);
        if (wordData) {
          this.word = wordData.word;
          this.mean = wordData.mean;
          this.examples = wordData.examples;
        } else {
          alert("단어 불러오는데 실패했습니다.");
        }
      }
    },
    closeForm() {
      this.$emit("close");
    },
  },
};
</script>

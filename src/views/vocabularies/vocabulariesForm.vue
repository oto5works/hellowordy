<!-- formVoca.vue -->

<template>
  <modalDialog title="추가" :dialog="dialog" @update:dialog="updateDialog">
    isEditMode:::{{ isEditMode }}

    currentVocabularyID= {{ currentVocabularyID }}
    <input v-model="category" placeholder="category 입력하세요" />
    <input v-model="title" placeholder="단어장 제목을 입력하세요" />
    <input v-model="content" placeholder="단어장 내용을 입력하세요" />
    <button v-if="!isEditMode" @click="handleCreateVocabulary">
      단어장 생성
    </button>
    <button v-else @click="handleUpdateVocabulary">단어장 수정</button>
  </modalDialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    dialog: { type: Boolean },
  },
  emits: ['update:dialog', 'close'],
  data() {
    return {
      category: "",
      title: "",
      content: "",
      isEditMode: false,
    };
  },
  created() {
    this.loadVocabulary();
  },
  computed: {
    ...mapGetters({
      currentVocabularyID: "vocabularies/getCurrentVocabularyID",
    }),
  },
  methods: {
    ...mapActions({
      createVocabulary: "vocabularies/createVocabulary", // Vuex의 네임스페이스에서 'signIn' 액션을 매핑함
      updateVocabulary: "vocabularies/updateVocabulary",
      getVocabularyById: "vocabularies/getVocabularyById",
    }),
    async handleCreateVocabulary() {
      try {
        await this.createVocabulary({
          category: this.category,
          title: this.title,
          content: this.content,
        });
        alert("단어장이 생성되었습니다.");
        this.category = ""; // 제목 필드 초기화
        this.title = ""; // 제목 필드 초기화
        this.content = ""; // 제목 필드 초기화
        this.updateDialog(false);
      } catch (error) {
        console.error("단어장 생성 중 오류 발생:", error);
        alert("단어장 생성에 실패했습니다.");
      }
    },
    async handleUpdateVocabulary() {
      const fieldsToUpdate = {
        title: this.title,
        category: this.category,
        content: this.content,
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
        await this.updateVocabulary(updateData);
        this.closeForm();
      } catch (error) {
        console.error("단어장 수정 중 오류 발생:", error);
        alert("단어장 수정에 실패했습니다.");
      }
    },

    async loadVocabulary() {
      if (this.currentVocabularyID) {
        this.isEditMode = true;
        const vocabularyData = await this.getVocabularyById(
          this.currentVocabularyID
        );
        if (vocabularyData) {
          this.category = vocabularyData.category;
          this.title = vocabularyData.title;
          this.content = vocabularyData.content;
        } else {
          alert("단어장을 불러오는데 실패했습니다.");
        }
      }
    },
    updateDialog(value) {
      this.$emit("update:dialog", value);
    },
    closeForm() {
      // 'close' 이벤트 발생
      this.$emit('close');
    },
  },
};
</script>

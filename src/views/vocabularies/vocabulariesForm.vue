<!-- formVoca.vue -->

<template>
  <fullDialog title="추가" :dialog="dialog" @update:dialog="updateDialog">
    isEditMode:::{{ isEditMode }}

    vocabularyID= {{ vocabularyID }}

    <textField>
      <select style="height: 40px" class="width_100" v-model="language">
        <option value="japanese"><span>japanese</span></option>
        <option value="english"><span>english</span></option>
      </select>
    </textField>

    <textField v-model="title" label="단어장 제목을 입력하세요" />
    <textField v-model="content" label="단어장 내용을 입력하세요" />
    share: {{ share }}
    <div>
      <label for="profilePicture">프로필 사진:</label>
      <input type="file" id="profilePicture" @change="handleFileUpload" />
    </div>
    coverURL={{ coverURL }}
    <div v-if="coverURL">
      <img
        :src="coverURL"
        alt="프로필 이미지"
        style="width: 100px; height: 100px"
      />
      <buttonDefault @click="handleDeleteCoverURL"
        ><span>이미지 삭제</span></buttonDefault
      >
    </div>
    <buttonDefault v-if="!isEditMode" @click="handleCreateVocabulary">
      <span>단어장 생성</span>
    </buttonDefault>
    <buttonDefault v-else @click="handleUpdateVocabulary"
      ><span>단어장 수정</span></buttonDefault
    >
  </fullDialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    dialog: { type: Boolean },
    vocabularyID: { type: String },
  },
  emits: ["update:dialog", "close"],
  data() {
    return {
      language: "japanese",
      title: "",
      content: "",
      share: true,
      isEditMode: false,
      file: null, // 프로필 사진 파일을 저장할 data 속성 추가
      coverURL: null, // 이미지 URL을 저장할 데이터 속성 추가
    };
  },
  created() {
    this.loadVocabulary();
  },
  methods: {
    ...mapActions({
      returnVocabularyByPayload: "vocabularies/returnVocabularyByPayload",
      updateVocabularyByPayload: "vocabularies/updateVocabularyByPayload",
      updateVocabularyImageByPayload: "vocabularyImages/updateVocabularyImageByPayload",
      deleteStorageByPayload: "vocabularyImages/deleteStorageByPayload",

      

      
      createVocabulary: "vocabularies/createVocabulary", // Vuex의 네임스페이스에서 'signIn' 액션을 매핑함
      updateVocabularyByCurrentVocabularyID:
        "vocabularies/updateVocabularyByCurrentVocabularyID",
      getVocabularyById: "vocabularies/getVocabularyById",
      updateVocabularyImage: "vocabularyImages/updateVocabularyImage",
      deleteStorageByCurrentVocabularyID:
        "vocabularyImages/deleteStorageByCurrentVocabularyID",
    }),
    async loadVocabulary() {
      if (this.vocabularyID) {
        this.isEditMode = true;
        const vocabularyData = await this.returnVocabularyByPayload(
          this.vocabularyID
        );
        if (vocabularyData) {
          this.language = vocabularyData.language;
          this.title = vocabularyData.title;
          this.content = vocabularyData.content;
          this.share = vocabularyData.share;
          this.coverURL = vocabularyData.coverURL; // 이미지 URL 로드
        } else {
          alert("단어장을 불러오는데 실패했습니다.");
        }
      }
    },
    async handleUpdateVocabulary() {
      let coverURL;
      if (this.file) {
        coverURL = await this.updateVocabularyImageByPayload({
          vocabularyID: this.vocabularyID,
          file: this.file,
        });
      }
      const fieldsToUpdate = {
        title: this.title,
        language: this.language,
        content: this.content,
        share: this.share,
        ...(coverURL && { coverURL }),
      };
      const updateData = Object.entries(fieldsToUpdate).reduce(
        (acc, [key, value]) => {
          if (value) acc[key] = value;
          return acc;
        },
        {}
      );
      try {
        await this.updateVocabularyByPayload({
          vocabularyID: this.vocabularyID,
          payload: updateData,
        });
        this.closeForm();
      } catch (error) {
        console.error("단어장 수정 중 오류 발생:", error);
        alert("단어장 수정에 실패했습니다.");
      }
    },
    async handleDeleteCoverURL() {
      const fieldsToUpdate = {
        coverURL: "null",
      };
      const updateData = Object.entries(fieldsToUpdate).reduce(
        (acc, [key, value]) => {
          if (value) acc[key] = value;
          return acc;
        },
        {}
      );
      try {
        await this.updateVocabularyByPayload({
          vocabularyID: this.vocabularyID,
          payload: updateData,
        });
        await this.deleteStorageByPayload(this.vocabularyID);
        this.loadVocabulary();
      } catch (error) {
        console.error("단어장 수정 중 오류 발생:", error);
        alert("단어장 수정에 실패했습니다.");
      }
    },
    handleFileUpload(event) {
      this.file = event.target.files[0]; // 선택된 파일을 저장
    },

   



    
    async handleCreateVocabulary() {
      try {
        await this.createVocabulary({
          language: this.language,
          title: this.title,
          content: this.content,
          share: this.share,
          file: this.file, // 프로필 사진 파일도 함께 전달
        });
        alert("단어장이 생성되었습니다.");
        this.language = ""; // 제목 필드 초기화
        this.title = ""; // 제목 필드 초기화
        this.content = ""; // 제목 필드 초기화
        this.share = true;
        this.updateDialog(false);
      } catch (error) {
        console.error("단어장 생성 중 오류 발생:", error);
        alert("단어장 생성에 실패했습니다.");
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

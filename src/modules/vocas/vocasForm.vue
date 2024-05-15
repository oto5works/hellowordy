<!-- formVoca.vue -->

<template>
  <fullDialog
    :title="isEditMode ? '암기장 수정' : '암기장 추가'"
    :dialog="dialog"
    @update:dialog="updateDialog"
  >
    <template v-slot:header>
      <buttonIcon v-if="!isEditMode" @click="handleCreateVoca()"
        >추가</buttonIcon
      >
      <buttonIcon v-else @click="handleUpdateVoca()">수정</buttonIcon>
    </template>
    <div class="content">
      <textField>
        <select style="height: 40px" class="width_100" v-model="language">
          <option value="japanese"><span>japanese</span></option>
          <option value="english"><span>english</span></option>
        </select>
      </textField>
      <textField v-model="title" label="단어장 제목을 입력하세요" />
      <textField v-model="content" label="단어장 내용을 입력하세요" />
<div class="display_flex align-items_center justify-content_space-between" @click="setShare()">
  <div class="font-size_14" >
    공유
  </div>
  <buttonSwitch v-model="share" />

</div>
      
    </div>

    <div>
      <input type="file" id="profilePicture" @change="handleFileUpload" />
    </div>
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
  </fullDialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    dialog: { type: Boolean },
    vocaID: { type: String },
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
    this.loadVoca();
  },
  methods: {
    ...mapActions({
      returnVocaByPayload: "vocas/returnVocaByPayload",
      updateVocaByPayload: "vocas/updateVocaByPayload",
      updateVocaImageByPayload: "vocaImages/updateVocaImageByPayload",
      deleteVocaImagesByPayload: "vocaImages/deleteVocaImagesByPayload",
      createVoca: "vocas/createVoca",
      updateVocaImage: "vocaImages/updateVocaImage",
    }),
    async loadVoca() {
      if (this.vocaID) {
        this.isEditMode = true;
        const vocaData = await this.returnVocaByPayload(this.vocaID);
        if (vocaData) {
          this.language = vocaData.language;
          this.title = vocaData.title;
          this.content = vocaData.content;
          this.share = vocaData.share;
          this.coverURL = vocaData.coverURL;
        } else {
          alert("단어장을 불러오는데 실패했습니다.");
        }
      }
    },
    async handleUpdateVoca() {
      let coverURL;
      if (this.file) {
        coverURL = await this.updateVocaImageByPayload({
          vocaID: this.vocaID,
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
        await this.updateVocaByPayload({
          vocaID: this.vocaID,
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
        await this.updateVocaByPayload({
          vocaID: this.vocaID,
          payload: updateData,
        });
        await this.deleteVocaImagesByPayload(this.vocaID);
        this.loadVoca();
      } catch (error) {
        console.error("단어장 수정 중 오류 발생:", error);
        alert("단어장 수정에 실패했습니다.");
      }
    },
    handleFileUpload(event) {
      this.file = event.target.files[0]; // 선택된 파일을 저장
    },

    async handleCreateVoca() {
      try {
        await this.createVoca({
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
      this.$emit("close");
    },
    setShare() {
      this.share != this.share
    }
  },
};
</script>

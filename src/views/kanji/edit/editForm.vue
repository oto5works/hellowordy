<template>
  <fullDialog
    :title="isEditMode ? '단어 수정' : '단어 추가'"
    :dialog="dialog"
    @update:dialog="updateDialog"
  >
    <template v-slot:header>
      <buttonIcon v-if="!isEditMode" @click="handleCreateKanji()">추가</buttonIcon>
      <buttonIcon v-else @click="handleUpdateKanji()">수정</buttonIcon>
    </template>

    <div>
<button @click="handleCreateKanji()">추가</button>
unicode = {{ unicode }}
<div v-if="isDuplicate">중복되는 값이 있습니다.</div>
<div class="display_flex">

<div class="kanji-wrap">

<div class="kanji">
  <input
        v-model="kanji"
        type="text"
        @input="convertToUnicode"
      />
</div>
  
      <textField label="훈음" v-model="hoon" type="text" />
    </div>

<div class="info">
  <!-- jlpt -->
  <div class="display_flex">
<div>jlpt: </div>
<buttonSelect
        class="width_100 height_40 pa_20 gap_4 justify-content_space-between"
      >
        <select class="width_100" v-model="jlpt">
          <option value=1><span>JLPT N1</span></option>
          <option value=2><span>JLPT N2</span></option>
          <option value=3><span>JLPT N3</span></option>
          <option value=4><span>JLPT N4</span></option>
          <option value=5><span>JLPT N5</span></option>
        </select>
      </buttonSelect>
  </div>
  <!-- jlpt -->
  <div class="display_flex">
    </div>

<!-- mean -->
<div class="display_flex">
  <div>의미</div>
  <textField label="의미" v-model="mean" type="text" />
    </div>

    <!-- goon -->
  <div class="display_flex">
    <div>음독</div>
    <textField label="음독" v-model="goon" type="text" />
    </div>

<!-- kun -->
<div class="display_flex">
    <div>훈독</div>
    <textField label="훈독" v-model="kun" type="text" />
        </div>

</div>


</div>
 
<div class="line"/>

    <div class="content">
      <p>한자 설명</p>

      <tiptap v-model="comment" />
      <div class="line"/>

    </div>

    <div class="content">
      <p>음독 상세</p>

      <tiptap v-model="goonDetail" />
      <div class="line"/>

    </div>
    <div class="content">
      <p>훈독 상세</p>

      <tiptap v-model="kunDetail" />
    </div>


  </div>
  </fullDialog>
</template>

<script>
import { mapActions } from "vuex";
import tiptap from "@/components/tiptap/tiptap.vue";

export default {
  components: { tiptap },
  emits: ["update:dialog", "close"],
  props: {
    dialog: { type: Boolean },
    kanjiID: { type: String },
  },
  data() {
    return {
      kanji: "",
      jlpt: "",
      mean: "",
      goon: "",
      hoon: "",
      kun: "",
      comment: "",
      goonDetail: "",
      kunDetail: "",
      unicode: "",
      isEditMode: false,
      isDuplicate: false,
    };
  },
  created() {
    this.loadKanji();
  },
  methods: {
    ...mapActions({
      createKanji: "kanjis/createKanji",
      updateKanjiByPayload: "kanjis/updateKanjiByPayload",
      returnKanjiByPayload: "kanjis/returnKanjiByPayload",
      checkDuplicateByPayload: "kanjis/checkDuplicateByPayload",

    }),
    async handleCreateKanji() {
      try {
        await this.createKanji({
          kanji: this.kanji,
          unicode: this.unicode,
          jlpt: this.jlpt,
          mean: this.mean,
          goon: this.goon,
          hoon: this.hoon,
          kun: this.kun,
          comment: this.comment,
          goonDetail: this.goonDetail,
          kunDetail: this.kunDetail,


        });
        this.resetForm();
        this.updateDialog(false);
      } catch (error) {
        console.error("단어 생성 중 오류 발생:", error);
        alert("단어 생성에 실패했습니다.");
      }
    },
    updateDialog(value) {
      this.$emit("update:dialog", value);
    },
    async handleUpdateKanji() {
      const fieldsToUpdate = {
        kanji: this.kanji,
        jlpt: this.jlpt,
        mean: this.mean,
        goon: this.goon,
        hoon: this.hoon,
        kun: this.kun,
        comment: this.comment,
        goonDetail: this.goonDetail,
        kunDetail: this.kunDetail,

        unicode: this.unicode,
      };
      const updateData = Object.entries(fieldsToUpdate).reduce((acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      }, {});
      try {
        await this.updateKanjiByPayload({
          kanjiID: this.kanjiID,
          payload: updateData,
        });
        this.closeForm();
      } catch (error) {
        console.error("단어장 수정 중 오류 발생:", error);
        alert("단어장 수정에 실패했습니다.");
      }
    },
    async loadKanji() {
      if (this.kanjiID) {
        this.isEditMode = true;
        const kanjiData = await this.returnKanjiByPayload(this.kanjiID);
        if (kanjiData) {
          this.kanji = kanjiData.kanji;
          this.jlpt = kanjiData.jlpt;
          this.mean = kanjiData.mean;
          this.goon = kanjiData.goon;
          this.hoon = kanjiData.hoon;
          this.kun = kanjiData.kun;
          this.comment = kanjiData.comment;
          this.goonDetail = kanjiData.goonDetail;

          this.kunDetail = kanjiData.kunDetail;

          this.unicode = kanjiData.id;
        } else {
          alert("단어 불러오는데 실패했습니다.");
        }
      }
    },
    closeForm() {
      this.$emit("close");
    },
    async convertToUnicode() {
      this.unicode = this.kanji
        .split("")
        .map((char) => char.charCodeAt(0).toString(16).padStart(4, "0"))
        .join("");

      // Check for duplicate unicode
      if (this.unicode) {
        const isDuplicate = await this.checkDuplicateByPayload(this.unicode);
        this.isDuplicate = isDuplicate;
      } else {
        this.isDuplicate = false;
      }
    },
    resetForm() {
      this.kanji = "";
      this.jlpt = "";
      this.mean = "";
      this.goon = "";
      this.hoon = "";
      this.kun = "";
      this.comment = "";
      this.goonDetail = "";
      this.kunDetail = "";

      this.unicode = "";
    },
  },
};
</script>

<style scoped>
.kanji {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border: 1px solid rgb(var(--mio-theme-color-on-background));
}
.kanji input {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  overflow: hidden;
  text-align: center;
  font-size: 48px;
  font-weight: 700;
}
.kanji::after,
.kanji::before {
  position: absolute;
  content: '';
}
.kanji::after {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed rgba(var(--mio-theme-color-on-background), 0.4);
}
.kanji::before {
  width: 1px;
  height: 100%;
  border-left: 1px dashed rgba(var(--mio-theme-color-on-background), 0.4);
}

</style>
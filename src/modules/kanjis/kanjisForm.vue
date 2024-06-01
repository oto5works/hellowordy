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

    <div class="content">
      
      unicode = {{ unicode }}
      <!--<textField label="유니코드" v-model="unicode" type="text" readonly />-->
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
      <textField
        label="한자"
        v-model="kanji"
        type="text"
        @input="convertToUnicode"
      />
      <div v-if="isDuplicate">중복되는 값이 있습니다.</div>

      <textField label="의미" v-model="mean" type="text" />
      <textField label="음독" v-model="goon" type="text" />
      <textField label="훈독" v-model="kun" type="text" />
      <tiptap v-model="comment" />
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
      kun: "",
      comment: "",
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
          kun: this.kun,
          comment: this.comment,
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
        kun: this.kun,
        comment: this.comment,
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
          this.kun = kanjiData.kun;
          this.comment = kanjiData.comment;
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
      this.kun = "";
      this.comment = "";
      this.unicode = "";
    },
  },
};
</script>

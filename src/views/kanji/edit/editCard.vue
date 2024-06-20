<template>
  <div class="kanjiCard">
    <button @click="handleUpdateKanji()">수정</button>
    <button @click="handleDeleteKanji()">삭제</button>

    <div class="content">
      {{ kanji.unicode }}
      <select v-model="kanji.jlpt">
        <option value="1">JLPT N1</option>
        <option value="2">JLPT N2</option>
        <option value="3">JLPT N3</option>
        <option value="4">JLPT N4</option>
        <option value="5">JLPT N5</option>
      </select>

      <div class="display_flex gap_8">
        <div>
          <div class="kanji">
            <span v-if="!editing.kanji" @click="editField('kanji')">{{ kanji.kanji }}</span>
            <input v-if="editing.kanji" v-model="kanji.kanji" type="text" @blur="saveField('kanji')" />
          </div>
          <div class="sp_4"/>
        </div>

        <div class="info">
          <div class="diaplay_flex">
            
            <span v-if="!editing.hoon" @click="editField('hoon')">훈음: {{ kanji.hoon }}</span>
            <input v-if="editing.hoon" v-model="kanji.hoon" type="text" @blur="saveField('hoon')" />
          </div>
          <div class="diaplay_flex">
            
            <span v-if="!editing.mean" @click="editField('mean')">의미: {{ kanji.mean }}</span>
            <input v-if="editing.mean" v-model="kanji.mean" type="text" @blur="saveField('mean')" />
          </div>
          <div class="diaplay_flex">
            
            <span v-if="!editing.goon" @click="editField('goon')">음독: {{ kanji.goon }}</span>
            <input v-if="editing.goon" v-model="kanji.goon" type="text" @blur="saveField('goon')" />
          </div>
          <div class="diaplay_flex">
            
            <span v-if="!editing.kun" @click="editField('kun')">훈독: {{ kanji.kun }}</span>
            <input v-if="editing.kun" v-model="kanji.kun" type="text" @blur="saveField('kun')" />
          </div>
        </div>
      </div>
      <p>한자 모양 해설</p>
      <textarea v-model="kanji.comment"></textarea>
      <div class="line"/>
      <p>음독 상세</p>
      <textarea v-model="kanji.goonDetail"></textarea>
      <div class="line"/>
      <p>훈독 상세</p>
      <textarea v-model="kanji.kunDetail"></textarea>

    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  components: {},
  props: {
    kanji: { type: Object },
  },
  data() {
    return {
      editing: {
        kanji: false,
        hoon: false,
        mean: false,
        goon: false,
        kun: false,
      },
    };
  },
  methods: {
    ...mapActions({
      updateKanjiByPayload: "kanjis/updateKanjiByPayload",
      deleteKanjiByPayload: "kanjis/deleteKanjiByPayload",
    }),
    async handleUpdateKanji() {
      const fieldsToUpdate = {
        kanji: this.kanji.kanji,
        jlpt: this.kanji.jlpt,
        mean: this.kanji.mean,
        goon: this.kanji.goon,
        hoon: this.kanji.hoon,
        kun: this.kanji.kun,
        comment: this.kanji.comment,
        goonDetail: this.kanji.goonDetail,
        kunDetail: this.kanji.kunDetail,

        unicode: this.kanji.unicode,


      };
      const updateData = Object.entries(fieldsToUpdate).reduce((acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      }, {});
      try {
        await this.updateKanjiByPayload({
          kanjiID: this.kanji.id,
          payload: updateData,
        });
      } catch (error) {
        console.error("단어장 수정 중 오류 발생:", error);
        alert("단어장 수정에 실패했습니다.");
      }
    },
    async handleDeleteKanji() {
      try {
        const kanjiID = this.kanji.id;
        await this.deleteKanjiByPayload(kanjiID);
        alert("단어장이 삭제되었습니다.");
      } catch (error) {
        console.error("단어장 삭제 중 오류 발생:", error);
      }
    },
    editField(field) {
      this.editing[field] = true;
    },
    saveField(field) {
      this.editing[field] = false;
      this.handleUpdateKanji();
    },
  },
};
</script>

<style scoped>
.kanjiCard {
  position: relative;
  width: 100%;
  border: 1px solid black;
}
.kanjiCard textarea {
  width: 100%;
  height: 200px;
}
.kanji {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 1px solid rgb(var(--mio-theme-color-on-background));
}
.kanji input {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  overflow: hidden;
  text-align: center;
  font-size: 32px;
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
.hoon {
  background-color: rgba(var(--mio-theme-color-on-background), 0.12);
  width: 48px;
}
.hoon input {
  font-size: 14px;
  width: 100%;
}
.info {
  font-size: 12px;
}
</style>

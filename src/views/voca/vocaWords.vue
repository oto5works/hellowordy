<template>
  <div>
    <div v-if="words.length > 0">
      <div
        class="display_flex align-items_center justify-content_space-between"
      >
        <div class="display_flex align-items_center gap_8">
          <div class="font-size_14 kr font-weight_500">등록된 단어</div>
          <div class="font-size_15 en font-weight_700 color_primary">
            {{ words.length }}
          </div>
        </div>
        <div class="display_flex align-center gap_8">
          <buttonSelect class="height_32 pa_8 gap_4">
            <select v-model="sortOrder">
              <option value="desc"><span>최신순으로 보기</span></option>
              <option value="asc"><span>오래된 순으로 보기</span></option>
            </select>
          </buttonSelect>
        </div>
      </div>
      <div class="sp_24" />
      <div class="words-list">
        <buttonDefault
          v-if="voca.userID === userID"
          @click="dialog = true"
          class="selected"
        >
          <icon><plus /></icon>
          <span>단어 추가</span>
        </buttonDefault>
        <vocaWordsCard
          v-for="(item, index) in sortedWords"
          :key="item.id"
          :word="item"
          :index="sortOrder === 'desc' ? sortedWords.length - index : index + 1"
        />
      </div>
    </div>
    <div v-else>
      <div class="sp_128" />
      <noData content="현재 암기장에 등록된 단어가 없습니다." image="rabbit3">
        <buttonDefault
          v-if="voca.userID === userID"
          class="height_40 pa_16"
          @click="dialog = true"
        >
          <span class="font-weight_500">단어 추가</span>
        </buttonDefault>
      </noData>
    </div>
    <wordsForm
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
      :vocaID="voca.id"
    />
  </div>
</template>
<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import vocaWordsCard from "@/views/voca/vocaWordsCard.vue";
import plus from "@/components/icon/plus";
import noData from "@/modules/noData/noData";

export default {
  components: {
    plus,
    noData,
    vocaWordsCard,
    wordsForm: defineAsyncComponent(() =>
      import("@/modules/words/wordsForm.vue")
    ),
  },
  props: {
    voca: { type: Object },
  },
  computed: {
    ...mapGetters({
      words: "words/getWords",
      userID: "users/getUserID",
    }),
    vocaID() {
      return this.$route.params.id;
    },
    sortedWords() {
      return this.sortOrder === "desc"
        ? this.words
            .slice()
            .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
        : this.words
            .slice()
            .sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
    },
  },
  data() {
    return {
      sortOrder: "asc", // 'desc'는 내림차순(최신순), 'asc'는 오름차순(오래된 순)을 의미합니다.
      dialog: false,
    };
  },
  methods: {
    ...mapActions({
      getWordsByPayload: "words/getWordsByPayload",
      resetWords: "words/resetWords",
    }),
    async loadWords() {
      if (this.vocaID) {
        await this.getWordsByPayload(this.vocaID);
      } else {
        alert("단어장을 불러오는데 실패했습니다.");
      }
    },
  },
  watch: {
    // vocaID가 변경될 때마다 loadWords 메소드를 호출
    vocaID(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loadWords();
      }
    },
    words: {
      handler() {
        // words 배열이 변경될 때 sortedWords를 다시 계산하도록 설정
        // 이렇게 함으로써, words 배열의 변경이 sortedWords 계산 속성에 자동으로 반영됩니다.
        // 단, 이 핸들러는 deep watch이므로, 배열 내부 객체의 변경까지 감지합니다.
      },
      deep: true,
    },
  },
  created() {
    this.loadWords();
  },
  beforeRouteLeave(to, from, next) {
    this.resetWords(); // 페이지를 떠날 때 선택된 단어장의 ID를 null로 설정
    next();
  },
};
</script>
<style scoped>
.words-list {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.buttonDefault {
  flex-direction: column;
  gap: 16px;
  border-radius: 24px !important;
}
</style>

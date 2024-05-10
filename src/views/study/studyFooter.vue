<template>
  <div
    class="studyFooter display_flex align-items_center justify-content_space-between width_100"
  >
    <buttonText class="selected gap_4" @click="setShowDict()"
      ><icon><book /></icon
      ><span class="font-size_14">네이버 사전 보기</span></buttonText
    >
    <div class="display_flex align-items_center gap_12">
      <buttonIcon class="height_32 pa_12 gap_4" @click="setPrevious()"
        ><icon class="icon_18"><caretLeft /></icon
      ></buttonIcon>
      <buttonIcon class="height_32 pa_12 gap_4" @click="setNext()">
        <icon class="icon_18"><caretRight /></icon>
      </buttonIcon>
    </div>
    <dict v-if="showDict" :word="currentWord" />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

import { mapGetters, mapActions } from "vuex";
import book from "@/components/icon/book";
import caretLeft from "@/components/icon/caretLeft";
import caretRight from "@/components/icon/caretRight";

export default {
  components: {
    book,
    caretLeft,
    caretRight,
    dict: defineAsyncComponent(() => import("@/views/dict/dict.vue")),
  },
  computed: {
    ...mapGetters({
      currentWord: "study/getCurrentWord",
      showDict: "study/getShowDict",
    }),
  },
  methods: {
    ...mapActions({
      setNext: "study/setNext",
      setPrevious: "study/setPrevious",
      setShowDict: "study/setShowDict",
    }),
  },
};
</script>

<style scoped>
.studyFooter {
  border-top: 1px solid rgba(var(--mio-theme-color-on-background), 0.4);
}
</style>

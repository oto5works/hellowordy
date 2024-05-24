<template>
  <div
    class="studyFooter display_flex align-items_center justify-content_space-between width_100"
  >
    <buttonDefault class="gap_4 height_32 pa_12" @click="setShowDict()"
      ><icon><book /></icon
      ><span class="font-size_13">네이버 사전 보기</span></buttonDefault
    >
    <dict v-if="showDict" :word="currentWord" />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import book from "@/components/icon/book";

export default {
  components: {
    book,
    dict: defineAsyncComponent(() => import("@/modules/dict/dict.vue")),
  },
  computed: {
    ...mapGetters({
      currentWord: "study/getCurrentWord",
      showDict: "study/getShowDict",
    }),
  },
  methods: {
    ...mapActions({
      setShowDict: "study/setShowDict",
    }),
  },
};
</script>

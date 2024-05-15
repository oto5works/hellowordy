<template>
  <div class="routerView">
    <div v-if="voca">
      <vocaInfo :voca="voca" />
      <div class="sp_32"/>
      <div class="line"/>
      <div class="sp_8"/>
      <vocaWords :voca="voca" />
      <wordsForm
        v-if="dialog"
        :dialog="dialog"
        @update:dialog="dialog = $event"
        :vocaID="voca.id"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import vocaInfo from "@/views/voca/vocaInfo.vue";
import vocaWords from "@/views/voca/vocaWords.vue";

export default {
  components: {
    vocaInfo,
    vocaWords,
    wordsForm: defineAsyncComponent(() =>
      import("@/modules/words/wordsForm.vue")
    ),
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
      userID: "users/getUserID",
      voca: "vocas/getVoca",
    }),
    vocaID() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.fetchVoca();
  },
  methods: {
    ...mapActions({
      getVocaByPayload: "vocas/getVocaByPayload",
    }),
    async fetchVoca() {
      try {
        if (this.vocaID) {
          await this.getVocaByPayload(this.vocaID);
        } else {
          alert("단어장을 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("단어장을 가져오는 중 오류가 발생했습니다:", error);
      }
    },
  },
};
</script>

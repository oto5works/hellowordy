<template>
  <div class="flicking">
    <div class="flicking-title">
      <span class="font-size_16 font-weight_500">내 암기장</span>
      <buttonText
        class="selected height_24 gap_8 pa_8"
        @click="navigateToMyVoca()"
      >
        <span class="font-size_12">모두 보기</span>
      </buttonText>
    </div>
    <div class="sp_16" />
    <Flicking
      v-if="getVocabulariesUserID"
      ref="flicking"
      :options="{ moveType: 'snap', bound: true }"
      :plugins="plugins"
    >
      <vocabulariesCard
        v-for="item in getVocabulariesUserID"
        :key="item.id"
        :vocabulary="item"
      />
      <template #viewport>
        <div class="flicking-pagination"></div>
      </template>
    </Flicking>
    <div class="flicking-title" v-if="!getVocabulariesUserID">
      <div class="error404">
        <div class="sp_12" />
        <div
          class="rabbit404-text font-size_13 kr font-weight_400 line-height_130 text-align_center"
        >
          암기장이 없습니다.<br />
          아래 버튼을 클릭하여 등록을 해주세요.
        </div>
        <div class="sp_24" />
        <buttonOutline class="height_40 pa_16">
          <span class="font-weight_500">암기장 만들기</span>
        </buttonOutline>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Flicking from "@egjs/vue3-flicking";
import { Pagination } from "@egjs/flicking-plugins";
import caretLeft from "@/components/icon/caretLeft.vue";
import caretRight from "@/components/icon/caretRight.vue";
import vocabulariesCard from "@/views/vocabularies/vocabulariesCard.vue";

export default {
  components: {
    Flicking,
    caretLeft,
    caretRight,
    vocabulariesCard,
  },
  data: function () {
    return {
      plugins: [new Pagination({ type: "bullet" })],
    };
  },
  computed: {
    ...mapGetters({
      getVocabulariesUserID: "vocabularies/getVocabulariesUserID",
      userID: "users/getUserID",
    }),
    navigateToMyVoca() {
      this.$router.push({
        name: "user",
        params: { id: this.userID },
      });
    },
  },
};
</script>
<style scoped>
.flicking-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--mio-theme-padding-2);
}
.error404 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 212px;
}
</style>

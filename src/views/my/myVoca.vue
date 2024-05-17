<template>
  <div class="flicking">
    <div class="flicking-title">
      <span class="font-size_16 font-weight_500">내 암기장</span>
      <buttonText
        class="selected height_24 gap_8 pa_8"
        @click="vocasDialog = true"
      >
        <span class="font-size_12">모두 보기</span>
      </buttonText>
  </div>
    <div class="sp_16" />
    <Flicking
      v-if="vocas"
      ref="flicking"
      :options="{ moveType: 'snap', bound: true }"
      :plugins="plugins"
    >
      <myVocaCard v-for="item in vocas" :key="item.id" :voca="item" />
      <template #viewport>
        <div class="flicking-pagination"></div>
      </template>
    </Flicking>
    <div v-if="vocas.length === 0">
      <noData
        content="암기장이 없습니다.<br>아래 버튼을 클릭하여 등록을 해주세요."
        image="rabbit3"
      >
        <buttonDefault class="height_40 pa_16" @click="vocasForm = true">
          <span class="font-weight_500">암기장 추가</span>
        </buttonDefault>
      </noData>
    </div>
    <vocasForm
      v-if="vocasForm"
      :dialog="vocasForm"
      @update:dialog="vocasForm = $event"
    />
    <vocasDialog
      v-if="vocasDialog"
      :dialog="vocasDialog"
      @update:dialog="vocasDialog = $event"
    />
  </div>
</template>
<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";
import Flicking from "@egjs/vue3-flicking";
import { Pagination } from "@egjs/flicking-plugins";
import myVocaCard from "@/views/my/myVocaCard.vue";
import noData from "@/modules/noData/noData";

export default {
  components: {
    Flicking,
    myVocaCard,
    noData,
    vocasForm: defineAsyncComponent(() =>
      import("@/modules/vocas/vocasForm.vue")
    ),
    vocasDialog: defineAsyncComponent(() =>
      import("@/modules/vocas/vocasDialog.vue")
    ),
  },
  data: function () {
    return {
      plugins: [new Pagination({ type: "bullet" })],
      vocasForm: false,
      vocasDialog: false,
    };
  },
  computed: {
    ...mapGetters({
      vocas: "vocas/getVocas",
      userID: "users/getUserID",
    }),
  },
  methods: {
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
</style>

<!-- vocasDialog.vue -->
<template>
  <fullDialog title="암기장" :dialog="dialog" @update:dialog="updateDialog">
    <template v-slot:header>

      <buttonIcon @click="vocasForm=true">추가</buttonIcon>
    </template>
<div class="display_flex flex-direction_column">
    <vocasList v-for="item in vocas" :key="item.id" :voca="item" />
  </div>
  <div v-if="vocas.length === 0">
    <div class="sp_128"/>
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
  </fullDialog>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import vocasList from "@/modules/vocas/vocasList.vue";
import noData from "@/modules/noData/noData.vue";

export default {
  components: {
    vocasList, noData,
    vocasForm: defineAsyncComponent(() =>
      import("@/modules/vocas/vocasForm.vue")
    ),
  },
  props: {
    dialog: { type: Boolean },
  },
  data: function () {
    return {
      vocasForm: false,
    };
  },
  computed: {
    ...mapGetters({
      vocas: "vocas/getVocas",
    }),
  },
  methods: {
    updateDialog(value) {
      this.$emit("update:dialog", value);
    },
  },
};
</script>

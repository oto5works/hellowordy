<template>
    <div>
      <div class="sp_64"/>
      <div
        class="display_flex align-items_center justify-content_space-between"
      >
        <div class="display_flex align-items_center gap_8">
          <div class="font-size_14 kr font-weight_500">등록된 한자</div>
          <div class="font-size_15 en font-weight_700 color_primary">
            <!--{{ kanjis.length }}-->
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
      <div class="kanjis-list">
        <buttonDefault
          @click="dialog = true"
          class="selected"
          style="z-index: 10;"
        >
          <icon><plus /></icon>
          <span>한자 추가</span>
        </buttonDefault>
        <kanjiCard
          v-for="(item, index) in kanjis"
          :key="item.id"
          :kanji="item"
        />
      </div>
      <kanjisForm
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
    />
    </div>

    
</template>
<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import kanjiCard from "@/views/kanji/kanjiCard.vue";
import plus from "@/components/icon/plus";

export default {
  components: {
    plus,
    kanjiCard,
    kanjisForm: defineAsyncComponent(() =>
      import("@/modules/kanjis/kanjisForm.vue")
    ),
  },
  computed: {
    ...mapGetters({
      kanjis: "kanjis/getKanjis",
      userID: "users/getUserID",
    }),
  },
  data() {
    return {
      dialog: false,
      sortOrder: ''
    };
  },
  methods: {
    ...mapActions({
      getKanjis: "kanjis/getKanjis",
    }),
  },
  created() {
    this.getKanjis();
  },
};
</script>
<style scoped>
.kanjis-list {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.buttonDefault {
  flex-direction: column;
  gap: 16px;
  border-radius: 24px !important;
}
</style>

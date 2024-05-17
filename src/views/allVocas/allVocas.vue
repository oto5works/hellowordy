<!-- vocasDialog.vue -->
<template>
  <div>
    <div class="flicking-title">
      <span class="font-size_24 font-weight_500">전체 암기장</span>
      <buttonSelect class="height_32 pa_8 gap_4">
        <select v-model="sortOrder">
          <option value="favorite"><span>북마크순으로 보기</span></option>
          <option value="desc"><span>최신순으로 보기</span></option>
          <option value="asc"><span>오래된 순으로 보기</span></option>
        </select>
      </buttonSelect>
    </div>
    <div class="sp_8" />

    <div class="flicking-title">
      <div class="display_flex">
        <buttonTap :class="{ selected: tap === 'all' }" @click="tap = 'all'">
          <span>전체</span>
        </buttonTap>
        <buttonTap
          :class="{ selected: tap === 'japanese' }"
          @click="tap = 'japanese'"
        >
          <span>Japanese</span>
        </buttonTap>
        <buttonTap
          :class="{ selected: tap === 'English' }"
          @click="tap = 'English'"
        >
          <span>English</span>
        </buttonTap>
      </div>
    </div>
    <div class="sp_8" />

    <div class="display_flex flex-direction_column">
      <allVocasList v-for="item in vocas" :key="item.id" :voca="item" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import allVocasList from "@/views/allVocas/allVocasList.vue";

export default {
  components: {
    allVocasList,
  },
  data: function () {
    return {
      vocas: [],
      tap: "all",
      sortOrder: "favorite",
    };
  },
  computed: {
    ...mapGetters({
      favorites: "favorites/getFavorites",
    }),
  },
  mounted() {
    this.fetchAllVocas(); // 컴포넌트가 마운트될 때 fetchAllVocas 메서드를 호출
  },
  methods: {
    ...mapActions({
      returnAllVocas: "vocas/returnAllVocas",
    }),
    async fetchAllVocas() {
      try {
        console.log("실행 가져와요");
        this.vocas = await this.returnAllVocas(); // returnAllVocas 액션을 호출하여 결과를 vocas 데이터에 할당
      } catch (error) {
        console.error("Failed to fetch all vocas:", error); // 오류 처리
      }
    },
  },
};
</script>

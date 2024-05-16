<!-- vocasDialog.vue -->
<template>
  <div>
    <div class="display_flex flex-direction_column">
      <allVocasList v-for="item in vocas" :key="item.id" :voca="item" />
      {{ vocas }}
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
        console.log('실행 가져와요')
        this.vocas = await this.returnAllVocas(); // returnAllVocas 액션을 호출하여 결과를 vocas 데이터에 할당
      } catch (error) {
        console.error("Failed to fetch all vocas:", error); // 오류 처리
      }
    },
    
  },
};
</script>

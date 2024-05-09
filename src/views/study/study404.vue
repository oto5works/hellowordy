<template>
  <div class="display_flex align-items_center flex-direction_column width_100">
    <icon class="rabbit404-image"><rabbit404 /></icon>
    <div class="sp_12" />
    <div class="rabbit404-text font-size_14 font-weight_400">
      집에서는 물론 이동 중에도 녹화하고 업로드할 수 있습니다. 공개 상태로
      설정한 모든 콘텐츠가 여기에 표시됩니다.
    </div>
    <div class="sp_24" />
    <buttonDefault class="height_40 pa_16 selected" @click="setShowFilter()">
      <span>선택하기</span>
    </buttonDefault>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import rabbit404 from "@/components/icon/rabbit404.vue";

export default {
  components: {
    rabbit404,
  },
  methods: {
    ...mapActions({
      setShowFilter: "filter/setShowFilter",
    }),
  },
};
</script>
<style scoped>
.rabbit404-image {
  position: relative;
  width: 50%;
  height: auto;
}
.rabbit404-image svg {
  width: 100%;
  height: 100%;
}
.rabbit404-text {
  max-width: 80%;
}
</style>

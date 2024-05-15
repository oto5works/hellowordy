<template>
  <div class="display_flex align-items_center flex-direction_column width_100">
    <div class="sp_48" />
    <div class="rabbit404-image"><rabbit3 /></div>
    <div class="sp_12" />
    <div class="rabbit404-text font-size_13 kr font-weight_400 line-height_130">
      단어장이 선택되지 않았습니다.
      암기를 시작하려면 먼저 암기할 단어장을 선택하세요.
    </div>
    <div class="sp_24" />
    <buttonDefault class="height_40 pa_16" @click="setShowFilter()">
      <span>단어장 선택하기</span>
    </buttonDefault>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import rabbit3 from "@/components/icon/rabbit3.vue";

export default {
  components: {
    rabbit3,
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
  width: 70%;
  height: auto;
}
.rabbit404-image svg {
  width: 100%;
  height: 100%;
  stroke-width: 1
}
.rabbit404-text {
  max-width: 80%;
}
</style>

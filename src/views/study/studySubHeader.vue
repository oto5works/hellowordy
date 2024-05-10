<template>
  <div
    class="display_flex align-items_center justify-content_space-between width_100 height_32"
  >
    <studyChecked />

    <div class="display_flex align-items_center gap_18">
      <div class="display_flex align-items_center gap_6">
        <div
          class="always font-size_12 font-weight_600 --mio-theme-font-family-kr"
          :class="{ selected: alwaysMean }"
        >
          가
        </div>
        <buttonSwitch v-model="alwaysMean" @update:modelValue="setAlwaysMean" />
      </div>

      <div class="display_flex align-items_center gap_6">
        <div
          class="always font-size_12 font-weight_600 --mio-theme-font-family-jp"
          :class="{ selected: alwaysRuby }"
        >
          あ
        </div>
        <buttonSwitch v-model="alwaysRuby" @update:modelValue="setAlwaysRuby" />
      </div>
      <buttonText>
        <icon class="icon_16"><settings/></icon>
      </buttonText>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import studyChecked from "@/views/study/studyChecked.vue";
import settings from "@/components/icon/settings.vue";


export default {
  components: {
    studyChecked, settings
  },
  data() {
    return {
      isSwitchOn: false,
    };
  },
  computed: {
    ...mapGetters({
      alwaysRuby: "study/getAlwaysRuby",
      alwaysMean: "study/getAlwaysMean",
    }),
  },
  methods: {
    ...mapActions({
      setAlwaysRuby: "study/setAlwaysRuby",
      setAlwaysMean: "study/setAlwaysMean",
    }),
  },
};
</script>

<style scoped>
.always.selected {
  color: rgb(var(--mio-theme-color-primary));
}
</style>

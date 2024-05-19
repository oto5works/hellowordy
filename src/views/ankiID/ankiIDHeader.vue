<template>
  <div
    class="display_flex align-items_center justify-content_space-between width_100 height_32
    "
  >
    <ankiIDChecked />

    <div class="display_flex align-items_center gap_20">
      <div class="display_flex align-items_center gap_6">
        <div
          class="always font-size_12 font-weight_600 kr"
          :class="{ selected: alwaysMean }"
        >
          가
        </div>
        <buttonSwitch v-model="alwaysMean" @update:modelValue="setAlwaysMean" />
      </div>

      <div class="display_flex align-items_center gap_6">
        <div
          class="always font-size_12 font-weight_600 jp"
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

import ankiIDChecked from "@/views/ankiID/ankiIDChecked.vue";
import settings from "@/components/icon/settings.vue";


export default {
  components: {
    ankiIDChecked, settings
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

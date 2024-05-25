<template>
  <bottomDialog
    title="보기 설정"
    :dialog="dialog"
    @update:dialog="updateDialog"
  >
    <buttonList @click="setAlwaysMean()" :class="{ selected: alwaysMean }">
      <icon><kr /></icon>
      <span>뜻 항상 보기</span>
      <buttonSwitch v-model="alwaysMean" @update:modelValue="setAlwaysMean" />
    </buttonList>

    <buttonList @click="setAlwaysRuby()" :class="{ selected: alwaysRuby }">
      <icon><jp /></icon><span>후리가나 항상 보기</span>
      <buttonSwitch v-model="alwaysRuby" @update:modelValue="setAlwaysRuby" />
    </buttonList>
  </bottomDialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import kr from "@/components/icon/kr";
import jp from "@/components/icon/jp";

export default {
  components: {
    kr,
    jp,
  },
  props: {
    dialog: { type: Boolean },
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
    updateDialog(value) {
      console.log("닫아요");
      this.$emit("update:dialog", value);
    },
  },
};
</script>

<style scoped>
.always.selected {
  color: rgb(var(--mio-theme-color-primary));
}
</style>

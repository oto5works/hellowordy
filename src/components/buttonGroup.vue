<template>
  <div class="buttonGroup">
    <div class="content">
      <btn class="show" @click="setRandom()"><check /></btn>
      <btn
        class="show kr"
        :class="{ selected: showMean }"
        @click="setShowMean()"
        ><span>가</span></btn
      >
      <btn
        class="show jp"
        :class="{ selected: showRuby }"
        @click="setShowRuby()"
        ><span>あ</span></btn
      >
      <btn class="show selected" @click="setRandom()"><dice /></btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dice from "@/components/icon/dice.vue";
import check from "@/components/icon/check.vue";

export default {
  components: { dice, check },
  computed: {
    ...mapGetters({
      showRuby: "state/getShowRuby",
      showMean: "state/getShowMean",
    }),
  },
  methods: {
    ...mapActions({
      setShowRuby: "state/setShowRuby",
      setShowMean: "state/setShowMean",
      setRandom: "filter/setRandom",
    }),
  },
};
</script>

<style scoped>
.show {
  width: 72px;
  height: 72px;
}
.show span {
  font-size: 20px;
  font-weight: 700;
}
.show .jp {
  font-family: var(--mio-theme-font-family-jp);
}
.show .kr {
  font-family: var(--mio-theme-font-family-kr);
}
.show svg {
  width: 24px;
  height: 24px;
}
@media all and (max-width: 479px) {
}
</style>

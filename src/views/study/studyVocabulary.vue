<template>
  <button @click="setShowFilter()">
    <div v-if="currentVocabulary" class="display_flex align-items_center gap_8">
      <div
        class="font-size_20 font-weight_400 kr line-height_100"
      >
        {{ currentVocabulary.title }}
      </div>
      <buttonSelect class="height_24 pa_8 gap_4"
        ><span class="font-size_13 en">part {{ part + 1 }}</span
        ><icon class="icon_12"><caretDown /></icon>
      </buttonSelect>
    </div>
    <div
      v-else
      class="font-size_20 font-weight_400 en line-height_100"
    >Select</div>
  </button>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import caretDown from "@/components/icon/caretDown.vue";

export default {
  components: { caretDown },
  computed: {
    ...mapGetters({
      part: "study/getPart",
      currentVocabulary: "vocabularies/getCurrentVocabulary",
    }),
  },
  methods: {
    ...mapActions({
      setShowFilter: "filter/setShowFilter",
    }),
  },
};
</script>

<style scoped>
button {
  color:rgb(var(--mio-theme-color-on-background)) ;
}
</style>
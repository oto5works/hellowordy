<template>
  <div class="display_flex align-items_flex-end gap_18" @click="setShowFilter()">
    <div v-if="currentVocabulary" class="font-size_16 font-weight_400 --mio-theme-font-family line-height_100">
      {{ currentVocabulary.title }} PART {{ part }}
    </div>
    <icon class="icon_16"><caretDown /></icon>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import caretDown from "@/components/icon/caretDown.vue";

export default {
  components: { caretDown,
    
   },
  computed: {
    ...mapGetters({
      part: "filter/getPart",
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

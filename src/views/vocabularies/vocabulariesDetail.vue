<template>
  <div class="routerView">
    <vocabulariesDetailInfo />
    <vocabulariesDetailWords />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vocabulariesDetailInfo from "@/views/vocabularies/vocabulariesDetailInfo.vue";
import vocabulariesDetailWords from "@/views/vocabularies/vocabulariesDetailWords.vue";

export default {
  components: {
    vocabulariesDetailInfo,
    vocabulariesDetailWords,
  },
  computed: {
    ...mapGetters({
      vocabularies: "vocabularies/getVocabularies",
    }),
  },
  methods: {
    ...mapActions({
      fetchUserVocabularies: "vocabularies/fetchUserVocabularies",
    }),
  },
};
</script>

<template>
  <div class="routerView">
    <vocabulariesButton />
    <div class="sp_24" />
    <div class="display_flex flex-wrap_wrap gap_12">
      <vocabulariesCard
        v-for="item in vocabularies"
        :key="item.id"
        :vocabulary="item"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vocabulariesCard from "@/views/vocabularies/vocabulariesCard.vue";
import vocabulariesButton from "@/views/vocabularies/vocabulariesButton.vue";

export default {
  components: {
    vocabulariesCard,
    vocabulariesButton,
  },
  computed: {
    ...mapGetters({
      vocabularies: "vocabularies/getVocabularies",
    }),
  },
  created() {
    this.fetchUserVocabularies();
  },
  methods: {
    ...mapActions({
      fetchUserVocabularies: "vocabularies/fetchUserVocabularies",
    }),
  },
};
</script>

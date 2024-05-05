<template>
  <div class="vocabulary-list">
    <vocabulariesButton />

    <vocabulariesCard
      v-for="item in vocabularies"
      :key="item.id"
      :vocabulary="item"
    />
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
    this.fetchAllVocabularies();
  },
  methods: {
    ...mapActions({
      fetchAllVocabularies: "vocabularies/fetchAllVocabularies",
    }),
  },
};
</script>

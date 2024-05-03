<template>
  <div>
    <button @click="handleCreateVocabulary()">생성</button>
    <vocabulariesForm
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { defineAsyncComponent } from "vue";

export default {
  components: {
    vocabulariesForm: defineAsyncComponent(() =>
      import("@/views/vocabularies/vocabulariesForm.vue")
    ),
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions({
      updateCurrentVocabularyID: "vocabularies/updateCurrentVocabularyID",
    }),
    handleCreateVocabulary() {
      this.updateCurrentVocabularyID(null);
      this.dialog = true;
    },
  },
};
</script>

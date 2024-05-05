<template>
  <div>
    <buttonDefault class="width_100 height_64" @click="handleCreateVocabulary()"><span>만들기</span></buttonDefault>
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

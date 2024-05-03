<template>
  <div>
    <button @click="handleCreateWord()">추가</button>
    <wordsForm
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
    wordsForm: defineAsyncComponent(() =>
      import("@/views/words/wordsForm.vue")
    ),
    
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions({
      updateCurrentWordID: "words/updateCurrentWordID",
    }),
    handleCreateWord() {
      this.updateCurrentWordID(null);
      this.dialog = true;
    },
  },
};
</script>

<template>
  <buttonDefault class="width_100 height_64" @click="handleCreateWord()"
    ><span>단어 추가</span>
    <wordsFormDialog
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
    />
  </buttonDefault>
</template>

<script>
import { mapActions } from "vuex";
import { defineAsyncComponent } from "vue";

export default {
  components: {
    wordsFormDialog: defineAsyncComponent(() =>
      import("@/views/words/wordsFormDialog.vue")
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

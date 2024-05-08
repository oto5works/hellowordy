<template>
  <modalDialog
    title="학습한 단어"
    :dialog="dialog"
    @update:dialog="updateDialog"
  >
    <div
      class="display_flex align-items_center justify-content_space-between"
      @click="handleClickEvent(word.id)"
      v-for="word in checkedWords"
      :key="word.id"
    >
    <div class="font-size_16 font-weight_500">
      {{ word.word }} {{ word.mean }}
    </div>
      <icon @click="deleteCheckedWordByWordID(word.id)"><x /></icon>
    </div>
  </modalDialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import x from "@/components/icon/x";

export default {
  components: {x},
  props: {
    dialog: { type: Boolean },
    checkedWords: { type: Array, Object },
  },
  methods: {
    ...mapActions({
      deleteCheckedWordByWordID: "checkedWords/deleteCheckedWordByWordID", // Vuex의 네임스페이스에서 'signIn' 액션을 매핑함
     
    }),

    updateDialog(value) {
      this.$emit("update:dialog", value);
    },
    handleClickEvent(ID) {
      this.$emit("update:dialog", false);
    },
  },
};
</script>

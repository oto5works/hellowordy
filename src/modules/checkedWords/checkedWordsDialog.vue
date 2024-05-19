<template>
  <fullDialog
    title="학습한 단어"
    :dialog="dialog"
    @update:dialog="updateDialog"
  >
    <checkedWordsList :checkedWords="checkedWords" />
  </fullDialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import checkedWordsList from "@/modules/checkedWords/checkedWordsList.vue";

export default {
  components: { checkedWordsList },
  props: {
    dialog: { type: Boolean },
    checkedWords: { type: Array, Object },
  },
  methods: {
    ...mapActions({
      deleteCheckedWordByPayload: "checkedWords/deleteCheckedWordByPayload", // Vuex의 네임스페이스에서 'signIn' 액션을 매핑함
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

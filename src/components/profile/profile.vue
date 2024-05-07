<template>
  <div
    class="profile display_flex gap_6 align-items_center"
    @click="handleClickEvent()"
  >
    <img class="icon_16 border-radius_12" :src="photoURL" />
    <div class="font-size_14 font-weight_400">{{ displayName }}</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    userID: { type: String },
    photoURL: { type: String },
    displayName: { type: String },
  },
  methods: {
    handleClickEvent() {
      this.$router.push({
        name: "wordsView",
        params: { id: this.userID },
      });
    },
  },
};
</script>
<style scoped>
.profile {
  cursor: pointer;
}
</style>

<template>
  <div class="headerView">
    <div class="display_flex gap_16">
      <buttonIcon v-if="$route.name === 'chat'" @click="goToLearning">
        <icon><caretLeft /></icon>
      </buttonIcon>
    </div>

    <div class="display_flex gap_16">
      <buttonIcon v-if="$route.name === 'learning'">
        <icon><bookmark /></icon>
      </buttonIcon>
      <buttonIcon v-if="$route.name === 'learning'" @click="goToSettings">
        <icon><settings /></icon>
      </buttonIcon>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import wordData from "@/modules/wordData.vue";
import google from "@/components/icon/google.vue";
import generate from "@/components/icon/generate.vue";
import caretLeft from "@/components/icon/caretLeft.vue";
import settings from "@/components/icon/settings.vue";
import bookmark from "@/components/icon/bookmark.vue";

export default {
  components: {
    wordData,
    google,
    generate,
    caretLeft,
    settings,
    bookmark,
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "status/isLoading",
      settings: "settings/settings",
    }),
  },
  methods: {
    goToLearning() {
      this.$router.push({ name: "learning" });
    },
    goToSettings() {
      this.$router.push({ name: "settings" });
    },
  },
};
</script>

<style scoped>
.headerView {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 480px;
  height: 64px;
  top: 0;
  padding: 0 16px;
  z-index: 1000;
}
</style>

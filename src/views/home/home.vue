<template>
  <div class="routerView">
    <homeUser404 v-if="!isAuthenticated" />

    <countdownsView v-if="isAuthenticated" />
    <homeMyVoca v-if="isAuthenticated" />

    <buttonDefault
      class="height_64 width_100"
      v-if="isAuthenticated"
      @click="navigateToVoca()"
      >전체 단어장</buttonDefault
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { defineAsyncComponent } from "vue";
import homeUser404 from "@/views/home/homeUser404.vue";

export default {
  components: {
    homeUser404,
    countdownsView: defineAsyncComponent(() =>
      import("@/views/countdowns/countdownsView.vue")
    ),
    homeMyVoca: defineAsyncComponent(() =>
      import("@/views/home/homeMyVoca.vue")
    ),
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "users/isAuthenticated",
    }),
  },
  methods: {
    navigateToVoca() {
      this.$router.push({ name: "vocabulariesAllView" });
    },
  },
};
</script>
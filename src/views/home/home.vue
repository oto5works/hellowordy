<template>
  <div class="routerView">
    <home404 v-if="!isAuthenticated" />

    <countdownsView v-if="isAuthenticated" />

    <adComponent />

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { defineAsyncComponent } from "vue";
import home404 from "@/views/home/home404.vue";
import adComponent from "@/components/adComponent";

export default {
  components: {
    home404, adComponent,
    countdownsView: defineAsyncComponent(() =>
      import("@/views/home/countdown/countdown.vue")
    ),
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "users/isAuthenticated",
    }),
  },
  methods: {

  },
};
</script>
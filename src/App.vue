<!-- App.vue -->
<template>
  <div class="app">
    <headerView v-if="!isAuth" />
    <navbar v-if="!isAnki" />
    <RouterView />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import headerView from "@/views/common/headerView.vue";
import navbar from "@/views/common/navbar.vue";

export default {
  components: {headerView, navbar},

  computed: {
    ...mapGetters({
      isAuthenticated: "users/isAuthenticated",
    }),
  isAuth() {
    return this.$route.name === 'auth'
  },
  isAnki() {
    return this.$route.name === 'anki'
  },
  },
  created() {},
  methods: {
    ...mapActions({}),
  },
};
</script>
<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  position: relative;
  height: 100%;
  min-height: 100%;
}
.app {
  width: 100%;
  height: 100%;
  display: block; /* 필요한 경우에만 추가 */
}
</style>

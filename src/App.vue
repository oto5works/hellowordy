<!-- App.vue -->
<template>
  <div class="app">
    <headerView />
    <RouterView />
    <background />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import background from "@/modules/bg";
import headerView from "@/views/headerView.vue";

export default {
  components: {  background, headerView },

  computed: {
    ...mapGetters({
      isAuthenticated: "users/isAuthenticated",
    }),
    isAuth() {
      return this.$route.name === "auth";
    },
    isAnkiID() {
      return this.$route.name === "ankiID";
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
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-height: 100%;
}
.app {
  position: relative;
  width: 100%;
  max-width: 480px;
  height: 100%;
  display: block; /* 필요한 경우에만 추가 */
}
.routerView {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
  padding-top: 64px;
}
</style>

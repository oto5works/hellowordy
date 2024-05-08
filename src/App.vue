<!-- App.vue -->
<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},

  computed: {
    ...mapGetters({
      isAuthenticated: "users/isAuthenticated",
    }),
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

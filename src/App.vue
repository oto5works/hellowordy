<!-- App.vue -->
<template>
  <div class="app">
    isAuthenticated = {{ isAuthenticated }}
    <h1 @click="setSelectWords()">{{ selectWords }}</h1>
    
    <selectWords v-if="selectWords" />
    <searchWords v-if="searchWords" />

    <RouterView />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";


export default {
  components: {
    selectWords: defineAsyncComponent(() =>
      import("@/views/selectWords.vue")
    ),
    searchWords: defineAsyncComponent(() =>
      import("@/views/searchWords.vue")
    ),
  },

  computed: {
    ...mapGetters({
      selectWords: "state/getSelectWords",
      searchWords: "state/getSearchWords",
      isAuthenticated: "users/isAuthenticated",

    }),
  },
  created() {
  
  },
  methods: {
    ...mapActions({
      setSearchWords: "state/setSearchWords",

     
    }),
  },
};
</script>
<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: var(--mio-theme-color-background);
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

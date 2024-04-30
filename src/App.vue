<!-- App.vue -->
<template>
  <div class="app">
    <h1 @click="setSelectWords()">{{ selectWords }}</h1>
    
    <selectWords v-if="selectWords" />
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
  },

  computed: {
    ...mapGetters({
      selectWords: "state/getSelectWords",
    }),
  },
  created() {
  
  },
  methods: {
    ...mapActions({
      setSelectWords: "state/setSelectWords",
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
  background-color: gray;
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

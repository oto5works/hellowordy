<template>
  <div class="app">
    <wordData />

    <div class="button-wrap">
      <buttonOutline height="196" icon="top" class="sign" @click="generateWord">
        <icon class="icon_24"><google /></icon>
        Sign in / Sign up
      </buttonOutline>

      <buttonOutline height="196" icon="top" class="generate" @click="generateWord">
        <svg v-if="isLoading" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="15" stroke-dashoffset="15" stroke-linecap="round" stroke-width="2.4" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
        <icon v-else class="icon_24"><generate /></icon>
        Generate
      </buttonOutline>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import wordData from "@/modules/wordData.vue";
import google from "@/components/icon/google.vue";
import generate from "@/components/icon/generate.vue";


export default {
  components: {
    wordData,
    google, generate
  },
  data() {
    return {
      dialog: false,
      searchTerm: "",
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "status/isLoading",
    }),
  },
  methods: {
    ...mapActions({
      generateWord: "wordData/generateWord",
    }),
  },
};
</script>

<style scoped>
.button-wrap {
  position: absolute;
  display: grid;
  bottom: 0;
  left: 0;
  width: 100%;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  padding: 16px;
}
.sign{
  grid-column: span 4;
  height: 100%;
}

.generate {
  grid-column: span 2;
  height: 100%;
}
</style>
<template>
  <div class="routerView">
    <div class="display_flex justify-content_center">
      <countdownsView />
    </div>

    <div v-if="currentUser">
      <div class="font-size_12">email: {{ currentUser.email }}</div>
      <div class="font-size_12">displayName: {{ currentUser.displayName }}</div>
    </div>
    <usersSignOut v-if="isAuthenticated" />

    <buttonDefault
      class="height_64 width_100"
      v-if="!isAuthenticated"
      @click="navigateToSignIn()"
      >로그인</buttonDefault
    >
    <buttonDefault
      class="height_64 width_100"
      v-if="!isAuthenticated"
      @click="navigateToRegister()"
      >회원가입</buttonDefault
    >

    <buttonDefault
      class="height_64 width_100"
      v-if="isAuthenticated"
      @click="navigateToMyVoca()"
      >내 단어장</buttonDefault
    >
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

import usersSignOut from "@/views/users/usersSignOut.vue";


export default {
  components: {
    usersSignOut,
    countdownsView: defineAsyncComponent(() =>
      import("@/views/countdowns/countdownsView.vue")
    ),
  },
  data() {
    return {
      message: "",
      initializationProgress: 0,
    };
  },
  mounted() {
    //this.handleInitialize();
  },
  computed: {
    ...mapGetters({
      initialized: "filter/getInitialized",
      isAuthenticated: "users/isAuthenticated",
      currentUser: "users/getCurrentUser",
    }),
  },
  methods: {
    ...mapActions({
      initialize: "filter/initialize",
    }),
    async handleInitialize() {
      this.message = "사전 정보를 불러오고 있어요.";
      let progressInterval = setInterval(() => {
        if (this.initializationProgress >= 100) {
          clearInterval(progressInterval);
        } else {
          this.initializationProgress += 30;
        }
      }, 500);
      try {
        await this.initialize(); // ensure initialize() finishes before proceeding
        this.message = "사전 정보 불러오기 완료";
        this.initializationProgress = 100;
      } catch (error) {
        console.error(error);
        this.message = "사전 정보 불러오기 실패";
      }
    },

    navigateToViewWords() {
      this.$router.push({ name: "viewWords" });
    },
    navigateToRegister() {
      this.$router.push({ name: "usersRegister" });
    },
    navigateToSignIn() {
      this.$router.push({ name: "usersSignIn" });
    },
    navigateToVoca() {
      this.$router.push({ name: "vocabulariesAllView" });
    },
    navigateToMyVoca() {
      this.$router.push({ name: "vocabulariesUserView" });
    },

  },
};
</script>

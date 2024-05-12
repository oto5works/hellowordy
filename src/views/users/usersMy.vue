<template>
  <div class="usersMy">
    <usersCurrentUser class="usersMy-component" v-if="isAuthenticated" />
    <div class="sp_12"/>
    <usersMyInfo class="usersMy-component" v-if="isAuthenticated" />
    <div class="sp_48"/>
    <usersMyVoca v-if="isAuthenticated" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { defineAsyncComponent } from "vue";
import usersCurrentUser from "@/views/users/usersCurrentUser.vue";
import usersMyInfo from "@/views/users/usersMyInfo.vue";
import usersMyVoca from "@/views/users/usersMyVoca.vue";

export default {
  components: {
    usersCurrentUser,
    usersMyInfo,
    usersMyVoca,
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "users/isAuthenticated",
    }),
  },
  created() {
    if (!this.isAuthenticated) {
      this.navigateToAuth();
    } else {
      this.fetchUserInfo;
    }
  },
  methods: {
    ...mapActions({
      getVocabulariesByUserID: "vocabularies/getVocabulariesByUserID",
      getFavoritesByUserID: "favorites/getFavoritesByUserID",
    }),
    navigateToAuth() {
      this.$router.push({ name: "auth" });
    },
    async fetchUserInfo() {
      try {
        await this.getVocabulariesByUserID();
        await this.getFavoritesByUserID();
      } catch (error) {
        console.error("단어장을 가져오는 중 오류가 발생했습니다:", error);
      }
    },
  },
};
</script>
<style scoped>
.usersMy {
  padding: var(--mio-theme-header) 0;
}
.usersMy-component {
  padding:  0 var(--mio-theme-padding-2);
}
</style>

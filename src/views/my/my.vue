<template>
  <div class="usersMy">
    <div v-if="isAuthenticated">
      <myUser class="usersMy-component" />
      <div class="sp_12" />
      <myData class="usersMy-component" />
      <div class="sp_48" />
      <myVoca />
    </div>
    <div v-else>
      <noData
        content="로그인이 되어 있지 않습니다.<br>아래 버튼을 클릭하여 로그인 또는 회원가입을 해주세요."
        image="rabbit4"
      >
        <buttonDefault class="height_40 pa_16" @click="navigateToAuth()">
          <span class="font-weight_500">로그인/회원가입</span>
        </buttonDefault>
      </noData>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { defineAsyncComponent } from "vue";
import myUser from "@/views/my/myUser.vue";
import myData from "@/views/my/myData.vue";
import myVoca from "@/views/my/myVoca.vue";
import noData from "@/modules/noData/noData.vue";

export default {
  components: {
    myUser,
    myData,
    myVoca,
    noData
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "users/isAuthenticated",
    }),
  },
  created() {
    
  },
  methods: {
    ...mapActions({
      getVocasByUserID: "vocas/getVocasByUserID",
      getFavoritesByUserID: "favorites/getFavoritesByUserID",
    }),
    navigateToAuth() {
      this.$router.push({ name: "auth" });
    },
    async fetchUserInfo() {
      try {
        await this.getVocasByUserID();
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
  padding: 0 var(--mio-theme-padding-2);
}
</style>

<template>
  <div
    class="profile display_flex gap_6 align-items_center"
    @click="handleClickEvent()"
  >

  {{ photoURL }}
    <img class="icon_20 border-radius_12" :src="photoURL" />
    <div class="font-size_13 en font-weight_400">{{ displayName }}</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    userID: { type: String },
  },
  data() {
    return {
      displayName: null,
      photoURL: null,
    };
  },
  mounted() {
    this.fetchUserInfo();
  },
  methods: {
    ...mapActions({
      returnUserByPayload: "users/returnUserByPayload",
    }),
    async fetchUserInfo() {
      try {
        // getVocabularyById 액션을 호출하고 결과를 vocabularyData 변수에 저장합니다.
        const userData = await this.returnUserByPayload(this.userID);
        // 가져온 데이터를 컴포넌트의 데이터 속성에 할당합니다.
        console.log ('userDatauserData', userData)
        this.displayName = userData.displayName;
        this.photoURL = userData.photoURL;
      } catch (error) {
        console.error("displayName 가져오는 중 오류가 발생했습니다:", error);
      }
    },
    handleClickEvent() {
      this.$router.push({
        name: "myID",
        params: { id: this.userID },
      });
    },
  },
};
</script>
<style scoped>
.profile {
  cursor: pointer;
}
</style>

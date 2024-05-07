<template>
  <div
    class="profile display_flex gap_6 align-items_center"
    @click="handleClickEvent()"
  >
    <img class="icon_16 border-radius_12" :src="profileImage" />
    <div class="font-size_14 font-weight_400">{{ displayName }}</div>
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
      profileImage: null
    };
  },
  mounted() {
    this.fetchUserInfo();
    this.fetchProfileImage();
  },
  methods: {
    ...mapActions({
      getUserById: "users/getUserById",
      getProfileImageById: "profileImages/getProfileImageById",
    }),
    async fetchUserInfo() {
      console.log("fetchUserInfo 실행: ", this.userID);

      try {
        // getVocabularyById 액션을 호출하고 결과를 vocabularyData 변수에 저장합니다.
        const userData = await this.getUserById(this.userID);
        // 가져온 데이터를 컴포넌트의 데이터 속성에 할당합니다.
        this.displayName = userData.displayName;
      } catch (error) {
        console.error("displayName 가져오는 중 오류가 발생했습니다:", error);
      }
    },
    async fetchProfileImage() {
      console.log("fetchProfileImage 실행: ", this.userID);
      try {
        // getVocabularyById 액션을 호출하고 결과를 vocabularyData 변수에 저장합니다.
        const profileImage = await this.getProfileImageById(this.userID);
        // 가져온 데이터를 컴포넌트의 데이터 속성에 할당합니다.
        this.profileImage = profileImage.url;
      } catch (error) {
        console.error("profileImage 가져오는 중 오류가 발생했습니다:", error);
      }
    },
    handleClickEvent() {
      this.$router.push({
        name: "wordsView",
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

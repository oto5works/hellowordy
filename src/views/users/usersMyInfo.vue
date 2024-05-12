<template>
  <div class="usersMyInfo">
    <card>
      <div class="items">
        <div class="item">
          <buttonIcon>
            <span class="font-size_28 en font-weight_500">{{
              getVocabulariesUserID.length
            }}</span>
          </buttonIcon>
          <div class="font-size_13">암기장</div>
        </div>
        <div class="line" />
        <div class="item">
          <buttonIcon>
            <span class="font-size_28 en font-weight_500">{{
              getFavoritesUserID.length
            }}</span>
          </buttonIcon>
          <div class="font-size_13">북마크</div>
        </div>
        <div class="line" />
        <div class="item">
          <buttonIcon>
            <span class="font-size_28 en font-weight_500">{{
              getCheckedWordsUserID.length
            }}</span>
          </buttonIcon>
          <div class="font-size_13">암기 완료</div>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import usersSignOut from "@/views/users/usersSignOut.vue";

export default {
  components: {
    usersSignOut,
  },
  computed: {
    ...mapGetters({
      getVocabulariesUserID: "vocabularies/getVocabulariesUserID",
      getFavoritesUserID: "favorites/getFavoritesUserID",
      getCheckedWordsUserID: "checkedWords/getCheckedWordsUserID",
      isAuthenticated: "users/isAuthenticated",
    }),
  },
  methods: {},
};
</script>
<style scoped>
.usersMyInfo {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
}
.items {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.line {
  width: 1px;
  height: 32px;
  background-color: rgb(var(--mio-theme-color-on-background), 0.4);
}
</style>

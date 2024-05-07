<template>
  <div class="card">
    <div class="card-cover" @click="handleWordsView()">
      <div class="language">
        <span v-if="vocabulary.language === 'japanese'">あア</span>
        <span v-if="vocabulary.language === 'english'">aA</span>
      </div>
      <img :src="vocabulary.coverURL"/>
    </div>
    <div class="sp_8" />
    <div class="display_flex align-items_center justify-content_space-between">
      <div class="font-size_16 font-weight_700" @click="handleWordsView()">
        {{ vocabulary.title }}
      </div>
      <button @click.stop="handleClickEvent()">
        <icon class="icon_16"><dots /></icon>
      </button>
    </div>

    <div class="sp_12" />
    <profile
      :userID="vocabulary.userID"
      :photoURL="vocabulary.photoURL"
      :displayName="vocabulary.displayName"
    />
    <button @click="handleTestView()">TEST</button>
    <vocabulariesMenu
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
      :vocabularyID="vocabulary.id"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import vocabulariesMenu from "@/views/vocabularies/vocabulariesMenu.vue";
import profile from "@/components/profile/profile.vue";
import dots from "@/components/icon/dots.vue";

export default {
  components: {
    vocabulariesMenu,
    profile,
    dots,
  },
  props: {
    vocabulary: { type: Object },
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "users/getUserInfo",
    }),
  },
  methods: {
    ...mapActions({
      createVocabulary: "vocabularies/createVocabulary", // Vuex의 네임스페이스에서 'signIn' 액션을 매핑함
      updateVocabulary: "vocabularies/updateVocabulary",
      getVocabularyById: "vocabularies/getVocabularyById",
    }),
    handleWordsView() {
      this.$router.push({
        name: "wordsView",
        params: { id: this.vocabulary.id },
      });
    },
    handleTestView() {
      this.$router.push({
        name: "test",
        params: { id: this.vocabulary.id },
      });
    },
    handleClickEvent() {
      this.dialog = true;
    },
  },
};
</script>
<style scoped>
.card {
  width: 120px;
  color: black;
}
.card-cover {
  position: relative;
  width: 100%;
  height: 160px;
  border-radius: 24px;
  background-color: black;
  cursor: pointer;
  overflow: hidden;
}
.card-cover img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.language {
  position: absolute;
  font-size: 48px;
  font-weight: 800;
  bottom: 12px;
  right: 12px;
  color: white;
  font-family: var(--mio-theme-font-family-jp);
  z-index: 2;
}
</style>

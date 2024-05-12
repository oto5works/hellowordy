<template>
  <div class="list">
    <div class="list-cover" @click="handleVocaDetail()">
      <div class="overlay" />
      <img v-if="vocabulary.coverURL" :src="vocabulary.coverURL" />
      <div class="underlay" />
    </div>

    <div class="list-content">
      <div class="display_flex justify-content_flex-end width_100">
        <buttonText @click.stop="handleClickEvent()">
          <icon class="icon_16"><dots /></icon>
        </buttonText>
      </div>

      <div class="font-size_16 kr font-weight_700" @click="handleVocaDetail()">
        {{ vocabulary.title }}
      </div>
      <div
        class="font-size_13 kr font-weight_400 opacity_60"
        @click="handleVocaDetail()"
      >
        {{ vocabulary.content }}
      </div>
<div class="sp_24"/>
      <div class="display_flex gap_8 font-size_12">
        <span class="opacity_60">언어</span>
        <div class="font-weight_500">
          <span v-if="vocabulary.language === 'japanese'">日本語 </span>
          <span v-if="vocabulary.language === 'english'">English</span>
        </div>
      </div>
      <favorites :vocabularyID="vocabulary.id" />
    </div>
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
import favorites from "@/views/favorites/favorites.vue";

export default {
  components: {
    vocabulariesMenu,
    profile,
    dots,
    favorites,
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
    handleVocaDetail() {
      this.$router.push({
        name: "vocaDetail",
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
.list {
  display: flex;
  width: 100%;
  gap: 16px;
}
.list-cover {
  position: relative;
  flex: 1;
  max-width: 120px;
  height: 120px;
  border-radius: 16px;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid rgba(var(--mio-theme-color-on-background), 0.12);
}
.list-cover img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.list-content {
  flex: 1;
}
.language {
  font-size: 12px;
  font-weight: 500;
  opacity: 0.6;
}
.list-cover .overlay,
.list-cover .underlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.list-cover .underlay {
  background-color: rgba(var(--mio-theme-color-on-background), 0.08);
  z-index: -1;
}
.list-cover .overlay {
  background-color: rgba(var(--mio-theme-color-on-background), 0.08);
  z-index: 2;
  opacity: 0;
}
.list-cover:hover .overlay {
  opacity: 1;
}
</style>

<template>
  <div class="card">
    <div class="card-cover" @click="handleVocaDetail()">
      <div class="overlay" />
      <img v-if="vocabulary.coverURL" :src="vocabulary.coverURL" />
      <div class="underlay" />
    </div>
    <div class="sp_8" />

    <div
      class="display_flex align-items_center justify-content_space-between pa_4"
    >
      <div class="font-size_14 kr font-weight_700" @click="handleVocaDetail()">
        {{ vocabulary.title }}
      </div>
      <buttonText @click.stop="handleClickEvent()">
        <icon class="icon_16"><dots /></icon>
      </buttonText>
    </div>
    <div class="sp_2" />
    <div class="language pa_4">
      <div v-if="vocabulary.language === 'japanese'">日本語</div>
      <div v-if="vocabulary.language === 'english'">English</div>
    </div>

    <div class="sp_12" />
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
.card {
  width: 120px;
  margin-right: 16px;
}
.card-cover {
  position: relative;
  width: 100%;
  height: 160px;
  border-radius: 16px;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid rgba(var(--mio-theme-color-on-background), 0.12);
}
.card-cover img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.language {
  font-size: 11px;
  font-weight: 500;
  border-radius: 24px;
  opacity: 0.6;
}
.card-cover .overlay,
.card-cover .underlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card-cover .underlay {
  background-color: rgba(var(--mio-theme-color-on-background), 0.08);
  z-index: -1;
}
.card-cover .overlay {
  background-color: rgba(var(--mio-theme-color-on-background), 0.08);
  z-index: 2;
  opacity: 0;
}
.card-cover:hover .overlay {
  opacity: 1;
}
</style>

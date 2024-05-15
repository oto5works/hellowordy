<template>
  <div class="display_flex gap_16 width_100">
    <buttonCard
      class="cover"
      :style="{
        backgroundImage: `url(${voca.coverURL})`,
      }"
    >
    </buttonCard>

    <div class="content">
      <div class="more"></div>

      <div
        class="display_flex align-items_center justify-content_space-between"
      >
        <div class="title font-size_18 font-weight_700">
          {{ voca.title }}
        </div>

        <buttonIcon v-if="voca.userID === userID" @click="dialog = true"
          ><icon class="icon_16"><dots /></icon
        ></buttonIcon>

        <buttonIcon v-else>
          <favorites :vocaID="voca.id" />
        </buttonIcon>
      </div>

      <div class="sp_4" />
      <div class="content font-size_13 opacity_60">
        {{ voca.content }}
      </div>

      <div class="sp_16" />
      <div class="display_flex gap_8 font-size_12">
        <span class="opacity_60">언어</span>
        <span class="font-weight_500">{{ languageDisplay }}</span>
      </div>
      <div class="sp_2" />
      <div class="display_flex gap_8 font-size_12">
        <span class="opacity_60">단어 수</span>
        <span class="font-weight_500">{{ words.length }}</span>
      </div>
      <div class="sp_8" />
      <profile
        :userID="voca.userID"
        :photoURL="voca.photoURL"
        :displayName="voca.displayName"
      />
      <vocasMenu
        v-if="dialog"
        :dialog="dialog"
        @update:dialog="dialog = $event"
        :vocaID="voca.id"
      />

      <div class="anki">
        <buttonDefault class="icon_48">
          <icon><arrowRight /></icon>
        </buttonDefault>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

import profile from "@/modules/profile/profile.vue";
import favorites from "@/modules/favorites/favorites.vue";
import dots from "@/components/icon/dots.vue";
import arrowRight from "@/components/icon/arrowRight.vue";

export default {
  components: {
    profile,
    favorites,
    dots,
    arrowRight,
    vocasMenu: defineAsyncComponent(() =>
      import("@/modules/vocas/vocasMenu.vue")
    ),
  },
  props: {
    voca: { type: Object },
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
      words: "words/getWords",
      userID: "users/getUserID",
    }),
    languageDisplay() {
      switch (this.voca.language) {
        case "english":
          return "English";
        case "japanese":
          return "日本語";
        default:
          return this.voca.language; // 기본값으로 voca.language 반환
      }
    },
  },
};
</script>

<style scoped>
.cover {
  position: relative;
  width: 120px;
  aspect-ratio: 3 / 4;
  border-radius: 16px;
  overflow: hidden;
}
.content {
  position: relative;
  width: 100%;
}
.more {
  position: absolute;
  top: 0;
  right: 0;
}
.title,
.content {
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  height: fit-content;
}
.anki {
  position: absolute !important;
  right: 0;
  bottom: 0;
  flex-direction: column;
  background-image: unset;
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>

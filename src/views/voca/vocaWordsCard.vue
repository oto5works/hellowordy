<template>
  <buttonCard class="card">
    <div class="content">
      <buttonIcon v-if="word.userID === this.userID" @click="dialog = true">
        <icon class="icon_16"><dots /></icon>
      </buttonIcon>
      <div class="index">{{ index }}</div>

      <div
        class="item"
      >
        <div
          class="word"
        >
          {{ word.word }}
        </div>
        <div class="mean">
        {{ word.mean[0] }}
      </div>
        <!--
        <div
          class="display_flex align-items_center gap_4 --mio-theme-font-family-kr flex-wrap_wrap"
        >
          <span
            class="font-size_13 font-weight_400"
            v-for="(item, index) in word.mean"
            :key="index"
            >{{ item }}</span>
        </div>
        -->
      </div>
     
      <!--<div class="font-size_12">예문 <span class="font-weight_700">{{ word.examples.length }}</span></div>-->
      <!--
    <div class="width_100 display_flex flex-direction_column gap_4">
      <div class="width_100" v-for="item in word.examples" :key="item">
        <div
          class="example font-size_14 font-weight_600 --mio-theme-font-family-jp"
        >
          {{ item.sentence }}
        </div>
        <div
          class="example font-size_14 font-weight_400 --mio-theme-font-family-kr"
        >
          {{ item.translation }}
        </div>
      </div>
    </div>
-->
    </div>
    <wordsMenu
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
      :wordID="word.id"
      :title="word.word"
    />
  </buttonCard>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

import wordsMenu from "@/modules/words/wordsMenu.vue";
import dots from "@/components/icon/dots.vue";

export default {
  components: {
    wordsMenu,
    dots,
  },
  props: {
    word: { type: Object },
    index: Number, // index prop 추가
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
      userID: "users/getUserID",
    }),
  },
  methods: {
    handleClickEvent() {
      this.dialog = true;
    },
  },
};
</script>
<style scoped>
.card {
  position: relative;
  width: 100%;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  border-radius: 24px;
}



.card .content {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}
.card .buttonIcon {
  position: absolute;
  top: 0;
  right: 0;
}
.card .index {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 48px;
  height: 48px;
  font-size: 12px;
  font-weight: 700;
  font-family: var(--mio-theme-font-family-en);
  color: rgb(var(--mio-theme-color-primary));
}
.card .item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  transform: translateY(12%);
  width: 100%;
}
.card .word {
  font-family: var(--mio-theme-font-family-kr);
  font-weight: 700;
  font-size: 20px;
  line-height: 120%;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  height: fit-content;
}
.card .mean {
  text-align: center;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  font-size: 13px;
  opacity: 0.6;
  font-weight: 400;
  font-family: var(--mio-theme-font-family-kr);
}
</style>

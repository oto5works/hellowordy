<template>
  <div class="card">
    <div class="content" >
      <div class="item" >
        <div class="index" @click="detail = true">{{ kanji.id }}</div>
        <div class="kanji">
          {{ kanji.kanji }}
        </div>
        <div class="mean">
          
        </div>
      </div>

      <buttonIcon @click="dialog = true">
        <icon class="icon_16"><dots /></icon>
      </buttonIcon>
    </div>
    <kanjiDetail
      v-if="detail"
      :dialog="detail"
      @update:dialog="detail = $event"
      :kanji="kanji"
    />
    <editMenu
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
      :kanjiID="kanji.id"
      :title="kanji.kanji"
    />
    <div class="line" />
  </div>
</template>
<script>
import { defineAsyncComponent } from "vue";

import { mapActions, mapGetters } from "vuex";
import editMenu from "@/views/kanji/edit/editMenu.vue";
import dots from "@/components/icon/dots.vue";

export default {
  components: {
    editMenu,
    dots,
    kanjiDetail: defineAsyncComponent(() =>
      import("@/views/kanji/kanjiDetail.vue")
    ),
  },
  props: {
    kanji: { type: Object },
  },
  data() {
    return {
      dialog: false,
      detail: false,
    };
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
}

.card .content {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 3;
}
.card .index {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: rgb(var(--mio-theme-color-primary));
}
.card .item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}
.card .kanji {
  font-weight: 500;
  font-size: 22px;
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
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  font-size: 13px;
  opacity: 0.6;
  font-weight: 400;
}
</style>

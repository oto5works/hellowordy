<template>
  <buttonCard class="card">
    <div class="content">
      <buttonIcon @click="dialog = true">
        <icon class="icon_16"><dots /></icon>
      </buttonIcon>
      <div class="index">{{ kanji.id }}</div>

      <div
        class="item"
      >
        <div
          class="kanji"
        >
          {{ kanji.kanji }}
        </div>
        <div class="mean">
        {{ kanji.mean[0] }}
      </div>
       
      </div>
     
    </div>
    <kanjisMenu
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
      :kanjiID="kanji.id"
      :title="kanji.kanji"
    />
  </buttonCard>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

import kanjisMenu from "@/modules/kanjis/kanjisMenu.vue";
import dots from "@/components/icon/dots.vue";

export default {
  components: {
    kanjisMenu,
    dots,
  },
  props: {
    kanji: { type: Object },
  },
  data() {
    return {
      dialog: false,
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
  color: rgb(var(--mio-theme-color-primary));
}
.card .item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  transform: translateY(12%);
  width: 100%;
}
.card .kanji {
  font-weight: 500;
  font-size: 22px;
  line-height: 120%;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  kanji-break: keep-all;
  height: fit-content;
}
.card .mean {
  text-align: center;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  kanji-break: break-all;
  font-size: 13px;
  opacity: 0.6;
  font-weight: 400;
}
</style>

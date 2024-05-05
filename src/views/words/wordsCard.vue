<template>
  <div class="card">
    <div
      class="display_flex align-items_center justify-content_center index border-radius_12 icon_16 font-size_12"
    >
      {{ word.index + 1 }}
    </div>

    <div class="display_flex align-items_flex-start justify-content_space-between">
      <div class="font-size_32 font-weight_800 --mio-theme-font-family-jp">
        {{ word.word }}
      </div>
      <button @click="handleClickEvent()">
        <icon class="icon_16"><dots /></icon>
      </button>
    </div>

    <div class="sp_8" />
    <div
      class="display_flex align-items_flex-end gap_4 --mio-theme-font-family-kr"
      v-for="(item, index) in word.mean"
      :key="index"
    >
      <span class="font-size_12 font-weight_800">{{ index + 1 }}.</span>
      <span class="font-size_15 font-weight_400">{{ item }}.</span>
    </div>
    <div class="sp_12" />
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

    <wordsMenu
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
      :wordID="word.id"
    />
  </div>
</template>
<script>
import wordsMenu from "@/views/words/wordMenu.vue";
import dots from "@/components/icon/dots.vue";

export default {
  components: {
    wordsMenu,
    dots,
  },
  props: {
    word: { type: Object },
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
  width: 100%;
  overflow: hidden;
}
.index {
  background-color: var(--mio-theme-color-on-background);
  color: var(--mio-theme-color-background);
}
.example {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
}
</style>

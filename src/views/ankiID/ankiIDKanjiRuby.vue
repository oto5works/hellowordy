<template>
  <div>
    <div class="kanji-wrap">
      <!--
      <div class="ruby">
        {{ ruby }}
      </div>
      
      <div class="kanji">
        [{{ kanji }}]
      </div>
      -->
    </div>
    <div class="sp_8"/>
    <div
      class="mean display_flex align-items_center gap_2"
      v-for="(item, index) in mean"
      :key="index"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    kanji: { type: String },
    ruby: { type: String },
    mean: { type: Array },
  },
};
</script>

<style scoped>
.kanji-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}
.kanji-wrap .ruby {
  font-size: 40px;
  font-weight: 700;
  line-height: 100%;
}
.kanji-wrap .kanji {
  font-size: 40px;
  font-weight: 700;
  line-height: 100%;
}
.mean {
  font-size: 40px;
  font-weight: 700;
}
</style>

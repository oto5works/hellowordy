<template>
  <div>
    <div class="card">
      <div class="content">


        <div class="item">
          <div class="sp_32" />
          <div
          class="word"
          :class="{ showRuby: showRuby || alwaysRuby }"
          v-html="word"
        />
        <div class="sp_12" />
        <div class="display_flex flex-wrap_wrap gap_12">
          <div
            class="mean display_flex align-items_center gap_4"
            v-for="(item, index) in mean"
            :key="index"
          >
            <div class="font-size_12 en font-weight_700">{{ index + 1 }}.</div>
            <div class="item" :class="{ showMean: showMean || alwaysMean }">
              {{ item }}
            </div>
          </div>
        </div>
        </div>
        


        <ankiIDFooter />
      </div>

      <div class="underlay" />
    </div>
<!--
    wordID = {{ wordID }}
-->
    <div class="sp_80" />
    <div v-if="examples.length !== 0">
      <div class="font-size_24 font-weight_500">Example</div>
      <div class="sp_8"/>
      <ul>
        <li
          class="examples"
          v-for="item in examples"
          :key="item.id"
          :examples="item"
        >
          <div
            class="sentence"
            :class="{ showRuby: showRuby || alwaysRuby }"
            v-html="item.sentence"
          ></div>
          <div
            class="translation"
            :class="{ showMean: showMean || alwaysMean }"
          >
            {{ item.translation }}
          </div>
        </li>
      </ul>
    </div>
    <div class="sp_128" />
    <div class="sp_128" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ankiIDFooter from "@/views/ankiID/ankiIDFooter.vue";


export default {
  components: {ankiIDFooter},
  computed: {
    ...mapGetters({
      wordID: "study/getWordID",

      word: "study/getWord",
      mean: "study/getMean",
      examples: "study/getExamples",
      showRuby: "study/getShowRuby",
      showMean: "study/getShowMean",
      alwaysRuby: "study/getAlwaysRuby",
      alwaysMean: "study/getAlwaysMean",
    }),
  },
  methods: {
    ...mapActions({
      //updateCurrentVocaID: "study/updateCurrentVocaID",
    }),
  },
};
</script>
<style scoped>
.mean {
  font-family: var(--mio-theme-font-family-kr);
}
.mean .item,
.translation {
  color: rgb(var(--mio-theme-color-primary));
  background-color: rgb(var(--mio-theme-color-primary));
  border-radius: 24px;
  padding: 0 2px;
}
.mean .item.showMean,
.translation.showMean {
  color: rgb(var(--mio-theme-color-on-background));
  background-color: unset;
}
.translation {
  font-family: var(--mio-theme-font-family-kr);
  font-weight: 400;
  width: fit-content;
  line-height: 130%;
  font-size: 13px;
  opacity: .7;
}
.card {
  position: relative;
  width: 100%;
  border-radius: 24px;
  padding: var(--mio-theme-padding-3) 0;
}
.card .content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px;
  width: 100%;
  z-index: 2;
}
.card .underlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(var(--mio-theme-color-primary), 0);
  border-radius: inherit;
  z-index: 0;
}
</style>
<style>
.word {
  position: relative;
  font-family: var(--mio-theme-font-family-jp);
  font-weight: 700;
  font-size: 36px;
  line-height: 130%;
}

.word ruby > rt {
 
  opacity: 0;
  font-weight: 400;
  font-size: 15px;
  line-height: 100%;
  color: rgb(var(--mio-theme-color-primary));
  transition: all 0.2s ease-in-out;
}
.word.showRuby rt {
  opacity: 1;
}

.sentence {
  position: relative;
  font-family: var(--mio-theme-font-family-jp);
  font-weight: 500;
  line-height: 130%;
  font-size: 16px;
  color: rgb(var(--mio-theme-color-on-background));
}
.sentence ruby > rt {
  
  opacity: 0;
  margin-top: 1px;
  font-weight: 400;
  font-size: 11px;
  line-height: 100%;
  color: rgb(var(--mio-theme-color-primary));
  transition: all 0.2s ease-in-out;
}
.sentence.showRuby rt {
  opacity: 1;
}
</style>

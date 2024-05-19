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
        <div class="sp_8" />
        <div class="display_flex flex-wrap_wrap gap_12">
          <div
            class="mean display_flex align-items_flex-end"
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
        


      </div>

      <div class="underlay" />
    </div>


  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";


export default {
  components: {},
  computed: {
    ...mapGetters({
      word: "study/getWord",
      mean: "study/getMean",
      showRuby: "study/getShowRuby",
      showMean: "study/getShowMean",
      alwaysRuby: "study/getAlwaysRuby",
      alwaysMean: "study/getAlwaysMean",
    }),
  },
  methods: {

  },
};
</script>


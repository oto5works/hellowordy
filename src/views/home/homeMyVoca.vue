<template>
  <div
    class="display_flex align-items_center justify-content_space-between width_100"
  >
    <span class="font-size_16 font-weight_500">내 암기장</span>

    <buttonText class="selected height_24 gap_8 pa_8" @click="navigateToMyVoca()">
      <span class="font-size_12">더보기</span>
    </buttonText>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  computed: {
    ...mapGetters({


    }),
  },
  methods: {
    navigateToMyVoca() {
      this.$router.push({ name: "vocabulariesUserView" });
    },
  },
};
</script>

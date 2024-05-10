<template>
  <div class="flex gap_12">
    <textField type="date" label="날짜" v-model="dateData.date" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      dateData: "getDateData",
    }),
  },
};
</script>

<template>
  <fullDialog
    title="단어 선택"
    :dialog="showFilter"
    @update:dialog="updateDialog"
  >
    <studyFilter />
  </fullDialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import studyFilter from "@/views/study/studyFilter.vue";

export default {
  components: { studyFilter },
  computed: {
    ...mapGetters({
      showFilter: "filter/getShowFilter",
    }),
  },
  methods: {
    ...mapActions({
      setShowFilter: "filter/setShowFilter",
    }),
    updateDialog(value) {
      this.setShowFilter();
    },
  },
};
</script>

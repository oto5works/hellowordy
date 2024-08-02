<template>
  <div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      dialog: false,
      searchTerm: '',
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "status/isLoading",
    }),
  },
  methods: {
    ...mapActions({
      generateWord: "wordData/generateWord",
    }),
  }
};
</script>
<template>
  <div class="routerView">
{{ translations }}
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";


export default {
  components: {
    
  },
  computed: {
    ...mapGetters({
      translations: "translations/translations",
      i18n: "i18n/i18n",

    }),
  },
  methods: {

  },
};
</script>
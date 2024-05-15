<template>
  <div
    class="routerView"
  >
    <profileServer :userID="userID" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import profileServer from "@/modules/profile/profileServer.vue";

export default {
  components: {
    profileServer,
  },
  computed: {
    userID() {
      return this.$route.params.id;
    },
  },
};
</script>

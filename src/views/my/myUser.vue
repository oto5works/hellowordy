<template>
  <div
    class="display_flex align-items_center justify-content_space-between width_100"
  >
    <div>
      <div class="font-size_12">isAuthenticated: {{ isAuthenticated }}</div>
      <div class="font-size_12">email: {{ user.email }}</div>
      <div class="font-size_12">displayName: {{ user.displayName }}</div>
    </div>

    <usersSignOut v-if="isAuthenticated" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import usersSignOut from "@/modules/users/usersSignOut.vue";

export default {
  components: {
    usersSignOut,
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "users/isAuthenticated",
      user: "users/getUser",
    }),
  },
};
</script>

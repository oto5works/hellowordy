<template>
  <div
    class="display_flex align-items_center justify-content_space-between width_100"
  >
    <div>
      <div class="font-size_12">email: {{ email }}</div>
      <div class="font-size_12">displayName: {{ displayName }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  components: {},
  computed: {
    userID() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      email: null,
      displayName: null,
    };
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    ...mapActions({
      returnUserByPayload: "users/returnUserByPayload",
    }),
    async fetchUserInfo() {
      if (this.userID) {
        const userData = await this.returnUserByPayload(this.userID);
        if (userData) {
          this.email = userData.email;
          this.displayName = userData.displayName;
        } else {
          alert("userData 불러오는데 실패했습니다.");
        }
      }
    },
  },
};
</script>

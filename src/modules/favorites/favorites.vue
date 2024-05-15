<template>
  <button
  class="gap_2"
    :class="['favorites', { selected: isFavoriteSelected }]"
    @click.stop="handleToggleFavofite()"
  >
    <icon class="icon_18"><favorite /></icon>
    <span class="font-size_13 en line-height_100 font-weight_700">{{ favorites.length }}</span>
  </button>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import favorite from "@/components/icon/favorite";

export default {
  components: {
    favorite,
  },
  props: {
    vocaID: { type: String },
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "users/isAuthenticated",
      userID: "users/getUserID",
    }),
    isFavoriteSelected() {
      return Object.values(this.favorites).some(
        (favorite) => favorite.userID === this.userID
      );
    },
  },
  data() {
    return {
      favorites: [],
    };
  },
  created() {
    this.fetchFavofite();
  },
  watch: {
    vocaID(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchFavofite();
      }
    },
  },
  methods: {
    ...mapActions({
      toggleFavoriteByPayload: "favorites/toggleFavoriteByPayload",
      returnFavoritesByPayload: "favorites/returnFavoritesByPayload",
    }),
    async handleToggleFavofite() {
      try {
        if (this.isAuthenticated) {
          await this.toggleFavoriteByPayload(this.vocaID);
          this.fetchFavofite();
        } else {
          alert("로그인이 필요한 서비스입니다.");
          this.$router.push({ name: "usersSignIn" });
        }
      } catch (error) {
        console.error("단어장을 가져오는 중 오류가 발생했습니다:", error);
      }
    },
    async fetchFavofite() {
      try {
        const favoritesData = await this.returnFavoritesByPayload(
          this.vocaID
        );
        if (favoritesData) {
          this.favorites = favoritesData;
        } else {
          alert("단어장을 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("단어장을 가져오는 중 오류가 발생했습니다:", error);
      }
    },
  },
};
</script>

<style scoped>
.favorites {
  display: flex;
  align-items: center;
  color: inherit;
}
.favorites.selected {
  color: rgb(var(--mio-theme-color-primary));
}
.favorites.selected svg {
  fill: rgb(var(--mio-theme-color-primary)) ;
}
</style>

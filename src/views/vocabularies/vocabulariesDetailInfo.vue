<template>
  <div class="display_flex gap_12 width_100">
    <img class="wiwi" :src="vocabulary.coverURL" />

    <div>
      language: {{ vocabulary.language }}<br />
      title: {{ vocabulary.title }}<br />
      content: {{ vocabulary.content }}
      <profile
        :userID="vocabulary.userID"
        :photoURL="vocabulary.photoURL"
        :displayName="vocabulary.displayName"
      />
      <favorites :vocabularyID="vocabulary.id" />
      <button>수정</button>
      <!--
      
      -->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import profile from "@/components/profile/profile.vue";
import favorites from "@/views/favorites/favorites.vue";

export default {
  components: {
    profile,
    favorites,
  },
  data() {
    return {
      vocabulary: {
        language: null,
        title: null,
        content: null,
      },
    };
  },
  computed: {
    vocabularyID() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.fetchVocabulary();
  },
  methods: {
    ...mapActions({
      returnVocabularyByPayload: "vocabularies/returnVocabularyByPayload",
    }),
    async fetchFavofite() {
      if (this.isAuthenticated) {
        await this.toggleFavorite(this.vocabularyID);
        const favoritesData = await this.getFavoritesByVocabularyID(
          this.vocabularyID
        );
        if (favoritesData) {
          this.favorites = favoritesData;
        } else {
          alert("단어장을 불러오는데 실패했습니다.");
        }
      } else {
        alert("로그인이 필요한 서비스입니다.");
        this.$router.push({ name: "usersSignIn" });
      }
    },

    async fetchVocabulary() {
      try {
        const vocabularyData = await this.returnVocabularyByPayload(
          this.vocabularyID
        );
        if (vocabularyData) {
          this.vocabulary = vocabularyData;
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
.wiwi {
  position: relative;
  width: 120px;
  height: 160px;
  object-fit: cover;
}
</style>

<template>
  <div class="usersMyInfo">
    <card>
      <div class="sp_8"/>
      <div class="items">
        <div class="item" @click="vocasDialog = true">
          <buttonIcon>
            <span class="font-size_28 en font-weight_500">{{
              vocas.length
            }}</span>
          </buttonIcon>
          <div class="font-size_13">암기장</div>
        </div>
        <div class="line" />
        <div class="item" @click="favoritesDialog = true">
          <buttonIcon>
            <span class="font-size_28 en font-weight_500">{{
              favorites.length
            }}</span>
          </buttonIcon>
          <div class="font-size_13">북마크</div>
        </div>
        <div class="line" />
        <div class="item">
          <buttonIcon>
            <span class="font-size_28 en font-weight_500">{{
              checkedWords.length
            }}</span>
          </buttonIcon>
          <div class="font-size_13">암기 완료</div>
        </div>
      </div>
      <div class="sp_8"/>
    </card>


    <vocasDialog
      v-if="vocasDialog"
      :dialog="vocasDialog"
      @update:dialog="vocasDialog = $event"
    />
    <favoritesDialog
      v-if="favoritesDialog"
      :dialog="favoritesDialog"
      @update:dialog="favoritesDialog = $event"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { defineAsyncComponent } from "vue";

export default {
  components: {
    vocasDialog: defineAsyncComponent(() =>
      import("@/modules/vocas/vocasDialog.vue")
    ),
    favoritesDialog: defineAsyncComponent(() =>
      import("@/modules/favorites/favoritesDialog.vue")
    ),
  },
  data: function () {
    return {
      vocasDialog: false,
      favoritesDialog: false
    };
  },
  computed: {
    ...mapGetters({
      vocas: "vocas/getVocas",
      favorites: "favorites/getFavorites",
      checkedWords: "checkedWords/getCheckedWords",
      isAuthenticated: "users/isAuthenticated",
    }),
  },
  methods: {},
};
</script>
<style scoped>
.usersMyInfo {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
}
.items {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 320px;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.line {
  width: 1px;
  height: 32px;
  background-color: rgb(var(--mio-theme-color-on-background), 0.4);
}
</style>

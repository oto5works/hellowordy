<!-- vocasDialog.vue -->
<template>
  <fullDialog title="북마크" :dialog="dialog" @update:dialog="updateDialog">
<div class="display_flex flex-direction_column">
  



    <favoritesList v-for="item in favorites" :key="item.id" :vocaID="item.vocaID" />
  </div>
  <div v-if="favorites.length === 0">
    <div class="sp_128"/>
      <noData
        content="북마크가 없습니다.<br>아래 버튼을 클릭하여 등록을 해주세요."
        image="rabbit3"
      >
        <buttonDefault class="height_40 pa_16" @click="vocasForm = true">
          <span class="font-weight_500">Voca 바로가기</span>
        </buttonDefault>
      </noData>
    </div>
  </fullDialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import favoritesList from "@/modules/favorites/favoritesList.vue";
import noData from "@/modules/noData/noData.vue";

export default {
  components: {
    favoritesList, noData
  },
  props: {
    dialog: { type: Boolean },
  },
  data: function () {
    return {
    };
  },
  computed: {
    ...mapGetters({
      favorites: "favorites/getFavorites",
    }),
  },
  methods: {
    updateDialog(value) {
      this.$emit("update:dialog", value);
    },
  },
};
</script>

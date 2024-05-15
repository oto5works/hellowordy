<template>
  <div class="card">
    <buttonCard
      class="card-cover"
      :style="{
        backgroundImage: `url(${voca.coverURL})`,
      }"
      @click="handleVocaID()"
    >
    </buttonCard>
    <div class="sp_8" />

    <div
      class="display_flex align-items_flex-start justify-content_space-between gap_4 pa_4"
    >
      <div class="font-size_14 kr font-weight_700" @click="handleVocaID()">
        {{ voca.title }}
      </div>
      <buttonText @click.stop="handleClickEvent()">
        <icon class="icon_16"><dots /></icon>
      </buttonText>
    </div>
    <div class="sp_2" />
    <div class="language pa_4">
      <div v-if="voca.language === 'japanese'">日本語</div>
      <div v-if="voca.language === 'english'">English</div>
    </div>

    <div class="sp_12" />
    <vocasMenu
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
      :vocaID="voca.id"
      :title="voca.title"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import vocasMenu from "@/modules/vocas/vocasMenu.vue";
import dots from "@/components/icon/dots.vue";

export default {
  components: {
    vocasMenu,
    dots,
  },
  props: {
    voca: { type: Object },
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "users/getUserInfo",
    }),
  },
  methods: {
    ...mapActions({
      createVoca: "vocas/createVoca", // Vuex의 네임스페이스에서 'signIn' 액션을 매핑함
      updateVoca: "vocas/updateVoca",
      getVocaById: "vocas/getVocaById",
    }),
    handleVocaID() {
      this.$router.push({
        name: "vocaID",
        params: { id: this.voca.id },
      });
    },
    handleClickEvent() {
      this.dialog = true;
    },
  },
};
</script>
<style scoped>
.card {
  width: 120px;
  margin-right: 16px;
}
.card-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 16px;
  overflow: hidden;
}
.language {
  font-size: 11px;
  font-weight: 500;
  border-radius: 24px;
  opacity: 0.6;
}
</style>

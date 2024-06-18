<template>
  <div class="headerView">
    <div class="header">
      <div class="header-left">
        <buttonIcon class="back" @click="navigateToBack()">
          <icon><caretLeft /></icon>
        </buttonIcon>
      </div>
      <!--
      <div class="header-center">
        <div class="header-center-item">
          
        </div>
      </div>
      -->
      <div class="header-right">
        <ankiIDHeaderChecked />
        <buttonIcon @click="dialog = true">
          <icon><settings /></icon>
        </buttonIcon>
      </div>
    </div>
    <ankiIDHeaderSetting
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { defineAsyncComponent } from "vue";

import "@/modules/common/header.scss";
import ankiIDHeaderChecked from "@/views/ankiID/ankiIDHeaderChecked.vue";

import caretLeft from "@/components/icon/caretLeft";
import settings from "@/components/icon/settings";

export default {
  components: {
    caretLeft,
    settings,
    ankiIDHeaderChecked,
    ankiIDHeaderSetting: defineAsyncComponent(() =>
      import("@/views/ankiID/ankiIDHeaderSetting.vue")
    ),
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    navigateToBack() {
      this.$router.go(-1); // 현재 페이지에서 한 단계 뒤로 가는 기능
    },
  },
};
</script>

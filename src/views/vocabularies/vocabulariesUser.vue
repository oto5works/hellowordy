<template>
  <div class="routerView">
    <usersInfo />
    <div class="sp_24" />
    <buttonOutline v-if="writer" @click="dialog = true"
      ><span>암기장 추가</span></buttonOutline
    >
    <div class="sp_12" />
    <div class="display_flex flex-direction_column gap_8">
      <vocabulariesList
        v-for="item in getVocabulariesUserID"
        :key="item.id"
        :vocabulary="item"
      />
    </div>
    <vocabulariesForm
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
      @close="updateDialog(false)"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { defineAsyncComponent } from "vue";

import vocabulariesList from "@/views/vocabularies/vocabulariesList.vue";
import usersInfo from "@/views/users/usersInfo.vue";

export default {
  components: {
    vocabulariesList,
    usersInfo,
    vocabulariesForm: defineAsyncComponent(() =>
      import("@/views/vocabularies/vocabulariesForm.vue")
    ),
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
      getVocabulariesUserID: "vocabularies/getVocabulariesUserID",
      userID: "users/getUserID",
    }),
    writer() {
      return this.$route.params.id === this.userID;
    },
  },
};
</script>

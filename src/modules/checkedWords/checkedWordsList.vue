<template>
  <div>
    <buttonList
      class="display_flex align-items_center justify-content_space-between"
      v-for="word in checkedWords"
      :key="word.id"
    >
      <div class="font-size_28 font-weight_500">
        {{ word.word }}
      </div>
      <icon @click="deleteCheckedWordByPayload(word.id)"><trash /></icon>
    </buttonList>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import trash from "@/components/icon/trash";

export default {
  components: { trash },
  props: {
    checkedWords: { type: Array, Object },
  },
  methods: {
    ...mapActions({
      deleteCheckedWordByPayload: "checkedWords/deleteCheckedWordByPayload",
    }),
  },
};
</script>

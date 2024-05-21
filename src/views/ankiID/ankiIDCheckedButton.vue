<template>
      <div class="display_flex align-items_center justify-content_flex-end">
      <buttonChip
        class="height_32 pa_12 gap_4"
        @click="toggleCheckedWordByPayload(this.$route.params.id)"
        :class="{ selected: isChecked }"
        ><icon class="icon_16"><check /></icon
      ><span class="font-size_13">학습완료</span></buttonChip>
     
    
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import check from "@/components/icon/check";

export default {
  components: { check },
  computed: {
    ...mapGetters({
      wordID: "study/getWordID",
      checkedWords: "checkedWords/getCheckedWords",
    }),
    isChecked() {
    if (!this.checkedWords) {
      // checkedWords가 undefined 또는 null일 경우, false를 반환
      return false;
    }
    let checkedWordsArray = Object.values(this.checkedWords);
    return checkedWordsArray.some(word => word.wordID === this.wordID);
  },
  },
  methods: {
    ...mapActions({

      toggleCheckedWordByPayload: "checkedWords/toggleCheckedWordByPayload",
    }),
  },
};
</script>
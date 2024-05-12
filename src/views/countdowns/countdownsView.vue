<template>
  <card>
    <div
      v-if="countdown"
      class="display_flex flex-direction_column align-items_center width_100"
    >
      <div
        class="date display_flex align-items_center justify-content_space-between"
      >
        <div class="font-size_18 kr font-weight_700">{{ countdown.title }}</div>
        <div class="font-size_14 en">{{ countdown.date }}</div>
      </div>
      <div class="sp_12" />
      <flip v-if="shouldRenderFlip" :date="countdown.date" />
      <div class="sp_32" />
      <buttonText class="selected height_40 pa_16" @click="dialog = true">
        <span class="font-weight_500">날짜 수정</span>
      </buttonText>
      <buttonText class="selected height_40 pa_16" @click="handleDeleteCountdown()">
        <span class="font-weight_500">삭제</span>
      </buttonText>
    </div>

    <div
      v-else
      class="display_flex flex-direction_column align-items_center width_100"
    >
      <buttonText class="selected"
        ><span class="font-size_18 kr font-weight_700"
          >D-day 설정</span
        ></buttonText
      >
      <div class="sp_8" />
      <div class="font-size_13 kr font-weight_400 line-height_130">
        시험일을 입력하고<br />
        카운트다운을 시작하세요!
      </div>
      <div class="sp_24" />
      <buttonOutline class="height_40 pa_16" @click="dialog = true">
        <span class="font-weight_500">시험일 입력하기</span>
      </buttonOutline>
    </div>
    <countdownsFormDialog
      v-if="dialog"
      :dialog="dialog"
      @update:dialog="dialog = $event"
    />
  </card>
</template>

<script>
import "@/views/countdowns/flip.scss";
import flip from "@/views/countdowns/flip.vue";
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    flip,
    countdownsFormDialog: defineAsyncComponent(() =>
      import("@/views/countdowns/countdownsFormDialog.vue")
    ),
  },
  computed: {
    ...mapGetters({
      countdown: "countdowns/getCountdown",
    }),
  },
  data() {
    return {
      shouldRenderFlip: true,
      dialog: false,
    };
  },
  watch: {
    countdown: function () {
      this.reloadFlip();
    },
  },
  created() {
    this.getCountdown();
  },
  methods: {
    ...mapActions({
      getCountdown: "countdowns/getCountdown",
      deleteCountdown: "countdowns/deleteCountdown",
    }),
    reloadFlip() {
      this.shouldRenderFlip = false;
      this.$nextTick(() => {
        this.shouldRenderFlip = true;
      });
    },
    async handleDeleteCountdown() {
      try {
        await this.deleteCountdown();
        alert("Countdown이 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error(`Countdown 삭제 중 오류 발생:`, error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  },
};
</script>

<style scoped>
.date {
  max-width: 250px;
  width: 100%;
}
</style>

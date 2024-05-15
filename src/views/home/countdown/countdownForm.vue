<template>
  <div>
    <textField v-model="title" type="text" label="단어장 제목을 입력하세요" />
    <textField v-model="date" type="date" label="단어장 날짜를 입력하세요" />

    <buttonDefault v-if="!isEditMode" @click="submitForm">
      <span>단어장 생성</span>
    </buttonDefault>

    <buttonDefault v-else @click="submitForm">
      <span>단어장 수정</span>
    </buttonDefault>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    dialog: { type: Boolean },
  },
  emits: ["update:dialog", "close"],
  data() {
    return {
      title: "",
      date: "",
    };
  },
  created() {
    if (this.isEditMode) {
      this.title = this.countdown.title;
      this.date = this.countdown.date;
    }
  },
  computed: {
    ...mapGetters({
      countdown: "countdowns/getCountdown",
    }),
    isEditMode() {
      return !!this.countdown;
    },
  },
  methods: {
    ...mapActions({
      createCountdown: "countdowns/createCountdown",
      updateCountdown: "countdowns/updateCountdown",
    }),

    async submitForm() {
      try {
        const payload = {
          title: this.title,
          date: this.date,
        };

        if (this.isEditMode) {
          await this.updateCountdown(payload);
          alert("Countdown이 성공적으로 수정되었습니다.");
        } else {
          await this.createCountdown(payload);
          alert("Countdown이 성공적으로 생성되었습니다.");
        }

        this.closeForm();
      } catch (error) {
        console.error(`Countdown ${this.isEditMode ? "수정" : "생성"} 중 오류 발생:`, error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
    closeForm() {
      this.$emit("close");
    },
  },
};
</script>

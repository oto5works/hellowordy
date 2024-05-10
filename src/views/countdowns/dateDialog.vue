<template>
  <modalDialog :dialog="dialog" @update:dialog="updateDialog">
    <!-- 예식일 시간 -->
    <article>
      <formTitle2
        title="배경 음악 설정"
        content="다양한 배경음악 중에서 선택하거나, 직접 원하는 음악을 업로드하여 홈 화면에 나만의 분위기를 조성하세요. 배경음악을 통해 홈 화면을 더욱 특별하게 만들어보세요."
      />
      <dateForm />
    </article>
  

    <div class="dialog-actions">
      <buttonText @click="updateDialog(false)">
        <span>취소</span>
      </buttonText>
      <buttonDefault @click="updateDialog(false)">
        <span>확인</span>
      </buttonDefault>
    </div>
  </modalDialog>
</template>
<script>
import dateForm from "@/modules/date/dateForm.vue";

export default {
  components: {
    dateForm,
  },
  props: {
    dialog: { type: Boolean },
  },
  methods: {
    updateDialog(value) {
      this.$emit("update:dialog", value);
    },
  },
};
</script>

<!-- textField.vue -->
<template>
  <div
    class="form-field"
    :class="{ focus: isFocused, active: modelValue, invalid: !isValid }"
  >
    <!--
    modelValue = {{ modelValue }}<br />
    rules = {{ rules }}<br />
    isValid = {{ isValid }}<br />
    errorMessage = {{ errorMessage }}
    -->
    <div class="textField">
      <div class="textField-flex">
      <div class="textField-space" />
      <div class="textField-input">
        <input
        :type="type"
        :value="modelValue"
        @input="handleInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      </div>
      
      <slot></slot>
      <div class="textField-space" />
    </div>
      <div class="textField-overlay" />
      <div class="textField-outline">
        <div class="textField-outline__start" />
        <div class="textField-outline__notch">
          <label>{{ label }}</label>
        </div>
        <div class="textField-outline__end" />
      </div>
      <div class="textField-underline" />
    </div>
    <div class="textField-details">
      <div class="messages" v-if="!isValid">
        <icon><warning /></icon>{{ errorMessage }}
      </div>
      <div class="messages" v-if="isValid && hint">
        <icon><question /></icon>{{ hint }}
      </div>
    </div>
    <p v-if="validationMessage" class="validation-message"></p>
  </div>
</template>

<script>
import "@/components/textField.scss";

import question from "@/components/icon/question";
import warning from "@/components/icon/warning";

export default {
  components: { question, warning },
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      default: "",
    },
    hint: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    rules: {
      type: [Array, String, Object], // 여러 타입을 배열로 지정
      default: () => [], // 배열로 기본값 설정
    },
  },
  data() {
    return {
      validationMessage: "",
      isFocused: false,
      errorMessage: "",
    };
  },
  methods: {
    handleInput(event) {
      this.$emit("update:modelValue", event.target.value);
      this.validateInput();
    },

    async validateInput() {
      this.errorMessage = ""; // 초기화
      for (const rule of this.rules) {
        const result = await rule(this.modelValue); // 비동기 함수 처리
        if (result !== true) {
          this.errorMessage = result; // errorMessage 업데이트
          return; // 유효하지 않은 경우 더 이상 검사하지 않고 종료
        }
      }
    },
  },
  computed: {
    isValid() {
      return this.errorMessage === ""; // errorMessage가 비어있으면 유효함
    },
  },
};
</script>
<style scoped>
.invalid {
  border-color: red; /* 유효성 검사 실패 시 테두리 색상 변경 */
}

.validation-message {
  color: red;
}
</style>

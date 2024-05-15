<!-- appDialog.vue -->
<template>
  <teleport to="body">
    <div class="overlay-container" v-if="dialog">
      <div class="overlay modalDialog">
        <div
          class="overlay__scrim"
          @click="closeDialog"
          :class="{ active: loaded }"
        />
        <div class="overlay__content" :class="{ active: loaded }">
          <div class="dialog">
            <div class="dialog-header">
              <span class="font-size_24">{{ title }}</span>
              <buttonIcon @click="closeDialog">
                <icon><x /></icon>
              </buttonIcon>
            </div>
            <div class="dialog-content">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script>
import "@/components/dialog/overlay.scss";
import "@/components/dialog/modalDialog.scss";
import x from "@/components/icon/x.vue";

export default {
  components: { x },

  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  watch: {
    dialog(newValue) {
      if (newValue) {
        // 대화상자가 열리면 `body`에 `no-scroll` 클래스를 추가합니다.
        document.body.classList.add("no-scroll");
      } else {
        // 대화상자가 닫히면 `no-scroll` 클래스를 제거합니다.
        document.body.classList.remove("no-scroll");
      }
    },
  },
  data() {
    return {
      loaded: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loaded = true;
    }, 1);
  },
  methods: {
    closeDialog() {
      this.$emit("update:dialog", false);
    },
  },
};
</script>

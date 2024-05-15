<!-- appDialog.vue -->
<template>
  <teleport to="body">
    <div class="overlay-container" v-if="dialog">
      <div class="overlay fullDialog">
        <div
          class="overlay__scrim"
          @click="closeDialog"
          :class="{ active: loaded }"
        />
        <div class="overlay__content" :class="{ active: loaded }">
          <div class="dialog">
            <div class="dialog-header">
              <div class="display_flex align-items_center">
                <buttonIcon @click="closeDialog">
                  <icon><caretLeft /></icon>
                </buttonIcon>
                <span class="font-size_24">{{ title }}</span>
              </div>

              <div class="header-button">
                <slot name="header"></slot>
              </div>
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
import "@/components/dialog/fullDialog.scss";
import caretLeft from "@/components/icon/caretLeft.vue";

export default {
  components: { caretLeft },

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
      console.log("closeDialog");
      this.$emit("update:dialog", false);
    },
  },
};
</script>

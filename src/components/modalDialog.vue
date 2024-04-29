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
            <div
              class="z-index_3 flex align-items_center justify-content_space-between gap_4 dialog-header"
            >
              <span class="font-size_24">{{ title }}</span>
              <button class="icon_48" @click="closeDialog">
                <icon><x /></icon>
              </button>
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
import "@/components/overlay.scss";
import "@/components/dialog.scss";
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

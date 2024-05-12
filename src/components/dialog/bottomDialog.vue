<!-- appDialog.vue -->
<template>
  <teleport to="body">
    <div class="overlay-container" v-if="dialog">
      <div class="overlay bottomDialog">
        <div
          class="overlay__scrim"
          @click="closeDialog"
          :class="{ active: loaded }"
        />
        <div class="overlay__content" :class="{ active: loaded, full: isFull }">
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
            <div class="underlay"/>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import "@/components/dialog/overlay.scss";
import "@/components/dialog/bottomDialog.scss";

export default {
  components: { },

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
      isFull: false,

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

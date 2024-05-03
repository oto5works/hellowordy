<!-- appDialog.vue -->
<template>
  <teleport to="body">
    <div class="overlay-container" v-if="dialog">
      <div class="overlay bottomDialog">
        
        <div class="overlay__content" :class="{ active: loaded, full: isFull }">
          <div class="dialog">
            <div class="dialog-header">
              <span class="font-size_24">{{ title }}</span>
              <btn @click="closeDialog">
                <icon><x /></icon>
              </btn>
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
import "@/components/bottomDialog.scss";
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

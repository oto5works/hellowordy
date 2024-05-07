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
            <button class="close" @click="closeDialog">
              <icon><x /></icon>
            </button>
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
      console.log ('closeDialog')
      this.$emit("update:dialog", false);
    },
  },
};
</script>

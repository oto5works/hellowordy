<template>
  <div class="settingsLanguage">
    <textField v-model="languageSearch" :label="settings.button.search">
      <icon><search /></icon>
    </textField>

    <div class="buttonOption-wrap">
      <buttonOption
        v-for="option in filteredLanguages"
        :key="option.value"
        :class="{ selected: language === option.value }"
        @click="updateLanguage(option.value)"
      >
        <img
          class="icon_24"
          :src="`https://hello-wordy.web.app/image/${option.value}.png`"
        />
        <span>{{ option.label }}</span>
      </buttonOption>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import search from "@/components/icon/search";

export default {
  components: {
    search,
  },
  props: {
    currentStep: { type: [String, Number], default: "1" },
    language: { type: String },
  },
  data() {
    return {
      languageSearch: "",
    };
  },
  computed: {
    ...mapGetters({
      settings: "translations/settings",
      languageOptions: "options/language",
    }),
    filteredLanguages() {
      const search = this.languageSearch.toLowerCase();
      return this.languageOptions.filter(
        (option) =>
          option.label.toLowerCase().includes(search) ||
          option.value.toLowerCase().includes(search)
      );
    },
  },
  methods: {
    updateLanguage(value) {
      this.$emit("update:language", value);
    },
  },
};
</script>

<style scoped>
.settingsLanguage {
  position: relative;
  width: 100%;
  height: fit-content;
  padding: 2vh 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.buttonOption-wrap {
  position: relative;
  width: 100%;
  height: 32vh;
  overflow-x: hidden;
  overflow-y: scroll;

  /* Apply the animation with a delay */
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(2%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Scrollbar styles */
.buttonOption-wrap::-webkit-scrollbar {
  width: 8px;
}

.buttonOption-wrap::-webkit-scrollbar-thumb {
  background: rgba(var(--mio-theme-color-on-background-40), 1);
  border-radius: 8px;
}

.buttonOption-wrap::-webkit-scrollbar-track {
  background: rgba(var(--mio-theme-color-on-background-20), .24);
}

.gradient {
  position: absolute;
  bottom: 0%;
  width: 100%;
  height: 16%;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 2;
}
</style>

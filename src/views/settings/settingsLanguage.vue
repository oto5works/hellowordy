<template>
  <div class="learning-data">
 
    
    <!-- Step Navigation -->
    <div>
      <div class="form-group">
        <input 
          type="text" 
          id="languageSearch" 
          v-model="languageSearch"
          :placeholder="settings.button.search" 
        />
        <div class="chips">
          <button 
            v-for="option in filteredLanguages" 
            :key="option.value" 
            :class="['chip', { selected: language === option.value }]"
            @click="language = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>

    

    

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    currentStep: { type: [String, Number], default: "1" },
    language: { type: String },
  },
  data() {
    return {
      languageSearch: '',
    };
  },
  computed: {
    ...mapGetters({
      settings: "translations/settings",
      languageOptions: "options/language",
    }),
    filteredLanguages() {
      return this.languageOptions.filter(option => {
        const search = this.languageSearch.toLowerCase();
        return option.label.toLowerCase().includes(search) || option.value.toLowerCase().includes(search);
      });
    },
    
  
   
  },
};
</script>



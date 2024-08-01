<template>
  <div>
    <div class="sp_120"/>
    <h1>Kanji Comparison</h1>
    <button @click="compareKanjis">Compare Kanjis</button>
    <div v-if="missingKanjis && missingKanjis.length">
      <h2>Missing Kanjis ({{ missingKanjis.length }})</h2>
      <ul>
        <li v-for="kanji in missingKanjis" :key="kanji">{{ kanji }}</li>
      </ul>
    </div>
    <div v-else>
      <p>No missing kanjis found.</p>
    </div>
    <div class="sp_120"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "KanjiComparison",
  computed: {
    ...mapGetters({
      missingKanjis: "kanjis2/getMissingKanjis",
    }),
  },
  methods: {
    ...mapActions({
      compareKanjis: "kanjis2/compareKanjis",
    }),

  },
  mounted() {
    // 자동으로 비교하도록 원하면 여기에 작성
    // this.compareKanjis();
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}

button {
  margin-bottom: 16px;
  padding: 8px 16px;
  font-size: 16px;
}

h2 {
  font-size: 20px;
  margin-top: 16px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  font-size: 18px;
  margin: 4px 0;
}
</style>

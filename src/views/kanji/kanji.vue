<template>
    <div>
      <div class="sp_64"/>

<kanjiAdd />

     
      <div class="sp_24" />

      <div class="kanjis-list">
        <kanjiCard
          v-for="(item) in kanjis"
          :key="item.id"
          :kanji="item"
        />
      </div>
    </div>

    
</template>
<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import kanjiCard from "@/views/kanji/kanjiCard.vue";
import kanjiAdd from "@/views/kanji/kanjiAdd.vue";

export default {
  components: {
    kanjiAdd,
    kanjiCard,
  },
  computed: {
    ...mapGetters({
      kanjis: "kanjis/getKanjis",
      userID: "users/getUserID",
    }),
  },
  methods: {
    ...mapActions({
      getKanjis: "kanjis/getKanjis",
    }),
  },
  created() {
    this.getKanjis();
  },
};
</script>
<style scoped>
.kanjis-list {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.buttonDefault {
  flex-direction: column;
  gap: 16px;
  border-radius: 24px !important;
}
</style>

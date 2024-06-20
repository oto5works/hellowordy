<template>
  <fullDialog :dialog="dialog" @update:dialog="updateDialog">
    <div class="content">
      <div class="item">
        <div class="index">{{ kanji.id }}</div>
        <div class="kanji">
          {{ kanji.kanji }}
        </div>

        <div class="info">
          <div class="hoon">
          훈음 : {{ kanji.hoon }}
        </div>
        <div class="mean">
          의미 : {{ kanji.mean }}
        </div>
        <div class="goon">
          음독 : {{ kanji.goon }}
        </div>
        <div class="kun">
          훈독 : {{ kanji.kun }}
        </div>
        </div>
       
        <div class="sp_8"/>

<div class="line"/>
<div class="sp_8"/>

        <div class="kun">
          <div class="font-weight_700">한자 설명</div>
          <div v-html="kanji.comment" />
        </div>
        <div class="line" />
        <div class="sp_8"/>

        <div class="kun">
          <div class="font-weight_700">음독 상세</div>
          <div v-html="kanji.goonDetail" />
        </div>
        <div class="line" />
<div class="sp_8"/>
        <div class="kun">
          <div class="font-weight_700">훈독 상세</div>
          <div v-html="kanji.kunDetail" />
        </div>

    
      </div>


    

    </div>
    <div class="line" />
  </fullDialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},
  props: {
    kanji: { type: Object },
    dialog: { type: Boolean },
  },
  methods: {
    updateDialog(value) {
      this.$emit("update:dialog", value);
    },
  },
};
</script>
<style scoped>
.kanji {
  font-size: 32px;
  font-weight: 700;
}
.info {
  font-size: 13px;
}
</style>
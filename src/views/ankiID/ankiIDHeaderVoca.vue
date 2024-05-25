<template>
  <button @click="setShowFilter()">
    <div class="display_flex align-items_center gap_8">
      <div class="title-wrap">
        <div class="title">
          {{ title }}
        </div>
      </div>

      <buttonSelect class="part">
        <span>
          <aniLoading v-if="part === null" /><span v-else
            >part {{ part + 1 }}</span
          >
        </span>
        <icon class="icon_12"><caretDown /></icon>
      </buttonSelect>
    </div>
  </button>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import caretDown from "@/components/icon/caretDown.vue";
import aniLoading from "@/components/icon/aniLoading.vue";

export default {
  components: { caretDown, aniLoading },
  data() {
    return {
      title: "unSelected",
    };
  },
  computed: {
    ...mapGetters({
      part: "study/getPart",
    }),
    vocaID() {
      return this.$route.params.id;
    },
  },
  created() {
    this.loadVoca();
  },
  mounted() {
    this.applyAnimationBasedOnWidth();
  },
  methods: {
    ...mapActions({
      setShowFilter: "filter/setShowFilter",
      returnVocaByPayload: "vocas/returnVocaByPayload",
      returnWordsByPayload: "words/returnWordsByPayload",
    }),
    async loadVoca() {
      if (this.vocaID) {
        console.log("vocaID", this.vocaID);
        const vocaData = await this.returnVocaByPayload(this.vocaID);
        if (vocaData) {
          this.title = vocaData.title;
          this.applyAnimationBasedOnWidth();
        } else {
          alert("단어장을 불러오는데 실패했습니다.");
        }
      }
    },
    applyAnimationBasedOnWidth() {
      this.$nextTick(() => {
        const titleElement = this.$el.querySelector('.title');
        const titleWrapElement = this.$el.querySelector('.title-wrap');
        if (titleElement.offsetWidth > titleWrapElement.offsetWidth) {
          titleElement.classList.add('animate');
        } else {
          titleElement.classList.remove('animate');
        }
      });
    },
    
  },
};
</script>

<style scoped>
button {
  color: rgb(var(--mio-theme-color-on-background));
}

.title-wrap {
  max-width: 76px;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  
}

@keyframes marquee {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

/* 스타일을 더 부드럽게 하기 위해 */
.title-wrap:hover .title {
  animation-play-state: paused; /* 마우스 호버 시 애니메이션 일시 정지 */
}
.title {
  display: inline-block;
  white-space: nowrap;
  animation: none; /* 10초 동안 무한 반복 */
  font-size: 12px;
  font-weight: 700;
  line-height: 100%;
}
.animate {
  animation: marquee 10s linear infinite;
}

.part {
  padding: 4px 8px;
  gap: 2px;
}
.part span {
  font-size: 10px;
}
</style>

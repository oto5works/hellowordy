<template>
  <div class="height_40 width_100">
    <textField>
    <select  class="width_100" v-model="selectedPartSize">
      <option value="10"><span>10개씩 보기</span></option>
      <option value="50"><span>50개씩 보기</span></option>
      <option value="100"><span>100개씩 보기</span></option>
    </select>
  </textField>
  </div>
  
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      selectedPartSize: 10, // 기본 선택값을 설정합니다.
    };
  },
  computed: {
    ...mapGetters({
      getPartSize: "filter/getPartSize",
    }),
  },

  watch: {
    // selectedPartSize 값이 변경되면 handleSetPartSize 메소드를 호출합니다.
    selectedPartSize(newValue) {
      this.handleSetPartSize(newValue);
    },
  },

  methods: {
    ...mapActions({
      setPartSize: "filter/setPartSize",
      fetchFilterWords: "filter/fetchFilterWords",
    }),

    async handleSetPartSize(newValue) {
      // 선택된 값으로 Vuex 스토어의 partSize를 업데이트합니다.
      await this.setPartSize(newValue);
      // 필요한 경우 추가 데이터를 가져옵니다. 예를 들어, 필터링된 단어를 새로운 partSize에 맞게 다시 가져옵니다.
      await this.fetchFilterWords();
    },
  },

  mounted() {
    // 컴포넌트가 마운트될 때 초기 partSize를 설정합니다.
    this.selectedPartSize = this.getPartSize;
  },
};
</script>

<template>
  <div ref="tick">
    <div class="tick__item" data-repeat="true" data-layout="horizontal fit"  >
      <div class="tick-group">

      
      <div data-key="value" data-repeat="true" data-transform="pad(00) -> split -> delay">
        <span data-view="flip"></span>
      </div>
     <!-- <span data-key="label" data-view="text" class="tick-label"></span>-->
    </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    date: { type: String, default: "2024-07-21" }, // 기본값으로 "2024-08-21" 설정
  },
  data() {
    return {
      tick: null,
      counter: null,
    };
  },
  mounted() {
    // `time` prop을 사용하지 않고, 기본값으로 설정된 `date`만 사용
    // 시간을 명시적으로 지정하지 않으므로, 00:00:00 (자정)으로 간주될 수 있음
    this.counter = Tick.count.down(`${this.date}T00:00:00`);
    this.tick = Tick.DOM.create(this.$refs.tick, {
      value: this.counter.value,
    });
    this.counter.onupdate = (value) => {
      this.tick.value = value;
    };
  },
};
</script>

<style scoped>
.tick {}
</style>
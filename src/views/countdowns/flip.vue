<template>
  <div ref="tick">
    <div class="tick__item" data-repeat="true" data-layout="horizontal" >
      <!-- 글자를 따로 써야 할때는 하기와 같이
              <div data-key="value" data-repeat="true" data-transform="pad(00) -> split -> delay">
            글자를 같이 써야 할때는 하기
                <div data-key="value" data-transform="pad(00)">
      -->
      <div data-key="value" data-transform="pad(00)">
        <span data-view="flip"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Tick from "@/views/countdowns/flip.min.js";

export default {
  props: {
    date: { type: String },
    time: { type: String },
  },
  data() {
    return {
      tick: null,
      counter: null,
    };
  },
  mounted() {
    this.counter = Tick.count.down(`${this.date}T${this.time}:00`);
          this.tick = Tick.DOM.create(this.$refs.tick, {
          value: this.counter.value,
    });
    this.counter.onupdate = (value) => {
      this.tick.value = value;
    };
  },
};
</script>



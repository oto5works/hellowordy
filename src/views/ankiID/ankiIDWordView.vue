<template>
  <div>
    <component :is="dynamicComponent" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicComponent: null,
      rubyData: []
    };
  },
  mounted() {
    this.createDynamicComponent(this.htmlContent);
  },
  methods: {
    createDynamicComponent(html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'application/xml');
      const rubyElements = doc.getElementsByTagName('ruby');

      this.rubyData = Array.from(rubyElements).map(element => {
        const text = element.getElementsByTagName('rt')[0].textContent;
        const base = element.getElementsByTagName('rb')[0].textContent.split('').map(char => ({ char }));
        return { base, ruby: text };
      });

      this.dynamicComponent = {
        template: `
          <div>
            <span v-for="(item, index) in rubyData" :key="index">
              <span v-for="(char, charIndex) in item.base" :key="charIndex"
                @mousedown="startDrag($event, index, charIndex, char.char)"
                @mousemove="drag($event)"
                @mouseup="endDrag"
                :style="{ 'background-color': isDragging && currentIndex === index && currentCharIndex === charIndex ? '#ccc' : 'transparent' }">
                {{ char.char }}
              </span>
              <span>{{ item.ruby }}</span>
            </span>
          </div>
        `,
        data() {
          return {
            rubyData: this.$parent.rubyData,
            isDragging: false,
            currentIndex: null,
            currentCharIndex: null,
            currentText: null,
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            initialMouseX: 0,
            initialMouseY: 0
          };
        },
        methods: {
          startDrag(event, index, charIndex, text) {
            this.isDragging = true;
            this.currentIndex = index;
            this.currentCharIndex = charIndex;
            this.currentText = text;
            this.startX = event.clientX - event.target.offsetLeft;
            this.startY = event.clientY - event.target.offsetTop;
            this.initialMouseX = event.clientX;
            this.initialMouseY = event.clientY;
          },
          drag(event) {
            if (this.isDragging) {
              this.currentX = event.clientX - this.startX;
              this.currentY = event.clientY - this.startY;
            }
          },
          endDrag() {
            this.isDragging = false;
          }
        }
      };
    }
  }
};
</script>

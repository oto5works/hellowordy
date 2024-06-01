<template>
  <div class="tiptap" v-if="editor">
    <div
      class="editor__wrap flex justify-content_space-between width_100 height_40 pa_8"
    >
      <div class="flex align-items_center gap_4">
        <button
          class="button-editor button-unselected"
          @click="editor.chain().focus().toggleHighlight().run()"
          :class="{ selected: editor.isActive('highlight') }"
        >
          <icon><highlighter /></icon>
          <div class="tiptap__overlay --border-radius_4" />
        </button>
      </div>
    </div>
    <editor-content :editor="editor" @keydown.enter="handleEnterKey" />
    <div class="underlay"/>
  </div>
</template>

<script>
import "@/components/tiptap/tiptap.scss";
import highlighter from "@/components/icon/highlighter.vue";
import highlight from "@tiptap/extension-highlight";
import document from "@tiptap/extension-document";
import paragraph from "@tiptap/extension-paragraph";
import text from "@tiptap/extension-text";
import { Editor, EditorContent } from "@tiptap/vue-3";

export default {
  components: {
    EditorContent,
    highlighter,
  },
  props: {
    modelValue: { type: String },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.initEditor();
  },
  watch: {
    modelValue(newValue) {
      if (this.editor && this.editor.getHTML() !== newValue) {
        this.editor.commands.setContent(newValue, false);
      }
    },
  },
  methods: {
    initEditor() {
      this.editor = new Editor({
        extensions: [
          document,
          paragraph,
          text,
          highlight.configure({ multicolor: true }),
        ],
        content: this.modelValue,
        onUpdate: () => {
          this.$emit("update:modelValue", this.editor.getHTML());
        },
      });
    },
    handleEnterKey(event) {
      event.preventDefault();
      this.editor.chain().focus().setParagraph().run();
    },
  },
  beforeUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
  },
};
</script>

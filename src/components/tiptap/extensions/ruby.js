import { Node } from "@tiptap/core";

export default Node.create({
  name: "ruby",

  group: "inline",

  content: "text*",

  parseHTML() {
    return [
      {
        tag: "ruby",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["ruby", HTMLAttributes, 0];
  },
});

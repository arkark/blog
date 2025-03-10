import { visit } from "unist-util-visit";

// footnoteへのaタグにtitle属性を付与する → ホバーしたときにいい感じに表示される

export default () => {
  return (root) => {
    const idToElement = new Map();
    visit(root, "element", (node) => {
      const id = node.properties.id;
      if (id) idToElement.set(id, node);
    });

    visit(root, "element", (node) => {
      if (node.tagName !== "a") return;
      if (!node.properties.dataFootnoteRef) return;

      const id = node.properties.href.slice(1);
      const footnote = idToElement.get(id);

      let text = "";
      visit(footnote, "text", (n) => {
        if (n.value === "↩") return;
        text += n.value;
      });
      text = text.trim();

      node.properties.title = text;
    });
  };
};

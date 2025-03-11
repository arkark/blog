import { visit } from "unist-util-visit";
import type { Element, Text, Node } from "hast";

// footnoteへのaタグにtitle属性を付与 → ホバーしたときにいい感じに表示される

export default () => (root: Node) => {
  const idToElement = new Map<string, Element>();
  visit(root, "element", (node: Element) => {
    const { id } = node.properties;
    if (typeof id === "string") idToElement.set(id, node);
  });

  visit(root, "element", (node: Element) => {
    if (node.tagName !== "a") return;
    if (!node.properties.dataFootnoteRef) return;

    const { href } = node.properties;
    if (typeof href !== "string" || !href.startsWith("#")) {
      throw new Error(`Unexpected href: ${JSON.stringify(href)}`);
    }
    const footnote = idToElement.get(href.slice(1));

    let text = "";
    visit(footnote, "text", (n: Text) => {
      if (n.value === "↩") return;
      text += n.value;
    });
    text = text.trim();

    node.properties.title = text;
  });
};

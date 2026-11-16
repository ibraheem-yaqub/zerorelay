/**
 * Wraps every word inside `el` (including inside nested inline elements such as
 * the serif accent span) in `<span class="split-word">`, preserving spaces and
 * element structure. Idempotent via data-split. Returns the word spans in order.
 *
 * Only used on static headings that React never re-renders after hydration.
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.split === "1") return Array.from(el.querySelectorAll<HTMLElement>(".split-word"));
  const words: HTMLElement[] = [];

  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? "";
        if (!text.trim()) return;
        const frag = document.createDocumentFragment();
        text.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            const span = document.createElement("span");
            span.className = "split-word";
            span.textContent = part;
            frag.appendChild(span);
            words.push(span);
          }
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && !(child as Element).matches("svg, img, br")) {
        walk(child);
      }
    });
  };

  walk(el);
  el.dataset.split = "1";
  return words;
}

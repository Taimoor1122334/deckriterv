import { RefObject, useLayoutEffect, useState } from "react";

/**
 * Decorative hero extras (the "Scroll" hint and the stats panel) sit in the
 * bottom corners of a hero. On short or narrow screens the hero text and
 * buttons can run into them. This hook measures the real layout and hides an
 * extra ONLY when it would actually overlap something - so every screen where
 * there is room looks exactly as designed.
 */
const bottomOf = (el: HTMLElement, root: HTMLElement) => {
  // layout position (ignores scroll-linked transforms, so scrolling can't flip the result)
  let y = el.offsetHeight;
  for (let n: HTMLElement | null = el; n && n !== root; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
  return y;
};
const union = (els: Element[]) => {
  const rs = els.map((e) => e.getBoundingClientRect()).filter((r) => r.width > 0 && r.height > 0);
  return rs.length ? { left: Math.min(...rs.map((r) => r.left)), right: Math.max(...rs.map((r) => r.right)) } : { left: 0, right: 0 };
};
const GAP = 8;
const sharesX = (a: { left: number; right: number }, b: { left: number; right: number }) => a.left < b.right - GAP && a.right > b.left + GAP;

export function useHeroCrowding(
  section: RefObject<HTMLElement | null>,
  content: RefObject<HTMLElement | null>,
  hint: RefObject<HTMLElement | null>,
  panel?: RefObject<HTMLElement | null>,
) {
  const [state, setState] = useState({ hideHint: false, hidePanel: false });
  useLayoutEffect(() => {
    const s = section.current;
    const c = content.current;
    if (!s || !c) return;
    const measure = () => {
      const last = c.lastElementChild as HTMLElement | null;
      if (!last) return;
      const H = s.offsetHeight;
      const contentBottom = bottomOf(last, s);
      const buttons = union(last.children.length ? Array.from(last.children) : [last]);
      const h = hint.current;
      const p = panel?.current;
      const panelShown = !!p && getComputedStyle(p).display !== "none";
      const pr = panelShown ? p!.getBoundingClientRect() : null;
      const hidePanel = !!pr && contentBottom > H - p!.offsetHeight - GAP && sharesX(buttons, pr);
      let hideHint = false;
      if (h) {
        const hr = h.getBoundingClientRect();
        const hintTop = H - 32 - h.offsetHeight; // the hint is anchored at bottom-8
        hideHint = (contentBottom > hintTop - GAP && sharesX(buttons, hr)) || (!!pr && !hidePanel && sharesX(hr, pr));
      }
      setState((prev) => (prev.hideHint === hideHint && prev.hidePanel === hidePanel ? prev : { hideHint, hidePanel }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(s);
    ro.observe(c);
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [section, content, hint, panel]);
  return state;
}

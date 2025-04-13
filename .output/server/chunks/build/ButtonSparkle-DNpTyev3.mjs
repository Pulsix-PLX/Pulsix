import { ssr, ssrHydrationKey, escape, ssrStyle, ssrAttribute, createComponent } from 'solid-js/web';
import { createSignal, onMount, For } from 'solid-js';
import { createStore } from 'solid-js/store';

var x = ["<div", ' class="sparkle-button"><button class="', '" style="', '"', '><span class="spark"></span><span class="backdrop"></span><!--$-->', '<!--/--><span class="text">', "</span></button><!--$-->", "<!--/--></div>"], z = ["<span", ' aria-hidden="true" class="particle-pen" style="', '">', "</span>"], S = ["<span", ' class="particle"', ' style="', '">', "</span>"];
function B(e) {
  const [d, g] = createStore([]), [o, k] = createSignal(false), [u, m] = createSignal(false);
  onMount(() => {
    m(true);
  });
  const v = () => {
    let s, r;
    if (e.shadowColor, typeof e.size == "number") s = e.size;
    else switch (e.size) {
      case "small":
        s = 0.875;
        break;
      case "large":
        s = 1.25;
        break;
      case "medium":
      default:
        s = 1;
    }
    const y = e.shadow ? `${e.shadow}px` : "20px";
    return { "--active": o() ? "1" : "0", "--button-scale": s, "font-size": `${16 * s}px`, "box-shadow": `0 0 calc(var(--active) * ${y}) calc(var(--active) * var(--shadow-size) / 2) ${e.shadowColor || r},0 0.05em 0 0 hsl(260 calc(var(--active) * 97%) calc((var(--active) * 50%) + 30%)) inset,0 -0.05em 0 0 hsl(260 calc(var(--active) * 97%) calc(var(--active) * 60%)) inset` };
  };
  return ssr(x, ssrHydrationKey(), `button ${escape(e.class, true) || ""} ${o() && e.shadowColor ? "hover" : ""}`, ssrStyle(v()), ssrAttribute("disabled", e.disabled, true), escape(e.icon), escape(e.text), u() && ssr(z, ssrHydrationKey(), "--active:" + (o() ? "1" : "0"), escape(createComponent(For, { each: d, children: (a, s) => ssr(S, ssrHydrationKey(), ssrAttribute("data-key", escape(s(), true), false), `--x:${escape(a.x, true)};--y:${escape(a.y, true)};--duration:${escape(a.duration, true)};--delay:${escape(a.delay, true)};--alpha:${escape(a.alpha, true)};--origin-x:${escape(a.originX, true)}%;--origin-y:${escape(a.originY, true)}%;--size:${escape(a.size, true)}`, escape(e.particleIcon)) }))));
}

export { B };
//# sourceMappingURL=ButtonSparkle-DNpTyev3.mjs.map

import { ssr, ssrHydrationKey, escape, ssrStyle, ssrAttribute, createComponent } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createSignal, onMount, For } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { createStore } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/store/dist/server.js';

var x = ["<div", ' class="sparkle-button"><button class="', '" style="', '"', "", '><span class="spark"></span><span class="backdrop"></span><!--$-->', '<!--/--><span class="text">', "</span></button><!--$-->", "<!--/--></div>"], z = ["<span", ' aria-hidden="true" class="particle-pen" style="', '">', "</span>"], S = ["<span", ' class="particle"', ' style="', '">', "</span>"];
function B(e) {
  const [u, g] = createStore([]), [o, k] = createSignal(false), [d, m] = createSignal(false);
  onMount(() => {
    m(true);
  });
  const y = () => {
    let s, l;
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
    const v = e.shadow ? `${e.shadow}px` : "20px";
    return { "--active": o() ? "1" : "0", "--button-scale": s, "font-size": `${16 * s}px`, "box-shadow": `0 0 calc(var(--active) * ${v}) calc(var(--active) * var(--shadow-size) / 2) ${e.shadowColor || l},0 0.05em 0 0 hsl(260 calc(var(--active) * 97%) calc((var(--active) * 50%) + 30%)) inset,0 -0.05em 0 0 hsl(260 calc(var(--active) * 97%) calc(var(--active) * 60%)) inset` };
  };
  return ssr(x, ssrHydrationKey(), `button ${escape(e.class, true) || ""} ${o() && e.shadowColor ? "hover" : ""}`, ssrStyle(y()), ssrAttribute("type", escape(e.type, true) || "submit", false), ssrAttribute("disabled", e.disabled, true), escape(e.icon), escape(e.text), d() && ssr(z, ssrHydrationKey(), "--active:" + (o() ? "1" : "0"), escape(createComponent(For, { each: u, children: (a, s) => ssr(S, ssrHydrationKey(), ssrAttribute("data-key", escape(s(), true), false), `--x:${escape(a.x, true)};--y:${escape(a.y, true)};--duration:${escape(a.duration, true)};--delay:${escape(a.delay, true)};--alpha:${escape(a.alpha, true)};--origin-x:${escape(a.originX, true)}%;--origin-y:${escape(a.originY, true)}%;--size:${escape(a.size, true)}`, escape(e.particleIcon)) }))));
}

export { B };
//# sourceMappingURL=ButtonSparkle-BxHzGCPC2.mjs.map

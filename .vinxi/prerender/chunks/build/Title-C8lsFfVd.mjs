import { isServer, ssr, ssrHydrationKey, escape, createComponent, ssrStyle } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createSignal, onMount, onCleanup, For } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';

var tt = ["<div", ' class="', '" style="', '"><div style="', '"><h1 style="', '"><!--$-->', '<!--/--><div style="', '"></div></h1></div></div>'], et = ["<span", ' style="', '">', "</span>"];
function rt(M) {
  function P(t) {
    return isServer ? "" : getComputedStyle(document.documentElement).getPropertyValue(t).trim();
  }
  let u = P("--Secondary");
  u.startsWith("rgb(") && !u.includes("rgba") && (u = u.replace("rgb(", "rgba(").replace(")", ", 0.8)"));
  const { title: y = "Text", baseColor: r = u, glowColor: l = u } = M, [ot, Y] = createSignal({ x: 0, y: 0 }), [B, it] = createSignal(false), [nt, S] = createSignal(-1), [A, E] = createSignal(false), [H, z] = createSignal({ x: 0.5, y: 0.5 }), [c, d] = createSignal([]), [R, L] = createSignal(0), [W, g] = createSignal(false), [s, x] = createSignal(0);
  let v = [], m = {}, p = null;
  const C = (t) => {
    B() && (Y({ x: t.clientX, y: t.clientY }), V(t.clientX, t.clientY));
  }, V = (t, o) => {
    for (let e = 0; e < v.length; e++) {
      if (!v[e]) continue;
      const i = v[e].getBoundingClientRect();
      if (t >= i.left && t <= i.right && o >= i.top && o <= i.bottom) {
        const h = (t - i.left) / i.width, f = (o - i.top) / i.height;
        z({ x: h, y: f }), S(e), c().length === 0 && !W() && (b(), g(true)), c().includes(e) || (d([...c(), e]), m[e] && clearTimeout(m[e]), m[e] = setTimeout(() => {
          d(($) => $.filter((w) => w !== e)), c().length === 1 && c()[0] === e && (b(), g(false));
        }, 5e3));
        return;
      }
    }
    S(-1);
  }, b = () => {
    p && clearTimeout(p), L(0), p = setTimeout(() => {
      L(100);
    }, 50);
  }, j = () => {
    x(1);
    const t = y.length;
    let o = [];
    for (let e = 0; e < t; e++) setTimeout(() => {
      o.push(e), d([...o]), e === t - 1 && setTimeout(() => {
        x(2), F();
      }, 800);
    }, e * 100);
  }, F = () => {
    const t = y.length;
    setTimeout(() => {
      d([]);
    }, 400), setTimeout(() => {
      for (let o = 0; o < t; o++) setTimeout(() => {
        d([o]), setTimeout(() => {
          d((e) => e.filter((i) => i !== o)), o === t - 1 && setTimeout(() => {
            x(3), setTimeout(() => {
              d([]), g(false), x(0);
            }, 1500);
          }, 300);
        }, 300);
      }, o * 150);
    }, 600);
  };
  onMount(() => {
    isServer || (window.addEventListener("mousemove", C), setTimeout(() => {
      E(true), setTimeout(() => {
        b(), setTimeout(() => {
          j();
        }, 500);
      }, 400);
    }, 100));
  }), onCleanup(() => {
    isServer || (window.removeEventListener("mousemove", C), Object.keys(m).forEach((t) => {
      m[t] && clearTimeout(m[t]);
    }), p && clearTimeout(p));
  });
  const G = (t) => s() === 1 && !c().includes(t) ? { "text-shadow": "none", color: "transparent", opacity: "0", transform: "translateY(10px)" } : { color: "rgb(34, 34, 34)", "background-clip": "text", "-webkit-background-clip": "text", opacity: "1", transform: "translateY(0)" }, _ = (t) => {
    const o = H(), e = Math.max(0, 1 - o.y * 2), i = Math.max(0, o.y * 2 - 1), h = Math.max(0, 1 - o.x * 2), f = Math.max(0, o.x * 2 - 1), $ = e > 0.2 ? `0 -${Math.round(e * 5)}px ${Math.round(e * 10)}px ${l}` : "none", w = i > 0.2 ? `0 ${Math.round(i * 5)}px ${Math.round(i * 10)}px ${l}` : "none", K = h > 0.2 ? `-${Math.round(h * 5)}px 0 ${Math.round(h * 10)}px ${l}` : "none", N = f > 0.2 ? `${Math.round(f * 5)}px 0 ${Math.round(f * 10)}px ${l}` : "none", O = [$, w, K, N].filter((q) => q !== "none").join(", "), X = s() > 0 ? "1px" : "0.5px";
    return { color: r, "text-shadow": s() === 2 ? `0 0 15px ${l}, 0 0 20px ${r}66, 0 0 30px ${r}33` : O || `0 0 5px ${l}66`, "-webkit-text-stroke": `${X} ${l}`, position: "relative", "z-index": "1", opacity: "1", transform: s() === 1 ? "translateY(0) scale(1.05)" : "translateY(0) scale(1)", transition: s() > 0 ? "all 0.3s ease" : "all 0.15s ease" };
  };
  return ssr(tt, ssrHydrationKey(), `CM -mt-32 ${escape(M.class, true)}`, "display:flex;overflow:hidden", "position:relative;transition:transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease" + (";transform:" + (A() ? "translateY(0)" : "translateY(20px)")) + (";opacity:" + (A() ? 1 : 0)), "font-size:1.5vw;padding:0 10px;position:relative;letter-spacing:1px;font-family:inherit;font-weight:bold", escape(createComponent(For, { get each() {
    return Array.from(y);
  }, children: (t, o) => ssr(et, ssrHydrationKey(), ssrStyle({ display: "inline-block", "font-family": "inherit", position: "relative", transition: s() > 0 ? "all 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67)" : "all 0.15s ease", ...c().includes(o()) ? _(o()) : G(o()) }), escape(t)) })), `position:absolute;left:0;bottom:-8px;height:2px;width:${escape(R(), true)}%` + (";background-color:" + escape(r, true)) + (";box-shadow:" + (s() === 3 ? `0 0 15px ${escape(r, true)}, 0 0 20px ${escape(r, true)}` : `0 0 10px ${escape(r, true)}`)) + ";transition:width 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67), box-shadow 0.5s ease" + (";opacity:" + (s() === 3 ? "1" : "0.7")));
}

export { rt as r };
//# sourceMappingURL=Title-C8lsFfVd.mjs.map

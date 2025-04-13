import { ssr, ssrHydrationKey, escape } from 'solid-js/web';
import { createSignal, createMemo, createEffect } from 'solid-js';
import { r, x as x$1 } from './icons-N8M97GAt2.mjs';

var f = ["<div", ' class="', '"><div class="', '"><div class="', '"><!--$-->', "<!--/--><!--$-->", '<!--/--><div class="', '"></div></div><div class="', '"><!--$-->', "<!--/--><!--$-->", '<!--/--><div class="', '"></div></div><div class="', '"><!--$-->', "<!--/--><!--$-->", '<!--/--><div class="', '"></div></div></div><div class="', '"></div></div>'], h = ["<button", ' class="CM mt-500 bg-white text-black w-185 h-100">button</button>'], b = ["<button", ' class="CM mt-500 ml-200 bg-white text-black w-185 h-100">Reset</button>'], a = ["<div", ' class="glow" style="', '"></div>'];
const [s, x] = createSignal(0);
function P() {
  const [g, S] = createSignal(null), l = 3;
  return Array.from({ length: l }, (n, r) => r + 1), createMemo(() => {
    typeof document < "u" && document.documentElement.style.setProperty("--width-upline", `${s() / l * 100}%`);
  }), createEffect((n) => {
    const r$1 = s();
    if (n !== void 0 && n !== r$1 && typeof document < "u") {
      const c = document.querySelector(`.${r.Line}`);
      if (c && (c.classList.add("flash"), setTimeout(() => c.classList.remove("flash"), 700)), r$1 > 0) for (let d = 0; d < r$1; d++) {
        const $ = document.querySelectorAll(`.${r.Connector}`)[d];
        $ && $.classList.add("connector-appear");
      }
    }
    return r$1;
  }), [ssr(f, ssrHydrationKey(), `CM mt-20 ${escape(r.ProgressBar, true)}`, `CM gap-150 ${escape(r.Steps, true)}`, `${`${escape(r.Step, true)}` || ""} ${s() >= 1 ? escape(escape(r.StepDone, true), true) : ""}`, escape(x$1[0].svg), s() >= 1 && ssr(a, ssrHydrationKey(), "position:absolute;width:100%;height:100%;border-radius:50%;z-index:-1"), `${`${escape(r.Connector, true)}` || ""} ${s() >= 1 ? escape(escape(r.ConnectorActive, true), true) : ""}`, `${`${escape(r.Step, true)}` || ""} ${s() >= 2 ? escape(escape(r.StepDone, true), true) : ""}`, escape(x$1[1].svg), s() >= 2 && ssr(a, ssrHydrationKey(), "position:absolute;width:100%;height:100%;border-radius:50%;z-index:-1"), `${`${escape(r.Connector, true)}` || ""} ${s() >= 2 ? escape(escape(r.ConnectorActive, true), true) : ""}`, `${`${escape(r.Step, true)}` || ""} ${s() >= 3 ? escape(escape(r.StepDone, true), true) : ""}`, escape(x$1[2].svg), s() >= 3 && ssr(a, ssrHydrationKey(), "position:absolute;width:100%;height:100%;border-radius:50%;z-index:-1"), `${`${escape(r.Connector, true)}` || ""} ${s() >= 3 ? escape(escape(r.ConnectorActive, true), true) : ""}`, `mt-0 ${escape(r.Line, true)}`), ssr(h, ssrHydrationKey()), ssr(b, ssrHydrationKey())];
}

export { P, s, x };
//# sourceMappingURL=index-CI1g57kZ2.mjs.map

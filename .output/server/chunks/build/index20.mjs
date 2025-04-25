import { ssr, ssrHydrationKey, escape } from 'solid-js/web';
import { createSignal, createMemo, createEffect } from 'solid-js';
import { r as r$1, x as x$1 } from './icons-N8M97GAt.mjs';

var f = ["<div", ' class="', '"><div class="', '"><div class="', '"><!--$-->', "<!--/--><!--$-->", '<!--/--><div class="', '"></div></div><div class="', '"><!--$-->', "<!--/--><!--$-->", '<!--/--><div class="', '"></div></div><div class="', '"><!--$-->', "<!--/--><!--$-->", '<!--/--><div class="', '"></div></div></div><div class="', '"></div></div>'], h = ["<button", ' class="CM mt-500 bg-white text-black w-185 h-100">button</button>'], b = ["<button", ' class="CM mt-500 ml-200 bg-white text-black w-185 h-100">Reset</button>'], a = ["<div", ' class="glow" style="', '"></div>'];
const [r, x] = createSignal(0);
function A() {
  const [g, S] = createSignal(null), l = 3;
  return Array.from({ length: l }, (n, s) => s + 1), createMemo(() => {
    typeof document < "u" && document.documentElement.style.setProperty("--width-upline", `${r() / l * 100}%`);
  }), createEffect((n) => {
    const s = r();
    if (n !== void 0 && n !== s && typeof document < "u") {
      const c = document.querySelector(`.${r$1.Line}`);
      if (c && (c.classList.add("flash"), setTimeout(() => c.classList.remove("flash"), 700)), s > 0) for (let d = 0; d < s; d++) {
        const $ = document.querySelectorAll(`.${r$1.Connector}`)[d];
        $ && $.classList.add("connector-appear");
      }
    }
    return s;
  }), [ssr(f, ssrHydrationKey(), `CM mt-20 ${escape(r$1.ProgressBar, true)}`, `CM gap-150 ${escape(r$1.Steps, true)}`, `${`${escape(r$1.Step, true)}` || ""} ${r() >= 1 ? escape(escape(r$1.StepDone, true), true) : ""}`, escape(x$1[0].svg), r() >= 1 && ssr(a, ssrHydrationKey(), "position:absolute;width:100%;height:100%;border-radius:50%;z-index:-1"), `${`${escape(r$1.Connector, true)}` || ""} ${r() >= 1 ? escape(escape(r$1.ConnectorActive, true), true) : ""}`, `${`${escape(r$1.Step, true)}` || ""} ${r() >= 2 ? escape(escape(r$1.StepDone, true), true) : ""}`, escape(x$1[1].svg), r() >= 2 && ssr(a, ssrHydrationKey(), "position:absolute;width:100%;height:100%;border-radius:50%;z-index:-1"), `${`${escape(r$1.Connector, true)}` || ""} ${r() >= 2 ? escape(escape(r$1.ConnectorActive, true), true) : ""}`, `${`${escape(r$1.Step, true)}` || ""} ${r() >= 3 ? escape(escape(r$1.StepDone, true), true) : ""}`, escape(x$1[2].svg), r() >= 3 && ssr(a, ssrHydrationKey(), "position:absolute;width:100%;height:100%;border-radius:50%;z-index:-1"), `${`${escape(r$1.Connector, true)}` || ""} ${r() >= 3 ? escape(escape(r$1.ConnectorActive, true), true) : ""}`, `mt-0 ${escape(r$1.Line, true)}`), ssr(h, ssrHydrationKey()), ssr(b, ssrHydrationKey())];
}

export { A as default, r as next, x as setNext };
//# sourceMappingURL=index20.mjs.map

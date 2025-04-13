import { createComponent, ssr, ssrHydrationKey } from 'solid-js/web';
import { createSignal, Show } from 'solid-js';
import { S, x, A as A$1 } from './prova-UkNyxD49.mjs';
import { m } from './index-CM2EfUOf.mjs';
import { A } from './components-CJF4pMQg.mjs';
import './exchangeRates-ChMJm5Xh.mjs';
import './server-fns-runtime-4T1EILgx.mjs';
import 'solid-js/web/storage';
import '../_/nitro.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:url';
import 'node:fs';
import 'node:async_hooks';
import 'node:path';
import './Card.module-nMwE8ysR.mjs';
import './db.server-BYnrqg0d.mjs';
import 'pg';
import './routing-BSDkuvr3.mjs';

var h = ["<img", ' class="absolute w-23 cursor-pointer z-100" src="/icons/edit.png">'];
function U(e) {
  const [a, n] = createSignal(false);
  return createComponent(A, { get href() {
    return e.href;
  }, onclick: (o) => {
    console.log("Link clicked. Edit mode:", m()), m() ? (console.log("Preventing default link action and stopping propagation because edit=true"), o.preventDefault(), o.stopPropagation()) : e.onClick && (console.log("Executing props.onclick"), e.onClick());
  }, onmouseenter: () => n(true), onmouseleave: () => n(false), get children() {
    return createComponent(S, { get children() {
      return createComponent(x, { class: "border-black border-4 w-[20vw] h-[12vw] rounded-xl -mt-100", get color() {
        return e.color;
      }, get children() {
        return [createComponent(A$1, { translateZ: 10, class: "absolute ml-[16.5vw] mt-[8.6vw]", as: "button", get children() {
          return createComponent(Show, { get when() {
            return a();
          }, get children() {
            return ssr(h, ssrHydrationKey());
          } });
        } }), createComponent(A$1, { translateZ: 20, class: "text-white text-[1vw] text-center mt-[1vw]", get children() {
          return e.name;
        } }), createComponent(A$1, { as: "p", translateZ: 40, class: "text-white text-[1vw] text-center", get children() {
          return [e.balance, e.currency == "USD" ? "$" : e.currency == "EUR" ? "\u20AC" : e.currency];
        } })];
      } });
    } });
  } });
}

export { U as default };
//# sourceMappingURL=index10.mjs.map

import { createComponent, ssr, ssrHydrationKey } from 'solid-js/web';
import { createSignal, Show } from 'solid-js';
import { S, x, A as A$2 } from './prova-BDuT1_bg.mjs';
import { m } from './index-D_2WSMiS.mjs';
import { A as A$1 } from './components-Bjb1kgqQ.mjs';
import './exchangeRates-Ds1olZ18.mjs';
import './Card.module-nMwE8ysR.mjs';
import './server-fns-runtime-DEO2-sKc.mjs';
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
import 'vite-plugin-node-polyfills/shims/process';
import 'vite-plugin-node-polyfills/shims/global';
import 'node:async_hooks';
import 'jsonwebtoken';
import 'pg';
import 'solid-js/store';
import 'axios';
import 'node:fs';
import 'node:path';
import './auth.server-QlO-zn0G.mjs';
import './routing-Th2JWmJV.mjs';

var h = ["<img", ' class="absolute w-23 cursor-pointer z-100" src="/icons/edit.png">'];
function A(e) {
  const [a, n] = createSignal(false);
  return createComponent(A$1, { get href() {
    return e.href;
  }, onclick: (o) => {
    console.log("Link clicked. Edit mode:", m()), m() ? (console.log("Preventing default link action and stopping propagation because edit=true"), o.preventDefault(), o.stopPropagation()) : e.onClick && (console.log("Executing props.onclick"), e.onClick());
  }, onmouseenter: () => n(true), onmouseleave: () => n(false), get children() {
    return createComponent(S, { get children() {
      return createComponent(x, { class: "border-black border-4 w-[21vw] h-[12.5vw] rounded-xl -mt-100", get color() {
        return e.color;
      }, get children() {
        return [createComponent(A$2, { translateZ: 10, class: "absolute ml-[17.7vw] mt-[9.2vw]", as: "button", get children() {
          return createComponent(Show, { get when() {
            return a();
          }, get children() {
            return ssr(h, ssrHydrationKey());
          } });
        } }), createComponent(A$2, { translateZ: 20, class: "text-white text-[1vw] text-center mt-[1vw]", get children() {
          return e.name;
        } }), createComponent(A$2, { as: "p", translateZ: 40, class: "text-white text-[1vw] text-center", get children() {
          return [e.balance, e.currency == "USD" ? "$" : e.currency == "EUR" ? "\u20AC" : e.currency];
        } })];
      } });
    } });
  } });
}

export { A as default };
//# sourceMappingURL=index14.mjs.map

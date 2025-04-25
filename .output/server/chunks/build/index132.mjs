import { createComponent, ssr, ssrHydrationKey, escape, ssrAttribute } from 'solid-js/web';
import { createSignal, Show, Switch, Match, Suspense, lazy } from 'solid-js';
import { m as mt, u as ut } from './Inputs-D1T1pLkj.mjs';
import { m } from './index-D0aODT57.mjs';
import { B } from './ButtonSparkle-BxHzGCPC2.mjs';
import 'solid-js/store';
import 'gsap';
import './server-fns-runtime-C3tiYEg6.mjs';
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
import 'axios';
import 'node:fs';
import 'node:path';
import './exchangeRates-BGrzYQig.mjs';
import './Card.module-nMwE8ysR2.mjs';
import './auth.server-ChqlnWrh.mjs';

var x = ["<img", ' src="/icons/Delete.png" class=" CM w-16 h-16 mt-[27vh] ml-[11vw] z-50">'], $ = ["<form", ' class="CM w-[25vw] mt-[25vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw] min-w-[280px] min-h-[200px]" style="', '"><div class="flex flex-row gap-100"><button>Container</button><button>Wallet</button></div></form>'], D = ["<div", ' class="color-picker-container" style="', '">', "</div>"], _ = ["<div", ' style="', '"><select name="color" value="black"><option value="black">Black</option><option value="purple">Purple</option></select></div>'], k = ["<form", ' class="CM w-[25vw] mt-[22vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw]" style="', '"><!--$-->', '<!--/--><select name="currency"><option value="USD">USD</option><option value="EUR" selected>EUR</option><option value="CHF">CHF</option></select><!--$-->', "<!--/--><!--$-->", '<!--/--><select name="type_ui" class="mb-[2vw]"><option value="card">Card</option><option value="3D">3D</option></select><!--$-->', "<!--/--><!--$-->", "<!--/--></form>"], S = ["<form", ' class="CM w-[25vw] mt-[22vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw]" style="', '"><input type="hidden" name="type"', '><input type="hidden" name="user_id"', '><input type="hidden" name="container_id"', "><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></form>"], A = ["<div", ">Loading Color Picker...</div>"];
const z = lazy(() => import('./index-WwoiZKEg2.mjs').then((m) => ({ default: m.DefaultColorPicker })));
function ie({ container_id: m$1, user_id: v }) {
  const [p, M] = createSignal(null), [s, P] = createSignal("card"), [l, h] = createSignal("grey"), [W, H] = createSignal(false), [N, T] = createSignal(null);
  return createComponent(Show, { get when() {
    return m() == -1;
  }, get children() {
    return [ssr(x, ssrHydrationKey()), createComponent(Switch, { get children() {
      return [createComponent(Match, { get when() {
        return !p();
      }, get children() {
        return ssr($, ssrHydrationKey(), "border:3px solid rgba(255, 255, 255, 0.3);border-radius:40px");
      } }), createComponent(Match, { get when() {
        return p() == "wallet";
      }, get children() {
        return ssr(k, ssrHydrationKey(), `border:3px solid ${escape(l(), true)};border-radius:40px`, escape(createComponent(mt, { type: "text", name: "walletName", placeholder: "Wallet Name", defaultError: "Provide", required: true })), escape(createComponent(mt, { type: "text", name: "category_id", placeholder: "Category" })), escape(createComponent(mt, { type: "text", name: "nation", placeholder: "nation" })), escape(createComponent(Switch, { get children() {
          return [createComponent(Match, { get when() {
            return s() == "card";
          }, get children() {
            return ssr(D, ssrHydrationKey(), "margin-bottom:2rem", escape(createComponent(Suspense, { get fallback() {
              return ssr(A, ssrHydrationKey());
            }, get children() {
              return createComponent(z, { get value() {
                return l();
              }, onChange: (w) => h(w), format: "hex" });
            } })));
          } }), createComponent(Match, { get when() {
            return s() == "3D";
          }, get children() {
            return ssr(_, ssrHydrationKey(), "margin-bottom:2rem");
          } })];
        } })), escape(createComponent(B, { text: "Add Wallet", class: "ml-[auto] mr-[auto]", size: "large", get shadowColor() {
          return `${l()}`;
        }, shadow: 10, get disabled() {
          return !ut();
        } })));
      } }), createComponent(Match, { get when() {
        return p() == "container";
      }, get children() {
        return ssr(S, ssrHydrationKey(), `border:3px solid ${escape(l(), true)};border-radius:40px`, ssrAttribute("value", escape(p(), true) || "null", false), ssrAttribute("value", escape(v, true) || "null", false), ssrAttribute("value", escape(m$1, true) || "null", false), escape(createComponent(mt, { type: "text", name: "walletName", placeholder: "Wallet Name" })), escape(createComponent(mt, { type: "text", name: "category_id", placeholder: "Category" })), escape(createComponent(B, { text: "Add Container", class: "ml-[auto] mr-[auto]", size: "large", get shadowColor() {
          return `${l()}`;
        }, shadow: 10 })));
      } })];
    } })];
  } });
}

export { ie as default };
//# sourceMappingURL=index132.mjs.map

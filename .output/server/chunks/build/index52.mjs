import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { createSignal, onMount, createEffect } from 'solid-js';
import { B } from './ButtonSparkle-BxHzGCPC2.mjs';
import { J, d as dt, u as ut, m as mt } from './Inputs-D1T1pLkj.mjs';
import { d as b, m as j } from '../_/nitro.mjs';
import { w } from './pathWallets-Cb2AeUiP.mjs';
import 'solid-js/store';
import 'gsap';
import './server-fns-runtime-C3tiYEg6.mjs';
import 'solid-js/web/storage';
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
import './getWallets.server-C5R6kBVO.mjs';
import './auth.server-ChqlnWrh.mjs';

var C = ["<button", ' type="button">Go back</button>'], M = ["<form", ' class="CM w-[25vw] mt-[15vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw] min-w-[280px] min-h-[200px]" style="', '"><!--$-->', "<!--/--><!--$-->", '<!--/--><div class="flex flex-row gap-50 ml-0"><!--$-->', "<!--/--><!--$-->", "<!--/--></div><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></form>"];
function et() {
  const [h, P] = createSignal([]), [y, z] = createSignal([]), s = 1700, n = 900, g = window.screen.availWidth || window.screen.width, f = window.screen.availHeight || window.screen.height, x = Math.max(0, (g - s) / 2), b$1 = Math.max(0, (f - n) / 2);
  try {
    window.resizeTo(s, n), window.moveTo(x, b$1), console.log(`Window resize attempted to ${s}x${n}`);
  } catch (a) {
    console.warn("Window resize failed or was blocked by the browser:", a);
  }
  onMount(() => {
    b(false), J("type", p());
  });
  const [p, m] = createSignal("income");
  async function v() {
    const a = { cause: dt("cause"), date: dt("date"), categoryId: dt("category") || null, amount: dt("amount"), walletId: dt("walletId"), type: dt("type") };
    console.log(a.walletId), await j.api.post("API/Wallets/Wallet/addTransaction", a);
  }
  return createEffect(() => {
    J("type", p()), console.log(dt("type"));
  }), [ssr(C, ssrHydrationKey()), ssr(M, ssrHydrationKey(), `border:3px solid ${ut() ? "var(--Secondary)" : "rgba(255, 255, 255, 0.3)"};border-radius:40px`, escape(createComponent(w, {})), escape(createComponent(mt, { type: "text", name: "cause", placeholder: "Cause" })), escape(createComponent(B, { text: "Income", type: "button", onClick: () => m("Income") })), escape(createComponent(B, { text: "Expense", type: "button", onClick: () => m("Expense") })), escape(createComponent(mt, { type: "text", name: "amount", placeholder: "Amount", required: true })), escape(createComponent(mt, { type: "select", name: "category", get options() {
    return h();
  }, get values() {
    return y();
  }, class: "ml-30", placeholder: "category" })), escape(createComponent(mt, { type: "date", name: "date", placeholder: "Date", class: "ml-10" })), escape(createComponent(B, { text: "Send", class: "ml-[auto] mr-[auto]", onClick: v, get disabled() {
    return !ut();
  } })))];
}

export { et as default };
//# sourceMappingURL=index52.mjs.map

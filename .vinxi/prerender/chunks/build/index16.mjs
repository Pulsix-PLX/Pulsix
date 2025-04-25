import { createComponent, ssr, ssrHydrationKey, escape, ssrAttribute } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createSignal, createResource, For, Show } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { z, B, W } from './exchangeRates-Ds1olZ18.mjs';
import { v } from './auth.server-QlO-zn0G.mjs';
import { A } from './components-Bjb1kgqQ.mjs';
import './Card.module-nMwE8ysR.mjs';
import './server-fns-runtime-DEO2-sKc.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/storage/dist/storage.js';
import '../_/nitro.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/destr@2.0.3/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/h3@1.15.1/node_modules/h3/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/node-mock-http@1.0.0/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vinxi@0.5.3_@types+node@22._43e8e15a4bb8f875bc590eea815050cc/node_modules/vinxi/lib/app-fetch.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vinxi@0.5.3_@types+node@22._43e8e15a4bb8f875bc590eea815050cc/node_modules/vinxi/lib/app-manifest.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ufo@1.5.4/node_modules/ufo/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vite-plugin-node-polyfills@_4e133e926bbaeb0b9cea849071ce5364/node_modules/vite-plugin-node-polyfills/shims/process/dist/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vite-plugin-node-polyfills@_4e133e926bbaeb0b9cea849071ce5364/node_modules/vite-plugin-node-polyfills/shims/global/dist/index.js';
import 'node:async_hooks';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pg@8.14.1/node_modules/pg/lib/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/store/dist/server.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/axios@1.8.3/node_modules/axios/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unctx@2.4.1/node_modules/unctx/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.1/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.1/node_modules/unstorage/drivers/fs.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.1/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';
import './routing-Th2JWmJV.mjs';

var _ = ["<img", ' class="absolute w-23 ml-[15.8vw] cursor-pointer z-100" src="/icons/edit.png" style="', '">'], E = ["<img", ' src="/img/wallets/backCardHolder.png" class="', '" style="', '">'], D = ["<span", ' class="text-orange-500 text-xs ml-1 cursor-help"', ">(\u26A0\uFE0F) </span>"], R = ["<span", ' class="text-red-500 text-xs cursor-help"', ">(Errore!)</span>"], U = ["<div", ' class="relative w-[17.7vw] inline-block"><img src="/img/wallets/frontCardHolder.png" class="block w-full"><p class="absolute bottom-[3.8vw] left-1/2 transform -translate-x-1/2 z-10 text-[1.2vw] text-center whitespace-nowrap w-[90%] overflow-hidden text-ellipsis">', '</p><p class="absolute bottom-[0.5vw] ml-[1vw] z-10 text-[1.3vw] whitespace-nowrap text-left"><!--$-->', "<!--/--><!--$-->", "<!--/--></p></div>"], I = ["<span", ">...</span>"];
const [m, Q] = createSignal(null);
function V(t) {
  const [w, S] = createSignal(false), u = [{ color: "", wallet: "nothing", balance: 0, currency: "USD", id: 0 }], g = "EUR", [r] = createResource(() => ({ containerId: t.id, targetCurrency: g }), async (n) => {
    const { containerId: c, targetCurrency: f } = n;
    try {
      const i = await v();
      if (i === null) throw new Error("Utente non autenticato per calcolo totale.");
      return await z(c, f, i);
    } catch (i) {
      throw console.error(`[ConvertedTotalResource] Error fetching/calculating total for container ${c}:`, i), i;
    }
  }), h = (n) => {
    console.log("Link clicked. Edit mode:", m()), m() ? (console.log("Preventing default link action and stopping propagation because edit=true"), n.preventDefault(), n.stopPropagation()) : t.onclick && (console.log("Executing props.onclick"), t.onclick());
  };
  return [createComponent(For, { get each() {
    return t.data && t.data.length > 0 ? t.data : null;
  }, children: (n, c) => createComponent(B, { get color() {
    return n.color;
  }, get wallet() {
    return n.wallet;
  }, get balance() {
    return n.balance;
  }, get position() {
    return c();
  }, get currency() {
    return n.currency;
  }, get id() {
    return n.id;
  } }) }), createComponent(A, { get href() {
    return t.href;
  }, onclick: h, get children() {
    var _a, _b, _c, _d;
    return [createComponent(Show, { get when() {
      return w();
    }, get children() {
      var _a2;
      return ssr(_, ssrHydrationKey(), `margin-top:-${escape((_a2 = t.data) == null ? void 0 : _a2.length, true) * 2 + 2}vw`);
    } }), ssr(E, ssrHydrationKey(), ` ${escape(W.backCardHolder, true)}`, `height:${((_b = escape((_a = t.data) == null ? void 0 : _a.length, true)) != null ? _b : escape(u.length, true)) * 2 + 11}vw;margin-top:-${((_d = escape((_c = t.data) == null ? void 0 : _c.length, true)) != null ? _d : escape(u.length, true)) * 2 + 2.5}vw;z-index:-10`), ssr(U, ssrHydrationKey(), escape(t.name), escape(createComponent(Show, { get when() {
      return !r.loading && r.state !== "unresolved";
    }, get fallback() {
      return ssr(I, ssrHydrationKey());
    }, get children() {
      var _a2, _b2, _c2, _d2;
      return [((_b2 = (_a2 = r()) == null ? void 0 : _a2.total_balance) != null ? _b2 : 0).toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), " ", " ", ((_c2 = r()) == null ? void 0 : _c2.currency_code) == "USD" ? "$" : ((_d2 = r()) == null ? void 0 : _d2.currency_code) == "EUR" ? "\u20AC" : g, createComponent(Show, { get when() {
        var _a3;
        return ((_a3 = r()) == null ? void 0 : _a3.warnings) && r().warnings.length > 0;
      }, get children() {
        return ssr(D, ssrHydrationKey(), ssrAttribute("title", escape(r().warnings.join(`
`), true), false));
      } })];
    } })), escape(createComponent(Show, { get when() {
      return r.error;
    }, get children() {
      return ssr(R, ssrHydrationKey(), ssrAttribute("title", escape(r.error.message, true), false));
    } })))];
  } })];
}

export { V as default, m as edit, Q as setEdit };
//# sourceMappingURL=index16.mjs.map

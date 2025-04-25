import { createComponent, ssr, ssrHydrationKey, escape } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createSignal, onMount, createResource, Switch, Match, For } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { r as rt } from './Title-C8lsFfVd2.mjs';
import { p } from './getWallets.server-C5R6kBVO.mjs';
import { v } from './auth.server-ChqlnWrh.mjs';
import { X, Y as Y$1 } from './index-0U8vmGbf.mjs';
import { m, Y } from './index-D0aODT57.mjs';
import { z } from './exchangeRates-BGrzYQig.mjs';
import './server-fns-runtime-C3tiYEg6.mjs';
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
import './prova-B1NEQR2_.mjs';
import './Inputs-D1T1pLkj.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/gsap@3.12.7/node_modules/gsap/dist/gsap.js';
import './deleteWallet-Cgff9KFR.mjs';
import './ButtonSparkle-BxHzGCPC2.mjs';
import './Card.module-nMwE8ysR2.mjs';

var U = ["<p", ' class="CM mt-100">', "</p>"], x = ["<div", ' class="', '"><!--$-->', "<!--/--><!--$-->", "<!--/--></div>"];
const [ur, C] = createSignal(null), [sr, mr] = createSignal(null);
function lr() {
  var _a, _b, _c, _d;
  const [_, I] = createSignal(null);
  onMount(async () => {
    const r = await v();
    I(r);
  });
  const [i, { mutate: D, refetch: F }] = createResource(() => ({ user: _(), editState: m() }), async (r) => p(r.user));
  function E(r) {
    var _a2;
    const n = [];
    return (_a2 = i()) == null ? void 0 : _a2.filter((e) => e.container_id == r && e.type == "wallet").forEach((e) => {
      n.push({ color: e.color, wallet: e.wallet_name, balance: e.balance, currency: e.currency, position: n.length, id: e.id });
    }), n;
  }
  const l = "EUR", [d] = createResource(() => ({ containerId: null, targetCurrency: l }), async (r) => {
    const { containerId: n, targetCurrency: e } = r;
    try {
      const o = await v();
      if (o === null) throw new Error("Utente non autenticato per calcolo totale.");
      return await z(n, e, o);
    } catch (o) {
      throw console.error(`[ConvertedTotalResource] Error fetching/calculating total for container ${n}:`, o), o;
    }
  });
  return [createComponent(rt, { title: "Wallets" }), ssr(U, ssrHydrationKey(), escape(((_b = (_a = d()) == null ? void 0 : _a.total_balance) != null ? _b : 0).toLocaleString("it-IT", { style: "currency", currency: (_d = (_c = d()) == null ? void 0 : _c.currency_code) != null ? _d : l, minimumFractionDigits: 2, maximumFractionDigits: 2 }))), createComponent(Switch, { get children() {
    return [createComponent(Match, { get when() {
      return i() && m() == null;
    }, get children() {
      return ssr(x, ssrHydrationKey(), "ml-[13vw] mt-[20vw] grid grid-cols-3 gap-x-0 gap-y-300", escape(createComponent(For, { get each() {
        return i();
      }, children: (r, n) => createComponent(Switch, { get children() {
        return createComponent(Match, { get when() {
          return r.type == "container" && r.container_id == null;
        }, get children() {
          return createComponent(Y, { get data() {
            return E(r.id);
          }, get id() {
            return r.id;
          }, get name() {
            return r.wallet_name;
          }, get currency() {
            return r.currency;
          }, get href() {
            return `/wallets/${r.id}`;
          }, onclick: () => {
            C(r.id);
          } });
        } });
      } }) })), escape(createComponent(For, { get each() {
        return i();
      }, children: (r, n) => createComponent(Switch, { get children() {
        return createComponent(Match, { get when() {
          return r.type == "wallet" && r.container_id == null;
        }, get children() {
          return createComponent(X, { get balance() {
            return r.balance;
          }, get name() {
            return r.wallet_name;
          }, get nation() {
            return r.nation;
          }, get currency() {
            return r.currency;
          }, get category() {
            return r.category_id;
          }, get color() {
            return r.color;
          }, get href() {
            return `/wallets/${r.id}`;
          }, onClick: () => C(r.id), get id() {
            return r.id;
          } });
        } });
      } }) })));
    } }), createComponent(Match, { get when() {
      return m();
    }, get children() {
      return createComponent(Y$1, {});
    } })];
  } })];
}

export { lr as default, C as setWalletId, mr as setWalletName, sr as walletName, ur as walletid };
//# sourceMappingURL=index32.mjs.map

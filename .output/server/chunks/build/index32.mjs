import { createComponent, ssr, ssrHydrationKey, escape } from 'solid-js/web';
import { createSignal, onMount, createResource, Switch, Match, For } from 'solid-js';
import { r as rt } from './Title-C8lsFfVd2.mjs';
import { p } from './getWallets.server-C5R6kBVO.mjs';
import { v } from './auth.server-ChqlnWrh.mjs';
import { X, Y as Y$1 } from './index-0U8vmGbf.mjs';
import { m, Y } from './index-D0aODT57.mjs';
import { z } from './exchangeRates-BGrzYQig.mjs';
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
import 'solid-js/store';
import 'axios';
import 'node:fs';
import 'node:path';
import './prova-B1NEQR2_.mjs';
import './Inputs-D1T1pLkj.mjs';
import 'gsap';
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

import { createComponent, ssr, ssrHydrationKey, escape } from 'solid-js/web';
import { createSignal, onMount, createResource, Switch, Match, For } from 'solid-js';
import { r as rt } from './Title-C8lsFfVd.mjs';
import { r as re, n as ne, a as ae } from './index-B54VJo2T.mjs';
import { q, j } from './exchangeRates-ChMJm5Xh.mjs';
import { m, P } from './index-CM2EfUOf.mjs';
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
import './db.server-BYnrqg0d.mjs';
import 'pg';
import './prova-UkNyxD49.mjs';
import './components-CJF4pMQg.mjs';
import './routing-BSDkuvr3.mjs';
import './Inputs-CEYxPBfP.mjs';
import 'solid-js/store';
import 'gsap';
import './action-BVKOmiKt.mjs';
import './deleteWallet-D6_HIjzQ.mjs';
import './ButtonSparkle-DNpTyev3.mjs';
import './Card.module-nMwE8ysR.mjs';

var U = ["<p", ' class="CM mt-100">', "</p>"], x = ["<div", ' class="', '"><!--$-->', "<!--/--><!--$-->", "<!--/--></div>"];
const [nr, C] = createSignal(null), [or, cr] = createSignal(null);
function ir() {
  var _a, _b, _c, _d;
  const [_, I] = createSignal(null);
  onMount(async () => {
    const r = await q();
    I(r);
  });
  const [c, { mutate: D, refetch: F }] = createResource(() => ({ user: _(), editState: m() }), async (r) => re(r.user));
  function E(r) {
    var _a2;
    const n = [];
    return (_a2 = c()) == null ? void 0 : _a2.filter((e) => e.container_id == r && e.type == "wallet").forEach((e) => {
      n.push({ color: e.color, wallet: e.wallet_name, balance: e.balance, currency: e.currency, position: n.length, id: e.id });
    }), n;
  }
  const d = "EUR", [m$1] = createResource(() => ({ containerId: null, targetCurrency: d }), async (r) => {
    const { containerId: n, targetCurrency: e } = r;
    try {
      const o = await q();
      if (o === null) throw new Error("Utente non autenticato per calcolo totale.");
      return await j(n, e, o);
    } catch (o) {
      throw console.error(`[ConvertedTotalResource] Error fetching/calculating total for container ${n}:`, o), o;
    }
  });
  return [createComponent(rt, { title: "Wallets" }), ssr(U, ssrHydrationKey(), escape(((_b = (_a = m$1()) == null ? void 0 : _a.total_balance) != null ? _b : 0).toLocaleString("it-IT", { style: "currency", currency: (_d = (_c = m$1()) == null ? void 0 : _c.currency_code) != null ? _d : d, minimumFractionDigits: 2, maximumFractionDigits: 2 }))), createComponent(Switch, { get children() {
    return [createComponent(Match, { get when() {
      return c() && m() == null;
    }, get children() {
      return ssr(x, ssrHydrationKey(), "ml-[13vw] mt-[20vw] grid grid-cols-3 gap-x-0 gap-y-300", escape(createComponent(For, { get each() {
        return c();
      }, children: (r, n) => createComponent(Switch, { get children() {
        return createComponent(Match, { get when() {
          return r.type == "container" && r.container_id == null;
        }, get children() {
          return createComponent(P, { get data() {
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
        return c();
      }, children: (r, n) => createComponent(Switch, { get children() {
        return createComponent(Match, { get when() {
          return r.type == "wallet" && r.container_id == null;
        }, get children() {
          return createComponent(ne, { get balance() {
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
      return createComponent(ae, {});
    } })];
  } })];
}

export { ir as default, C as setWalletId, cr as setWalletName, or as walletName, nr as walletid };
//# sourceMappingURL=index3.mjs.map

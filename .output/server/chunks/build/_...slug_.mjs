import { createComponent, ssr, ssrHydrationKey, escape } from 'solid-js/web';
import { createSignal, onMount, createMemo, createResource, Show, Switch, Match, For } from 'solid-js';
import { r as rt } from './Title-C8lsFfVd.mjs';
import { l as le, o as oe, n as ne, a as ae } from './index-B54VJo2T.mjs';
import { q as q$1, j } from './exchangeRates-ChMJm5Xh.mjs';
import { m, P } from './index-CM2EfUOf.mjs';
import { A, I as I$1 } from './index-2Np-G_nR.mjs';
import { p } from './deleteWallet-D6_HIjzQ.mjs';
import { N } from './index-Bep36fvr.mjs';
import { U as Ue, D as De } from './routing-BSDkuvr3.mjs';
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
import './Inputs-CEYxPBfP.mjs';
import 'solid-js/store';
import 'gsap';
import './action-BVKOmiKt.mjs';
import './ButtonSparkle-DNpTyev3.mjs';
import './Card.module-nMwE8ysR.mjs';

const [Fe, I] = createSignal(null), [Me, Ne] = createSignal(null);
var q = ["<div", ' class="CM mt-[15vw]">', "</div>"];
function B(m) {
  console.log("props", m);
  const [d, { refetch: y }] = createResource(() => m.id, A);
  return createComponent(Show, { get when() {
    return d();
  }, get children() {
    return ssr(q, ssrHydrationKey(), escape(createComponent(I$1, { get transactions() {
      return d();
    }, refetch: y })));
  } });
}
var J = ["<div", ' class="text-red-500 ml-[13vw] mt-2">Error loading data: <!--$-->', "<!--/--></div>"], Q = ["<div", ' class="ml-[13vw] mt-5">Loading...</div>'], X = ["<p", ' class="CM mt-100">', "</p>"], Z = ["<div", ' class="', '"><!--$-->', "<!--/--><!--$-->", "<!--/--></div>"], ee = ["<div", ' class="CM mt-400 text-gray-500">Nothing in this container</div>'], te = ["<div", ' class="mb-50 mt-50 z-50 px-2">', "</div>"], re = ["<div", ' class="mb-50 z-50 px-2 -mt-180">', "</div>"];
function xe() {
  const [m$1, d] = createSignal(null);
  onMount(async () => {
    try {
      const e = await q$1();
      e == null ? (console.warn("[onMount] getUserId ha restituito null/undefined."), d(null)) : d(e);
    } catch (e) {
      console.error("[onMount] Errore durante recupero userId:", e), d(null);
    }
  });
  const y = Ue(), f = createMemo(() => {
    var _a;
    const a = ((_a = y.slug) != null ? _a : "").split("/").filter((g) => g !== "").pop(), t = parseInt(a || "", 10);
    return isNaN(t) ? null : t;
  }, null), [r] = createResource(() => {
    const e = m$1(), o = f();
    return m(), e != null ? { userId: e, containerId: o } : null;
  }, async (e) => {
    var _a, _b, _c;
    const { userId: o, containerId: a } = e;
    try {
      let t = null, l = null, g = null, D = null;
      if (a === null) t = "My Wallets", l = "container", console.log("[Fetcher Updated] Caso ROOT, recupero contenuto..."), g = (_a = await le(o, null)) != null ? _a : [];
      else {
        const C = await oe(a);
        if (C && C.length > 0) {
          const E = C[0];
          t = E.wallet_name, l = E.type, l === "container" ? g = (_b = await le(o, a)) != null ? _b : [] : console.log(`[Fetcher Updated] \xC8 ${l}, non recupero contenuto.`), l === "wallet" ? D = (_c = await p(a)) != null ? _c : [] : console.log(`[Fetcher Updated] \xC8 ${l}, non recupero contenuto.`);
        } else console.warn(`[Fetcher Updated] Item non trovato per ID: ${a}`), t = "Elemento Non Trovato";
      }
      return { name: t, type: l, content: g, wallet: D };
    } catch (t) {
      throw console.error("[Fetcher Updated] Errore:", t), t;
    }
  });
  function x(e) {
    var _a;
    const o = (_a = r()) == null ? void 0 : _a.content;
    return o ? o.filter((t) => t.container_id === e && t.type === "wallet").map((t) => ({ color: t.color, wallet: t.wallet_name, balance: t.balance, currency: t.currency, id: t.id })) : [];
  }
  const w = createMemo(() => {
    var _a;
    const e = (_a = r()) == null ? void 0 : _a.content, o = f();
    return e ? e.filter((t) => t.container_id === o) : [];
  }), _ = (e, o) => `${e.endsWith("/") ? e.slice(0, -1) : e}/${o}`, v = De().pathname, T = "EUR", [W] = createResource(() => ({ containerId: f(), targetCurrency: T, edit: m() }), async (e) => {
    const { containerId: o, targetCurrency: a } = e;
    try {
      const t = await q$1();
      if (t === null) throw new Error("Utente non autenticato per calcolo totale.");
      return await j(o, a, t);
    } catch (t) {
      throw console.error(`[ConvertedTotalResource] Error fetching/calculating total for container ${o}:`, t), t;
    }
  });
  return [createComponent(Show, { get when() {
    return r.state === "ready";
  }, get fallback() {
    return createComponent(rt, { title: "Loading title..." });
  }, get children() {
    return createComponent(rt, { get title() {
      var _a, _b;
      return (_b = (_a = r()) == null ? void 0 : _a.name) != null ? _b : "Wallet";
    } });
  } }), createComponent(Show, { get when() {
    return r.error;
  }, get children() {
    return ssr(J, ssrHydrationKey(), escape(r.error.message));
  } }), createComponent(Show, { get when() {
    return r.loading || r.state === "unresolved";
  }, get children() {
    return ssr(Q, ssrHydrationKey());
  } }), createComponent(Show, { get when() {
    var _a;
    return ((_a = r()) == null ? void 0 : _a.type) === "container";
  }, get children() {
    var _a, _b, _c, _d;
    return [ssr(X, ssrHydrationKey(), escape(((_b = (_a = W()) == null ? void 0 : _a.total_balance) != null ? _b : 0).toLocaleString("it-IT", { style: "currency", currency: (_d = (_c = W()) == null ? void 0 : _c.currency_code) != null ? _d : T, minimumFractionDigits: 2, maximumFractionDigits: 2 }))), createComponent(Switch, { get children() {
      return [createComponent(Match, { get when() {
        return r.state === "ready" && r() && m() == null;
      }, get children() {
        return [ssr(Z, ssrHydrationKey(), "ml-[13vw] mt-[20vw] grid grid-cols-3 gap-x-0 gap-y-300", escape(createComponent(For, { get each() {
          return w().filter((e) => e.type === "container");
        }, children: (e) => createComponent(P, { get data() {
          return x(e.id);
        }, get id() {
          return e.id;
        }, get name() {
          return e.wallet_name;
        }, get currency() {
          return e.currency;
        }, get href() {
          return _(v, e.id);
        }, onclick: () => {
          I(e.id);
        } }) })), escape(createComponent(For, { get each() {
          return w().filter((e) => e.type === "wallet");
        }, children: (e) => createComponent(Switch, { get children() {
          return [createComponent(Match, { get when() {
            return e.type_ui === "card";
          }, get children() {
            return ssr(te, ssrHydrationKey(), escape(createComponent(ne, { get name() {
              return e.wallet_name;
            }, get balance() {
              return e.balance;
            }, get currency() {
              return e.currency;
            }, get nation() {
              return e.nation;
            }, get category() {
              return e.category_id;
            }, get color() {
              return e.color;
            }, get href() {
              return _(v, e.id);
            }, onClick: () => I(e.id), get id() {
              return e.id;
            } })));
          } }), createComponent(Match, { get when() {
            return e.type_ui === "3D";
          }, get children() {
            return ssr(re, ssrHydrationKey(), escape(createComponent(N, { get name() {
              return e.wallet_name;
            }, get balance() {
              return e.balance;
            }, get currency() {
              return e.currency;
            }, get color() {
              return e.color;
            }, get href() {
              return _(v, e.id);
            }, onClick: () => I(e.id), get id() {
              return e.id;
            } })));
          } })];
        } }) }))), createComponent(Show, { get when() {
          return w().length === 0 && r.state === "ready";
        }, get children() {
          return ssr(ee, ssrHydrationKey());
        } })];
      } }), createComponent(Match, { get when() {
        return m();
      }, get children() {
        return createComponent(ae, {});
      } })];
    } })];
  } }), createComponent(Show, { get when() {
    var _a;
    return ((_a = r()) == null ? void 0 : _a.type) === "wallet";
  }, get children() {
    return createComponent(B, { get id() {
      var _a, _b;
      return (_b = (_a = r()) == null ? void 0 : _a.wallet) == null ? void 0 : _b.id;
    }, get wallet_name() {
      var _a, _b, _c;
      return (_c = (_b = (_a = r()) == null ? void 0 : _a.wallet) == null ? void 0 : _b.wallet_name) != null ? _c : "null";
    }, get currency() {
      var _a, _b, _c;
      return (_c = (_b = (_a = r()) == null ? void 0 : _a.wallet) == null ? void 0 : _b.currency) != null ? _c : "null";
    }, get category_id() {
      var _a, _b, _c;
      return (_c = (_b = (_a = r()) == null ? void 0 : _a.wallet) == null ? void 0 : _b.category_id) != null ? _c : 0;
    }, get nation() {
      var _a, _b, _c;
      return (_c = (_b = (_a = r()) == null ? void 0 : _a.wallet) == null ? void 0 : _b.nation) != null ? _c : "null";
    }, get balance() {
      var _a, _b, _c;
      return (_c = (_b = (_a = r()) == null ? void 0 : _a.wallet) == null ? void 0 : _b.balance) != null ? _c : 0;
    }, get type() {
      var _a, _b, _c;
      return (_c = (_b = (_a = r()) == null ? void 0 : _a.wallet) == null ? void 0 : _b.type) != null ? _c : "wallet";
    }, get description() {
      var _a, _b, _c;
      return (_c = (_b = (_a = r()) == null ? void 0 : _a.wallet) == null ? void 0 : _b.description) != null ? _c : "";
    }, get user_id() {
      var _a, _b, _c;
      return (_c = (_b = (_a = r()) == null ? void 0 : _a.wallet) == null ? void 0 : _b.user_id) != null ? _c : 0;
    }, date_of_add: /* @__PURE__ */ new Date(), get container_id() {
      var _a, _b, _c;
      return (_c = (_b = (_a = r()) == null ? void 0 : _a.wallet) == null ? void 0 : _b.container_id) != null ? _c : 0;
    }, get color() {
      var _a, _b, _c;
      return (_c = (_b = (_a = r()) == null ? void 0 : _a.wallet) == null ? void 0 : _b.color) != null ? _c : "null";
    }, get type_ui() {
      var _a, _b, _c;
      return (_c = (_b = (_a = r()) == null ? void 0 : _a.wallet) == null ? void 0 : _b.type_ui) != null ? _c : "null";
    } });
  } })];
}

export { xe as default };
//# sourceMappingURL=_...slug_.mjs.map

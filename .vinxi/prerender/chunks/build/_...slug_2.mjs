import { createComponent, ssr, ssrHydrationKey, escape, ssrAttribute } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createSignal, onMount, createMemo, createResource, Show, Switch, Match, For, Suspense, lazy, onCleanup, createEffect } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { r as rt } from './Title-C8lsFfVd2.mjs';
import { N, g } from './getWallets.server-C5R6kBVO.mjs';
import { v } from './auth.server-ChqlnWrh.mjs';
import { m, Y } from './index-D0aODT57.mjs';
import { z } from './exchangeRates-BGrzYQig.mjs';
import { X, Y as Y$1 } from './index-0U8vmGbf.mjs';
import { A, I } from './index-BQH3GIDW.mjs';
import { p } from './deleteWallet-Cgff9KFR.mjs';
import { U as Ue, D as De$1, M as Me } from '../_/nitro.mjs';
import { m as mt, u as ut$1 } from './Inputs-D1T1pLkj.mjs';
import { B } from './ButtonSparkle-BxHzGCPC2.mjs';
import './server-fns-runtime-C3tiYEg6.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/storage/dist/storage.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vite-plugin-node-polyfills@_4e133e926bbaeb0b9cea849071ce5364/node_modules/vite-plugin-node-polyfills/shims/process/dist/index.js';
import './Card.module-nMwE8ysR2.mjs';
import './prova-B1NEQR2_.mjs';
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
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/gsap@3.12.7/node_modules/gsap/dist/gsap.js';

const [ct, k] = createSignal(null), [st, ut] = createSignal(null);
var ae = ["<div", ' class="CM mt-[15vw]">', "</div>"];
function oe(o) {
  console.log("props", o);
  const [p, { refetch: h }] = createResource(() => o.id, A);
  return createComponent(Show, { get when() {
    return p();
  }, get children() {
    return ssr(ae, ssrHydrationKey(), escape(createComponent(I, { get transactions() {
      return p();
    }, refetch: h })));
  } });
}
var le = ["<div", ' style="', '">Loading...</div>'], ie = ["<div", ' style="', '"><strong>Errore Caricamento Spline</strong><pre style="', '">', "</pre></div>"], ce = ["<canvas", ' style="', '"></canvas>'], se = ["<img", ' class="absolute ml-[20.7vw] -mt-[6vw] w-23" src="/icons/edit.png">'], ue = ["<div", ' class="landing-container"><div class="spline-wrapper" style="', '"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></div></div>"];
function de(o) {
  const [p, h] = createSignal(false), y = () => {
    switch (console.log(`[Card3D ${o.id}] Calcolo URL per colore: ${o.color}`), o.color) {
      case "purple":
        return "https://prod.spline.design/j0mVtZ9nPBu6RBRy/scene.splinecode";
      default:
        return "https://prod.spline.design/mzKeaOgjz2ILR0uC/scene.splinecode";
    }
  };
  onMount(() => {
    console.error(`[Card3D ${o.id}] Errore: Canvas ref non trovato in onMount!`), onCleanup(() => {
      console.log(`[Card3D ${o.id}] Cleanup: reset isCanvasReady.`), h(false);
    });
  });
  const [r] = createResource(() => p() ? y() : null, async (a) => {
    throw console.error(`[Card3D ${o.id}] Fetcher: CanvasRef \xE8 nullo! Impossibile caricare.`), new Error("Canvas element reference is missing.");
  });
  createEffect((a) => {
    const s = r();
    return a && a !== s && (console.log(`[Card3D ${o.id}] createEffect[cleanup]: Dispose istanza Spline precedente.`), a.dispose()), s;
  }, void 0), onCleanup(() => {
    const a = r.latest;
    a ? (console.log(`[Card3D ${o.id}] onCleanup: Dispose istanza Spline finale.`), a.dispose()) : console.log(`[Card3D ${o.id}] onCleanup: Nessuna istanza Spline da pulire.`);
  }), createEffect(() => {
    var _a;
    const a = r();
    if (!a || r.loading || r.error) return;
    console.log(`[Card3D ${o.id}] Effetto Variabili: Esecuzione...`);
    const s = "Group 2", n = { x: 1.2, y: 1.2, z: 1.2 }, d = "wallet_name", f = o.name, D = "balance", z = (g) => {
      switch (g) {
        case "EUR":
          return "\u20AC";
        case "USD":
          return "$";
        case "GBP":
          return "\xA3";
        case "CHF":
          return "CHF";
        case "CAD":
          return "C$";
        case "AUD":
          return "A$";
        case "JPY":
          return "\xA5";
        case "CNY":
          return "\xA5";
        case "INR":
          return "\u20B9";
        case "BRL":
          return "R$";
        case "MXN":
          return "$";
        case "NZD":
          return "$";
        case "SGD":
          return "$";
        case "HKD":
          return "$";
        case "SEK":
          return "kr";
        case "NOK":
          return "kr";
        case "DKK":
          return "kr";
        case "PLN":
          return "z\u0142";
        case "CZK":
          return "K\u010D";
        case "HUF":
          return "Ft";
        case "RUB":
          return "\u20BD";
        case "TRY":
          return "\u20BA";
        case "ZAR":
          return "R";
        case "AED":
          return "\u062F. \u0625";
        default:
          return g;
      }
    }, C = `${o.balance} ${z(o.currency)}`;
    console.log(`[Card3D ${o.id}] -> Aggiorno: ${d}=${f}, ${D}=${C}`);
    try {
      a.setVariable(d, f), a.setVariable(D, C);
      const g = a.findObjectByName(s);
      g ? typeof ((_a = g == null ? void 0 : g.scale) == null ? void 0 : _a.x) == "number" ? Object.assign(g.scale, n) : console.warn(`[Card3D ${o.id}] -> ATTENZIONE: 'scale' non trovato su '${s}'.`) : console.warn(`[Card3D ${o.id}] -> ATTENZIONE: Oggetto '${s}' non trovato.`);
    } catch (g) {
      console.error(`[Card3D ${o.id}] -> ERRORE durante interazione Spline:`, g);
    }
  }), Me();
  const [S, w] = createSignal(true), [$, U] = createSignal(false), [b, R] = createSignal(0), [_, e] = createSignal(false);
  return ssr(ue, ssrHydrationKey(), "width:80%;height:500px;position:relative", escape(createComponent(Show, { get when() {
    return r.loading;
  }, get children() {
    return ssr(le, ssrHydrationKey(), "width:90%;height:45%;inset:0;margin-top:130px;background:rgba(0, 0, 0, 0.6);display:flex;justify-content:center;align-items:center;border-radius:8px;z-index:10;color:white;font-size:1.1em");
  } })), escape(createComponent(Show, { get when() {
    return r.error && !r.loading;
  }, get children() {
    var _a;
    return ssr(ie, ssrHydrationKey(), "position:absolute;inset:0;background:rgba(255, 200, 200, 0.9);color:darkred;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:15px;border-radius:8px;z-index:10;text-align:center;font-size:0.9em", "margin-top:8px;white-space:pre-wrap;max-height:100px;overflow:auto", escape((_a = r.error) == null ? void 0 : _a.message) || escape(JSON.stringify(r.error)));
  } })), escape(createComponent(Suspense, { get fallback() {
    return [];
  }, get children() {
    return ssr(ce, ssrHydrationKey(), "width:100%;height:100%;display:block;outline:none" + (";opacity:" + (r.loading || r.error ? 0.3 : 1)) + ";background-color:transparent;transition:opacity 0.4s ease-in-out");
  } })), escape(createComponent(Show, { get when() {
    return _();
  }, get children() {
    return ssr(se, ssrHydrationKey());
  } })));
}
var ge = ["<img", ' src="/icons/Delete.png" class=" CM w-16 h-16 mt-[27vh] ml-[11vw] z-50">'], me = ["<form", ' class="CM w-[25vw] mt-[25vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw] min-w-[280px] min-h-[200px]" style="', '"><div class="flex flex-row gap-100"><button>Container</button><button>Wallet</button></div></form>'], pe = ["<div", ' class="color-picker-container" style="', '">', "</div>"], he = ["<div", ' style="', '"><select name="color" value="black"><option value="black">Black</option><option value="purple">Purple</option></select></div>'], we = ["<form", ' class="CM w-[25vw] mt-[22vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw]" style="', '"><!--$-->', '<!--/--><select name="currency"><option value="USD">USD</option><option value="EUR" selected>EUR</option><option value="CHF">CHF</option></select><!--$-->', "<!--/--><!--$-->", '<!--/--><select name="type_ui" class="mb-[2vw]"><option value="card">Card</option><option value="3D">3D</option></select><!--$-->', "<!--/--><!--$-->", "<!--/--></form>"], fe = ["<form", ' class="CM w-[25vw] mt-[22vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw]" style="', '"><input type="hidden" name="type"', '><input type="hidden" name="user_id"', '><input type="hidden" name="container_id"', "><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></form>"], ve = ["<div", ">Loading Color Picker...</div>"];
const ye = lazy(() => import('./index-WwoiZKEg2.mjs').then((o) => ({ default: o.DefaultColorPicker })));
function $e({ container_id: o, user_id: p }) {
  const [h, y] = createSignal(null), [r, S] = createSignal("card"), [w, $] = createSignal("grey"), [U, b] = createSignal(false), [R, _] = createSignal(null);
  return createComponent(Show, { get when() {
    return m() == -1;
  }, get children() {
    return [ssr(ge, ssrHydrationKey()), createComponent(Switch, { get children() {
      return [createComponent(Match, { get when() {
        return !h();
      }, get children() {
        return ssr(me, ssrHydrationKey(), "border:3px solid rgba(255, 255, 255, 0.3);border-radius:40px");
      } }), createComponent(Match, { get when() {
        return h() == "wallet";
      }, get children() {
        return ssr(we, ssrHydrationKey(), `border:3px solid ${escape(w(), true)};border-radius:40px`, escape(createComponent(mt, { type: "text", name: "walletName", placeholder: "Wallet Name", defaultError: "Provide", required: true })), escape(createComponent(mt, { type: "text", name: "category_id", placeholder: "Category" })), escape(createComponent(mt, { type: "text", name: "nation", placeholder: "nation" })), escape(createComponent(Switch, { get children() {
          return [createComponent(Match, { get when() {
            return r() == "card";
          }, get children() {
            return ssr(pe, ssrHydrationKey(), "margin-bottom:2rem", escape(createComponent(Suspense, { get fallback() {
              return ssr(ve, ssrHydrationKey());
            }, get children() {
              return createComponent(ye, { get value() {
                return w();
              }, onChange: (e) => $(e), format: "hex" });
            } })));
          } }), createComponent(Match, { get when() {
            return r() == "3D";
          }, get children() {
            return ssr(he, ssrHydrationKey(), "margin-bottom:2rem");
          } })];
        } })), escape(createComponent(B, { text: "Add Wallet", class: "ml-[auto] mr-[auto]", size: "large", get shadowColor() {
          return `${w()}`;
        }, shadow: 10, get disabled() {
          return !ut$1();
        } })));
      } }), createComponent(Match, { get when() {
        return h() == "container";
      }, get children() {
        return ssr(fe, ssrHydrationKey(), `border:3px solid ${escape(w(), true)};border-radius:40px`, ssrAttribute("value", escape(h(), true) || "null", false), ssrAttribute("value", escape(p, true) || "null", false), ssrAttribute("value", escape(o, true) || "null", false), escape(createComponent(mt, { type: "text", name: "walletName", placeholder: "Wallet Name" })), escape(createComponent(mt, { type: "text", name: "category_id", placeholder: "Category" })), escape(createComponent(B, { text: "Add Container", class: "ml-[auto] mr-[auto]", size: "large", get shadowColor() {
          return `${w()}`;
        }, shadow: 10 })));
      } })];
    } })];
  } });
}
var Ce = ["<div", ' class="text-red-500 ml-[13vw] mt-2">Error loading data: <!--$-->', "<!--/--></div>"], be = ["<div", ' class="ml-[13vw] mt-5">Loading...</div>'], _e = ["<div", ' class="', '"><button type="button">Add Wallet</button></div>'], De = ["<p", ' class="CM mt-100">', "</p>"], xe = ["<div", ' class="', '"><!--$-->', "<!--/--><!--$-->", "<!--/--></div>"], Ie = ["<div", ' class="CM mt-400 text-gray-500">Nothing in this container</div>'], Re = ["<div", ' class="mb-50 mt-50 z-50 px-2">', "</div>"], Ee = ["<div", ' class="mb-50 z-50 px-2 -mt-180">', "</div>"];
function dt() {
  const [o, p$1] = createSignal(null);
  onMount(async () => {
    try {
      const e = await v();
      e == null ? (console.warn("[onMount] getUserId ha restituito null/undefined."), p$1(null)) : p$1(e);
    } catch (e) {
      console.error("[onMount] Errore durante recupero userId:", e), p$1(null);
    }
  });
  const h = Ue(), y = createMemo(() => {
    var _a;
    const s = ((_a = h.slug) != null ? _a : "").split("/").filter((f) => f !== "").pop(), n = parseInt(s || "", 10);
    return isNaN(n) ? null : n;
  }, null), [r] = createResource(() => {
    const e = o(), a = y();
    return m(), e != null ? { userId: e, containerId: a } : null;
  }, async (e) => {
    var _a, _b, _c;
    const { userId: a, containerId: s } = e;
    try {
      let n = null, d = null, f = null, D = null;
      if (s === null) n = "My Wallets", d = "container", console.log("[Fetcher Updated] Caso ROOT, recupero contenuto..."), f = (_a = await N(a, null)) != null ? _a : [];
      else {
        const C = await g(s);
        if (C && C.length > 0) {
          const g = C[0];
          n = g.wallet_name, d = g.type, d === "container" ? (f = (_b = await N(a, s)) != null ? _b : [], f == -1 && (window.location.href = "/LoginRegistration")) : console.log(`[Fetcher Updated] \xC8 ${d}, non recupero contenuto.`), d === "wallet" ? D = (_c = await p(s)) != null ? _c : [] : console.log(`[Fetcher Updated] \xC8 ${d}, non recupero contenuto.`);
        } else console.warn(`[Fetcher Updated] Item non trovato per ID: ${s}`), n = "Elemento Non Trovato";
      }
      return { name: n, type: d, content: f, wallet: D };
    } catch (n) {
      throw window.location.href = "/LoginRegistration", console.error("[Fetcher Updated] Errore:", n), n;
    }
  });
  function S(e) {
    var _a;
    const a = (_a = r()) == null ? void 0 : _a.content;
    return a ? a.filter((n) => n.container_id === e && n.type === "wallet").map((n) => ({ color: n.color, wallet: n.wallet_name, balance: n.balance, currency: n.currency, id: n.id })) : [];
  }
  const w = createMemo(() => {
    var _a;
    const e = (_a = r()) == null ? void 0 : _a.content, a = y();
    return e ? e.filter((n) => n.container_id === a) : [];
  }), $ = (e, a) => `${e.endsWith("/") ? e.slice(0, -1) : e}/${a}`, b = De$1().pathname, R = "EUR", [_] = createResource(() => ({ containerId: y(), targetCurrency: R, edit: m() }), async (e) => {
    const { containerId: a, targetCurrency: s } = e;
    try {
      const n = await v();
      if (n === null) throw new Error("Utente non autenticato per calcolo totale.");
      return await z(a, s, n);
    } catch (n) {
      throw console.error(`[ConvertedTotalResource] Error fetching/calculating total for container ${a}:`, n), n;
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
    return ssr(Ce, ssrHydrationKey(), escape(r.error.message));
  } }), createComponent(Show, { get when() {
    return r.loading || r.state === "unresolved";
  }, get children() {
    return ssr(be, ssrHydrationKey());
  } }), createComponent(Show, { get when() {
    var _a;
    return ((_a = r()) == null ? void 0 : _a.type) === "container";
  }, get children() {
    var _a, _b, _c, _d;
    return [ssr(_e, ssrHydrationKey(), "CM ml-[10vw]"), createComponent($e, { get container_id() {
      return y();
    }, get user_id() {
      return o();
    } }), ssr(De, ssrHydrationKey(), escape(((_b = (_a = _()) == null ? void 0 : _a.total_balance) != null ? _b : 0).toLocaleString("it-IT", { style: "currency", currency: (_d = (_c = _()) == null ? void 0 : _c.currency_code) != null ? _d : R, minimumFractionDigits: 2, maximumFractionDigits: 2 }))), createComponent(Switch, { get children() {
      return [createComponent(Match, { get when() {
        return r.state === "ready" && r() && m() == null;
      }, get children() {
        return [ssr(xe, ssrHydrationKey(), "ml-[13vw] mt-[20vw] grid grid-cols-3 gap-x-0 gap-y-300", escape(createComponent(For, { get each() {
          return w().filter((e) => e.type === "container");
        }, children: (e) => createComponent(Y, { get data() {
          return S(e.id);
        }, get id() {
          return e.id;
        }, get name() {
          return e.wallet_name;
        }, get currency() {
          return e.currency;
        }, get href() {
          return $(b, e.id);
        }, onclick: () => {
          k(e.id);
        } }) })), escape(createComponent(For, { get each() {
          return w().filter((e) => e.type === "wallet");
        }, children: (e) => createComponent(Switch, { get children() {
          return [createComponent(Match, { get when() {
            return e.type_ui === "card";
          }, get children() {
            return ssr(Re, ssrHydrationKey(), escape(createComponent(X, { get name() {
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
              return $(b, e.id);
            }, onClick: () => k(e.id), get id() {
              return e.id;
            } })));
          } }), createComponent(Match, { get when() {
            return e.type_ui === "3D";
          }, get children() {
            return ssr(Ee, ssrHydrationKey(), escape(createComponent(de, { get name() {
              return e.wallet_name;
            }, get balance() {
              return e.balance;
            }, get currency() {
              return e.currency;
            }, get color() {
              return e.color;
            }, get href() {
              return $(b, e.id);
            }, onClick: () => k(e.id), get id() {
              return e.id;
            } })));
          } })];
        } }) }))), createComponent(Show, { get when() {
          return w().length === 0 && r.state === "ready";
        }, get children() {
          return ssr(Ie, ssrHydrationKey());
        } })];
      } }), createComponent(Match, { get when() {
        return m();
      }, get children() {
        return createComponent(Y$1, {});
      } })];
    } })];
  } }), createComponent(Show, { get when() {
    var _a;
    return ((_a = r()) == null ? void 0 : _a.type) === "wallet";
  }, get children() {
    return createComponent(oe, { get id() {
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

export { dt as default };
//# sourceMappingURL=_...slug_2.mjs.map

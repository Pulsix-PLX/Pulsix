import { w, D } from './db.server-Cxzv6220.mjs';
import { createComponent, ssr, ssrHydrationKey, ssrAttribute, escape } from 'solid-js/web';
import { createSignal, Show, createResource, Switch, Match, Suspense, lazy } from 'solid-js';
import { S, x, A as A$1 } from './prova-BQfA7nlw.mjs';
import { m, L } from './index-DYZ-zTTq.mjs';
import { A } from '../_/nitro.mjs';
import { v as ve } from './Inputs-BxVpbjg0.mjs';
import { d, p, D as D$1, x as x$1 } from './deleteWallet-CDUDB5HW.mjs';
import { B as B$1 } from './ButtonSparkle-DNpTyev32.mjs';

const R = w(async function(r) {
  var _a;
  if (console.log(`[Server Function:fetchWalletsForUserId] Fetching per userId: ${r}`), isNaN(r)) throw new Error("User ID non valido fornito a fetchWalletsForUserId.");
  try {
    return (_a = (await D.query("SELECT * FROM wallets WHERE user_id = $1 ORDER BY wallet_name", [r])).rows) != null ? _a : [];
  } catch (l) {
    throw console.error("[Server Function:fetchWalletsForUserId] Errore DB:", l), new Error("Errore recupero wallets.");
  }
}, "src_routes_API_Wallets_getWallets_server_ts--getWallets_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server="), te = R, M = w(async function(r, l) {
  var _a;
  const n = "[Server Function:getWalletsContainerEnhancedWithDeleteCheck]";
  if (console.log(`${n} Fetching per userId: ${r}, containerId: ${l}`), isNaN(r)) throw console.error(`${n} User ID non valido fornito.`), new Error("User ID non valido fornito.");
  if (l !== null && (typeof l != "number" || isNaN(l))) throw console.error(`${n} Container ID non valido fornito (Type: ${typeof l}, Value: ${l}).`), new Error("Container ID non valido fornito.");
  const i = l === null;
  try {
    const a = `
            WITH CombinedWallets AS (
                -- Selezione 1: Figli diretti (Livello N) - Devono essere NON eliminati
                SELECT
                    wn.*
                FROM
                    wallets wn
                WHERE
                    wn.user_id = $1
                    AND ${i ? "wn.container_id IS NULL" : "wn.container_id = $2"}
                    AND wn.date_of_delete IS NULL  -- <<< Aggiunto: Esclude elementi eliminati al Livello N

                UNION ALL

                -- Selezione 2: Figli dei Sotto-Container (Livello N+1)
                -- Devono essere NON eliminati E il loro genitore container (Livello N) NON deve essere eliminato
                SELECT
                    w_n_plus_1.*
                FROM
                    wallets w_n_plus_1
                JOIN
                    wallets wn ON w_n_plus_1.container_id = wn.id -- Join con il genitore (Livello N)
                WHERE
                    wn.user_id = $1                                   -- Genitore appartiene all'utente
                    AND ${i ? "wn.container_id IS NULL" : "wn.container_id = $2"} -- Genitore \xE8 al Livello N corretto
                    AND wn.type = 'container'                       -- Genitore \xE8 un container
                    AND wn.date_of_delete IS NULL                   -- <<< Aggiunto: Genitore NON deve essere eliminato
                    AND w_n_plus_1.user_id = $1                     -- Nipote appartiene all'utente
                    AND w_n_plus_1.date_of_delete IS NULL           -- <<< Aggiunto: Nipote NON deve essere eliminato
                    -- Potresti aggiungere qui "AND w_n_plus_1.type = 'wallet'" se vuoi SOLO i wallet al livello N+1
            )
            -- Seleziona tutto dalla CTE e ordina
            SELECT *
            FROM CombinedWallets
            ORDER BY
                COALESCE(container_id, -1), -- Raggruppa per genitore (root prima)
                type DESC,                  -- Container prima di wallet all'interno del gruppo
                wallet_name;                -- Ordine alfabetico per nome
        `, s = i ? [r] : [r, l];
    return console.log(`${n} Query: ${a.replace(/\s+/g, " ").trim()}, Params: ${JSON.stringify(s)}`), (_a = (await D.query(a, s)).rows) != null ? _a : [];
  } catch (a) {
    throw console.error(`${n} Errore DB:`, a), a.code && console.error(`DB Error Code: ${a.code}, Message: ${a.message}`), new Error(`Errore DB durante recupero enhanced wallets (con check delete) per container ${l}.`);
  }
}, "src_routes_API_Wallets_getWallets_server_ts--getWalletsContainer_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server="), re = M;
w(async function(r) {
  var _a, _b, _c;
  const l = "[Server Function:getRecursiveWalletBalance]";
  if (console.log(`${l} Calcolo somma per container ID: ${r}`), typeof r != "number" || isNaN(r) || r <= 0) throw console.error(`${l} ID container non valido fornito: ${r}`), new Error("ID container di partenza non valido.");
  try {
    const n = `
            WITH RECURSIVE ContainerHierarchy AS (
                -- Anchor Member: Seleziona i figli diretti del container iniziale ($1)
                -- che NON sono stati eliminati. Include anche il tipo per filtrare dopo.
                SELECT
                    id, balance, container_id, type -- Includi 'type'
                FROM
                    public.wallets
                WHERE
                    container_id = $1
                    AND date_of_delete IS NULL -- <<< Filtro: Esclude figli diretti eliminati

                UNION ALL

                -- Recursive Member: Seleziona i figli (w) degli elementi gi\xE0 trovati (ch)
                -- assicurandosi che i figli (w) NON siano stati eliminati.
                -- La ricorsione si ferma automaticamente se un container 'ch' era eliminato
                -- perch\xE9 non sarebbe stato selezionato nel passo precedente.
                SELECT
                    w.id, w.balance, w.container_id, w.type -- Includi 'type'
                FROM
                    public.wallets w
                JOIN
                    ContainerHierarchy ch ON w.container_id = ch.id -- Join con il risultato precedente
                WHERE
                    w.date_of_delete IS NULL -- <<< Filtro: Esclude nipoti (o livelli inferiori) eliminati
            )
            -- Seleziona la somma dei bilanci dalla gerarchia risultante,
            -- MA SOLO per gli elementi che sono di tipo 'wallet'.
            -- Usa COALESCE per restituire 0 se non ci sono wallet o SUM \xE8 NULL.
            SELECT COALESCE(SUM(balance), 0) AS total_balance
            FROM ContainerHierarchy
            WHERE type = 'wallet'; -- <<< Filtro: Somma solo i bilanci dei WALLET effettivi
        `, i = [r];
    console.log(`${l} Query: ${n.replace(/\s+/g, " ").trim()}, Params: ${JSON.stringify(i)}`);
    const s = (_c = (_b = (_a = (await D.query(n, i)).rows) == null ? void 0 : _a[0]) == null ? void 0 : _b.total_balance) != null ? _c : 0;
    return console.log(`${l} Somma calcolata: ${s} per container ID: ${r}`), s;
  } catch (n) {
    throw console.error(`${l} Errore DB durante calcolo somma ricorsiva per ${r}:`, n), n.code && console.error(`DB Error Code: ${n.code}, Message: ${n.message}`), new Error(`Errore recupero somma wallets per container ${r}.`);
  }
}, "src_routes_API_Wallets_getWallets_server_ts--getRecursiveWalletBalance_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server=");
const U = w(async function(r) {
  var _a;
  try {
    return (_a = (await D.query("SELECT wallet_name, type FROM wallets WHERE id = $1;", [r])).rows) != null ? _a : [];
  } catch (l) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", l), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_getWallets_server_ts--getWalletName_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server="), le = U;
var F = ["<img", ' class="absolute w-23 cursor-pointer z-100" src="/icons/edit.png">'];
function oe(e) {
  const [r, l] = createSignal(false);
  return createComponent(A, { get href() {
    return e.href;
  }, onclick: (i) => {
    console.log("Link clicked. Edit mode:", m()), m() ? (console.log("Preventing default link action and stopping propagation because edit=true"), i.preventDefault(), i.stopPropagation()) : e.onClick && (console.log("Executing props.onclick"), e.onClick());
  }, onmouseenter: () => l(true), onmouseleave: () => l(false), get children() {
    return createComponent(S, { get children() {
      return createComponent(x, { class: "border-black border-4 w-[20vw] h-[12vw] rounded-xl -mt-100", get color() {
        return e.color;
      }, get children() {
        return [createComponent(A$1, { translateZ: 10, class: "absolute ml-[16.5vw] mt-[8.6vw]", as: "button", get children() {
          return createComponent(Show, { get when() {
            return r();
          }, get children() {
            return ssr(F, ssrHydrationKey());
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
var I = ["<img", ' src="/icons/Delete.png" class=" CM w-20 h-20 mt-[27vh] ml-[11vw] z-50">'], P = ["<form", ' method="post" class="CM w-[25vw] mt-[25vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw] min-w-[280px] min-h-[200px]" style="', '"><input type="hidden" name="id"', '><input type="hidden" name="type"', "><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", '<!--/--><button type="button" class="', '" style="', '">Delete</button></form>'], T = ["<img", ' src="/icons/Delete.png" class=" CM w-20 h-20 mt-[24vh] ml-[11vw] z-50">'], z = ["<form", ' method="post" class="CM w-[25vw] mt-[22vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw]" style="', '"><input type="hidden" name="id"', '><input type="hidden" name="type"', "><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", '<!--/--><div class="color-picker-container" style="', '">', '</div><input type="hidden"', ' name="color"><!--$-->', '<!--/--><button type="button" class="', '" style="', '">Delete</button></form>'], B = ["<div", ' class="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-40"></div>'], H = ["<div", ' class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[17vw] w-[27vw] rounded shadow-md z-50" style="', '"><p class="', '">Are you sure to delete this wallet?</p><p class="', '">It will be in the trash</p><p class="', '">you can restore it in 30 days</p><div class="flex flex-row justify-center items-center gap-34 mt-[3vw]"><!--$-->', "<!--/--><!--$-->", "<!--/--></div></div>"], q = ["<div", ">Loading Color Picker...</div>"];
const V = lazy(() => import('./index-WwoiZKEg2.mjs').then((e) => ({ default: e.DefaultColorPicker })));
function ne() {
  const [e] = createResource(m(), d), [r, l] = createSignal(), [n, i] = createSignal(false), [a, s] = createSignal(null);
  return createComponent(Show, { get when() {
    return e();
  }, get children() {
    return [createComponent(Switch, { get children() {
      return [createComponent(Match, { get when() {
        var _a;
        return ((_a = e()) == null ? void 0 : _a.type) == "container";
      }, get children() {
        var _a, _b;
        return [ssr(I, ssrHydrationKey()), ssr(P, ssrHydrationKey() + ssrAttribute("action", escape(p, true), false), "border:3px solid rgba(255, 255, 255, 0.3);border-radius:40px", ssrAttribute("value", escape((_a = e()) == null ? void 0 : _a.id, true), false), ssrAttribute("value", escape((_b = e()) == null ? void 0 : _b.type, true), false), escape(createComponent(ve, { type: "text", name: "walletName", placeholder: "Wallet Name", get defaultValue() {
          var _a2;
          return (_a2 = e()) == null ? void 0 : _a2.wallet_name;
        } })), escape(createComponent(ve, { type: "text", name: "category_id", placeholder: "Category", get defaultValue() {
          var _a2, _b2;
          return (_b2 = (_a2 = e()) == null ? void 0 : _a2.category_id) == null ? void 0 : _b2.toString();
        } })), escape(createComponent(B$1, { get text() {
          var _a2;
          return `Set ${((_a2 = e()) == null ? void 0 : _a2.type) == "container" ? "Container" : "Wallet"}`;
        }, class: "ml-[auto] mr-[auto]", onClick: () => setTimeout(() => L(null), 500) })), ` text-white font-bold py-2 px-4 rounded ml-[auto] mr-[auto] mt-[1vw] ${escape(D$1.buttonDelete, true)}`, "border:2px solid red;border-radius:20px;width:100px;height:50px")];
      } }), createComponent(Match, { get when() {
        var _a;
        return ((_a = e()) == null ? void 0 : _a.type) == "wallet";
      }, get children() {
        var _a, _b, _c;
        return [ssr(T, ssrHydrationKey()), ssr(z, ssrHydrationKey() + ssrAttribute("action", escape(p, true), false), `border:3px solid ${escape(r(), true)};border-radius:40px`, ssrAttribute("value", escape((_a = e()) == null ? void 0 : _a.id, true), false), ssrAttribute("value", escape((_b = e()) == null ? void 0 : _b.type, true), false), escape(createComponent(ve, { type: "text", name: "walletName", placeholder: "Wallet Name", get defaultValue() {
          var _a2;
          return (_a2 = e()) == null ? void 0 : _a2.wallet_name;
        } })), escape(createComponent(ve, { type: "text", name: "currency", placeholder: "Currency", get defaultValue() {
          var _a2;
          return (_a2 = e()) == null ? void 0 : _a2.currency;
        } })), escape(createComponent(ve, { type: "text", name: "category_id", placeholder: "Category", get defaultValue() {
          var _a2, _b2;
          return (_b2 = (_a2 = e()) == null ? void 0 : _a2.category_id) == null ? void 0 : _b2.toString();
        } })), escape(createComponent(ve, { type: "text", name: "nation", placeholder: "nation", get defaultValue() {
          var _a2;
          return (_a2 = e()) == null ? void 0 : _a2.nation;
        } })), "margin-bottom:2rem", escape(createComponent(Suspense, { get fallback() {
          return ssr(q, ssrHydrationKey());
        }, get children() {
          return createComponent(V, { get value() {
            var _a2;
            return r() || ((_a2 = e()) == null ? void 0 : _a2.color) || "#ff000000";
          }, onChange: (E) => l(E), format: "hex" });
        } })), ssrAttribute("value", escape(r(), true) || escape((_c = e()) == null ? void 0 : _c.color, true) || "#ff000000", false), escape(createComponent(B$1, { get text() {
          var _a2;
          return `Set ${((_a2 = e()) == null ? void 0 : _a2.type) == "container" ? "Container" : "Wallet"}`;
        }, class: "ml-[auto] mr-[auto]", size: "large", get shadowColor() {
          return `${r()}`;
        }, shadow: 10, onClick: () => setTimeout(() => L(null), 500) })), ` text-white font-bold py-2 px-4 rounded ml-[auto] mr-[auto] mt-[1vw] ${escape(D$1.buttonDelete, true)}`, "border:2px solid red;border-radius:20px;width:100px;height:50px")];
      } })];
    } }), createComponent(Show, { get when() {
      return n();
    }, get children() {
      return [ssr(B, ssrHydrationKey()), ssr(H, ssrHydrationKey(), `background-color:#151515;border-radius:40px;border:3px solid ${escape(r(), true) || "#ffffffff"}`, `${escape(D$1.text, true)} text-[1.4vw] font-bold text-center`, `${a() == "cancel" ? escape(D$1.textCancel, true) : a() == "confirm" ? escape(D$1.textDelete, true) : escape(D$1.paragraf, true)} text-[1vw] font-bold text-center mt-[2vw]`, `${a() == "cancel" ? escape(D$1.textCancel, true) : a() == "confirm" ? escape(D$1.textDelete, true) : escape(D$1.paragraf, true)} text-[1vw] font-bold text-center mt-[0.5vw]`, escape(createComponent(B$1, { text: "Cancel", onClick: () => i(false), shadowColor: "hsl(0, 100%, 54%)", onMouseEnter: () => s("cancel"), onMouseLeave: () => s(null), shadow: 10 })), escape(createComponent(B$1, { shadowColor: "hsla(155, 100%, 50%, 0.922)", text: "Delete", shadow: 10, onClick: async () => {
        var _a, _b;
        await x$1((_a = e()) == null ? void 0 : _a.id, (_b = e()) == null ? void 0 : _b.type), setTimeout(() => L(null), 500);
      }, onMouseEnter: () => s("confirm"), onMouseLeave: () => s(null) })))];
    } })];
  } });
}

export { le as l, ne as n, oe as o, re as r, te as t };
//# sourceMappingURL=index-DFJEjzPR.mjs.map

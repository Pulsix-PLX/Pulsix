import { createComponent, ssr, ssrHydrationKey, escape, ssrAttribute } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { onMount, Show, createSignal, createMemo, onCleanup, For } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { C, g, a, c } from './context-5bbmmXgY2.mjs';
import { c as b, l as j } from '../_/nitro.mjs';
import { B } from './ButtonSparkle-BxHzGCPC2.mjs';
import { w } from './index-B8s1itkY2.mjs';
import { u as ut } from './Inputs-D1T1pLkj.mjs';
import { w as w$1 } from './pathWallets-Cb2AeUiP.mjs';
import { w as w$2 } from './index-ClXKiMUD2.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/store/dist/server.js';
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
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/storage/dist/storage.js';
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
import './server-fns-runtime-C3tiYEg6.mjs';
import './getWallets.server-C5R6kBVO.mjs';
import './auth.server-ChqlnWrh.mjs';

var ne = ["<p", ' style="', '">Selected file: <strong>', "</strong></p>"], re = ["<p", ' style="', '">', "</p>"], se = ["<div", ' class="CM"><h1>Carica Estratto Conto (CSV)</h1><form enctype="multipart/form-data" class><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></form></div>"], ie = ["<strong", ">CSV file</strong>"], le = ["<br", ">"];
function de() {
  const [c$1, $] = createSignal(null);
  function E(N) {
    var _a;
    const D = (_a = N.currentTarget.files) == null ? void 0 : _a[0];
    D ? D.name.toLowerCase().endsWith(".csv") ? ($(D), c(null)) : ($(null), c("File selected is not a csv file")) : ($(null), c(null));
  }
  return ssr(se, ssrHydrationKey(), escape(createComponent(w, { id: "csv-file-input", name: "csv", accept: ".csv", required: true, onChange: E, get label() {
    return ["Drag & drop your ", ssr(ie, ssrHydrationKey()), " here,", ssr(le, ssrHydrationKey()), " or click to select"];
  }, draggingLabel: "Release to drop the CSV file!" })), escape(createComponent(Show, { get when() {
    return c$1();
  }, get children() {
    var _a;
    return ssr(ne, ssrHydrationKey(), "margin-top:1rem;color:#e2e8f0", escape((_a = c$1()) == null ? void 0 : _a.name));
  } })), escape(createComponent(Show, { get when() {
    return a.errorMessage;
  }, get children() {
    return ssr(re, ssrHydrationKey(), "color:red;margin-top:10px", escape(a.errorMessage));
  } })), escape(createComponent(w$1, {})), escape(createComponent(B, { type: "submit", get disabled() {
    return !c$1() || !ut();
  }, text: "Submit file", class: "ml-130 mt-100" })));
}
var ce = ["<div", ' class="p-6 border rounded-lg shadow-lg mb-6 "><h2 class="text-2xl font-bold mb-3">Anteprima Dati (Contestualizzata)</h2><p class="text-sm text-gray-600 mb-4">Dataset con <!--$-->', '<!--/--> righe totali - <span class="font-medium text-blue-600">Clicca su una cella per modificare</span>(Salvataggio automatico uscendo dalla cella)</p><div class="overflow-auto border border-gray-200 rounded-lg relative" style="', '"><div style="', '"><table class="w-full bg-white border-separate border-spacing-0" style="', '"><thead class="sticky top-0 z-10 bg-gray-100"><tr>', "</tr></thead><tbody>", `</tbody></table></div></div><div class="mt-6 flex justify-end items-center"><div class="flex space-x-2"><button class=" bg-gray-200 text-gray-800 rounded hover:bg-gray-300" title="Annulla l'intero processo di importazione">Back to upload file</button><!--$-->`, '<!--/--></div></div><div class="my-4 flex justify-start space-x-2"><button class="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"', ' title="Annulla tutte le modifiche fatte nella tabella">Resetta Modifiche Tabella</button><button class="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed"', ` title="Annulla l'ultima modifica fatta nella tabella">Annulla Ultima Modifica</button></div></div>`], pe = ["<th", ' class="', '">', "</th>"], ue = ["<tr", ' class="hover:bg-gray-50 border-b border-gray-200" style="', '">', "</tr>"], me = ["<input", ' type="text" class="w-full h-full px-4 py-3 ..."', ">"], ge = ["<td", ' class="', '" style="', '">', "</td>"], be = ["<div", ' class="w-full h-full flex items-center cursor-pointer" title="', '">', "</div>"], ve = ["<button", ' class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Next to mapper</button>'];
function he() {
  var _a, _b;
  const [c, $] = createSignal(null), [E, N] = createSignal(0);
  const D = createMemo(() => {
    var _a2;
    return (((_a2 = a.history) == null ? void 0 : _a2.length) || 0) > 0;
  });
  onMount(() => {
    document.addEventListener("mousedown", T), console.log("Componente CsvPreview CONTESTUALIZZATO montato.");
  }), onCleanup(() => {
    document.removeEventListener("mousedown", T), console.log("Componente CsvPreview CONTESTUALIZZATO smontato.");
  });
  const x = 48, S = 800, p = "70%", U = "py-3 px-4", M = createMemo(() => S), k = createMemo(() => Math.ceil(M() / x) + 5), C = createMemo(() => Math.max(0, Math.floor(E() / x))), j = createMemo(() => {
    var _a2, _b2;
    const t = Array.isArray((_a2 = a.data) == null ? void 0 : _a2.rows) ? (_b2 = a.data) == null ? void 0 : _b2.rows : [];
    if (!t) return [];
    const r = C(), l = k(), b = Math.min(r + l, t.length);
    return t.slice(r, b);
  }), z = createMemo(() => {
    var _a2, _b2, _c;
    return ((_c = (_b2 = (_a2 = a.data) == null ? void 0 : _a2.rows) == null ? void 0 : _b2.length) != null ? _c : 0) * x;
  }), F = () => {
    c() !== null && $(null);
  }, T = (t) => {
    c();
  };
  function H() {
    var _a2, _b2;
    F(), ((_b2 = (_a2 = a.data) == null ? void 0 : _a2.headers) != null ? _b2 : []).length > 0 ? (console.log(a.data), g("mapping")) : console.warn("Impossibile procedere: dati/headers mancanti nel context.");
  }
  return ssr(ce, ssrHydrationKey(), escape((_b = (_a = a.data) == null ? void 0 : _a.rows) == null ? void 0 : _b.length) || 0, `height:${escape(M(), true)}px` + (";width:" + escape(p, true)), `height:${escape(z(), true)}px;position:relative`, `position:absolute;top:${escape(C(), true) * escape(x, true)}px;width:100%`, escape(createComponent(For, { get each() {
    var _a2;
    return (_a2 = a.data) == null ? void 0 : _a2.headers;
  }, children: (t) => ssr(pe, ssrHydrationKey(), `${escape(U, true)} ...`, escape(t)) })), escape(createComponent(For, { get each() {
    return j();
  }, children: (t, r) => ssr(ue, ssrHydrationKey(), `height:${escape(x, true)}px`, escape(createComponent(For, { get each() {
    var _a2;
    return (_a2 = a.data) == null ? void 0 : _a2.headers;
  }, children: (l) => {
    const b = createMemo(() => C() + r()), u = createMemo(() => {
      const w = c();
      return w !== null && w.visibleRowIndex === r() && w.header === l;
    }), d = createMemo(() => {
      var _a2, _b2, _c;
      const w = (_a2 = a.data) == null ? void 0 : _a2.rows, v = b();
      return (_c = (_b2 = w == null ? void 0 : w[v]) == null ? void 0 : _b2[l]) != null ? _c : "";
    });
    return ssr(ge, ssrHydrationKey(), `${escape(U, true)} border-gray-200`, "padding:" + (u() ? "0" : escape(void 0, true)) + ";position:relative", escape(createComponent(Show, { get when() {
      return u();
    }, get fallback() {
      return ssr(be, ssrHydrationKey(), `Riga ${escape(b(), true)}, Colonna ${escape(l, true)}`, escape(d()));
    }, get children() {
      return ssr(me, ssrHydrationKey(), ssrAttribute("value", escape(d(), true), false));
    } })));
  } }))) })), escape(createComponent(Show, { when: typeof B < "u", get fallback() {
    return ssr(ve, ssrHydrationKey());
  }, get children() {
    return createComponent(B, { onClick: H, text: "Procedi con la mappatura" });
  } })), ssrAttribute("disabled", !D(), true), ssrAttribute("disabled", !D(), true));
}
var fe = ["<div", ' class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">', "</div>"], ye = ["<div", '><p class="font-medium mb-2">Interpretazione del segno:</p><div class="flex items-center space-x-4"><label class="flex items-center"><input type="radio" name="signInterpretation" value="negativeIsExpense"', '><span class="ml-2">Importi negativi = Uscite, Importi positivi = Entrate</span></label></div><div class="flex items-center space-x-4 mt-2"><label class="flex items-center"><input type="radio" name="signInterpretation" value="negativeIsIncome"', '><span class="ml-2">Importi negativi = Entrate, Importi positivi = Uscite</span></label></div></div>'], xe = ["<div", ' class="space-y-3"><div><label class="block font-medium mb-1">Colonna che indica il tipo:</label><select class="w-full p-2 border rounded"', "><option value>-- Seleziona colonna --</option><!--$-->", '<!--/--></select></div><div class="grid grid-cols-2 gap-4"><div><label class="block font-medium mb-1">Valore per Entrate:</label><input type="text" class="w-full p-2 border rounded"', ' placeholder="es. entrata, income, guadagno"></div><div><label class="block font-medium mb-1">Valore per Uscite:</label><input type="text" class="w-full p-2 border rounded"', ' placeholder="es. uscita, expense, spesa"></div></div></div>'], Ce = ["<div", ` class="mt-2 p-4 bg-gray-50 rounded-lg overflow-x-auto"><p class="text-xs text-gray-600 mb-2">Questa \xE8 un'anteprima di come verranno interpretati i dati in base alla mappatura e alla logica del tipo transazione attuale. 'N/D' significa che il valore nella riga originale era vuoto o nullo. 'Non Mappato' significa che il campo sistema non \xE8 stato associato a nessuna colonna CSV.</p><table class="w-full min-w-max text-sm"> <thead><tr class="border-b-2 border-gray-300 text-left"><!--$-->`, '<!--/--><th class="p-2 font-semibold">Interpretazione</th> </tr></thead><tbody>', "</tbody></table></div>"], we = ["<p", ` class="mt-2 text-sm text-orange-600">Per vedere l'anteprima dell'interpretazione, mappa prima il campo "Amount".</p>`], $e = ["<div", ' class="mt-4"><!--$-->', "<!--/--><!--$-->", "<!--/--></div>"], De = ["<div", ' class="p-6 border rounded-lg shadow-lg mb-6 bg-white"><h2 class="text-2xl font-bold mb-3">Mappatura Colonne</h2><p class="text-sm text-gray-600 mb-4">Trascina le colonne del CSV nei campi del sistema corrispondenti</p><!--$-->', '<!--/--><div class="flex gap-6"><div class="w-1/2 bg-gray-50 p-4 rounded-lg"><h3 class="text-lg font-semibold mb-3">Colonne CSV</h3><p class="text-sm text-gray-500 mb-3">Trascina queste colonne nei campi a destra</p><div class="space-y-2">', '</div></div><div class="w-1/2 bg-gray-50 p-4 rounded-lg"><h3 class="text-lg font-semibold mb-3">Campi Sistema</h3><p class="text-sm text-gray-500 mb-3">Rilascia le colonne CSV qui</p><div class="space-y-2"><!--$-->', '<!--/--><div class="', '"><div class="flex justify-between items-center"><span class="font-medium text-gray-500">Non utilizzare</span><div class="flex flex-wrap gap-1 max-w-xs">', `</div></div></div></div></div></div><div class="mt-6 p-4 bg-gray-50 rounded-lg"><h3 class="text-lg font-semibold mb-3">Configurazione Tipo Transazione</h3><div class="space-y-4"><div><p class="font-medium mb-2">Come determinare se una transazione \xE8 un'entrata o un'uscita?</p><div class="flex items-center space-x-4"><label class="flex items-center"><input type="radio" name="transactionType" value="auto"`, `><span class="ml-2">Dal segno dell'importo</span></label><label class="flex items-center"><input type="radio" name="transactionType" value="column"`, '><span class="ml-2">Da una colonna specifica</span></label></div></div><!--$-->', "<!--/--><!--$-->", '<!--/--></div></div><div class="mt-4"><button class="text-blue-600 hover:text-blue-800 text-sm flex items-center"><!--$-->', "<!--/-->Mostra anteprima interpretazione transazioni</button><!--$-->", '<!--/--></div><div class="mt-6 flex justify-between"><button class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Go back</button><!--$-->', '<!--/--></div><div class="mt-4 text-sm text-gray-500"><p>* I campi contrassegnati sono obbligatori</p></div></div>'], Se = ["<button", ' class="text-gray-600 hover:text-red-600" title="Rimuovi mappatura">\u2715</button>'], Ae = ["<div", ' class="', '"', '><div class="flex justify-between items-center"><span>', "</span><!--$-->", "<!--/--></div></div>"], Ee = ["<div", ' class="flex items-center"><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">', '</span><button class="text-gray-500 hover:text-red-600" title="Rimuovi mappatura">\u2715</button></div>'], Ie = ["<div", ' class="', '"><div class="flex justify-between items-center"><div><span class="font-medium">', "</span><!--$-->", "<!--/--></div><!--$-->", "<!--/--></div></div>"], q = ["<span", ' class="text-red-500 ml-1">*</span>'], Me = ["<span", ' class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs flex items-center"><!--$-->', '<!--/--><button class="ml-1 text-gray-500 hover:text-red-600">\u2715</button></span>'], Te = ["<option", ">", "</option>"], _e = ["<th", ' class="p-2 font-semibold">', "</th>"], ze = ["<tr", ' class="border-b border-gray-200"><td class="p-2">', '</td><td class="p-2">', '</td><td class="p-2">', '</td><td class="', '">', "</td></tr>"];
function Re() {
  const [c, $] = createSignal({}), [E, N] = createSignal(null), [I, D] = createSignal(null), [x, S] = createSignal(null), [p, U] = createSignal({ mode: "auto", negativeIsExpense: true }), M = [{ id: "amount", label: "Amount" }, { id: "cause", label: "Cause" }, { id: "date", label: "Date" }, { id: "category_id", label: "category" }, { id: "subCategory_id", label: "Sub Category" }], k = ["amount"], [C, j$1] = createSignal(false), z = (t) => {
    const l = Object.entries(c()).find(([b, u]) => typeof u == "string" && u.trim() === t);
    return l ? l[0] : null;
  }, F = ["cause", "amount", "date"], T = createMemo(() => {
    var _a, _b, _c;
    console.log("Calculating transactionExamples (detailed)...");
    const t = c();
    if (!((_a = a.data) == null ? void 0 : _a.rows) || ((_b = a.data) == null ? void 0 : _b.length) === 0) return console.log("DEBUG Memo: props.rows \xE8 vuoto."), [];
    const r = {};
    F.forEach((v) => {
      var _a2;
      r[v] = (_a2 = Object.entries(t).find(([A, _]) => typeof _ == "string" && _.trim() === v)) == null ? void 0 : _a2[0];
    });
    const l = (_c = a.data) == null ? void 0 : _c.rows.slice(0, 5), b = "amount";
    console.log(`DEBUG Memo: Cerco il valore ID: "${b}" (Tipo: string)`);
    const u = Object.entries(t);
    console.log("DEBUG Memo: Controllo queste entries:", JSON.stringify(u)), u.forEach(([v, A]) => {
      const P = (typeof A === "string" ? A.trim() : A) === b;
      console.log(`-- DEBUG Memo Entry: Chiave="<span class="math-inline">{key}", Valore="</span>{value}" (Tipo: <span class="math-inline">{valueType}). Confronto diretto ('</span>{amountFieldId}'): <span class="math-inline">{directMatch}. Confronto con trim ('</span>{amountFieldId}'): ${P}`);
    });
    const d = r.amount;
    if (!d) return console.log("DEBUG Memo: Amount header non mappato, impossibile calcolare esempi completi."), [];
    if (console.log("DEBUG: Header mappato per 'amount' (Risultato finale find):", d), !d) return console.log("DEBUG Memo: Amount header NON trovato, ritorno array vuoto."), [];
    console.log(`DEBUG Memo: Amount header trovato: "${d}". Calcolo esempi...`);
    const w = l.map((v, A) => {
      var _a2, _b2, _c2;
      const _ = r.walletId ? (_a2 = v[r.walletId]) != null ? _a2 : "N/D" : "Non Mappato", G = r.cause ? (_b2 = v[r.cause]) != null ? _b2 : "N/D" : "Non Mappato", P = r.date ? (_c2 = v[r.date]) != null ? _c2 : "N/D" : "Non Mappato", J = v[d], L = parseFloat(J);
      let R = "Non determinato";
      const h = p();
      if (h.mode === "auto") R = L < 0 === h.negativeIsExpense ? "Expense" : "Income";
      else if (h.mode === "column" && h.columnName && h.positiveValue && h.negativeValue) {
        const W = v[h.columnName];
        W === h.positiveValue ? R = "Income" : W === h.negativeValue && (R = "Expense");
      }
      return { walletId: _, cause: G, amount: isNaN(L) ? "N/A" : L, date: P, interpretation: R };
    });
    return console.log(`DEBUG: Esempi dettagliati calcolati: ${w.length}`), w;
  }), H = async () => {
    var _a, _b, _c;
    console.log("Processing data before sending..."), S(null);
    const t = (_a = a.data) == null ? void 0 : _a.rows, r = c(), l = p();
    if (!t || t.length === 0) {
      S("Nessun dato da processare.");
      return;
    }
    const b = w$2(t, r, l);
    console.log("Dati processati pronti per l'invio:", b);
    const u = b.filter((d) => d.amount !== null && d.type !== null);
    if (u.length === 0) {
      S("Nessuna transazione valida trovata dopo il processamento. Controlla la mappatura e i dati.");
      return;
    }
    try {
      await j.api.post("API/Wallets/Wallet/addTransactionByFile/addTransactions", { transactions: u, walletId: a.walletId }), console.log(`Inviate ${u.length} transazioni processate al server.`), g("complete");
    } catch (d) {
      console.error("Errore durante l'invio dei dati processati:", d), S(((_c = (_b = d.response) == null ? void 0 : _b.data) == null ? void 0 : _c.message) || d.message || "Errore durante l'invio dei dati al server");
    }
  };
  return ssr(De, ssrHydrationKey(), escape(createComponent(Show, { get when() {
    return x();
  }, get children() {
    return ssr(fe, ssrHydrationKey(), escape(x()));
  } })), escape(createComponent(For, { get each() {
    var _a;
    return (_a = a.data) == null ? void 0 : _a.headers;
  }, children: (t) => {
    const r = createMemo(() => Object.keys(c()).includes(t));
    return ssr(Ae, ssrHydrationKey(), `p-3 rounded-md cursor-grab ${r() ? "bg-gray-300 text-gray-600" : "bg-blue-100 hover:bg-blue-200 text-blue-800"}`, ssrAttribute("draggable", !r(), false), escape(t), escape(createComponent(Show, { get when() {
      return r();
    }, get children() {
      return ssr(Se, ssrHydrationKey());
    } })));
  } })), escape(createComponent(For, { each: M, children: (t) => {
    const r = createMemo(() => z(t.id)), l = k.includes(t.id);
    return ssr(Ie, ssrHydrationKey(), `p-3 rounded-md border-2 ${I() === t.id ? "border-blue-500 bg-blue-50" : r() ? "border-green-500 bg-green-50" : l ? "border-yellow-300 bg-yellow-50" : "border-gray-300 bg-white"}`, escape(t.label), l && q[0] + ssrHydrationKey() + q[1], escape(createComponent(Show, { get when() {
      return r();
    }, get children() {
      return ssr(Ee, ssrHydrationKey(), escape(r()));
    } })));
  } })), `p-3 rounded-md border-2 ${I() === "non_utilizzare" ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"}`, escape(createComponent(For, { get each() {
    return Object.entries(c());
  }, children: ([t, r]) => createComponent(Show, { when: r === "non_utilizzare", get children() {
    return ssr(Me, ssrHydrationKey(), escape(t));
  } }) })), ssrAttribute("checked", p().mode === "auto", true), ssrAttribute("checked", p().mode === "column", true), escape(createComponent(Show, { get when() {
    return p().mode === "auto";
  }, get children() {
    return ssr(ye, ssrHydrationKey(), ssrAttribute("checked", p().negativeIsExpense === true, true), ssrAttribute("checked", p().negativeIsExpense === false, true));
  } })), escape(createComponent(Show, { get when() {
    return p().mode === "column";
  }, get children() {
    return ssr(xe, ssrHydrationKey(), ssrAttribute("value", escape(p().columnName, true) || "", false), escape(createComponent(For, { get each() {
      var _a;
      return (_a = a.data) == null ? void 0 : _a.headers;
    }, children: (t) => ssr(Te, ssrHydrationKey() + ssrAttribute("value", escape(t, true), false), escape(t)) })), ssrAttribute("value", escape(p().positiveValue, true) || "", false), ssrAttribute("value", escape(p().negativeValue, true) || "", false));
  } })), C() ? "\u25BC " : "\u25BA ", escape(createComponent(Show, { get when() {
    return C();
  }, get children() {
    return ssr($e, ssrHydrationKey(), escape(createComponent(Show, { get when() {
      return C() && T().length > 0;
    }, get children() {
      return ssr(Ce, ssrHydrationKey(), escape(createComponent(For, { each: M, children: (t) => ssr(_e, ssrHydrationKey(), escape(t.label)) })), escape(createComponent(For, { get each() {
        return T();
      }, children: (t) => ssr(ze, ssrHydrationKey(), escape(t.amount), escape(t.cause), escape(t.date), `p-2 font-medium ${t.interpretation === "Income" ? "text-green-600" : t.interpretation === "Expense" ? "text-red-600" : "text-gray-600"}`, escape(t.interpretation)) })));
    } })), escape(createComponent(Show, { get when() {
      return C() && !z("amount");
    }, get children() {
      return ssr(we, ssrHydrationKey());
    } })));
  } })), escape(createComponent(B, { onClick: H, text: "Conferma mappatura" })));
}
var Ve = ["<div", " class>", "</div>"];
function dt() {
  return onMount(() => b(false)), C({ headers: ["Date", "Description", "Amount", "Category", "Status"], rows: [{ Date: "2025-04-21", Description: "Stipendio Aprile", Amount: 2500.5, Category: "Income", Status: "Completed" }, { Date: "2025-04-20", Description: "Supermercato Esselunga", Amount: -75.3, Category: "Groceries", Status: "Completed" }, { Date: "2025-04-19", Description: "Bolletta Luce", Amount: -55, Category: "Utilities", Status: "Completed" }, { Date: "2025-04-18", Description: "Ristorante 'La Brace'", Amount: -42, Category: "Dining Out", Status: "Completed" }, { Date: "2025-04-17", Description: "Amazon ordine #123", Amount: -120.99, Category: "Shopping", Status: "Pending" }, { Date: "2025-04-16", Description: "Cinema Odeon", Amount: -18, Category: "Entertainment", Status: "Completed" }, { Date: "2025-04-15", Description: "Rimborso Tasse", Amount: 350, Category: "Income", Status: "Completed" }, { Date: "2025-04-14", Description: "Palestra Mensile", Amount: -40, Category: "Health & Fitness", Status: "Completed" }, { Date: "2025-04-13", Description: "Libri Universitari", Amount: -85.5, Category: "Education", Status: "Completed" }, { Date: "2025-04-12", Description: "Riparazione Auto", Amount: -300, Category: "Transport", Status: "Completed" }, { Date: "2025-04-15", Description: "Rimborso Tasse", Amount: 350, Category: "Income", Status: "Completed" }, { Date: "2025-04-14", Description: "Palestra Mensile", Amount: -40, Category: "Health & Fitness", Status: "Completed" }, { Date: "2025-04-13", Description: "Libri Universitari", Amount: -85.5, Category: "Education", Status: "Completed" }, { Date: "2025-04-12", Description: "Riparazione Auto", Amount: -300, Category: "Transport", Status: "Completed" }, { Date: "2025-04-15", Description: "Rimborso Tasse", Amount: 350, Category: "Income", Status: "Completed" }, { Date: "2025-04-14", Description: "Palestra Mensile", Amount: -40, Category: "Health & Fitness", Status: "Completed" }, { Date: "2025-04-13", Description: "Libri Universitari", Amount: -85.5, Category: "Education", Status: "Completed" }, { Date: "2025-04-12", Description: "Riparazione Auto", Amount: -300, Category: "Transport", Status: "Completed" }, { Date: "2025-04-15", Description: "Rimborso Tasse", Amount: 350, Category: "Income", Status: "Completed" }, { Date: "2025-04-14", Description: "Palestra Mensile", Amount: -40, Category: "Health & Fitness", Status: "Completed" }, { Date: "2025-04-13", Description: "Libri Universitari", Amount: -85.5, Category: "Education", Status: "Completed" }, { Date: "2025-04-12", Description: "Riparazione Auto", Amount: -300, Category: "Transport", Status: "Completed" }] }, 123), g("mapping"), [createComponent(Show, { get when() {
    return a.step === "upload";
  }, get children() {
    return createComponent(de, {});
  } }), createComponent(Show, { get when() {
    return a.step === "preview";
  }, get children() {
    return ssr(Ve, ssrHydrationKey(), escape(createComponent(he, {})));
  } }), createComponent(Show, { get when() {
    return a.step === "mapping";
  }, get children() {
    return createComponent(Re, {});
  } })];
}

export { dt as default };
//# sourceMappingURL=index182.mjs.map

import { ssr, ssrHydrationKey, escape, createComponent, ssrAttribute } from 'solid-js/web';
import { createMemo, Show, createSignal, createEffect, onMount, onCleanup, For } from 'solid-js';
import { o, n, a, l } from './context-XUFMQc9R.mjs';
import { B } from './ButtonSparkle-BxHzGCPC.mjs';
import { j } from './auth-B-0Ucn5g.mjs';
import { b } from './Menu-B3jw0GIl.mjs';
import { w } from './pathWallets-DBFK87xo.mjs';
import 'solid-js/store';
import 'axios';
import './components-Bjb1kgqQ.mjs';
import './routing-Th2JWmJV.mjs';
import './Inputs-Cq_fgt2H.mjs';
import 'gsap';
import './server-fns-runtime-DEO2-sKc.mjs';
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
import 'node:fs';
import 'node:path';
import './action-CiKOD-Zz.mjs';
import './getWallets.server-DFLq-knu.mjs';
import './auth.server-QlO-zn0G.mjs';

var oe = ["<div", ' class="p-6 border rounded-lg shadow-lg mb-6 bg-white"><h2 class="text-2xl font-bold mb-3">Anteprima Dati (Contestualizzata)</h2><p class="text-sm text-gray-600 mb-4">Dataset con <!--$-->', '<!--/--> righe totali - <span class="font-medium text-blue-600">Clicca su una cella per modificare</span>(Salvataggio automatico uscendo dalla cella)</p><div class="overflow-auto border border-gray-200 rounded-lg relative" style="', '"><div style="', '"><table class="w-full bg-white border-separate border-spacing-0" style="', '"><thead class="sticky top-0 z-10 bg-gray-100"><tr>', "</tr></thead><tbody>", '</tbody></table></div></div><div class="mt-4 text-sm text-gray-500"><p>Scorri per visualizzare pi\xF9 righe. Clicca una cella per modificarla (Invio salva ed esce, Esc annulla, click su altra cella/fuori salva).</p></div></div>'], le = ["<div", ` class="mt-6 flex justify-end items-center"> <div class="flex space-x-2"><button class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300" title="Annulla l'intero processo di importazione">Annulla Processo</button><!--$-->`, "<!--/--></div></div>"], ie = ["<th", ' class="', '">', "</th>"], se = ["<tr", ' class="hover:bg-gray-50 border-b border-gray-200" style="', '">', "</tr>"], ce = ["<input", ' type="text" class="w-full h-full px-4 py-3 ..."', ">"], de = ["<td", ' class="', '" style="', '">', "</td>"], pe = ["<div", ' class="w-full h-full flex items-center cursor-pointer" title="', '">', "</div>"], ue = ["<button", ' class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Procedi</button>'];
const me = (l) => {
  var _a;
  const b = l.rowHeight || 48, x = l.tableHeight || 800, I = l.tableWidth || "100%", m = l.cellPadding || "py-3 px-4", [v, E] = createSignal([]), [N, V] = createSignal(null), [B$1, k] = createSignal(0);
  const s = createMemo(() => x), L = createMemo(() => Math.ceil(s() / b) + 5), w = createMemo(() => Math.max(0, Math.floor(B$1() / b))), G = createMemo(() => {
    const a = v();
    if (!a) return [];
    const d = w(), h = L(), f = Math.min(d + h, a.length);
    return a.slice(d, f);
  }), R = createMemo(() => {
    var _a2;
    return ((_a2 = v()) == null ? void 0 : _a2.length) * b || 0;
  });
  createEffect(() => {
    var _a2;
    const d = ((_a2 = l.rows) == null ? void 0 : _a2.map((h) => ({ ...h }))) || [];
    E(d);
  });
  const P = () => {
    N() !== null && V(null);
  }, T = (a) => {
    N();
  };
  onMount(() => {
    document.addEventListener("mousedown", T), console.log("Componente CsvPreview CONTESTUALIZZATO montato.");
  }), onCleanup(() => {
    document.removeEventListener("mousedown", T), console.log("Componente CsvPreview CONTESTUALIZZATO smontato.");
  });
  function t() {
    var _a2, _b;
    P(), ((_b = (_a2 = o.fileData) == null ? void 0 : _a2.headers) != null ? _b : []).length > 0 ? (console.log(o.fileData), n("mapping")) : console.warn("Impossibile procedere: dati/headers mancanti nel context.");
  }
  return [ssr(oe, ssrHydrationKey(), escape((_a = l.rows) == null ? void 0 : _a.length) || 0, `height:${escape(s(), true)}px` + (";width:" + escape(I, true)), `height:${escape(R(), true)}px;position:relative`, `position:absolute;top:${escape(w(), true) * escape(b, true)}px;width:100%`, escape(createComponent(For, { get each() {
    return l.headers;
  }, children: (a) => ssr(ie, ssrHydrationKey(), `${escape(m, true)} ...`, escape(a)) })), escape(createComponent(For, { get each() {
    return G();
  }, children: (a, d) => ssr(se, ssrHydrationKey(), `height:${escape(b, true)}px`, escape(createComponent(For, { get each() {
    return l.headers;
  }, children: (h) => {
    const f = createMemo(() => w() + d()), M = createMemo(() => {
      const p = N();
      return p !== null && p.visibleRowIndex === d() && p.header === h;
    }), z = createMemo(() => {
      var _a2, _b;
      const p = v(), D = f();
      return (_b = (_a2 = p == null ? void 0 : p[D]) == null ? void 0 : _a2[h]) != null ? _b : "";
    });
    return ssr(de, ssrHydrationKey(), `${escape(m, true)} border-gray-200`, "padding:" + (M() ? "0" : escape(void 0, true)) + ";position:relative", escape(createComponent(Show, { get when() {
      return M();
    }, get fallback() {
      return ssr(pe, ssrHydrationKey(), `Riga ${escape(f(), true)}, Colonna ${escape(h, true)}`, escape(z()));
    }, get children() {
      return ssr(ce, ssrHydrationKey(), ssrAttribute("value", escape(z(), true), false));
    } })));
  } }))) }))), ssr(le, ssrHydrationKey(), escape(createComponent(Show, { when: typeof B < "u", get fallback() {
    return ssr(ue, ssrHydrationKey());
  }, get children() {
    return createComponent(B, { onClick: t, text: "Procedi con la mappatura" });
  } })))];
};
var ge = ["<div", ' class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">', "</div>"], be = ["<div", '><p class="font-medium mb-2">Interpretazione del segno:</p><div class="flex items-center space-x-4"><label class="flex items-center"><input type="radio" name="signInterpretation" value="negativeIsExpense"', '><span class="ml-2">Importi negativi = Uscite, Importi positivi = Entrate</span></label></div><div class="flex items-center space-x-4 mt-2"><label class="flex items-center"><input type="radio" name="signInterpretation" value="negativeIsIncome"', '><span class="ml-2">Importi negativi = Entrate, Importi positivi = Uscite</span></label></div></div>'], ve = ["<div", ' class="space-y-3"><div><label class="block font-medium mb-1">Colonna che indica il tipo:</label><select class="w-full p-2 border rounded"', "><option value>-- Seleziona colonna --</option><!--$-->", '<!--/--></select></div><div class="grid grid-cols-2 gap-4"><div><label class="block font-medium mb-1">Valore per Entrate:</label><input type="text" class="w-full p-2 border rounded"', ' placeholder="es. entrata, income, guadagno"></div><div><label class="block font-medium mb-1">Valore per Uscite:</label><input type="text" class="w-full p-2 border rounded"', ' placeholder="es. uscita, expense, spesa"></div></div></div>'], he = ["<div", ` class="mt-2 p-4 bg-gray-50 rounded-lg overflow-x-auto"><p class="text-xs text-gray-600 mb-2">Questa \xE8 un'anteprima di come verranno interpretati i dati in base alla mappatura e alla logica del tipo transazione attuale. 'N/D' significa che il valore nella riga originale era vuoto o nullo. 'Non Mappato' significa che il campo sistema non \xE8 stato associato a nessuna colonna CSV.</p><table class="w-full min-w-max text-sm"> <thead><tr class="border-b-2 border-gray-300 text-left"><!--$-->`, '<!--/--><th class="p-2 font-semibold">Interpretazione</th> </tr></thead><tbody>', "</tbody></table></div>"], fe = ["<p", ` class="mt-2 text-sm text-orange-600">Per vedere l'anteprima dell'interpretazione, mappa prima il campo "Amount".</p>`], ye = ["<div", ' class="mt-4"><button class="text-blue-600 hover:text-blue-800 text-sm flex items-center"><!--$-->', "<!--/-->Mostra anteprima dati interpretati (prime 5 righe)</button><!--$-->", "<!--/--><!--$-->", "<!--/--></div>"], xe = ["<div", ' class="p-6 border rounded-lg shadow-lg mb-6 bg-white"><h2 class="text-2xl font-bold mb-3">Mappatura Colonne</h2><p class="text-sm text-gray-600 mb-4">Trascina le colonne del CSV nei campi del sistema corrispondenti</p><!--$-->', '<!--/--><div class="flex gap-6"><div class="w-1/2 bg-gray-50 p-4 rounded-lg"><h3 class="text-lg font-semibold mb-3">Colonne CSV</h3><p class="text-sm text-gray-500 mb-3">Trascina queste colonne nei campi a destra</p><div class="space-y-2">', '</div></div><div class="w-1/2 bg-gray-50 p-4 rounded-lg"><h3 class="text-lg font-semibold mb-3">Campi Sistema</h3><p class="text-sm text-gray-500 mb-3">Rilascia le colonne CSV qui</p><div class="space-y-2"><!--$-->', '<!--/--><div class="', '"><div class="flex justify-between items-center"><span class="font-medium text-gray-500">Non utilizzare</span><div class="flex flex-wrap gap-1 max-w-xs">', `</div></div></div></div></div></div><div class="mt-6 p-4 bg-gray-50 rounded-lg"><h3 class="text-lg font-semibold mb-3">Configurazione Tipo Transazione</h3><div class="space-y-4"><div><p class="font-medium mb-2">Come determinare se una transazione \xE8 un'entrata o un'uscita?</p><div class="flex items-center space-x-4"><label class="flex items-center"><input type="radio" name="transactionType" value="auto"`, `><span class="ml-2">Dal segno dell'importo</span></label><label class="flex items-center"><input type="radio" name="transactionType" value="column"`, '><span class="ml-2">Da una colonna specifica</span></label></div></div><!--$-->', "<!--/--><!--$-->", '<!--/--></div></div><div class="mt-4"><button class="text-blue-600 hover:text-blue-800 text-sm flex items-center"><!--$-->', "<!--/-->Mostra anteprima interpretazione transazioni</button><!--$-->", '<!--/--></div><div class="mt-6 flex justify-between"><button class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Annulla</button><!--$-->', '<!--/--></div><div class="mt-4 text-sm text-gray-500"><p>* I campi contrassegnati sono obbligatori</p></div></div>'], we = ["<button", ' class="text-gray-600 hover:text-red-600" title="Rimuovi mappatura">\u2715</button>'], $e = ["<div", ' class="', '"', '><div class="flex justify-between items-center"><span>', "</span><!--$-->", "<!--/--></div></div>"], Ce = ["<div", ' class="flex items-center"><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">', '</span><button class="text-gray-500 hover:text-red-600" title="Rimuovi mappatura">\u2715</button></div>'], Ee = ["<div", ' class="', '"><div class="flex justify-between items-center"><div><span class="font-medium">', "</span><!--$-->", "<!--/--></div><!--$-->", "<!--/--></div></div>"], Z = ["<span", ' class="text-red-500 ml-1">*</span>'], Me = ["<span", ' class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs flex items-center"><!--$-->', '<!--/--><button class="ml-1 text-gray-500 hover:text-red-600">\u2715</button></span>'], Ie = ["<option", ">", "</option>"], De = ["<th", ' class="p-2 font-semibold">', "</th>"], _e = ["<tr", ' class="border-b border-gray-200"><td class="p-2">', '</td><td class="p-2">', '</td><td class="p-2">', '</td><td class="p-2">', '</td><td class="', '">', "</td></tr>"];
function Se(l) {
  const b = [{ id: "cause", label: "Cause" }, { id: "amount", label: "Amount" }, { id: "currency", label: "Currency" }, { id: "date", label: "Date" }], x = ["amount", "walletId", "currency"], I = ["cause", "amount", "currency", "date"], [m, v] = createSignal({}), [E, N] = createSignal(null), [V, B$1] = createSignal(null), [k, H] = createSignal(null), [s, L] = createSignal({ mode: "auto", negativeIsExpense: true }), [w, G] = createSignal(false);
  createMemo(() => {
    const t = Object.values(m()), a = x.every((d) => t.includes(d));
    return s().mode === "column" ? a && !!s().columnName && !!s().positiveValue && !!s().negativeValue : a;
  });
  const R = async () => {
    console.log("eee");
    try {
      const t = m(), a = s();
      console.log("sent"), await j.api.post("API/Wallets/Wallet/addTransactionByFile/addTransactions", { columnMapping: t, transactionTypeLogic: a }), l.onMappingComplete(t, a);
    } catch (t) {
      console.error("Errore durante l'invio della mappatura:", t), H(t.message || "Errore durante l'invio della mappatura");
    }
  }, P = (t) => {
    const d = Object.entries(m()).find(([h, f]) => typeof f == "string" && f.trim() === t);
    return d ? d[0] : null;
  }, T = createMemo(() => {
    console.log("Calculating transactionExamples (detailed)...");
    const t = m();
    if (!l.rows || l.rows.length === 0) return console.log("DEBUG Memo: props.rows \xE8 vuoto."), [];
    const a = {};
    I.forEach((p) => {
      var _a;
      a[p] = (_a = Object.entries(t).find(([D, S]) => typeof S == "string" && S.trim() === p)) == null ? void 0 : _a[0];
    });
    const d = l.rows.slice(0, 5), h = "amount";
    console.log(`DEBUG Memo: Cerco il valore ID: "${h}" (Tipo: string)`);
    const f = Object.entries(t);
    console.log("DEBUG Memo: Controllo queste entries:", JSON.stringify(f)), f.forEach(([p, D]) => {
      const _ = (typeof D === "string" ? D.trim() : D) === h;
      console.log(`-- DEBUG Memo Entry: Chiave="<span class="math-inline">{key}", Valore="</span>{value}" (Tipo: <span class="math-inline">{valueType}). Confronto diretto ('</span>{amountFieldId}'): <span class="math-inline">{directMatch}. Confronto con trim ('</span>{amountFieldId}'): ${_}`);
    });
    const M = a.amount;
    if (!M) return console.log("DEBUG Memo: Amount header non mappato, impossibile calcolare esempi completi."), [];
    if (console.log("DEBUG: Header mappato per 'amount' (Risultato finale find):", M), !M) return console.log("DEBUG Memo: Amount header NON trovato, ritorno array vuoto."), [];
    console.log(`DEBUG Memo: Amount header trovato: "${M}". Calcolo esempi...`);
    const z = d.map((p, D) => {
      var _a, _b, _c, _d;
      const S = a.walletId ? (_a = p[a.walletId]) != null ? _a : "N/D" : "Non Mappato", W = a.cause ? (_b = p[a.cause]) != null ? _b : "N/D" : "Non Mappato", _ = a.currency ? (_c = p[a.currency]) != null ? _c : "N/D" : "Non Mappato", K = a.date ? (_d = p[a.date]) != null ? _d : "N/D" : "Non Mappato", Q = p[M], O = parseFloat(Q);
      let A = "Non determinato";
      const $ = s();
      if ($.mode === "auto") A = O < 0 === $.negativeIsExpense ? "Uscita" : "Entrata";
      else if ($.mode === "column" && $.columnName && $.positiveValue && $.negativeValue) {
        const q = p[$.columnName];
        q === $.positiveValue ? A = "Entrata" : q === $.negativeValue && (A = "Uscita");
      }
      const X = _ && _ !== "Non Mappato" && _ !== "N/D" ? _ : "EUR";
      return { walletId: S, cause: W, amount: isNaN(O) ? "N/A" : new Intl.NumberFormat("it-IT", { style: "currency", currency: X }).format(O), currency: _, date: K, interpretation: A };
    });
    return console.log(`DEBUG: Esempi dettagliati calcolati: ${z.length}`), z;
  });
  return ssr(xe, ssrHydrationKey(), escape(createComponent(Show, { get when() {
    return k();
  }, get children() {
    return ssr(ge, ssrHydrationKey(), escape(k()));
  } })), escape(createComponent(For, { get each() {
    return l.csvHeaders;
  }, children: (t) => {
    const a = createMemo(() => Object.keys(m()).includes(t));
    return ssr($e, ssrHydrationKey(), `p-3 rounded-md cursor-grab ${a() ? "bg-gray-300 text-gray-600" : "bg-blue-100 hover:bg-blue-200 text-blue-800"}`, ssrAttribute("draggable", !a(), false), escape(t), escape(createComponent(Show, { get when() {
      return a();
    }, get children() {
      return ssr(we, ssrHydrationKey());
    } })));
  } })), escape(createComponent(For, { each: b, children: (t) => {
    const a = createMemo(() => P(t.id)), d = x.includes(t.id);
    return ssr(Ee, ssrHydrationKey(), `p-3 rounded-md border-2 ${V() === t.id ? "border-blue-500 bg-blue-50" : a() ? "border-green-500 bg-green-50" : d ? "border-yellow-300 bg-yellow-50" : "border-gray-300 bg-white"}`, escape(t.label), d && Z[0] + ssrHydrationKey() + Z[1], escape(createComponent(Show, { get when() {
      return a();
    }, get children() {
      return ssr(Ce, ssrHydrationKey(), escape(a()));
    } })));
  } })), `p-3 rounded-md border-2 ${V() === "non_utilizzare" ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"}`, escape(createComponent(For, { get each() {
    return Object.entries(m());
  }, children: ([t, a]) => createComponent(Show, { when: a === "non_utilizzare", get children() {
    return ssr(Me, ssrHydrationKey(), escape(t));
  } }) })), ssrAttribute("checked", s().mode === "auto", true), ssrAttribute("checked", s().mode === "column", true), escape(createComponent(Show, { get when() {
    return s().mode === "auto";
  }, get children() {
    return ssr(be, ssrHydrationKey(), ssrAttribute("checked", s().negativeIsExpense === true, true), ssrAttribute("checked", s().negativeIsExpense === false, true));
  } })), escape(createComponent(Show, { get when() {
    return s().mode === "column";
  }, get children() {
    return ssr(ve, ssrHydrationKey(), ssrAttribute("value", escape(s().columnName, true) || "", false), escape(createComponent(For, { get each() {
      return l.csvHeaders;
    }, children: (t) => ssr(Ie, ssrHydrationKey() + ssrAttribute("value", escape(t, true), false), escape(t)) })), ssrAttribute("value", escape(s().positiveValue, true) || "", false), ssrAttribute("value", escape(s().negativeValue, true) || "", false));
  } })), w() ? "\u25BC " : "\u25BA ", escape(createComponent(Show, { get when() {
    return w();
  }, get children() {
    return ssr(ye, ssrHydrationKey(), w() ? "\u25BC " : "\u25BA ", escape(createComponent(Show, { get when() {
      return w() && T().length > 0;
    }, get children() {
      return ssr(he, ssrHydrationKey(), escape(createComponent(For, { each: b, children: (t) => ssr(De, ssrHydrationKey(), escape(t.label)) })), escape(createComponent(For, { get each() {
        return T();
      }, children: (t) => ssr(_e, ssrHydrationKey(), escape(t.cause), escape(t.amount), escape(t.currency), escape(t.date), `p-2 font-medium ${t.interpretation === "Entrata" ? "text-green-600" : t.interpretation === "Uscita" ? "text-red-600" : "text-gray-600"}`, escape(t.interpretation)) })));
    } })), escape(createComponent(Show, { get when() {
      return w() && !P("amount");
    }, get children() {
      return ssr(fe, ssrHydrationKey());
    } })));
  } })), escape(createComponent(B, { onClick: R, text: "Conferma mappatura" })));
}
var Te = ["<p", ' style="', '">', "</p>"], ze = ["<div", ' class="CM"><h1>Carica Estratto Conto (CSV)</h1><form enctype="multipart/form-data"><div><label for="csv-file-input" class="text-white">Seleziona file CSV:</label><input id="csv-file-input" type="file" name="csv" accept=".csv" required></div><!--$-->', "<!--/--></form><!--$-->", "<!--/--></div>"];
function Ne() {
  const [l, b] = createSignal(null), x = createMemo(() => !l());
  return ssr(ze, ssrHydrationKey(), escape(createComponent(B, { type: "submit", get disabled() {
    return x();
  }, text: "Submit file" })), escape(createComponent(Show, { get when() {
    return o.errorMessage;
  }, get children() {
    return ssr(Te, ssrHydrationKey(), "color:red;margin-top:10px", escape(o.errorMessage));
  } })));
}
var Ve = ["<div", ' class="my-4 flex justify-start space-x-2"><button class="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"', ' title="Annulla tutte le modifiche fatte nella tabella">Resetta Modifiche Tabella</button><button class="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed"', ` title="Annulla l'ultima modifica fatta nella tabella">Annulla Ultima Modifica</button></div>`], Pe = ["<div", ' class="mt-300">', "</div>"], Ae = ["<div", ' class="mt-4 flex justify-between"><button class="px-4 py-2 bg-gray-200 rounded">Indietro</button></div>'], Ue = ["<div", '><h2 class="text-2xl font-bold text-green-600">Importazione Completata!</h2><button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Inizia Nuovo Import</button></div>'], ke = ["<div", ' class="mt-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded"><strong>Errore:</strong> <!--$-->', "<!--/--></div>"], He = ["<div", ' class="container mx-auto p-4"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></div>"];
function dt() {
  b(false);
  const l$1 = createMemo(() => {
    var _a;
    return (((_a = o.history) == null ? void 0 : _a.length) || 0) > 0;
  });
  function b$1() {
    n("preview");
  }
  async function x(I, m) {
    var _a, _b, _c;
    if (console.log("MAP COMPLETE: Ricevuti mapping e logic", I, m), !o.fileData || !o.fileData.rows) {
      console.error("Errore critico: fileData non disponibile al momento dell'import finale."), a("Errore: Dati del file non trovati per l'importazione finale.");
      return;
    }
    try {
      l(I);
      const v = { rowsToImport: o.fileData.rows, columnMapping: I, transactionTypeLogic: m };
      console.log("MAP COMPLETE: Invio payload finale all'API:", v);
      const E = await j.api.post("API/Wallets/Wallet/addTransactionByFile/importMappedData", v);
      console.log("MAP COMPLETE: Risposta API importazione finale:", E), E.status === 200 || E.status === 201 ? n("complete") : (console.error("Importazione fallita:", E), a(((_a = E.data) == null ? void 0 : _a.message) || "Errore sconosciuto durante l'importazione finale."));
    } catch (v) {
      console.error("Errore durante l'invio/importazione dei dati finali:", v), a(((_c = (_b = v.response) == null ? void 0 : _b.data) == null ? void 0 : _c.message) || v.message || "Errore di rete o del server durante l'importazione finale.");
    }
  }
  return ssr(He, ssrHydrationKey(), escape(createComponent(Show, { get when() {
    return o.currentStep === "preview";
  }, get children() {
    return ssr(Ve, ssrHydrationKey(), ssrAttribute("disabled", !l$1(), true), ssrAttribute("disabled", !l$1(), true));
  } })), escape(createComponent(Show, { get when() {
    return o.currentStep === "upload";
  }, get children() {
    return [createComponent(Ne, {}), ssr(Pe, ssrHydrationKey(), escape(createComponent(w, {})))];
  } })), escape(createComponent(Show, { get when() {
    return o.currentStep === "preview" && o.fileData;
  }, get children() {
    return createComponent(me, { get headers() {
      var _a;
      return ((_a = o.fileData) == null ? void 0 : _a.headers) || [];
    }, get rows() {
      var _a;
      return ((_a = o.fileData) == null ? void 0 : _a.rows) || [];
    }, tableHeight: 600, tableWidth: "100%", rowHeight: 48, cellPadding: "py-3 px-4" });
  } })), escape(createComponent(Show, { get when() {
    return o.currentStep === "mapping";
  }, get children() {
    return [createComponent(Se, { get csvHeaders() {
      var _a;
      return ((_a = o.fileData) == null ? void 0 : _a.headers) || [];
    }, onMappingComplete: x, onCancel: b$1, get rows() {
      var _a;
      return ((_a = o.fileData) == null ? void 0 : _a.rows) || [];
    } }), ssr(Ae, ssrHydrationKey())];
  } })), escape(createComponent(Show, { get when() {
    return o.currentStep === "complete";
  }, get children() {
    return ssr(Ue, ssrHydrationKey());
  } })), escape(createComponent(Show, { get when() {
    return o.errorMessage;
  }, get children() {
    return ssr(ke, ssrHydrationKey(), escape(o.errorMessage));
  } })));
}

export { dt as default };
//# sourceMappingURL=index19.mjs.map

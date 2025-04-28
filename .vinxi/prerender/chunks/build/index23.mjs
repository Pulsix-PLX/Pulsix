import { ssr, ssrHydrationKey, escape, createComponent, ssrAttribute } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createSignal, createMemo, Show, For } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { j } from './auth-B-0Ucn5g.mjs';
import { a, g } from './context-5bbmmXgY.mjs';
import { B as B$1 } from './ButtonSparkle-BxHzGCPC.mjs';
import { w } from './index-ClXKiMUD.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/store/dist/server.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/axios@1.8.3/node_modules/axios/index.js';

var q = ["<div", ' class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">', "</div>"], P = ["<div", '><p class="font-medium mb-2">Interpretazione del segno:</p><div class="flex items-center space-x-4"><label class="flex items-center"><input type="radio" name="signInterpretation" value="negativeIsExpense"', '><span class="ml-2">Importi negativi = Uscite, Importi positivi = Entrate</span></label></div><div class="flex items-center space-x-4 mt-2"><label class="flex items-center"><input type="radio" name="signInterpretation" value="negativeIsIncome"', '><span class="ml-2">Importi negativi = Entrate, Importi positivi = Uscite</span></label></div></div>'], L = ["<div", ' class="space-y-3"><div><label class="block font-medium mb-1">Colonna che indica il tipo:</label><select class="w-full p-2 border rounded"', "><option value>-- Seleziona colonna --</option><!--$-->", '<!--/--></select></div><div class="grid grid-cols-2 gap-4"><div><label class="block font-medium mb-1">Valore per Entrate:</label><input type="text" class="w-full p-2 border rounded"', ' placeholder="es. entrata, income, guadagno"></div><div><label class="block font-medium mb-1">Valore per Uscite:</label><input type="text" class="w-full p-2 border rounded"', ' placeholder="es. uscita, expense, spesa"></div></div></div>'], W = ["<div", ` class="mt-2 p-4 bg-gray-50 rounded-lg overflow-x-auto"><p class="text-xs text-gray-600 mb-2">Questa \xE8 un'anteprima di come verranno interpretati i dati in base alla mappatura e alla logica del tipo transazione attuale. 'N/D' significa che il valore nella riga originale era vuoto o nullo. 'Non Mappato' significa che il campo sistema non \xE8 stato associato a nessuna colonna CSV.</p><table class="w-full min-w-max text-sm"> <thead><tr class="border-b-2 border-gray-300 text-left"><!--$-->`, '<!--/--><th class="p-2 font-semibold">Interpretazione</th> </tr></thead><tbody>', "</tbody></table></div>"], J = ["<p", ` class="mt-2 text-sm text-orange-600">Per vedere l'anteprima dell'interpretazione, mappa prima il campo "Amount".</p>`], K = ["<div", ' class="mt-4"><!--$-->', "<!--/--><!--$-->", "<!--/--></div>"], Q = ["<div", ' class="p-6 border rounded-lg shadow-lg mb-6 bg-white"><h2 class="text-2xl font-bold mb-3">Mappatura Colonne</h2><p class="text-sm text-gray-600 mb-4">Trascina le colonne del CSV nei campi del sistema corrispondenti</p><!--$-->', '<!--/--><div class="flex gap-6"><div class="w-1/2 bg-gray-50 p-4 rounded-lg"><h3 class="text-lg font-semibold mb-3">Colonne CSV</h3><p class="text-sm text-gray-500 mb-3">Trascina queste colonne nei campi a destra</p><div class="space-y-2">', '</div></div><div class="w-1/2 bg-gray-50 p-4 rounded-lg"><h3 class="text-lg font-semibold mb-3">Campi Sistema</h3><p class="text-sm text-gray-500 mb-3">Rilascia le colonne CSV qui</p><div class="space-y-2"><!--$-->', '<!--/--><div class="', '"><div class="flex justify-between items-center"><span class="font-medium text-gray-500">Non utilizzare</span><div class="flex flex-wrap gap-1 max-w-xs">', `</div></div></div></div></div></div><div class="mt-6 p-4 bg-gray-50 rounded-lg"><h3 class="text-lg font-semibold mb-3">Configurazione Tipo Transazione</h3><div class="space-y-4"><div><p class="font-medium mb-2">Come determinare se una transazione \xE8 un'entrata o un'uscita?</p><div class="flex items-center space-x-4"><label class="flex items-center"><input type="radio" name="transactionType" value="auto"`, `><span class="ml-2">Dal segno dell'importo</span></label><label class="flex items-center"><input type="radio" name="transactionType" value="column"`, '><span class="ml-2">Da una colonna specifica</span></label></div></div><!--$-->', "<!--/--><!--$-->", '<!--/--></div></div><div class="mt-4"><button class="text-blue-600 hover:text-blue-800 text-sm flex items-center"><!--$-->', "<!--/-->Mostra anteprima interpretazione transazioni</button><!--$-->", '<!--/--></div><div class="mt-6 flex justify-between"><button class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Go back</button><!--$-->', '<!--/--></div><div class="mt-4 text-sm text-gray-500"><p>* I campi contrassegnati sono obbligatori</p></div></div>'], X = ["<button", ' class="text-gray-600 hover:text-red-600" title="Rimuovi mappatura">\u2715</button>'], Y = ["<div", ' class="', '"', '><div class="flex justify-between items-center"><span>', "</span><!--$-->", "<!--/--></div></div>"], Z = ["<div", ' class="flex items-center"><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">', '</span><button class="text-gray-500 hover:text-red-600" title="Rimuovi mappatura">\u2715</button></div>'], ee = ["<div", ' class="', '"><div class="flex justify-between items-center"><div><span class="font-medium">', "</span><!--$-->", "<!--/--></div><!--$-->", "<!--/--></div></div>"], B = ["<span", ' class="text-red-500 ml-1">*</span>'], te = ["<span", ' class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs flex items-center"><!--$-->', '<!--/--><button class="ml-1 text-gray-500 hover:text-red-600">\u2715</button></span>'], ae = ["<option", ">", "</option>"], ne = ["<th", ' class="p-2 font-semibold">', "</th>"], se = ["<tr", ' class="border-b border-gray-200"><td class="p-2">', '</td><td class="p-2">', '</td><td class="p-2">', '</td><td class="', '">', "</td></tr>"];
function xe() {
  const [f, oe] = createSignal({}), [re, le] = createSignal(null), [M, ie] = createSignal(null), [_, w$1] = createSignal(null), [l, de] = createSignal({ mode: "auto", negativeIsExpense: true }), N = [{ id: "amount", label: "Amount" }, { id: "cause", label: "Cause" }, { id: "date", label: "Date" }, { id: "category_id", label: "category" }, { id: "subCategory_id", label: "Sub Category" }], U = ["amount"], [$, ce] = createSignal(false), V = (e) => {
    const i = Object.entries(f()).find(([b, d]) => typeof d == "string" && d.trim() === e);
    return i ? i[0] : null;
  }, F = ["cause", "amount", "date"], z = createMemo(() => {
    var _a, _b, _c;
    console.log("Calculating transactionExamples (detailed)...");
    const e = f();
    if (!((_a = a.data) == null ? void 0 : _a.rows) || ((_b = a.data) == null ? void 0 : _b.length) === 0) return console.log("DEBUG Memo: props.rows \xE8 vuoto."), [];
    const a$1 = {};
    F.forEach((c) => {
      var _a2;
      a$1[c] = (_a2 = Object.entries(e).find(([x, y]) => typeof y == "string" && y.trim() === c)) == null ? void 0 : _a2[0];
    });
    const i = (_c = a.data) == null ? void 0 : _c.rows.slice(0, 5), b = "amount";
    console.log(`DEBUG Memo: Cerco il valore ID: "${b}" (Tipo: string)`);
    const d = Object.entries(e);
    console.log("DEBUG Memo: Controllo queste entries:", JSON.stringify(d)), d.forEach(([c, x]) => {
      const I = (typeof x === "string" ? x.trim() : x) === b;
      console.log(`-- DEBUG Memo Entry: Chiave="<span class="math-inline">{key}", Valore="</span>{value}" (Tipo: <span class="math-inline">{valueType}). Confronto diretto ('</span>{amountFieldId}'): <span class="math-inline">{directMatch}. Confronto con trim ('</span>{amountFieldId}'): ${I}`);
    });
    const r = a$1.amount;
    if (!r) return console.log("DEBUG Memo: Amount header non mappato, impossibile calcolare esempi completi."), [];
    if (console.log("DEBUG: Header mappato per 'amount' (Risultato finale find):", r), !r) return console.log("DEBUG Memo: Amount header NON trovato, ritorno array vuoto."), [];
    console.log(`DEBUG Memo: Amount header trovato: "${r}". Calcolo esempi...`);
    const T = i.map((c, x) => {
      var _a2, _b2, _c2;
      const y = a$1.walletId ? (_a2 = c[a$1.walletId]) != null ? _a2 : "N/D" : "Non Mappato", S = a$1.cause ? (_b2 = c[a$1.cause]) != null ? _b2 : "N/D" : "Non Mappato", I = a$1.date ? (_c2 = c[a$1.date]) != null ? _c2 : "N/D" : "Non Mappato", j = c[r], C = parseFloat(j);
      let E = "Non determinato";
      const p = l();
      if (p.mode === "auto") E = C < 0 === p.negativeIsExpense ? "Expense" : "Income";
      else if (p.mode === "column" && p.columnName && p.positiveValue && p.negativeValue) {
        const k = c[p.columnName];
        k === p.positiveValue ? E = "Income" : k === p.negativeValue && (E = "Expense");
      }
      return { walletId: y, cause: S, amount: isNaN(C) ? "N/A" : C, date: I, interpretation: E };
    });
    return console.log(`DEBUG: Esempi dettagliati calcolati: ${T.length}`), T;
  }), G = async () => {
    var _a, _b, _c;
    console.log("Processing data before sending..."), w$1(null);
    const e = (_a = a.data) == null ? void 0 : _a.rows, a$1 = f(), i = l();
    if (!e || e.length === 0) {
      w$1("Nessun dato da processare.");
      return;
    }
    const b = w(e, a$1, i);
    console.log("Dati processati pronti per l'invio:", b);
    const d = b.filter((r) => r.amount !== null && r.type !== null);
    if (d.length === 0) {
      w$1("Nessuna transazione valida trovata dopo il processamento. Controlla la mappatura e i dati.");
      return;
    }
    try {
      await j.api.post("API/Wallets/Wallet/addTransactionByFile/addTransactions", { transactions: d, walletId: a.walletId }), console.log(`Inviate ${d.length} transazioni processate al server.`), g("complete");
    } catch (r) {
      console.error("Errore durante l'invio dei dati processati:", r), w$1(((_c = (_b = r.response) == null ? void 0 : _b.data) == null ? void 0 : _c.message) || r.message || "Errore durante l'invio dei dati al server");
    }
  };
  return ssr(Q, ssrHydrationKey(), escape(createComponent(Show, { get when() {
    return _();
  }, get children() {
    return ssr(q, ssrHydrationKey(), escape(_()));
  } })), escape(createComponent(For, { get each() {
    var _a;
    return (_a = a.data) == null ? void 0 : _a.headers;
  }, children: (e) => {
    const a = createMemo(() => Object.keys(f()).includes(e));
    return ssr(Y, ssrHydrationKey(), `p-3 rounded-md cursor-grab ${a() ? "bg-gray-300 text-gray-600" : "bg-blue-100 hover:bg-blue-200 text-blue-800"}`, ssrAttribute("draggable", !a(), false), escape(e), escape(createComponent(Show, { get when() {
      return a();
    }, get children() {
      return ssr(X, ssrHydrationKey());
    } })));
  } })), escape(createComponent(For, { each: N, children: (e) => {
    const a = createMemo(() => V(e.id)), i = U.includes(e.id);
    return ssr(ee, ssrHydrationKey(), `p-3 rounded-md border-2 ${M() === e.id ? "border-blue-500 bg-blue-50" : a() ? "border-green-500 bg-green-50" : i ? "border-yellow-300 bg-yellow-50" : "border-gray-300 bg-white"}`, escape(e.label), i && B[0] + ssrHydrationKey() + B[1], escape(createComponent(Show, { get when() {
      return a();
    }, get children() {
      return ssr(Z, ssrHydrationKey(), escape(a()));
    } })));
  } })), `p-3 rounded-md border-2 ${M() === "non_utilizzare" ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"}`, escape(createComponent(For, { get each() {
    return Object.entries(f());
  }, children: ([e, a]) => createComponent(Show, { when: a === "non_utilizzare", get children() {
    return ssr(te, ssrHydrationKey(), escape(e));
  } }) })), ssrAttribute("checked", l().mode === "auto", true), ssrAttribute("checked", l().mode === "column", true), escape(createComponent(Show, { get when() {
    return l().mode === "auto";
  }, get children() {
    return ssr(P, ssrHydrationKey(), ssrAttribute("checked", l().negativeIsExpense === true, true), ssrAttribute("checked", l().negativeIsExpense === false, true));
  } })), escape(createComponent(Show, { get when() {
    return l().mode === "column";
  }, get children() {
    return ssr(L, ssrHydrationKey(), ssrAttribute("value", escape(l().columnName, true) || "", false), escape(createComponent(For, { get each() {
      var _a;
      return (_a = a.data) == null ? void 0 : _a.headers;
    }, children: (e) => ssr(ae, ssrHydrationKey() + ssrAttribute("value", escape(e, true), false), escape(e)) })), ssrAttribute("value", escape(l().positiveValue, true) || "", false), ssrAttribute("value", escape(l().negativeValue, true) || "", false));
  } })), $() ? "\u25BC " : "\u25BA ", escape(createComponent(Show, { get when() {
    return $();
  }, get children() {
    return ssr(K, ssrHydrationKey(), escape(createComponent(Show, { get when() {
      return $() && z().length > 0;
    }, get children() {
      return ssr(W, ssrHydrationKey(), escape(createComponent(For, { each: N, children: (e) => ssr(ne, ssrHydrationKey(), escape(e.label)) })), escape(createComponent(For, { get each() {
        return z();
      }, children: (e) => ssr(se, ssrHydrationKey(), escape(e.amount), escape(e.cause), escape(e.date), `p-2 font-medium ${e.interpretation === "Income" ? "text-green-600" : e.interpretation === "Expense" ? "text-red-600" : "text-gray-600"}`, escape(e.interpretation)) })));
    } })), escape(createComponent(Show, { get when() {
      return $() && !V("amount");
    }, get children() {
      return ssr(J, ssrHydrationKey());
    } })));
  } })), escape(createComponent(B$1, { onClick: G, text: "Conferma mappatura" })));
}

export { xe as default };
//# sourceMappingURL=index23.mjs.map

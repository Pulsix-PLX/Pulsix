import { ssr, ssrHydrationKey, escape, createComponent, ssrAttribute } from 'solid-js/web';
import { createSignal, createMemo, Show, For } from 'solid-js';
import { B } from './ButtonSparkle-BxHzGCPC.mjs';
import { j } from './auth-B-0Ucn5g.mjs';
import 'solid-js/store';
import 'axios';

var q = ["<div", ' class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">', "</div>"], L = ["<div", '><p class="font-medium mb-2">Interpretazione del segno:</p><div class="flex items-center space-x-4"><label class="flex items-center"><input type="radio" name="signInterpretation" value="negativeIsExpense"', '><span class="ml-2">Importi negativi = Uscite, Importi positivi = Entrate</span></label></div><div class="flex items-center space-x-4 mt-2"><label class="flex items-center"><input type="radio" name="signInterpretation" value="negativeIsIncome"', '><span class="ml-2">Importi negativi = Entrate, Importi positivi = Uscite</span></label></div></div>'], P = ["<div", ' class="space-y-3"><div><label class="block font-medium mb-1">Colonna che indica il tipo:</label><select class="w-full p-2 border rounded"', "><option value>-- Seleziona colonna --</option><!--$-->", '<!--/--></select></div><div class="grid grid-cols-2 gap-4"><div><label class="block font-medium mb-1">Valore per Entrate:</label><input type="text" class="w-full p-2 border rounded"', ' placeholder="es. entrata, income, guadagno"></div><div><label class="block font-medium mb-1">Valore per Uscite:</label><input type="text" class="w-full p-2 border rounded"', ' placeholder="es. uscita, expense, spesa"></div></div></div>'], W = ["<div", ` class="mt-2 p-4 bg-gray-50 rounded-lg overflow-x-auto"><p class="text-xs text-gray-600 mb-2">Questa \xE8 un'anteprima di come verranno interpretati i dati in base alla mappatura e alla logica del tipo transazione attuale. 'N/D' significa che il valore nella riga originale era vuoto o nullo. 'Non Mappato' significa che il campo sistema non \xE8 stato associato a nessuna colonna CSV.</p><table class="w-full min-w-max text-sm"> <thead><tr class="border-b-2 border-gray-300 text-left"><!--$-->`, '<!--/--><th class="p-2 font-semibold">Interpretazione</th> </tr></thead><tbody>', "</tbody></table></div>"], J = ["<p", ` class="mt-2 text-sm text-orange-600">Per vedere l'anteprima dell'interpretazione, mappa prima il campo "Amount".</p>`], K = ["<div", ' class="mt-4"><button class="text-blue-600 hover:text-blue-800 text-sm flex items-center"><!--$-->', "<!--/-->Mostra anteprima dati interpretati (prime 5 righe)</button><!--$-->", "<!--/--><!--$-->", "<!--/--></div>"], Q = ["<div", ' class="p-6 border rounded-lg shadow-lg mb-6 bg-white"><h2 class="text-2xl font-bold mb-3">Mappatura Colonne</h2><p class="text-sm text-gray-600 mb-4">Trascina le colonne del CSV nei campi del sistema corrispondenti</p><!--$-->', '<!--/--><div class="flex gap-6"><div class="w-1/2 bg-gray-50 p-4 rounded-lg"><h3 class="text-lg font-semibold mb-3">Colonne CSV</h3><p class="text-sm text-gray-500 mb-3">Trascina queste colonne nei campi a destra</p><div class="space-y-2">', '</div></div><div class="w-1/2 bg-gray-50 p-4 rounded-lg"><h3 class="text-lg font-semibold mb-3">Campi Sistema</h3><p class="text-sm text-gray-500 mb-3">Rilascia le colonne CSV qui</p><div class="space-y-2"><!--$-->', '<!--/--><div class="', '"><div class="flex justify-between items-center"><span class="font-medium text-gray-500">Non utilizzare</span><div class="flex flex-wrap gap-1 max-w-xs">', `</div></div></div></div></div></div><div class="mt-6 p-4 bg-gray-50 rounded-lg"><h3 class="text-lg font-semibold mb-3">Configurazione Tipo Transazione</h3><div class="space-y-4"><div><p class="font-medium mb-2">Come determinare se una transazione \xE8 un'entrata o un'uscita?</p><div class="flex items-center space-x-4"><label class="flex items-center"><input type="radio" name="transactionType" value="auto"`, `><span class="ml-2">Dal segno dell'importo</span></label><label class="flex items-center"><input type="radio" name="transactionType" value="column"`, '><span class="ml-2">Da una colonna specifica</span></label></div></div><!--$-->', "<!--/--><!--$-->", '<!--/--></div></div><div class="mt-4"><button class="text-blue-600 hover:text-blue-800 text-sm flex items-center"><!--$-->', "<!--/-->Mostra anteprima interpretazione transazioni</button><!--$-->", '<!--/--></div><div class="mt-6 flex justify-between"><button class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Annulla</button><!--$-->', '<!--/--></div><div class="mt-4 text-sm text-gray-500"><p>* I campi contrassegnati sono obbligatori</p></div></div>'], X = ["<button", ' class="text-gray-600 hover:text-red-600" title="Rimuovi mappatura">\u2715</button>'], Y = ["<div", ' class="', '"', '><div class="flex justify-between items-center"><span>', "</span><!--$-->", "<!--/--></div></div>"], Z = ["<div", ' class="flex items-center"><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">', '</span><button class="text-gray-500 hover:text-red-600" title="Rimuovi mappatura">\u2715</button></div>'], ee = ["<div", ' class="', '"><div class="flex justify-between items-center"><div><span class="font-medium">', "</span><!--$-->", "<!--/--></div><!--$-->", "<!--/--></div></div>"], k = ["<span", ' class="text-red-500 ml-1">*</span>'], te = ["<span", ' class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs flex items-center"><!--$-->', '<!--/--><button class="ml-1 text-gray-500 hover:text-red-600">\u2715</button></span>'], ae = ["<option", ">", "</option>"], ne = ["<th", ' class="p-2 font-semibold">', "</th>"], re = ["<tr", ' class="border-b border-gray-200"><td class="p-2">', '</td><td class="p-2">', '</td><td class="p-2">', '</td><td class="p-2">', '</td><td class="', '">', "</td></tr>"];
function ye(m) {
  const C = [{ id: "cause", label: "Cause" }, { id: "amount", label: "Amount" }, { id: "currency", label: "Currency" }, { id: "date", label: "Date" }], N = ["amount", "walletId", "currency"], B$1 = ["cause", "amount", "currency", "date"], [g, se] = createSignal({}), [oe, le] = createSignal(null), [V, ie] = createSignal(null), [D, F] = createSignal(null), [s, ce] = createSignal({ mode: "auto", negativeIsExpense: true }), [y, de] = createSignal(false);
  createMemo(() => {
    const e = Object.values(g()), a = N.every((i) => e.includes(i));
    return s().mode === "column" ? a && !!s().columnName && !!s().positiveValue && !!s().negativeValue : a;
  });
  const j$1 = async () => {
    console.log("eee");
    try {
      const e = g(), a = s();
      console.log("sent"), await j.api.post("API/Wallets/Wallet/addTransactionByFile/addTransactions", { columnMapping: e, transactionTypeLogic: a }), m.onMappingComplete(e, a);
    } catch (e) {
      console.error("Errore durante l'invio della mappatura:", e), F(e.message || "Errore durante l'invio della mappatura");
    }
  }, _ = (e) => {
    const i = Object.entries(g()).find(([M, x]) => typeof x == "string" && x.trim() === e);
    return i ? i[0] : null;
  }, T = createMemo(() => {
    console.log("Calculating transactionExamples (detailed)...");
    const e = g();
    if (!m.rows || m.rows.length === 0) return console.log("DEBUG Memo: props.rows \xE8 vuoto."), [];
    const a = {};
    B$1.forEach((l) => {
      var _a;
      a[l] = (_a = Object.entries(e).find(([f, w]) => typeof w == "string" && w.trim() === l)) == null ? void 0 : _a[0];
    });
    const i = m.rows.slice(0, 5), M = "amount";
    console.log(`DEBUG Memo: Cerco il valore ID: "${M}" (Tipo: string)`);
    const x = Object.entries(e);
    console.log("DEBUG Memo: Controllo queste entries:", JSON.stringify(x)), x.forEach(([l, f]) => {
      const u = (typeof f === "string" ? f.trim() : f) === M;
      console.log(`-- DEBUG Memo Entry: Chiave="<span class="math-inline">{key}", Valore="</span>{value}" (Tipo: <span class="math-inline">{valueType}). Confronto diretto ('</span>{amountFieldId}'): <span class="math-inline">{directMatch}. Confronto con trim ('</span>{amountFieldId}'): ${u}`);
    });
    const h = a.amount;
    if (!h) return console.log("DEBUG Memo: Amount header non mappato, impossibile calcolare esempi completi."), [];
    if (console.log("DEBUG: Header mappato per 'amount' (Risultato finale find):", h), !h) return console.log("DEBUG Memo: Amount header NON trovato, ritorno array vuoto."), [];
    console.log(`DEBUG Memo: Amount header trovato: "${h}". Calcolo esempi...`);
    const z = i.map((l, f) => {
      var _a, _b, _c, _d;
      const w = a.walletId ? (_a = l[a.walletId]) != null ? _a : "N/D" : "Non Mappato", U = a.cause ? (_b = l[a.cause]) != null ? _b : "N/D" : "Non Mappato", u = a.currency ? (_c = l[a.currency]) != null ? _c : "N/D" : "Non Mappato", O = a.date ? (_d = l[a.date]) != null ? _d : "N/D" : "Non Mappato", A = l[h], I = parseFloat(A);
      let $ = "Non determinato";
      const c = s();
      if (c.mode === "auto") $ = I < 0 === c.negativeIsExpense ? "Uscita" : "Entrata";
      else if (c.mode === "column" && c.columnName && c.positiveValue && c.negativeValue) {
        const S = l[c.columnName];
        S === c.positiveValue ? $ = "Entrata" : S === c.negativeValue && ($ = "Uscita");
      }
      const G = u && u !== "Non Mappato" && u !== "N/D" ? u : "EUR";
      return { walletId: w, cause: U, amount: isNaN(I) ? "N/A" : new Intl.NumberFormat("it-IT", { style: "currency", currency: G }).format(I), currency: u, date: O, interpretation: $ };
    });
    return console.log(`DEBUG: Esempi dettagliati calcolati: ${z.length}`), z;
  });
  return ssr(Q, ssrHydrationKey(), escape(createComponent(Show, { get when() {
    return D();
  }, get children() {
    return ssr(q, ssrHydrationKey(), escape(D()));
  } })), escape(createComponent(For, { get each() {
    return m.csvHeaders;
  }, children: (e) => {
    const a = createMemo(() => Object.keys(g()).includes(e));
    return ssr(Y, ssrHydrationKey(), `p-3 rounded-md cursor-grab ${a() ? "bg-gray-300 text-gray-600" : "bg-blue-100 hover:bg-blue-200 text-blue-800"}`, ssrAttribute("draggable", !a(), false), escape(e), escape(createComponent(Show, { get when() {
      return a();
    }, get children() {
      return ssr(X, ssrHydrationKey());
    } })));
  } })), escape(createComponent(For, { each: C, children: (e) => {
    const a = createMemo(() => _(e.id)), i = N.includes(e.id);
    return ssr(ee, ssrHydrationKey(), `p-3 rounded-md border-2 ${V() === e.id ? "border-blue-500 bg-blue-50" : a() ? "border-green-500 bg-green-50" : i ? "border-yellow-300 bg-yellow-50" : "border-gray-300 bg-white"}`, escape(e.label), i && k[0] + ssrHydrationKey() + k[1], escape(createComponent(Show, { get when() {
      return a();
    }, get children() {
      return ssr(Z, ssrHydrationKey(), escape(a()));
    } })));
  } })), `p-3 rounded-md border-2 ${V() === "non_utilizzare" ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"}`, escape(createComponent(For, { get each() {
    return Object.entries(g());
  }, children: ([e, a]) => createComponent(Show, { when: a === "non_utilizzare", get children() {
    return ssr(te, ssrHydrationKey(), escape(e));
  } }) })), ssrAttribute("checked", s().mode === "auto", true), ssrAttribute("checked", s().mode === "column", true), escape(createComponent(Show, { get when() {
    return s().mode === "auto";
  }, get children() {
    return ssr(L, ssrHydrationKey(), ssrAttribute("checked", s().negativeIsExpense === true, true), ssrAttribute("checked", s().negativeIsExpense === false, true));
  } })), escape(createComponent(Show, { get when() {
    return s().mode === "column";
  }, get children() {
    return ssr(P, ssrHydrationKey(), ssrAttribute("value", escape(s().columnName, true) || "", false), escape(createComponent(For, { get each() {
      return m.csvHeaders;
    }, children: (e) => ssr(ae, ssrHydrationKey() + ssrAttribute("value", escape(e, true), false), escape(e)) })), ssrAttribute("value", escape(s().positiveValue, true) || "", false), ssrAttribute("value", escape(s().negativeValue, true) || "", false));
  } })), y() ? "\u25BC " : "\u25BA ", escape(createComponent(Show, { get when() {
    return y();
  }, get children() {
    return ssr(K, ssrHydrationKey(), y() ? "\u25BC " : "\u25BA ", escape(createComponent(Show, { get when() {
      return y() && T().length > 0;
    }, get children() {
      return ssr(W, ssrHydrationKey(), escape(createComponent(For, { each: C, children: (e) => ssr(ne, ssrHydrationKey(), escape(e.label)) })), escape(createComponent(For, { get each() {
        return T();
      }, children: (e) => ssr(re, ssrHydrationKey(), escape(e.cause), escape(e.amount), escape(e.currency), escape(e.date), `p-2 font-medium ${e.interpretation === "Entrata" ? "text-green-600" : e.interpretation === "Uscita" ? "text-red-600" : "text-gray-600"}`, escape(e.interpretation)) })));
    } })), escape(createComponent(Show, { get when() {
      return y() && !_("amount");
    }, get children() {
      return ssr(J, ssrHydrationKey());
    } })));
  } })), escape(createComponent(B, { onClick: j$1, text: "Conferma mappatura" })));
}

export { ye as default };
//# sourceMappingURL=mapper.mjs.map

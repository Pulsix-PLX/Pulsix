import { ssr, ssrHydrationKey, escape, createComponent, ssrAttribute } from 'solid-js/web';
import { createSignal, createMemo, createEffect, onMount, onCleanup, For, Show } from 'solid-js';
import { o, n } from './context-XUFMQc9R2.mjs';
import { B } from './ButtonSparkle-BxHzGCPC2.mjs';
import 'solid-js/store';

var N = ["<div", ' class="p-6 border rounded-lg shadow-lg mb-6 bg-white"><h2 class="text-2xl font-bold mb-3">Anteprima Dati (Contestualizzata)</h2><p class="text-sm text-gray-600 mb-4">Dataset con <!--$-->', '<!--/--> righe totali - <span class="font-medium text-blue-600">Clicca su una cella per modificare</span>(Salvataggio automatico uscendo dalla cella)</p><div class="overflow-auto border border-gray-200 rounded-lg relative" style="', '"><div style="', '"><table class="w-full bg-white border-separate border-spacing-0" style="', '"><thead class="sticky top-0 z-10 bg-gray-100"><tr>', "</tr></thead><tbody>", '</tbody></table></div></div><div class="mt-4 text-sm text-gray-500"><p>Scorri per visualizzare pi\xF9 righe. Clicca una cella per modificarla (Invio salva ed esce, Esc annulla, click su altra cella/fuori salva).</p></div></div>'], U = ["<div", ` class="mt-6 flex justify-end items-center"> <div class="flex space-x-2"><button class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300" title="Annulla l'intero processo di importazione">Annulla Processo</button><!--$-->`, "<!--/--></div></div>"], V = ["<th", ' class="', '">', "</th>"], W = ["<tr", ' class="hover:bg-gray-50 border-b border-gray-200" style="', '">', "</tr>"], j = ["<input", ' type="text" class="w-full h-full px-4 py-3 ..."', ">"], K = ["<td", ' class="', '" style="', '">', "</td>"], q = ["<div", ' class="w-full h-full flex items-center cursor-pointer" title="', '">', "</div>"], G = ["<button", ' class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Procedi</button>'];
const lt = (e) => {
  var _a;
  const c = e.rowHeight || 48, v = e.tableHeight || 800, P = e.tableWidth || "100%", f = e.cellPadding || "py-3 px-4", [g, T] = createSignal([]), [p, A] = createSignal(null), [D, J] = createSignal(0);
  const w = createMemo(() => v), M = createMemo(() => Math.ceil(w() / c) + 5), h = createMemo(() => Math.max(0, Math.floor(D() / c))), _ = createMemo(() => {
    const a = g();
    if (!a) return [];
    const r = h(), i = M(), u = Math.min(r + i, a.length);
    return a.slice(r, u);
  }), k = createMemo(() => {
    var _a2;
    return ((_a2 = g()) == null ? void 0 : _a2.length) * c || 0;
  });
  createEffect(() => {
    var _a2;
    const r = ((_a2 = e.rows) == null ? void 0 : _a2.map((i) => ({ ...i }))) || [];
    T(r);
  });
  const z = () => {
    p() !== null && A(null);
  }, x = (a) => {
    p();
  };
  onMount(() => {
    document.addEventListener("mousedown", x), console.log("Componente CsvPreview CONTESTUALIZZATO montato.");
  }), onCleanup(() => {
    document.removeEventListener("mousedown", x), console.log("Componente CsvPreview CONTESTUALIZZATO smontato.");
  });
  function I() {
    var _a2, _b;
    z(), ((_b = (_a2 = o.fileData) == null ? void 0 : _a2.headers) != null ? _b : []).length > 0 ? (console.log(o.fileData), n("mapping")) : console.warn("Impossibile procedere: dati/headers mancanti nel context.");
  }
  return [ssr(N, ssrHydrationKey(), escape((_a = e.rows) == null ? void 0 : _a.length) || 0, `height:${escape(w(), true)}px` + (";width:" + escape(P, true)), `height:${escape(k(), true)}px;position:relative`, `position:absolute;top:${escape(h(), true) * escape(c, true)}px;width:100%`, escape(createComponent(For, { get each() {
    return e.headers;
  }, children: (a) => ssr(V, ssrHydrationKey(), `${escape(f, true)} ...`, escape(a)) })), escape(createComponent(For, { get each() {
    return _();
  }, children: (a, r) => ssr(W, ssrHydrationKey(), `height:${escape(c, true)}px`, escape(createComponent(For, { get each() {
    return e.headers;
  }, children: (i) => {
    const u = createMemo(() => h() + r()), y = createMemo(() => {
      const d = p();
      return d !== null && d.visibleRowIndex === r() && d.header === i;
    }), C = createMemo(() => {
      var _a2, _b;
      const d = g(), R = u();
      return (_b = (_a2 = d == null ? void 0 : d[R]) == null ? void 0 : _a2[i]) != null ? _b : "";
    });
    return ssr(K, ssrHydrationKey(), `${escape(f, true)} border-gray-200`, "padding:" + (y() ? "0" : escape(void 0, true)) + ";position:relative", escape(createComponent(Show, { get when() {
      return y();
    }, get fallback() {
      return ssr(q, ssrHydrationKey(), `Riga ${escape(u(), true)}, Colonna ${escape(i, true)}`, escape(C()));
    }, get children() {
      return ssr(j, ssrHydrationKey(), ssrAttribute("value", escape(C(), true), false));
    } })));
  } }))) }))), ssr(U, ssrHydrationKey(), escape(createComponent(Show, { when: typeof B < "u", get fallback() {
    return ssr(G, ssrHydrationKey());
  }, get children() {
    return createComponent(B, { onClick: I, text: "Procedi con la mappatura" });
  } })))];
};

export { lt as default };
//# sourceMappingURL=preview2.mjs.map

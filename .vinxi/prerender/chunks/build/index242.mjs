import { ssr, ssrHydrationKey, escape, createComponent, ssrAttribute } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createSignal, createMemo, onMount, onCleanup, For, Show } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { a, g } from './context-5bbmmXgY2.mjs';
import { B as B$1 } from './ButtonSparkle-BxHzGCPC2.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/store/dist/server.js';

var B = ["<div", ' class="p-6 border rounded-lg shadow-lg mb-6 "><h2 class="text-2xl font-bold mb-3">Anteprima Dati (Contestualizzata)</h2><p class="text-sm text-gray-600 mb-4">Dataset con <!--$-->', '<!--/--> righe totali - <span class="font-medium text-blue-600">Clicca su una cella per modificare</span>(Salvataggio automatico uscendo dalla cella)</p><div class="overflow-auto border border-gray-200 rounded-lg relative" style="', '"><div style="', '"><table class="w-full bg-white border-separate border-spacing-0" style="', '"><thead class="sticky top-0 z-10 bg-gray-100"><tr>', "</tr></thead><tbody>", `</tbody></table></div></div><div class="mt-6 flex justify-end items-center"><div class="flex space-x-2"><button class=" bg-gray-200 text-gray-800 rounded hover:bg-gray-300" title="Annulla l'intero processo di importazione">Back to upload file</button><!--$-->`, '<!--/--></div></div><div class="my-4 flex justify-start space-x-2"><button class="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"', ' title="Annulla tutte le modifiche fatte nella tabella">Resetta Modifiche Tabella</button><button class="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed"', ` title="Annulla l'ultima modifica fatta nella tabella">Annulla Ultima Modifica</button></div></div>`], D = ["<th", ' class="', '">', "</th>"], N = ["<tr", ' class="hover:bg-gray-50 border-b border-gray-200" style="', '">', "</tr>"], U = ["<input", ' type="text" class="w-full h-full px-4 py-3 ..."', ">"], j = ["<td", ' class="', '" style="', '">', "</td>"], V = ["<div", ' class="w-full h-full flex items-center cursor-pointer" title="', '">', "</div>"], F = ["<button", ' class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Next to mapper</button>'];
function Y() {
  var _a, _b;
  const [p, T] = createSignal(null), [S, K] = createSignal(0);
  const m = createMemo(() => {
    var _a2;
    return (((_a2 = a.history) == null ? void 0 : _a2.length) || 0) > 0;
  });
  onMount(() => {
    document.addEventListener("mousedown", w), console.log("Componente CsvPreview CONTESTUALIZZATO montato.");
  }), onCleanup(() => {
    document.removeEventListener("mousedown", w), console.log("Componente CsvPreview CONTESTUALIZZATO smontato.");
  });
  const s = 48, f = 800, E = "70%", v = "py-3 px-4", y = createMemo(() => f), _ = createMemo(() => Math.ceil(y() / s) + 5), g$1 = createMemo(() => Math.max(0, Math.floor(S() / s))), H = createMemo(() => {
    var _a2, _b2;
    const l = Array.isArray((_a2 = a.data) == null ? void 0 : _a2.rows) ? (_b2 = a.data) == null ? void 0 : _b2.rows : [];
    if (!l) return [];
    const i = g$1(), d = _(), u = Math.min(i + d, l.length);
    return l.slice(i, u);
  }), I = createMemo(() => {
    var _a2, _b2, _c;
    return ((_c = (_b2 = (_a2 = a.data) == null ? void 0 : _a2.rows) == null ? void 0 : _b2.length) != null ? _c : 0) * s;
  }), R = () => {
    p() !== null && T(null);
  }, w = (l) => {
    p();
  };
  function O() {
    var _a2, _b2;
    R(), ((_b2 = (_a2 = a.data) == null ? void 0 : _a2.headers) != null ? _b2 : []).length > 0 ? (console.log(a.data), g("mapping")) : console.warn("Impossibile procedere: dati/headers mancanti nel context.");
  }
  return ssr(B, ssrHydrationKey(), escape((_b = (_a = a.data) == null ? void 0 : _a.rows) == null ? void 0 : _b.length) || 0, `height:${escape(y(), true)}px` + (";width:" + escape(E, true)), `height:${escape(I(), true)}px;position:relative`, `position:absolute;top:${escape(g$1(), true) * escape(s, true)}px;width:100%`, escape(createComponent(For, { get each() {
    var _a2;
    return (_a2 = a.data) == null ? void 0 : _a2.headers;
  }, children: (l) => ssr(D, ssrHydrationKey(), `${escape(v, true)} ...`, escape(l)) })), escape(createComponent(For, { get each() {
    return H();
  }, children: (l, i) => ssr(N, ssrHydrationKey(), `height:${escape(s, true)}px`, escape(createComponent(For, { get each() {
    var _a2;
    return (_a2 = a.data) == null ? void 0 : _a2.headers;
  }, children: (d) => {
    const u = createMemo(() => g$1() + i()), x = createMemo(() => {
      const c = p();
      return c !== null && c.visibleRowIndex === i() && c.header === d;
    }), C = createMemo(() => {
      var _a2, _b2, _c;
      const c = (_a2 = a.data) == null ? void 0 : _a2.rows, P = u();
      return (_c = (_b2 = c == null ? void 0 : c[P]) == null ? void 0 : _b2[d]) != null ? _c : "";
    });
    return ssr(j, ssrHydrationKey(), `${escape(v, true)} border-gray-200`, "padding:" + (x() ? "0" : escape(void 0, true)) + ";position:relative", escape(createComponent(Show, { get when() {
      return x();
    }, get fallback() {
      return ssr(V, ssrHydrationKey(), `Riga ${escape(u(), true)}, Colonna ${escape(d, true)}`, escape(C()));
    }, get children() {
      return ssr(U, ssrHydrationKey(), ssrAttribute("value", escape(C(), true), false));
    } })));
  } }))) })), escape(createComponent(Show, { when: typeof B$1 < "u", get fallback() {
    return ssr(F, ssrHydrationKey());
  }, get children() {
    return createComponent(B$1, { onClick: O, text: "Procedi con la mappatura" });
  } })), ssrAttribute("disabled", !m(), true), ssrAttribute("disabled", !m(), true));
}

export { Y as default };
//# sourceMappingURL=index242.mjs.map

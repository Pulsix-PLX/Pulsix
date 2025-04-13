import { createComponent, ssr, ssrHydrationKey, escape, ssrAttribute } from 'solid-js/web';
import { createSignal, Show } from 'solid-js';

var h = ["<div", ' class="TableWrapper"><table class="Table"><thead><tr><th>Cause</th><th>Amount</th><th>Category</th><th class="text-center">Date</th></tr></thead><tbody><!--$-->', "<!--/--><!--$-->", "<!--/--></tbody></table></div>"], y = ["<tr", ' class="text-white text-xl" style="', `"><td colspan="5">There isn't anything, add a transaction!</td></tr>`], m = ["<tr", '><td class="text-black"><button>', '</button></td><td class="text-black text-right"><button>', "</button></td><td><button>", '</button></td><td class="text-black"><button>', "</button></td></tr>"];
const [p, $] = createSignal(null), [g, H] = createSignal(null);
function I(n) {
  const [d, v] = createSignal("Income"), [o, f] = createSignal(void 0), [r, x] = createSignal(void 0), [i, D] = createSignal(void 0);
  return createComponent(Show, { get when() {
    return n.transactions;
  }, get children() {
    return ssr(h, ssrHydrationKey(), n.transactions.length ? escape(null) : ssr(y, ssrHydrationKey(), "justify-content:center"), escape(n.transactions.filter((t) => d() ? t.type == d() : true).filter((t) => {
      var _a, _b, _c, _d;
      return o() && r() ? t.Date >= ((_a = o()) != null ? _a : 0) && t.Date <= ((_b = r()) != null ? _b : 1 / 0) : o() ? t.Date >= ((_c = o()) != null ? _c : 0) : r() ? t.Date <= ((_d = r()) != null ? _d : 1 / 0) : true;
    }).filter((t) => i() ? t.CategoryName === i() : true).map((t, w) => ssr(m, ssrHydrationKey() + ssrAttribute("class", p() === t.id ? "Hover" : g() === t.id ? "Active" : "", false), escape(t.cause), escape(t.amount), escape(t.category_id), t.date ? escape(new Date(t.date).toISOString().split("T")[0]) : ""))));
  } });
}

export { g as ActiveRow, p as HoveredRow, H as SetActiveRow, $ as SetHoveredRow, I as default };
//# sourceMappingURL=index152.mjs.map

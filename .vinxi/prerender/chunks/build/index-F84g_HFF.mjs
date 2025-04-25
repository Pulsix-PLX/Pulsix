import { E } from './server-fns-runtime-DEO2-sKc.mjs';
import { a as t } from '../_/nitro.mjs';
import { createComponent, ssr, ssrHydrationKey, escape, ssrAttribute } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createSignal, Show } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';

const A = E(async function(s) {
  var _a, _b;
  console.log("getTransactions", s);
  try {
    return (_b = (_a = await t.query("SELECT * FROM transactions WHERE wallet_id = $1 ORDER BY date DESC", [s])) == null ? void 0 : _a.rows) != null ? _b : [];
  } catch (l) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", l), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_Wallet_getTransactions_ts--getTransactions_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/Wallet/getTransactions.ts?tsr-directive-use-server=");
var y = ["<div", ' class="TableWrapper"><table class="Table"><thead><tr><th>Cause</th><th>Amount</th><th>Category</th><th class="text-center">Date</th></tr></thead><tbody><!--$-->', "<!--/--><!--$-->", "<!--/--></tbody></table></div>"], p = ["<tr", ' class="text-white text-xl" style="', `"><td colspan="5">There isn't anything, add a transaction!</td></tr>`], v = ["<tr", '><td class="text-black"><button>', '</button></td><td class="text-black text-right"><button>', "</button></td><td><button>", '</button></td><td class="text-black"><button>', "</button></td></tr>"];
const [f, $] = createSignal(null), [D, H] = createSignal(null);
function I(a) {
  const [s, l] = createSignal("Income"), [o, w] = createSignal(void 0), [n, _] = createSignal(void 0), [u, S] = createSignal(void 0);
  return createComponent(Show, { get when() {
    return a.transactions;
  }, get children() {
    return ssr(y, ssrHydrationKey(), a.transactions.length ? escape(null) : ssr(p, ssrHydrationKey(), "justify-content:center"), escape(a.transactions.filter((t) => s() ? t.type == s() : true).filter((t) => {
      var _a, _b, _c, _d;
      return o() && n() ? t.Date >= ((_a = o()) != null ? _a : 0) && t.Date <= ((_b = n()) != null ? _b : 1 / 0) : o() ? t.Date >= ((_c = o()) != null ? _c : 0) : n() ? t.Date <= ((_d = n()) != null ? _d : 1 / 0) : true;
    }).filter((t) => u() ? t.CategoryName === u() : true).map((t, x) => ssr(v, ssrHydrationKey() + ssrAttribute("class", f() === t.id ? "Hover" : D() === t.id ? "Active" : "", false), escape(t.cause), escape(t.amount), escape(t.category_id), t.date ? escape(new Date(t.date).toISOString().split("T")[0]) : ""))));
  } });
}

export { A, I };
//# sourceMappingURL=index-F84g_HFF.mjs.map

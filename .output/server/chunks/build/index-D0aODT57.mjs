import { createComponent, ssr, ssrHydrationKey, escape, ssrAttribute } from 'solid-js/web';
import { createSignal, createResource, For, Show } from 'solid-js';
import { z, B, W } from './exchangeRates-BGrzYQig.mjs';
import { v } from './auth.server-ChqlnWrh.mjs';
import { A } from '../_/nitro.mjs';

var _ = ["<img", ' class="absolute w-23 ml-[15.8vw] cursor-pointer z-100" src="/icons/edit.png" style="', '">'], E = ["<img", ' src="/img/wallets/backCardHolder.png" class="', '" style="', '">'], D = ["<span", ' class="text-orange-500 text-xs ml-1 cursor-help"', ">(\u26A0\uFE0F) </span>"], R = ["<span", ' class="text-red-500 text-xs cursor-help"', ">(Errore!)</span>"], U = ["<div", ' class="relative w-[17.7vw] inline-block"><img src="/img/wallets/frontCardHolder.png" class="block w-full"><p class="absolute bottom-[3.8vw] left-1/2 transform -translate-x-1/2 z-10 text-[1.2vw] text-center whitespace-nowrap w-[90%] overflow-hidden text-ellipsis">', '</p><p class="absolute bottom-[0.5vw] ml-[1vw] z-10 text-[1.3vw] whitespace-nowrap text-left"><!--$-->', "<!--/--><!--$-->", "<!--/--></p></div>"], I = ["<span", ">...</span>"];
const [m, P] = createSignal(null);
function Y(e) {
  const [h, S] = createSignal(false), u = [{ color: "", wallet: "nothing", balance: 0, currency: "USD", id: 0 }], g = "EUR", [r] = createResource(() => ({ containerId: e.id, targetCurrency: g }), async (n) => {
    const { containerId: i, targetCurrency: f } = n;
    try {
      const c = await v();
      if (c === null) throw new Error("Utente non autenticato per calcolo totale.");
      return await z(i, f, c);
    } catch (c) {
      throw console.error(`[ConvertedTotalResource] Error fetching/calculating total for container ${i}:`, c), c;
    }
  }), p = (n) => {
    console.log("Link clicked. Edit mode:", m()), m() ? (console.log("Preventing default link action and stopping propagation because edit=true"), n.preventDefault(), n.stopPropagation()) : e.onclick && (console.log("Executing props.onclick"), e.onclick());
  };
  return [createComponent(For, { get each() {
    return e.data && e.data.length > 0 ? e.data : null;
  }, children: (n, i) => createComponent(B, { get color() {
    return n.color;
  }, get wallet() {
    return n.wallet;
  }, get balance() {
    return n.balance;
  }, get position() {
    return i();
  }, get currency() {
    return n.currency;
  }, get id() {
    return n.id;
  } }) }), createComponent(A, { get href() {
    return e.href;
  }, onclick: p, get children() {
    var _a, _b, _c, _d;
    return [createComponent(Show, { get when() {
      return h();
    }, get children() {
      var _a2;
      return ssr(_, ssrHydrationKey(), `margin-top:-${escape((_a2 = e.data) == null ? void 0 : _a2.length, true) * 2 + 2}vw`);
    } }), ssr(E, ssrHydrationKey(), ` ${escape(W.backCardHolder, true)}`, `height:${((_b = escape((_a = e.data) == null ? void 0 : _a.length, true)) != null ? _b : escape(u.length, true)) * 2 + 11}vw;margin-top:-${((_d = escape((_c = e.data) == null ? void 0 : _c.length, true)) != null ? _d : escape(u.length, true)) * 2 + 2.5}vw;z-index:-10`), ssr(U, ssrHydrationKey(), escape(e.name), escape(createComponent(Show, { get when() {
      return !r.loading && r.state !== "unresolved";
    }, get fallback() {
      return ssr(I, ssrHydrationKey());
    }, get children() {
      var _a2, _b2, _c2, _d2;
      return [((_b2 = (_a2 = r()) == null ? void 0 : _a2.total_balance) != null ? _b2 : 0).toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), " ", " ", ((_c2 = r()) == null ? void 0 : _c2.currency_code) == "USD" ? "$" : ((_d2 = r()) == null ? void 0 : _d2.currency_code) == "EUR" ? "\u20AC" : g, createComponent(Show, { get when() {
        var _a3;
        return ((_a3 = r()) == null ? void 0 : _a3.warnings) && r().warnings.length > 0;
      }, get children() {
        return ssr(D, ssrHydrationKey(), ssrAttribute("title", escape(r().warnings.join(`
`), true), false));
      } })];
    } })), escape(createComponent(Show, { get when() {
      return r.error;
    }, get children() {
      return ssr(R, ssrHydrationKey(), ssrAttribute("title", escape(r.error.message, true), false));
    } })))];
  } })];
}

export { P, Y, m };
//# sourceMappingURL=index-D0aODT57.mjs.map

import { createComponent, ssr, ssrHydrationKey, escape } from 'solid-js/web';
import { _ } from './Card.module-nMwE8ysR.mjs';
import { A } from './components-CJF4pMQg.mjs';
import 'solid-js';
import './routing-BSDkuvr3.mjs';

var l = ["<div", ' class><p class="', '">', '</p><p class="', '"><!--$-->', "<!--/--><!--$-->", "<!--/--></p></div>"];
function $(t) {
  return createComponent(A, { get href() {
    return `/wallets/${t.id}`;
  }, get class() {
    return `absolute w-[16.7vw] h-[10vw] ml-[0.5vw] ${_.card} flex justify-end items-start pr-[1vw]`;
  }, get style() {
    return { "background-color": `${t.color}`, "margin-top": `-${t.position * 2 + 2}%`, "z-index": -t.position - 1 };
  }, get children() {
    return ssr(l, ssrHydrationKey(), ` ${escape(_.name, true)} text-${t.color == "white" ? "black" : "white"} text-right break-words`, escape(t.wallet), ` ${escape(_.balance, true)} text-right`, escape(t.balance), t.currency == "USD" ? "$" : t.currency == "EUR" ? "\u20AC" : escape(t.currency));
  } });
}

export { $ as default };
//# sourceMappingURL=Card.mjs.map

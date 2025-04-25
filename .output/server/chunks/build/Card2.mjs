import { createComponent, ssr, ssrHydrationKey, escape } from 'solid-js/web';
import { _ } from './Card.module-nMwE8ysR2.mjs';
import { A } from '../_/nitro.mjs';
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
import 'solid-js';
import 'solid-js/web/storage';
import 'solid-js/store';
import 'axios';
import 'node:fs';
import 'node:path';

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
//# sourceMappingURL=Card2.mjs.map

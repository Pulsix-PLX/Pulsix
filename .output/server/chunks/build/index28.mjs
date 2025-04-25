import { ssr, createComponent, ssrHydrationKey, escape } from 'solid-js/web';
import { createSignal, onMount, onCleanup, Show } from 'solid-js';
import { d as b, M as Me } from '../_/nitro.mjs';
import { R as R$1, w as w$1, b as b$1 } from './index.module-0iUivGU72.mjs';
import { B } from './ButtonSparkle-BxHzGCPC2.mjs';
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
import 'solid-js/web/storage';
import 'solid-js/store';
import 'axios';
import 'node:fs';
import 'node:path';

const x = "_hidden_1d1kv_10", _ = "_title_1d1kv_14", h = "_titles_1d1kv_24", w = "_paragraf_1d1kv_33", e = { hidden: x, title: _, titles: h, paragraf: w };
var C = ["<div", ' class="CM flex flex-col"><div class="', '"></div><div id="ContainerTexts" class="mt-[1vw] flex flex-row z-20 w-[4.5vw] h-[0.8vw]" style="', '"><div class="', '">Login</div><div class="', '">SignUp</div></div></div>'];
function k() {
  return ssr(C, ssrHydrationKey(), `${escape(b$1.toggle, true)}`, "text-align:center", `ml-[45%] text-center ${w$1() ? escape(b$1.activeText, true) : escape(b$1.text, true)}`, `ml-[150%] align-middle ${w$1() ? escape(b$1.text, true) : escape(b$1.activeText, true)}`);
}
var M = ["<div", ' class="ml-[auto] mr-[auto] CM -mt-[18.85vw]">', "</div>"], S = ["<p", ' class="', '">Pulsix now for</p>'], R = ["<div", ' class="CM mt-[13.1vw] -ml-[5.6%] ">', "</div>"], y = ["<div", ' class="', '"><p class="', '">Welcome back</p><p class="', '">Update your financial goals </p><p class="', '"> Continue tracking your progress</p><div class="mt-[15%] ml-[23%]">', "</div></div>"], L = ["<div", ' class="', '"><p class="', '">Be one of us</p><p class="', '">Smart tracking</p><p class="', '"> Smarter decisions</p><div class="mt-[15%] ml-[23%]">', "</div></div>"];
function H() {
  const [c, m] = createSignal(false);
  onMount(() => {
    b(false), setTimeout(() => {
      m(true);
    }, 300);
  }), onCleanup(() => {
    b(true);
  });
  const l = Me();
  return [ssr(M, ssrHydrationKey(), escape(createComponent(R$1, { src: "/rivs/LoginRegistration.riv", stateMachines: "State Machine 1", artboard: "Sandesh", onLoad: () => console.log("Animation loaded!") }))), createComponent(Show, { get when() {
    return c();
  }, get children() {
    return [ssr(S, ssrHydrationKey(), `CM ${escape(e.title, true)}`), ssr(R, ssrHydrationKey(), escape(createComponent(k, {}))), ssr(y, ssrHydrationKey(), `CM flex flex-col mt-[21%] -ml-[15.5%] ${w$1() ? "" : escape(e.hidden, true)}`, `${escape(e.titles, true)}`, `  ${escape(e.paragraf, true)}`, `-mt-16 ${escape(e.paragraf, true)}`, escape(createComponent(B, { text: "Go to dashboard", shadow: 40, onClick: () => l("/LoginRegistration/Login") }))), ssr(L, ssrHydrationKey(), `CM flex flex-col mt-[21.5%] ml-[16.5%] ${w$1() ? escape(e.hidden, true) : ""}`, `${escape(e.titles, true)}`, `  ${escape(e.paragraf, true)}`, `-mt-16 ${escape(e.paragraf, true)}`, escape(createComponent(B, { text: "Join Now", shadow: 40, shadowColor: "rgba(255, 27, 77, 1)", onClick: () => l("/LoginRegistration/Registration") })))];
  } })];
}

export { H as default };
//# sourceMappingURL=index28.mjs.map

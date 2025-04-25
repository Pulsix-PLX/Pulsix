import { ssr, createComponent, ssrHydrationKey, escape } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createSignal, onMount, onCleanup, Show } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { c as b, M as Me } from '../_/nitro.mjs';
import { R as R$1, w as w$1, b as b$1 } from './index.module-0iUivGU72.mjs';
import { B } from './ButtonSparkle-BxHzGCPC2.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/destr@2.0.3/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/h3@1.15.1/node_modules/h3/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/node-mock-http@1.0.0/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vinxi@0.5.3_@types+node@22._43e8e15a4bb8f875bc590eea815050cc/node_modules/vinxi/lib/app-fetch.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vinxi@0.5.3_@types+node@22._43e8e15a4bb8f875bc590eea815050cc/node_modules/vinxi/lib/app-manifest.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ufo@1.5.4/node_modules/ufo/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vite-plugin-node-polyfills@_4e133e926bbaeb0b9cea849071ce5364/node_modules/vite-plugin-node-polyfills/shims/process/dist/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vite-plugin-node-polyfills@_4e133e926bbaeb0b9cea849071ce5364/node_modules/vite-plugin-node-polyfills/shims/global/dist/index.js';
import 'node:async_hooks';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pg@8.14.1/node_modules/pg/lib/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/storage/dist/storage.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/store/dist/server.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/axios@1.8.3/node_modules/axios/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unctx@2.4.1/node_modules/unctx/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.1/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.1/node_modules/unstorage/drivers/fs.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.1/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';

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

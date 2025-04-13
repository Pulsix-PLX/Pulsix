import { createComponent, ssr, ssrHydrationKey } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createSignal, Show } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { S, x, A as A$1 } from './prova-UkNyxD49.mjs';
import { m } from './index-CM2EfUOf.mjs';
import { A } from './components-CJF4pMQg.mjs';
import './exchangeRates-ChMJm5Xh.mjs';
import './server-fns-runtime-4T1EILgx.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/storage/dist/storage.js';
import '../_/nitro.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/destr@2.0.3/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/h3@1.15.1/node_modules/h3/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/node-mock-http@1.0.0/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vinxi@0.5.3_@types+node@22._ae8b4a4268513f338805ff2549d5f795/node_modules/vinxi/lib/app-fetch.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vinxi@0.5.3_@types+node@22._ae8b4a4268513f338805ff2549d5f795/node_modules/vinxi/lib/app-manifest.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ufo@1.5.4/node_modules/ufo/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs';
import 'node:async_hooks';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unctx@2.4.1/node_modules/unctx/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.0/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.0/node_modules/unstorage/drivers/fs.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.0/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';
import './Card.module-nMwE8ysR.mjs';
import './db.server-BYnrqg0d.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pg@8.14.1/node_modules/pg/lib/index.js';
import './routing-BSDkuvr3.mjs';

var h = ["<img", ' class="absolute w-23 cursor-pointer z-100" src="/icons/edit.png">'];
function U(e) {
  const [a, n] = createSignal(false);
  return createComponent(A, { get href() {
    return e.href;
  }, onclick: (o) => {
    console.log("Link clicked. Edit mode:", m()), m() ? (console.log("Preventing default link action and stopping propagation because edit=true"), o.preventDefault(), o.stopPropagation()) : e.onClick && (console.log("Executing props.onclick"), e.onClick());
  }, onmouseenter: () => n(true), onmouseleave: () => n(false), get children() {
    return createComponent(S, { get children() {
      return createComponent(x, { class: "border-black border-4 w-[20vw] h-[12vw] rounded-xl -mt-100", get color() {
        return e.color;
      }, get children() {
        return [createComponent(A$1, { translateZ: 10, class: "absolute ml-[16.5vw] mt-[8.6vw]", as: "button", get children() {
          return createComponent(Show, { get when() {
            return a();
          }, get children() {
            return ssr(h, ssrHydrationKey());
          } });
        } }), createComponent(A$1, { translateZ: 20, class: "text-white text-[1vw] text-center mt-[1vw]", get children() {
          return e.name;
        } }), createComponent(A$1, { as: "p", translateZ: 40, class: "text-white text-[1vw] text-center", get children() {
          return [e.balance, e.currency == "USD" ? "$" : e.currency == "EUR" ? "\u20AC" : e.currency];
        } })];
      } });
    } });
  } });
}

export { U as default };
//# sourceMappingURL=index10.mjs.map

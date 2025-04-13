import { createComponent, ssr, ssrHydrationKey, ssrAttribute, escape } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createResource, createSignal, Show, Switch, Match, Suspense, lazy } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { w as we } from './Inputs-CEYxPBfP.mjs';
import { p, D, x, f } from './deleteWallet-D6_HIjzQ.mjs';
import { m, L as L$1 } from './index-CM2EfUOf.mjs';
import { B } from './ButtonSparkle-DNpTyev3.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/store/dist/server.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/gsap@3.12.7/node_modules/gsap/dist/gsap.js';
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
import './db.server-BYnrqg0d.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pg@8.14.1/node_modules/pg/lib/index.js';
import './action-BVKOmiKt.mjs';
import './routing-BSDkuvr3.mjs';
import './exchangeRates-ChMJm5Xh.mjs';
import './Card.module-nMwE8ysR.mjs';
import './components-CJF4pMQg.mjs';

var M = ["<img", ' src="/icons/Delete.png" class=" CM w-20 h-20 mt-[27vh] ml-[11vw] z-50">'], W = ["<form", ' method="post" class="CM w-[25vw] mt-[25vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw] min-w-[280px] min-h-[200px]" style="', '"><input type="hidden" name="id"', '><input type="hidden" name="type"', "><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", '<!--/--><button type="button" class="', '" style="', '">Delete</button></form>'], z = ["<img", ' src="/icons/Delete.png" class=" CM w-20 h-20 mt-[24vh] ml-[11vw] z-50">'], V = ["<form", ' method="post" class="CM w-[25vw] mt-[22vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw]" style="', '"><input type="hidden" name="id"', '><input type="hidden" name="type"', "><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", '<!--/--><div class="color-picker-container" style="', '">', '</div><input type="hidden"', ' name="color"><!--$-->', '<!--/--><button type="button" class="', '" style="', '">Delete</button></form>'], L = ["<div", ' class="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-40"></div>'], N = ["<div", ' class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[17vw] w-[27vw] rounded shadow-md z-50" style="', '"><p class="', '">Are you sure to delete this wallet?</p><p class="', '">It will be in the trash</p><p class="', '">you can restore it in 30 days</p><div class="flex flex-row justify-center items-center gap-34 mt-[3vw]"><!--$-->', "<!--/--><!--$-->", "<!--/--></div></div>"], E = ["<div", ">Loading Color Picker...</div>"];
const I = lazy(() => import('./index-WwoiZKEg.mjs').then((t) => ({ default: t.DefaultColorPicker })));
function re() {
  const [t] = createResource(m(), p), [s, y] = createSignal(), [g, v] = createSignal(false), [u, p$1] = createSignal(null);
  return createComponent(Show, { get when() {
    return t();
  }, get children() {
    return [createComponent(Switch, { get children() {
      return [createComponent(Match, { get when() {
        var _a;
        return ((_a = t()) == null ? void 0 : _a.type) == "container";
      }, get children() {
        var _a, _b;
        return [ssr(M, ssrHydrationKey()), ssr(W, ssrHydrationKey() + ssrAttribute("action", escape(D, true), false), "border:3px solid rgba(255, 255, 255, 0.3);border-radius:40px", ssrAttribute("value", escape((_a = t()) == null ? void 0 : _a.id, true), false), ssrAttribute("value", escape((_b = t()) == null ? void 0 : _b.type, true), false), escape(createComponent(we, { type: "text", name: "walletName", placeholder: "Wallet Name", get defaultValue() {
          var _a2;
          return (_a2 = t()) == null ? void 0 : _a2.wallet_name;
        } })), escape(createComponent(we, { type: "text", name: "category_id", placeholder: "Category", get defaultValue() {
          var _a2, _b2;
          return (_b2 = (_a2 = t()) == null ? void 0 : _a2.category_id) == null ? void 0 : _b2.toString();
        } })), escape(createComponent(B, { get text() {
          var _a2;
          return `Set ${((_a2 = t()) == null ? void 0 : _a2.type) == "container" ? "Container" : "Wallet"}`;
        }, class: "ml-[auto] mr-[auto]", onClick: () => setTimeout(() => L$1(null), 500) })), ` text-white font-bold py-2 px-4 rounded ml-[auto] mr-[auto] mt-[1vw] ${escape(x.buttonDelete, true)}`, "border:2px solid red;border-radius:20px;width:100px;height:50px")];
      } }), createComponent(Match, { get when() {
        var _a;
        return ((_a = t()) == null ? void 0 : _a.type) == "wallet";
      }, get children() {
        var _a, _b, _c;
        return [ssr(z, ssrHydrationKey()), ssr(V, ssrHydrationKey() + ssrAttribute("action", escape(D, true), false), `border:3px solid ${escape(s(), true)};border-radius:40px`, ssrAttribute("value", escape((_a = t()) == null ? void 0 : _a.id, true), false), ssrAttribute("value", escape((_b = t()) == null ? void 0 : _b.type, true), false), escape(createComponent(we, { type: "text", name: "walletName", placeholder: "Wallet Name", get defaultValue() {
          var _a2;
          return (_a2 = t()) == null ? void 0 : _a2.wallet_name;
        } })), escape(createComponent(we, { type: "text", name: "currency", placeholder: "Currency", get defaultValue() {
          var _a2;
          return (_a2 = t()) == null ? void 0 : _a2.currency;
        } })), escape(createComponent(we, { type: "text", name: "category_id", placeholder: "Category", get defaultValue() {
          var _a2, _b2;
          return (_b2 = (_a2 = t()) == null ? void 0 : _a2.category_id) == null ? void 0 : _b2.toString();
        } })), escape(createComponent(we, { type: "text", name: "nation", placeholder: "nation", get defaultValue() {
          var _a2;
          return (_a2 = t()) == null ? void 0 : _a2.nation;
        } })), "margin-bottom:2rem", escape(createComponent(Suspense, { get fallback() {
          return ssr(E, ssrHydrationKey());
        }, get children() {
          return createComponent(I, { get value() {
            var _a2;
            return s() || ((_a2 = t()) == null ? void 0 : _a2.color) || "#ff000000";
          }, onChange: (x) => y(x), format: "hex" });
        } })), ssrAttribute("value", escape(s(), true) || escape((_c = t()) == null ? void 0 : _c.color, true) || "#ff000000", false), escape(createComponent(B, { get text() {
          var _a2;
          return `Set ${((_a2 = t()) == null ? void 0 : _a2.type) == "container" ? "Container" : "Wallet"}`;
        }, class: "ml-[auto] mr-[auto]", size: "large", get shadowColor() {
          return `${s()}`;
        }, shadow: 10, onClick: () => setTimeout(() => L$1(null), 500) })), ` text-white font-bold py-2 px-4 rounded ml-[auto] mr-[auto] mt-[1vw] ${escape(x.buttonDelete, true)}`, "border:2px solid red;border-radius:20px;width:100px;height:50px")];
      } })];
    } }), createComponent(Show, { get when() {
      return g();
    }, get children() {
      return [ssr(L, ssrHydrationKey()), ssr(N, ssrHydrationKey(), `background-color:#151515;border-radius:40px;border:3px solid ${escape(s(), true) || "#ffffffff"}`, `${escape(x.text, true)} text-[1.4vw] font-bold text-center`, `${u() == "cancel" ? escape(x.textCancel, true) : u() == "confirm" ? escape(x.textDelete, true) : escape(x.paragraf, true)} text-[1vw] font-bold text-center mt-[2vw]`, `${u() == "cancel" ? escape(x.textCancel, true) : u() == "confirm" ? escape(x.textDelete, true) : escape(x.paragraf, true)} text-[1vw] font-bold text-center mt-[0.5vw]`, escape(createComponent(B, { text: "Cancel", onClick: () => v(false), shadowColor: "hsl(0, 100%, 54%)", onMouseEnter: () => p$1("cancel"), onMouseLeave: () => p$1(null), shadow: 10 })), escape(createComponent(B, { shadowColor: "hsla(155, 100%, 50%, 0.922)", text: "Delete", shadow: 10, onClick: async () => {
        var _a, _b;
        await f((_a = t()) == null ? void 0 : _a.id, (_b = t()) == null ? void 0 : _b.type), setTimeout(() => L$1(null), 500);
      }, onMouseEnter: () => p$1("confirm"), onMouseLeave: () => p$1(null) })))];
    } })];
  } });
}

export { re as default };
//# sourceMappingURL=index13.mjs.map

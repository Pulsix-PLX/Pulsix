import { createComponent, ssr, ssrHydrationKey, ssrAttribute, escape } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createResource, createSignal, Show, Switch, Match, Suspense, lazy } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { m as mt } from './Inputs-D1T1pLkj.mjs';
import { p, D, d, x } from './deleteWallet-Cgff9KFR.mjs';
import { m, P as P$1 } from './index-D0aODT57.mjs';
import { B } from './ButtonSparkle-BxHzGCPC2.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/store/dist/server.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/gsap@3.12.7/node_modules/gsap/dist/gsap.js';
import './server-fns-runtime-C3tiYEg6.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/storage/dist/storage.js';
import '../_/nitro.mjs';
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
import './exchangeRates-BGrzYQig.mjs';
import './Card.module-nMwE8ysR2.mjs';
import './auth.server-ChqlnWrh.mjs';

var M = ["<img", ' src="/icons/Delete.png" class=" CM w-20 h-20 mt-[27vh] ml-[11vw] z-50">'], W = ["<form", ' method="post" class="CM w-[25vw] mt-[25vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw] min-w-[280px] min-h-[200px]" style="', '"><input type="hidden" name="id"', '><input type="hidden" name="type"', "><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", '<!--/--><button type="button" class="', '" style="', '">Delete</button></form>'], z = ["<img", ' src="/icons/Delete.png" class=" CM w-20 h-20 mt-[24vh] ml-[11vw] z-50">'], E = ["<div", ' class="color-picker-container" style="', '">', "</div>"], V = ["<select", ' name="color"', '><option value="black">Black</option><option value="purple">Purple</option></select>'], H = ["<form", ' method="post" class="CM w-[25vw] mt-[22vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw]" style="', '"><input type="hidden" name="id"', '><input type="hidden" name="type"', "><!--$-->", '<!--/--><select name="currency"', '><option value="USD">USD</option><option value="EUR">EUR</option><option value="CHF">CHF</option></select><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", '<!--/--><input type="hidden"', ' name="color"><!--$-->', '<!--/--><button type="button" class="', '" style="', '">Delete</button></form>'], L = ["<div", ' class="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-40"></div>'], N = ["<div", ' class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[17vw] w-[27vw] rounded shadow-md z-50" style="', '"><p class="', '">Are you sure to delete this wallet?</p><p class="', '">It will be in the trash</p><p class="', '">you can restore it in 30 days</p><div class="flex flex-row justify-center items-center gap-34 mt-[3vw]"><!--$-->', "<!--/--><!--$-->", "<!--/--></div></div>"], P = ["<div", ">Loading Color Picker...</div>"];
const U = lazy(() => import('./index-WwoiZKEg2.mjs').then((t) => ({ default: t.DefaultColorPicker })));
function ue() {
  const [t] = createResource(m(), p), [i, g] = createSignal(), [y, x$1] = createSignal(false), [p$1, s] = createSignal(null);
  return createComponent(Show, { get when() {
    return t();
  }, get children() {
    return [createComponent(Switch, { get children() {
      return [createComponent(Match, { get when() {
        var _a;
        return ((_a = t()) == null ? void 0 : _a.type) == "container";
      }, get children() {
        var _a, _b;
        return [ssr(M, ssrHydrationKey()), ssr(W, ssrHydrationKey() + ssrAttribute("action", escape(D, true), false), "border:3px solid rgba(255, 255, 255, 0.3);border-radius:40px", ssrAttribute("value", escape((_a = t()) == null ? void 0 : _a.id, true), false), ssrAttribute("value", escape((_b = t()) == null ? void 0 : _b.type, true), false), escape(createComponent(mt, { type: "text", name: "walletName", placeholder: "Wallet Name", get defaultValue() {
          var _a2;
          return (_a2 = t()) == null ? void 0 : _a2.wallet_name;
        } })), escape(createComponent(mt, { type: "text", name: "category_id", placeholder: "Category", get defaultValue() {
          var _a2, _b2;
          return (_b2 = (_a2 = t()) == null ? void 0 : _a2.category_id) == null ? void 0 : _b2.toString();
        } })), escape(createComponent(B, { get text() {
          var _a2;
          return `Set ${((_a2 = t()) == null ? void 0 : _a2.type) == "container" ? "Container" : "Wallet"}`;
        }, class: "ml-[auto] mr-[auto]", onClick: () => setTimeout(() => P$1(null), 500) })), ` text-white font-bold py-2 px-4 rounded ml-[auto] mr-[auto] mt-[1vw] ${escape(d.buttonDelete, true)}`, "border:2px solid red;border-radius:20px;width:100px;height:50px")];
      } }), createComponent(Match, { get when() {
        var _a;
        return ((_a = t()) == null ? void 0 : _a.type) == "wallet";
      }, get children() {
        var _a, _b, _c, _d;
        return [ssr(z, ssrHydrationKey()), ssr(H, ssrHydrationKey() + ssrAttribute("action", escape(D, true), false), `border:3px solid ${escape(i(), true) || "grey"};border-radius:40px`, ssrAttribute("value", escape((_a = t()) == null ? void 0 : _a.id, true), false), ssrAttribute("value", escape((_b = t()) == null ? void 0 : _b.type, true), false), escape(createComponent(mt, { type: "text", name: "walletName", placeholder: "Wallet Name", get defaultValue() {
          var _a2;
          return (_a2 = t()) == null ? void 0 : _a2.wallet_name;
        } })), ssrAttribute("value", escape((_c = t()) == null ? void 0 : _c.currency, true), false), escape(createComponent(mt, { type: "text", name: "category_id", placeholder: "Category", get defaultValue() {
          var _a2, _b2;
          return (_b2 = (_a2 = t()) == null ? void 0 : _a2.category_id) == null ? void 0 : _b2.toString();
        } })), escape(createComponent(mt, { type: "text", name: "nation", placeholder: "nation", get defaultValue() {
          var _a2;
          return (_a2 = t()) == null ? void 0 : _a2.nation;
        } })), escape(createComponent(Switch, { get children() {
          return [createComponent(Match, { get when() {
            var _a2;
            return ((_a2 = t()) == null ? void 0 : _a2.type_ui) == "card";
          }, get children() {
            return ssr(E, ssrHydrationKey(), "margin-bottom:2rem", escape(createComponent(Suspense, { get fallback() {
              return ssr(P, ssrHydrationKey());
            }, get children() {
              return createComponent(U, { get value() {
                var _a2;
                return i() || ((_a2 = t()) == null ? void 0 : _a2.color) || "#ff000000";
              }, onChange: (b) => g(b), format: "hex" });
            } })));
          } }), createComponent(Match, { get when() {
            var _a2;
            return ((_a2 = t()) == null ? void 0 : _a2.type_ui) == "3D";
          }, get children() {
            var _a2;
            return ssr(V, ssrHydrationKey(), ssrAttribute("value", escape((_a2 = t()) == null ? void 0 : _a2.color, true), false));
          } })];
        } })), ssrAttribute("value", escape(i(), true) || escape((_d = t()) == null ? void 0 : _d.color, true) || "#ff000000", false), escape(createComponent(B, { get text() {
          var _a2;
          return `Set ${((_a2 = t()) == null ? void 0 : _a2.type) == "container" ? "Container" : "Wallet"}`;
        }, class: "ml-[auto] mr-[auto]", size: "large", get shadowColor() {
          return `${i()}`;
        }, shadow: 10, onClick: () => setTimeout(() => P$1(null), 500) })), ` text-white font-bold py-2 px-4 rounded ml-[auto] mr-[auto] mt-[1vw] ${escape(d.buttonDelete, true)}`, "border:2px solid red;border-radius:20px;width:100px;height:50px")];
      } })];
    } }), createComponent(Show, { get when() {
      return y();
    }, get children() {
      return [ssr(L, ssrHydrationKey()), ssr(N, ssrHydrationKey(), `background-color:#151515;border-radius:40px;border:3px solid ${escape(i(), true) || "#ffffffff"}`, `${escape(d.text, true)} text-[1.4vw] font-bold text-center`, `${p$1() == "cancel" ? escape(d.textCancel, true) : p$1() == "confirm" ? escape(d.textDelete, true) : escape(d.paragraf, true)} text-[1vw] font-bold text-center mt-[2vw]`, `${p$1() == "cancel" ? escape(d.textCancel, true) : p$1() == "confirm" ? escape(d.textDelete, true) : escape(d.paragraf, true)} text-[1vw] font-bold text-center mt-[0.5vw]`, escape(createComponent(B, { text: "Cancel", onClick: () => x$1(false), shadowColor: "hsl(0, 100%, 54%)", onMouseEnter: () => s("cancel"), onMouseLeave: () => s(null), shadow: 10 })), escape(createComponent(B, { shadowColor: "hsla(155, 100%, 50%, 0.922)", text: "Delete", shadow: 10, onClick: async () => {
        var _a, _b;
        await x((_a = t()) == null ? void 0 : _a.id, (_b = t()) == null ? void 0 : _b.type), setTimeout(() => P$1(null), 500);
      }, onMouseEnter: () => s("confirm"), onMouseLeave: () => s(null) })))];
    } })];
  } });
}

export { ue as default };
//# sourceMappingURL=index172.mjs.map

import { createComponent, ssr, ssrHydrationKey, ssrAttribute, escape } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { e as ee$1, i as ie$1, m as me } from './otpInput-gt68IOgQ.mjs';
import { createSignal, createMemo, onMount, onCleanup, Switch, Match, Show } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { B } from './ButtonSparkle-BxHzGCPC.mjs';
import { r, m as mt, u as ut } from './Inputs-Cq_fgt2H.mjs';
import { s } from './index-CI1g57kZ.mjs';
import './server-fns-runtime-DEO2-sKc.mjs';
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
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/bcryptjs@3.0.2/node_modules/bcryptjs/index.js';
import './action-CiKOD-Zz.mjs';
import './routing-Th2JWmJV.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/firebase@11.5.0/node_modules/firebase/app/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/firebase@11.5.0/node_modules/firebase/analytics/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/firebase@11.5.0/node_modules/firebase/auth/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/gsap@3.12.7/node_modules/gsap/dist/gsap.js';
import './icons-N8M97GAt.mjs';

var y = ["<div", ">", "</div>"], P = ["<form", ' class="', '" style="', '"><div class="flex flex-row items-center mt-50"><select', ' class="Input Prefix mr-7 border border-gray-300 p-2"><option value="+39">+39 (Italy)</option><option value="+1">+1 (USA)</option><option value="+44">+44 (UK)</option></select><!--$-->', "<!--/--></div><!--$-->", "<!--/--><!--$-->", '<!--/--><div id="recaptcha-container" class="ml-100 mt-250"></div></form>'];
const [x, Z] = createSignal(""), [A, ee] = createSignal(""), [I, te] = createSignal(""), [O, re] = createSignal("+39"), [oe, ne] = createSignal(""), [V, ie] = createSignal(null);
function se() {
  const [o, p] = createSignal("wait");
  return createMemo(() => {
    s() == 2 && r("phone", false);
  }), onMount(() => {
    console.log("Component mounted. Initializing reCAPTCHA..."), ee$1();
  }), onCleanup(() => {
    console.log("Component unmounted. Cleaning up reCAPTCHA..."), window.recaptchaVerifier && (window.recaptchaVerifier.clear(), window.recaptchaVerifier = null);
  }), createComponent(Switch, { get children() {
    return [createComponent(Match, { get when() {
      return o() == "wait";
    }, get children() {
      return ssr(P, ssrHydrationKey(), "w-300 mt-100", "justify-items:center", ssrAttribute("value", escape(O(), true), false), escape(createComponent(mt, { type: "phoneNumber", name: "phone", placeholder: "Phone number", get mountOn() {
        return s() == 1;
      }, required: true })), escape(createComponent(Show, { get when() {
        return I();
      }, get children() {
        return ssr(y, ssrHydrationKey(), escape(A()));
      } })), escape(createComponent(B, { shadow: 10, text: "Send code", get disabled() {
        return !ut();
      }, class: "h-50 mb-30", onClick: async () => {
        await ie$1(), p("sended");
      } })));
    } }), createComponent(Match, { get when() {
      return o() == "sended";
    }, get children() {
      return createComponent(me, { get code() {
        return x();
      }, get otp() {
        return V();
      }, createUser: true });
    } })];
  } });
}

export { x as code, se as default, A as message, V as otpVerify, oe as phoneNumber, O as prefix, Z as setCode, ee as setMessage, ie as setOtp, ne as setPhoneNumber, re as setPrefix, te as setShowAlert, I as showAlert };
//# sourceMappingURL=index12.mjs.map

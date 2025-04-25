import { createComponent, ssr, ssrHydrationKey, ssrAttribute, escape } from 'solid-js/web';
import { e as ee$1, i as ie$1, m as me } from './otpInput-gt68IOgQ.mjs';
import { createSignal, createMemo, onMount, onCleanup, Switch, Match, Show } from 'solid-js';
import { B } from './ButtonSparkle-BxHzGCPC.mjs';
import { r, m as mt, u as ut } from './Inputs-Cq_fgt2H.mjs';
import { s } from './index-CI1g57kZ.mjs';
import './server-fns-runtime-DEO2-sKc.mjs';
import 'solid-js/web/storage';
import '../_/nitro.mjs';
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
import 'solid-js/store';
import 'axios';
import 'node:fs';
import 'node:path';
import 'bcryptjs';
import './action-CiKOD-Zz.mjs';
import './routing-Th2JWmJV.mjs';
import 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'gsap';
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

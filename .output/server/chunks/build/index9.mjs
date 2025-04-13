import { createComponent, ssr, ssrHydrationKey, ssrAttribute, escape } from 'solid-js/web';
import { e as ee$1, i as ie, m as me } from './otpInput-Dlb7jUEo.mjs';
import { createSignal, createMemo, onMount, onCleanup, Switch, Match, Show } from 'solid-js';
import { B } from './ButtonSparkle-DNpTyev3.mjs';
import { r, w as we, y as ye } from './Inputs-CEYxPBfP.mjs';
import { s } from './index-CI1g57kZ.mjs';
import './server-fns-runtime-4T1EILgx.mjs';
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
import 'node:fs';
import 'node:async_hooks';
import 'node:path';
import './db.server-BYnrqg0d.mjs';
import 'pg';
import 'bcryptjs';
import './action-BVKOmiKt.mjs';
import './routing-BSDkuvr3.mjs';
import 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'solid-js/store';
import 'gsap';
import './icons-N8M97GAt.mjs';

var y = ["<div", ">", "</div>"], P = ["<form", ' class="', '" style="', '"><div class="flex flex-row items-center mt-50"><select', ' class="Input Prefix mr-7 border border-gray-300 p-2"><option value="+39">+39 (Italy)</option><option value="+1">+1 (USA)</option><option value="+44">+44 (UK)</option></select><!--$-->', "<!--/--></div><!--$-->", "<!--/--><!--$-->", '<!--/--><div id="recaptcha-container" class="ml-100 mt-250"></div></form>'];
const [x, X] = createSignal(""), [A, Y] = createSignal(""), [I, Z] = createSignal(""), [O, ee] = createSignal("+39"), [te, re] = createSignal(""), [V, oe] = createSignal(null);
function ne() {
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
      return ssr(P, ssrHydrationKey(), "w-300 mt-100", "justify-items:center", ssrAttribute("value", escape(O(), true), false), escape(createComponent(we, { type: "phoneNumber", name: "phone", placeholder: "Phone number", get mountOn() {
        return s() == 1;
      }, required: true })), escape(createComponent(Show, { get when() {
        return I();
      }, get children() {
        return ssr(y, ssrHydrationKey(), escape(A()));
      } })), escape(createComponent(B, { shadow: 10, text: "Send code", get disabled() {
        return !ye();
      }, class: "h-50 mb-30", onClick: async () => {
        await ie(), p("sended");
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

export { x as code, ne as default, A as message, V as otpVerify, te as phoneNumber, O as prefix, X as setCode, Y as setMessage, oe as setOtp, re as setPhoneNumber, ee as setPrefix, Z as setShowAlert, I as showAlert };
//# sourceMappingURL=index9.mjs.map

import { createComponent, ssr, ssrHydrationKey, ssrAttribute, escape } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { onMount, onCleanup, createSignal, createEffect, createMemo, Switch, Match } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { b } from './Menu-OQmUNT5t.mjs';
import { P, s, x } from './index-CI1g57kZ.mjs';
import { B } from './ButtonSparkle-DNpTyev3.mjs';
import { r, j, y as ye, w as we, v as ve } from './Inputs-CEYxPBfP.mjs';
import { r as rt } from './Title-C8lsFfVd.mjs';
import { n } from './index.module-B9JvMj-k.mjs';
import N from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/axios@1.8.3/node_modules/axios/index.js';
import { R as Re, m as me } from './otpInput-Dlb7jUEo.mjs';
import './components-CJF4pMQg.mjs';
import './routing-BSDkuvr3.mjs';
import './icons-N8M97GAt.mjs';
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
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/bcryptjs@3.0.2/node_modules/bcryptjs/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/firebase@11.5.0/node_modules/firebase/app/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/firebase@11.5.0/node_modules/firebase/analytics/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/firebase@11.5.0/node_modules/firebase/auth/dist/index.mjs';

var z = ["<div", ' style="', '">', "</div>"];
function m(r) {
  const [i, c] = createSignal(r.in ? 0 : 1), [s, l] = createSignal(r.in ? "block" : "none"), [d, u] = createSignal(""), E = r.fadeIn || 300, w = r.fadeOut || 500, P = r.fadeInEasing || "ease-out", S = r.fadeOutEasing || "ease-in";
  return createEffect(() => {
    let p;
    r.in ? (u(`opacity ${E}ms ${P}`), l("block"), p = setTimeout(() => c(1), 10)) : (u(`opacity ${w}ms ${S}`), c(0), p = setTimeout(() => l("none"), w)), onCleanup(() => clearTimeout(p));
  }), ssr(z, ssrHydrationKey() + ssrAttribute("class", escape(r.class, true), false), "opacity:" + escape(i(), true) + (";display:" + escape(s(), true)) + (";transition:" + escape(d(), true)) + (";height:" + (s() === "none" ? 0 : "auto")) + ";overflow:hidden", escape(r.children));
}
var H = ["<div", ' class="', '" style="', '"><!--$-->', '<!--/--><form class="', '" style="', '"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></form></div>"];
function L() {
  return onMount(() => {
    r({}), j({});
  }), ssr(H, ssrHydrationKey(), `w-500 ${escape(n.formContainer, true)} ${ye() ? escape(n.valid, true) : ""}`, "justify-items:center", escape(createComponent(rt, { title: "Credentials", class: "-mt-40" })), "w-300 mt-100", "justify-items:center", escape(createComponent(we, { name: "username", type: "username", placeholder: "Username", required: true })), escape(createComponent(we, { name: "password", type: "password", placeholder: "Password", required: true })), escape(createComponent(we, { name: "passwordConfirm", type: "passwordConfirm", placeholder: "Confirm", required: true })), escape(createComponent(we, { name: "name", type: "text", placeholder: "Name", required: true })), escape(createComponent(we, { name: "surname", type: "text", placeholder: "Surmane", required: true })), escape(createComponent(we, { name: "dateOfBirthday", type: "date", placeholder: "Surmane", required: true })), escape(createComponent(B, { shadow: 10, text: "Next", get disabled() {
    return !ye();
  }, class: "h-50", onClick: () => {
    x(s() + 1);
  } })));
}
var U = ["<form", ' class="', '" style="', '"><!--$-->', "<!--/--><!--$-->", "<!--/--></form>"];
const [C, A] = createSignal("");
function G() {
  const [r$1, i] = createSignal("wait"), [c, s$1] = createSignal("");
  createMemo(() => {
    s() == 1 && r("email", false);
  });
  async function l() {
    try {
      A(Math.floor(1e5 + Math.random() * 9e5).toString());
      const u = await N.post("https://api.brevo.com/v3/smtp/email", { sender: { name: "Pulsix", email: "pulsixcustomer@outlook.com" }, to: [{ email: ve("email") }], subject: "Pulsix verification code", htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              .code {
                font-size: 24px;
                font-weight: bold;
                color: #4a4a4a;
                background-color: #000000;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                letter-spacing: 5px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <h2>Pulsix verification code</h2>
            <p>Ecco il tuo codice di verifica:</p>
            
            <div class="code">${C()}</div>
            
            <p>Inserisci questo codice nella pagina di verifica per completare la registrazione.</p>
            <p>Se non hai richiesto questa verifica, puoi ignorare questa email.</p>
            <p>Cordiali saluti,<br>Il tuo team</p>
          </body>
          </html>
        ` }, { headers: { "api-key": "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", "Content-Type": "application/json" } });
      s$1("success");
    } catch (d) {
      console.error("Error sending email:", d), s$1("error");
    }
  }
  return createComponent(Switch, { get children() {
    return [createComponent(Match, { get when() {
      return r$1() == "wait";
    }, get children() {
      return ssr(U, ssrHydrationKey(), "w-300 mt-100", "justify-items:center", escape(createComponent(we, { type: "email", name: "email", placeholder: "Email", get mountOn() {
        return s() == 1;
      }, required: true })), escape(createComponent(B, { shadow: 10, text: "Send code", get disabled() {
        return !ye();
      }, class: "h-50 mb-30", onClick: () => {
        l(), i("sended");
      } })));
    } }), createComponent(Match, { get when() {
      return r$1() == "sended";
    }, get children() {
      return createComponent(me, { get code() {
        return C();
      } });
    } })];
  } });
}
const [J] = createSignal(true);
function R() {
  return onMount(() => {
    const r = (i) => {
      if (J()) return i.preventDefault(), i.returnValue = "reload", "nada";
    };
    return window.addEventListener("beforeunload", r), () => {
      window.removeEventListener("beforeunload", r);
    };
  }), null;
}
function Ce() {
  return onMount(() => {
    b(false);
  }), onCleanup(() => {
    b(true);
  }), [createComponent(R, {}), createComponent(m, { in: true, fadeIn: 4e3, fadeOut: 300, class: "CM -mt-30", get children() {
    return createComponent(P, {});
  } }), createComponent(m, { get in() {
    return s() == 0;
  }, fadeIn: 2e3, fadeOut: 300, class: "CM mt-140", get children() {
    return createComponent(L, {});
  } }), createComponent(m, { get in() {
    return s() == 1;
  }, fadeIn: 2e3, fadeOut: 300, class: "CM mt-140", get children() {
    return createComponent(G, {});
  } }), createComponent(m, { get in() {
    return s() == 2;
  }, fadeIn: 2e3, fadeOut: 300, class: "CM mt-140", get children() {
    return createComponent(Re, {});
  } })];
}

export { Ce as default };
//# sourceMappingURL=index5.mjs.map

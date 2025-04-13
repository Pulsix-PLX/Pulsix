import { createComponent, ssr, ssrHydrationKey, escape } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import N from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/axios@1.8.3/node_modules/axios/index.js';
import { createSignal, createMemo, Switch, Match } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { B } from './ButtonSparkle-DNpTyev3.mjs';
import { r, w as we, y as ye, v as ve } from './Inputs-CEYxPBfP.mjs';
import { m as me } from './otpInput-Dlb7jUEo.mjs';
import { s } from './index-CI1g57kZ.mjs';
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
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/bcryptjs@3.0.2/node_modules/bcryptjs/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/firebase@11.5.0/node_modules/firebase/app/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/firebase@11.5.0/node_modules/firebase/analytics/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/firebase@11.5.0/node_modules/firebase/auth/dist/index.mjs';
import './icons-N8M97GAt.mjs';

var w = ["<form", ' class="', '" style="', '"><!--$-->', "<!--/--><!--$-->", "<!--/--></form>"];
const [m, P] = createSignal("");
function Q() {
  const [r$1, p] = createSignal("wait"), [I, o] = createSignal("");
  createMemo(() => {
    s() == 1 && r("email", false);
  });
  async function c() {
    try {
      P(Math.floor(1e5 + Math.random() * 9e5).toString());
      const C = await N.post("https://api.brevo.com/v3/smtp/email", { sender: { name: "Pulsix", email: "pulsixcustomer@outlook.com" }, to: [{ email: ve("email") }], subject: "Pulsix verification code", htmlContent: `
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
            
            <div class="code">${m()}</div>
            
            <p>Inserisci questo codice nella pagina di verifica per completare la registrazione.</p>
            <p>Se non hai richiesto questa verifica, puoi ignorare questa email.</p>
            <p>Cordiali saluti,<br>Il tuo team</p>
          </body>
          </html>
        ` }, { headers: { "api-key": "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", "Content-Type": "application/json" } });
      o("success");
    } catch (i) {
      console.error("Error sending email:", i), o("error");
    }
  }
  return createComponent(Switch, { get children() {
    return [createComponent(Match, { get when() {
      return r$1() == "wait";
    }, get children() {
      return ssr(w, ssrHydrationKey(), "w-300 mt-100", "justify-items:center", escape(createComponent(we, { type: "email", name: "email", placeholder: "Email", get mountOn() {
        return s() == 1;
      }, required: true })), escape(createComponent(B, { shadow: 10, text: "Send code", get disabled() {
        return !ye();
      }, class: "h-50 mb-30", onClick: () => {
        c(), p("sended");
      } })));
    } }), createComponent(Match, { get when() {
      return r$1() == "sended";
    }, get children() {
      return createComponent(me, { get code() {
        return m();
      } });
    } })];
  } });
}

export { m as code, Q as default, P as setCode };
//# sourceMappingURL=index8.mjs.map

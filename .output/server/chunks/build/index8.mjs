import { createComponent, ssr, ssrHydrationKey, escape } from 'solid-js/web';
import N from 'axios';
import { createSignal, createMemo, Switch, Match } from 'solid-js';
import { B } from './ButtonSparkle-DNpTyev3.mjs';
import { r, w as we, y as ye, v as ve } from './Inputs-CEYxPBfP.mjs';
import { m as me } from './otpInput-Dlb7jUEo.mjs';
import { s } from './index-CI1g57kZ.mjs';
import 'solid-js/store';
import 'gsap';
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
import './action-BVKOmiKt.mjs';
import './routing-BSDkuvr3.mjs';
import 'bcryptjs';
import 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
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

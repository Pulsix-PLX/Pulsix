import { createComponent, ssr, ssrHydrationKey, ssrAttribute, escape } from 'solid-js/web';
import { onMount, onCleanup, createSignal, createEffect, createMemo, Switch, Match } from 'solid-js';
import { b } from './Menu-OQmUNT5t.mjs';
import { P, s, x } from './index-CI1g57kZ.mjs';
import { B } from './ButtonSparkle-DNpTyev3.mjs';
import { r, j, y as ye, w as we, v as ve } from './Inputs-CEYxPBfP.mjs';
import { r as rt } from './Title-C8lsFfVd.mjs';
import { n } from './index.module-B9JvMj-k.mjs';
import N from 'axios';
import { R as Re, m as me } from './otpInput-Dlb7jUEo.mjs';
import './components-CJF4pMQg.mjs';
import './routing-BSDkuvr3.mjs';
import './icons-N8M97GAt.mjs';
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
import 'bcryptjs';
import 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';

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

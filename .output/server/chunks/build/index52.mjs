import { createComponent, ssr, ssrHydrationKey, ssrAttribute, escape } from 'solid-js/web';
import { onMount, onCleanup, createSignal, createEffect, createMemo, Switch, Match } from 'solid-js';
import { e as b } from '../_/nitro.mjs';
import { P, s, x } from './index-CI1g57kZ2.mjs';
import { B } from './ButtonSparkle-DNpTyev32.mjs';
import { r, j, f as fe, v as ve$1, y as ye } from './Inputs-BxVpbjg0.mjs';
import { r as rt } from './Title-C8lsFfVd2.mjs';
import { n } from './index.module-B9JvMj-k2.mjs';
import N from 'axios';
import { N as Ne, m as me } from './otpInput-Jfxp9i2z.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:url';
import 'node:fs';
import 'solid-js/web/storage';
import 'node:async_hooks';
import 'node:path';
import './icons-N8M97GAt2.mjs';
import 'solid-js/store';
import 'gsap';
import './db.server-Cxzv6220.mjs';
import 'pg';
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
  }), ssr(H, ssrHydrationKey(), `w-500 ${escape(n.formContainer, true)} ${fe() ? escape(n.valid, true) : ""}`, "justify-items:center", escape(createComponent(rt, { title: "Credentials", class: "-mt-40" })), "w-300 mt-100", "justify-items:center", escape(createComponent(ve$1, { name: "username", type: "username", placeholder: "Username", required: true })), escape(createComponent(ve$1, { name: "password", type: "password", placeholder: "Password", required: true })), escape(createComponent(ve$1, { name: "passwordConfirm", type: "passwordConfirm", placeholder: "Confirm", required: true })), escape(createComponent(ve$1, { name: "name", type: "text", placeholder: "Name", required: true })), escape(createComponent(ve$1, { name: "surname", type: "text", placeholder: "Surmane", required: true })), escape(createComponent(ve$1, { name: "dateOfBirthday", type: "date", placeholder: "Surmane", required: true })), escape(createComponent(B, { shadow: 10, text: "Next", get disabled() {
    return !fe();
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
      const u = await N.post("https://api.brevo.com/v3/smtp/email", { sender: { name: "Pulsix", email: "pulsixcustomer@outlook.com" }, to: [{ email: ye("email") }], subject: "Pulsix verification code", htmlContent: `
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
      return ssr(U, ssrHydrationKey(), "w-300 mt-100", "justify-items:center", escape(createComponent(ve$1, { type: "email", name: "email", placeholder: "Email", get mountOn() {
        return s() == 1;
      }, required: true })), escape(createComponent(B, { shadow: 10, text: "Send code", get disabled() {
        return !fe();
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
function ve() {
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
    return createComponent(Ne, {});
  } })];
}

export { ve as default };
//# sourceMappingURL=index52.mjs.map

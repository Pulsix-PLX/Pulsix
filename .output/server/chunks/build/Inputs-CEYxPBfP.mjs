import { ssr, ssrHydrationKey, ssrAttribute, escape, createComponent, ssrStyle } from 'solid-js/web';
import { createMemo, createSignal, onMount, createEffect, Switch, Match, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { gsap } from 'gsap';
import { E } from './server-fns-runtime-4T1EILgx.mjs';
import { r as r$1 } from './db.server-BYnrqg0d.mjs';
import { Y as Y$1, Q as Q$1 } from './action-BVKOmiKt.mjs';

const [I, r] = createStore({}), [M, j] = createStore({}), ye = createMemo(() => {
  const e = Object.keys(I);
  return e.length === 0 ? false : e.every((a) => I[a] === true);
}), ve = (e) => M[e];
var z = ["<button", ' class="visible absolute text-white ml-50 text-m mt-15" style="', '"', ">x</button>"], B = ["<div", ' class="input-wrapper"><input', ' class="', '" placeholder', '><label class="', '">', '</label><div class="input-underline"><div class="', '"></div></div><div class="form-group__actions"><button type="button" title="Toggle Eye"', ' class="eye-button w-[50%] "><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"', '><path class="lid lid--upper" d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path class="lid lid--lower" d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path class="eyelashes" d="M7 18L5 20 M12 21L12 23 M17 18L19 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><g class="eye"><circle class="eye-circle" cy="12" cx="12" r="4" fill="currentColor"></circle><circle class="eye-glint" cy="11" cx="13" r="1" fill="var(--glint)"></circle></g></svg><span class="sr-only">Toggle Eye</span></button><!--$-->', "<!--/--></div></div>"];
function U(e) {
  const [a, A] = createSignal(e.initialValue || ""), [f, N] = createSignal(true), [v, $] = createSignal(false), [t, R] = createSignal(false);
  let y = null;
  const d = () => {
    if (t()) return;
    const w = gsap.utils.random(2, 8), n = 0.075, m = Math.random() > 0.5 ? 3 : 1;
    y && y.kill(), y = gsap.timeline({ delay: w, onComplete: () => d(), repeat: m, yoyo: true }).to(".lid--upper", { duration: n, attr: { d: "M1 12C1 12 5 20 12 20C19 20 23 12 23 12" } });
  };
  return onMount(() => {
    d(), gsap.utils.mapRange(-100, 100, 30, -30);
    const w = (n) => {
    };
    return window.addEventListener("mousemove", w), () => {
      window.removeEventListener("mousemove", w), y && y.kill();
    };
  }), ssr(B, ssrHydrationKey(), ssrAttribute("name", escape(e.name, true), false) + ssrAttribute("type", f() ? "password" : "text", false), `fancy-input ${escape(e.class, true)} ${v() ? "text-clear" : ""}`, ssrAttribute("value", escape(a(), true), false), `input-label ${v() ? "text-clear" : ""}`, escape(e.placeholder), `clear-wave ${v() ? "active" : ""}`, ssrAttribute("aria-pressed", escape(t(), true), false), ssrAttribute("class", t() ? "eye-closed" : "", false), escape(createComponent(Show, { get when() {
    return a().length > 0;
  }, get children() {
    return ssr(z, ssrHydrationKey(), "width:20px;height:20px", ssrAttribute("disabled", v(), true));
  } })));
}
var K = ["<button", ' class="visible absolute text-white -ml-17 text-m mt-15" style="', '"', ">x</button>"], Z = ["<div", ' class="input-wrapper"><input', ' class="', '" placeholder', '><label class="', '">', '</label><div class="input-underline"><div class="', '"></div></div><div class="form-group__actions">', "</div></div>"];
function _(e) {
  const [a, A] = createSignal(e.initialValue || ""), [f, N] = createSignal(false);
  return ssr(Z, ssrHydrationKey(), ssrAttribute("name", escape(e.name, true), false) + ssrAttribute("type", escape(e.type, true) || "text", false), `fancy-input ${escape(e.class, true)} ${f() ? "text-clear" : ""}`, ssrAttribute("value", escape(a(), true), false), `input-label ${f() ? "text-clear" : ""}`, escape(e.placeholder), `clear-wave ${f() ? "active" : ""}`, escape(createComponent(Show, { get when() {
    return a().length > 0;
  }, get children() {
    return ssr(K, ssrHydrationKey(), "width:20px;height:20px", ssrAttribute("disabled", f(), true));
  } })));
}
const Y = E(async (e) => {
  try {
    console.log(e);
    const a = await r$1.query("SELECT username FROM users WHERE username=$1", [e]);
    return console.log(a.rows), a.rows.length > 0 ? "already exist" : "available";
  } catch (a) {
    return console.error("Error checking username:", a), `error:${a.message}`;
  }
}, "src_routes_API_Auth_registration_credentials_usernameAlreadyexist_ts--usernameAlreadyexist_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/registration/credentials/usernameAlreadyexist.ts?tsr-directive-use-server="), G = Q$1(Y, "usernameAlreadyexist"), J = E(async (e) => {
  try {
    console.log(e);
    const a = await r$1.query("SELECT phone_number FROM users WHERE phone_number=$1", [e]);
    return console.log(a.rows), a.rows.length > 0 ? "already exist" : "available";
  } catch (a) {
    return console.error("Error checking phone:", a), `error:${a.message}`;
  }
}, "src_routes_API_Auth_registration_phone_phoneAlreadyexist_ts--phoneAlreadyexist_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/registration/phone/phoneAlreadyexist.ts?tsr-directive-use-server="), Q = Q$1(J, "phoneAlreadyexist"), X = E(async (e) => {
  try {
    console.log(e);
    const a = await r$1.query("SELECT email FROM users WHERE email=$1", [e]);
    return console.log(a.rows.length > 0 ? "already exist" : "available"), a.rows.length > 0 ? "already exist" : "available";
  } catch (a) {
    return console.error("Error checking email:", a), `error:${a.message}`;
  }
}, "src_routes_API_Auth_registration_email_emailAlreadyexist_ts--emailAlreadyexist_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/registration/email/emailAlreadyexist.ts?tsr-directive-use-server="), p = Q$1(X, "emailAlreadyexist");
var ee = ["<input", ' style="', '" type="number">'], te = ["<input", ' style="', '" type="date">'], re = ["<input", ' style="', '" type="color"', ">"], ae = ["<div", ' class="input-container"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></div>"], ne = ["<label", ">", "</label>"], le = ["<div", ' class="error-message" style="', '">', "</div>"];
const [q, se] = createSignal("");
function we(e) {
  const a = Y$1(G), A = Y$1(Q), f = Y$1(p), [N, v] = createSignal(false), [$, t] = createSignal(""), [R, y] = createSignal(false);
  onMount(() => {
    e.required ? e.mountOn != false && r(e.name, false) : r(e.name, true);
  }), createEffect(() => {
    if (e.type === "password" && M.passwordConfirm) {
      const n = document.querySelector('[name="passwordConfirm"]');
      if (n && n.value) {
        const m = new Event("input", { bubbles: true });
        n.dispatchEvent(m);
      }
    }
  });
  function d(n) {
    y(true);
    const h = n.target.value;
    if (se(h), j(e.name, h), console.log(e.name, q()), !e.required && h === "") {
      r(e.name, true);
      return;
    }
    if (e.ValidationSchema) {
      const F = e.ValidationSchema(h);
      r(e.name, F);
      return;
    }
    w(h);
  }
  async function w(n) {
    if (!n && e.required) {
      r(e.name, false), t("Provide something");
      return;
    }
    switch (console.log(I), e.type) {
      case "text":
        n ? (r(e.name, true), t("")) : (r(e.name, false), t("Provide something"));
        break;
      case "password":
        if (n.length < 8) {
          r(e.name, false), t("At least 8 characters");
          return;
        }
        if (!/[A-Z]/.test(n)) {
          r(e.name, false), t("At least one uppercase letter");
          return;
        }
        if (!/[0-9]/.test(n)) {
          r(e.name, false), t("At least one number");
          return;
        }
        r(e.name, true), t("");
        break;
      case "passwordConfirm":
        if (n !== M.password) {
          r(e.name, false), t("Le password non corrispondono");
          return;
        }
        if (n.length < 8) {
          r(e.name, false), t("At least 8 characters");
          return;
        }
        if (!/[A-Z]/.test(n)) {
          r(e.name, false), t("At least one uppercase letter");
          return;
        }
        if (!/[0-9]/.test(n)) {
          r(e.name, false), t("At least one number");
          return;
        }
        r(e.name, true), t("");
        break;
      case "username":
      case "usernameLogin":
        try {
          console.log("Validating username:", n);
          const b = await a(n);
          console.log("Username check response:", b), b === "already exist" ? e.type == "username" ? (r(e.name, false), e.type == "username" && t("Username already exist")) : t("") : b.startsWith("error:") ? (r(e.name, false), t(`Errore verifica username: ${b.split(":")[1]}`)) : (r(e.name, true), e.type == "username" ? t("Username avaible") : t("Username not found"));
        } catch (b) {
          console.error("Error in username validation:", b), v(false), r(e.name, false), t("Errore generico di verifica");
        }
        break;
      case "phoneNumber":
        const m = n.replace(/[\s-]/g, "");
        if (!/^\d+$/.test(m)) {
          r(e.name, false), t("Phone number must contain only digits");
          return;
        }
        if (m.length < 7 || m.length > 10) {
          r(e.name, false), t("Invalid phone number length");
          return;
        }
        if (m.startsWith("0")) {
          r(e.name, false), t("Phone number should not start with unnecessary zeros");
          return;
        }
        const h = await A(n);
        if (h === "already exist") {
          r(e.name, false), t("Phone number already associated to another account");
          return;
        } else if (h.startsWith("error:")) {
          r(e.name, false), t(`Errore verifica phone: ${h.split(":")[1]}`);
          return;
        } else r(e.name, true), t("");
        r(e.name, true), t("");
        break;
      case "email":
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)) t("");
        else {
          r(e.name, false), t("Inserisci un indirizzo email valido");
          return;
        }
        const x = await f(n);
        if (console.log(x), x === "already exist") {
          r(e.name, false), t("Email already associated to another account");
          return;
        } else if (x.startsWith("error:")) {
          r(e.name, false), t(`Errore verifica phone: ${x.split(":")[1]}`);
          return;
        } else r(e.name, true), t("");
        break;
      case "number":
        !isNaN(Number(n)) ? (r(e.name, true), t("")) : (r(e.name, false), t("Inserisci un numero valido"));
        break;
      case "date":
        !isNaN(Date.parse(n)) ? (r(e.name, true), t("")) : (r(e.name, false), t("Inserisci una data valida"));
        break;
    }
  }
  return ssr(ae, ssrHydrationKey(), e.label && ssr(ne, ssrHydrationKey() + ssrAttribute("for", escape(e.name, true), false), escape(e.label)), escape(createComponent(Switch, { get children() {
    return [createComponent(Match, { get when() {
      return e.type === "password";
    }, get children() {
      return createComponent(U, { get name() {
        return e.name;
      }, get placeholder() {
        return e.placeholder;
      }, get class() {
        return e.class;
      }, get style() {
        return e.style;
      }, type: "password", onInput: d, get initialValue() {
        return e.defaultValue;
      } });
    } }), createComponent(Match, { get when() {
      return e.type === "passwordConfirm";
    }, get children() {
      return createComponent(U, { get name() {
        return e.name;
      }, get placeholder() {
        return e.placeholder;
      }, get class() {
        return e.class;
      }, get style() {
        return e.style;
      }, type: "password", onInput: d });
    } }), createComponent(Match, { get when() {
      return e.type === "username" || e.type === "usernameLogin";
    }, get children() {
      return createComponent(_, { get name() {
        return e.name;
      }, get placeholder() {
        return e.placeholder;
      }, get class() {
        return e.class;
      }, get style() {
        return e.style;
      }, type: "text", onInput: d });
    } }), createComponent(Match, { get when() {
      return e.type === "text";
    }, get children() {
      return createComponent(_, { get name() {
        return e.name;
      }, get placeholder() {
        return e.placeholder;
      }, get class() {
        return e.class;
      }, get style() {
        return e.style;
      }, type: "text", onInput: d, get initialValue() {
        return e.defaultValue;
      } });
    } }), createComponent(Match, { get when() {
      return e.type === "phoneNumber";
    }, get children() {
      return createComponent(_, { get name() {
        return e.name;
      }, get placeholder() {
        return e.placeholder;
      }, get class() {
        return e.class;
      }, get style() {
        return e.style;
      }, type: "text", onInput: d });
    } }), createComponent(Match, { get when() {
      return e.type === "email";
    }, get children() {
      return createComponent(_, { get name() {
        return e.name;
      }, get placeholder() {
        return e.placeholder;
      }, get class() {
        return e.class;
      }, get style() {
        return e.style;
      }, type: "text", onInput: d, get initialValue() {
        return q();
      } });
    } }), createComponent(Match, { get when() {
      return e.type === "number";
    }, get children() {
      return ssr(ee, ssrHydrationKey() + ssrAttribute("name", escape(e.name, true), false) + ssrAttribute("placeholder", escape(e.placeholder, true), false) + ssrAttribute("class", escape(e.class, true), false), ssrStyle(e.style));
    } }), createComponent(Match, { get when() {
      return e.type === "date";
    }, get children() {
      return ssr(te, ssrHydrationKey() + ssrAttribute("name", escape(e.name, true), false) + ssrAttribute("placeholder", escape(e.placeholder, true), false) + ssrAttribute("class", escape(e.class, true), false), ssrStyle(e.style));
    } }), createComponent(Match, { get when() {
      return e.type === "color";
    }, get children() {
      return ssr(re, ssrHydrationKey() + ssrAttribute("name", escape(e.name, true), false) + ssrAttribute("placeholder", escape(e.placeholder, true), false) + ssrAttribute("class", escape(e.class, true), false), ssrStyle(e.style), ssrAttribute("value", escape(e.defaultValue, true), false));
    } })];
  } })), R() && $() && ssr(le, ssrHydrationKey(), "color:var(--Secondary)", escape($())));
}

export { j, r, ve as v, we as w, ye as y };
//# sourceMappingURL=Inputs-CEYxPBfP.mjs.map

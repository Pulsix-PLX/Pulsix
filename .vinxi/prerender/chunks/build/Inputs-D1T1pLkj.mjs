import { ssr, ssrHydrationKey, ssrAttribute, escape, createComponent, ssrStyle } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createMemo, createSignal, onMount, createEffect, Switch, Match, For, onCleanup, Show, Index } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { createStore } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/store/dist/server.js';
import { gsap } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/gsap@3.12.7/node_modules/gsap/dist/gsap.js';
import { E } from './server-fns-runtime-C3tiYEg6.mjs';
import { Y, Q as Q$1, f as t } from '../_/nitro.mjs';

const [z, r] = createStore({}), [R, J] = createStore({}), ut = createMemo(() => {
  const e = Object.keys(z);
  return e.length === 0 ? false : e.every((s) => z[s] === true);
}), dt = (e) => R[e];
var ce = ["<button", ' class="visible absolute text-white ml-50 text-m mt-15" style="', '"', ">x</button>"], ue = ["<div", ' class="input-wrapper"><input', ' class="', '" placeholder', '><label class="', '">', '</label><div class="input-underline"><div class="', '"></div></div><div class="form-group__actions"><button type="button" title="Toggle Eye"', ' class="eye-button w-[50%] "><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"', '><path class="lid lid--upper" d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path class="lid lid--lower" d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path class="eyelashes" d="M7 18L5 20 M12 21L12 23 M17 18L19 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><g class="eye"><circle class="eye-circle" cy="12" cx="12" r="4" fill="currentColor"></circle><circle class="eye-glint" cy="11" cx="13" r="1" fill="var(--glint)"></circle></g></svg><span class="sr-only">Toggle Eye</span></button><!--$-->', "<!--/--></div></div>"];
function K(e) {
  const [s, P] = createSignal(e.initialValue || ""), [v, E] = createSignal(true), [b, M] = createSignal(false), [a, _] = createSignal(false);
  let g = null;
  const f = () => {
    if (a()) return;
    const x = gsap.utils.random(2, 8), l = 0.075, h = Math.random() > 0.5 ? 3 : 1;
    g && g.kill(), g = gsap.timeline({ delay: x, onComplete: () => f(), repeat: h, yoyo: true }).to(".lid--upper", { duration: l, attr: { d: "M1 12C1 12 5 20 12 20C19 20 23 12 23 12" } });
  };
  return onMount(() => {
    f(), gsap.utils.mapRange(-100, 100, 30, -30);
    const x = (l) => {
    };
    return window.addEventListener("mousemove", x), () => {
      window.removeEventListener("mousemove", x), g && g.kill();
    };
  }), ssr(ue, ssrHydrationKey(), ssrAttribute("name", escape(e.name, true), false) + ssrAttribute("type", v() ? "password" : "text", false), `fancy-input ${escape(e.class, true)} ${b() ? "text-clear" : ""}`, ssrAttribute("value", escape(s(), true), false), `input-label ${b() ? "text-clear" : ""}`, escape(e.placeholder), `clear-wave ${b() ? "active" : ""}`, ssrAttribute("aria-pressed", escape(a(), true), false), ssrAttribute("class", a() ? "eye-closed" : "", false), escape(createComponent(Show, { get when() {
    return s().length > 0;
  }, get children() {
    return ssr(ce, ssrHydrationKey(), "width:20px;height:20px", ssrAttribute("disabled", b(), true));
  } })));
}
var de = ["<button", ' class="visible absolute text-white -ml-17 text-m mt-15" style="', '"', ">x</button>"], me = ["<div", ' class="input-wrapper"><input', ' class="', '" placeholder', '><label class="', '">', '</label><div class="input-underline"><div class="', '"></div></div><div class="form-group__actions">', "</div></div>"];
function j(e) {
  const [s, P] = createSignal(e.initialValue || ""), [v, E] = createSignal(false);
  return ssr(me, ssrHydrationKey(), ssrAttribute("name", escape(e.name, true), false) + ssrAttribute("type", escape(e.type, true) || "text", false), `fancy-input ${escape(e.class, true)} ${v() ? "text-clear" : ""}`, ssrAttribute("value", escape(s(), true), false), `input-label ${v() ? "text-clear" : ""}`, escape(e.placeholder), `clear-wave ${v() ? "active" : ""}`, escape(createComponent(Show, { get when() {
    return s().length > 0;
  }, get children() {
    return ssr(de, ssrHydrationKey(), "width:20px;height:20px", ssrAttribute("disabled", v(), true));
  } })));
}
const he = E(async (e) => {
  try {
    console.log(e);
    const s = await t.query("SELECT username FROM auth.users WHERE username=$1", [e]);
    return console.log(s.rows), s.rows.length > 0 ? "already exist" : "available";
  } catch (s) {
    return console.error("Error checking username:", s), `error:${s.message}`;
  }
}, "src_routes_API_Auth_registration_credentials_usernameAlreadyexist_ts--usernameAlreadyexist_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/registration/credentials/usernameAlreadyexist.ts?tsr-directive-use-server="), ge = Q$1(he, "usernameAlreadyexist"), ye = E(async (e) => {
  try {
    console.log(e);
    const s = await t.query("SELECT phone_number FROM users WHERE phone_number=$1", [e]);
    return console.log(s.rows), s.rows.length > 0 ? "already exist" : "available";
  } catch (s) {
    return console.error("Error checking phone:", s), `error:${s.message}`;
  }
}, "src_routes_API_Auth_registration_phone_phoneAlreadyexist_ts--phoneAlreadyexist_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/registration/phone/phoneAlreadyexist.ts?tsr-directive-use-server="), fe = Q$1(ye, "phoneAlreadyexist"), ve = E(async (e) => {
  try {
    console.log(e);
    const s = await t.query("SELECT email FROM users WHERE email=$1", [e]);
    return console.log(s.rows.length > 0 ? "already exist" : "available"), s.rows.length > 0 ? "already exist" : "available";
  } catch (s) {
    return console.error("Error checking email:", s), `error:${s.message}`;
  }
}, "src_routes_API_Auth_registration_email_emailAlreadyexist_ts--emailAlreadyexist_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/registration/email/emailAlreadyexist.ts?tsr-directive-use-server="), be = Q$1(ve, "emailAlreadyexist");
var _e = ["<input", ' type="hidden"', ">"], we = ["<div", ' class="', '" style="', '"><span class="dropdown-selected-text">', "</span><ul>", "</ul></div>"], $e = ["<li", "><a>", "</a></li>"], Z = ["<li", ">Nessuna opzione valida</li>"];
function xe(e) {
  var _a, _b;
  const [s, P] = createSignal(false), [v, E] = createSignal(e.initialValue), [b, M] = createSignal(e.placeholder || "Select an option");
  createEffect(() => {
    const _ = e.initialValue;
    if (_ !== void 0 && e.values && e.options) {
      const g = e.values.findIndex((f) => f === _);
      g !== -1 && e.options[g] !== void 0 ? (M(e.options[g]), E(_)) : (M(e.placeholder || "Select an option"), E(void 0));
    } else _ === void 0 && (M(e.placeholder || "Select an option"), E(void 0));
  });
  const a = (_) => {
  };
  return onMount(() => {
    document.addEventListener("click", a);
  }), [ssr(_e, ssrHydrationKey(), ssrAttribute("value", (_a = escape(v(), true)) != null ? _a : "", false) + ssrAttribute("name", escape(e.name, true), false)), ssr(we, ssrHydrationKey(), `dropdown  ${(_b = escape(e.class, true)) != null ? _b : ""} ${s() ? "open" : ""} ${v() !== void 0 ? "filled" : ""}`, ssrStyle(e.style), escape(b()), e.options && e.values && e.options.length === e.values.length ? escape(createComponent(For, { get each() {
    return e.options;
  }, children: (_, g) => {
    const f = e.values[g()];
    return ssr($e, ssrHydrationKey() + ssrAttribute("class", v() === f ? "active" : "", false), escape(_));
  } })) : Z[0] + ssrHydrationKey() + Z[1])];
}
const Ce = "#BDBDBD", ke = "_container_1tjo6_5", Ae = "_control_1tjo6_13", Me = "_input_1tjo6_28", Se = "_trigger_1tjo6_46", Ee = "_calendar_1tjo6_69", De = "_viewControl_1tjo6_98", Ie = "_navButton_1tjo6_107", Pe = "_viewTrigger_1tjo6_108", Te = "_table_1tjo6_163", je = "_tableHeader_1tjo6_169", Ve = "_tableCell_1tjo6_178", Oe = "_cellTrigger_1tjo6_184", Le = "_selected_1tjo6_200", Ne = "_otherMonth_1tjo6_208", Fe = "_monthGrid_1tjo6_216", He = "_yearGrid_1tjo6_216", Be = "_monthCell_1tjo6_229", ze = "_yearCell_1tjo6_229", c = { accentSecondaryColor: Ce, container: ke, control: Ae, input: Me, trigger: Se, calendar: Ee, viewControl: De, navButton: Ie, viewTrigger: Pe, table: Te, tableHeader: je, tableCell: Ve, cellTrigger: Oe, selected: Le, otherMonth: Ne, monthGrid: Fe, yearGrid: He, monthCell: Be, yearCell: ze };
var Re = ["<div", '><button type="button"', ' aria-label="Previous month">&lt;</button><button type="button" class="', '"><!--$-->', "<!--/--> <!--$-->", '<!--/--></button><button type="button"', ' aria-label="Next month">&gt;</button></div>'], We = ["<table", "><thead><tr>", "</tr></thead><tbody>", "</tbody></table>"], Ge = ["<div", '><button type="button"', ">", "</button></div>"], Q = ["<div", ">", "</div>"], Ue = ["<div", ' class="', '"><button type="button" class="', '" aria-label="Previous years">&lt;</button><span class="', '"><!--$-->', "<!--/--> - <!--$-->", '<!--/--></span><button type="button" class="', '" aria-label="Next years">&gt;</button></div>'], qe = ["<div", "><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></div>"], Ye = ["<div", ' class="', '"', "><div", '><input type="text"', ' readonly aria-label="Selected date"><button type="button"', ' aria-label="Open/Close calendar"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"></path></svg></button></div><!--$-->', "<!--/--></div>"], Je = ["<th", ">", "</th>"], Ke = ["<tr", ">", "</tr>"], Ze = ["<td", '><button type="button" class="', '" style="', '" aria-label="', '">', "</button></td>"], X = ["<button", ' type="button" class="', '" aria-label="', '">', "</button>"];
function Qe(e) {
  const [s, P] = createSignal(e.initialValue || null), [v, E] = createSignal(false), [b, M] = createSignal("day"), [a, _] = createSignal((/* @__PURE__ */ new Date()).getMonth()), [g, f] = createSignal((/* @__PURE__ */ new Date()).getFullYear()), x = (d) => {
  };
  onMount(() => {
    document.addEventListener("mousedown", x);
  }), onCleanup(() => {
    document.removeEventListener("mousedown", x);
  });
  const l = () => {
    const d = g(), o = a(), C = new Date(d, o, 1), k = new Date(d, o + 1, 0), L = C.getDay(), T = k.getDate(), N = [];
    let A = [];
    const re = new Date(d, o, 0).getDate();
    for (let w = L - 1; w >= 0; w--) A.push({ date: new Date(d, o - 1, re - w), isCurrentMonth: false });
    for (let w = 1; w <= T; w++) A.length === 7 && (N.push([...A]), A = []), A.push({ date: new Date(d, o, w), isCurrentMonth: true });
    const ne = 7 - A.length;
    for (let w = 1; w <= ne; w++) A.push({ date: new Date(d, o + 1, w), isCurrentMonth: false });
    return A.length > 0 && N.push([...A]), N;
  }, h = () => {
    const d = g(), o = Math.floor(d / 12) * 12;
    return Array.from({ length: 12 }, (C, k) => o + k);
  }, S = (d) => {
    if (!d) return "";
    const o = (d.getMonth() + 1).toString().padStart(2, "0"), C = d.getDate().toString().padStart(2, "0"), k = d.getFullYear();
    return `${o}/${C}/${k}`;
  }, q = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], D = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], Y = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return ssr(Ye, ssrHydrationKey(), `${escape(e.class, true)} ${escape(c.container, true)}`, ssrAttribute("data-open", escape(v(), true), false), ssrAttribute("class", escape(c.control, true), false), ssrAttribute("class", escape(c.input, true), false) + ssrAttribute("placeholder", escape(e.placeholder, true) || "mm/dd/yyyy", false) + ssrAttribute("value", escape(S(s()), true), false), ssrAttribute("class", escape(c.trigger, true), false), escape(createComponent(Show, { get when() {
    return v();
  }, get children() {
    return ssr(qe, ssrHydrationKey() + ssrAttribute("class", escape(c.calendar, true), false), escape(createComponent(Show, { get when() {
      return b() === "day";
    }, get children() {
      return [ssr(Re, ssrHydrationKey() + ssrAttribute("class", escape(c.viewControl, true), false), ssrAttribute("class", escape(c.navButton, true), false), `${escape(c.viewTrigger, true)}`, escape(D[a()]), escape(g()), ssrAttribute("class", escape(c.navButton, true), false)), ssr(We, ssrHydrationKey() + ssrAttribute("class", escape(c.table, true), false), escape(createComponent(Index, { each: q, children: (d) => ssr(Je, ssrHydrationKey() + ssrAttribute("class", escape(c.tableHeader, true), false), escape(d())) })), escape(createComponent(Index, { get each() {
        return l();
      }, children: (d) => ssr(Ke, ssrHydrationKey(), escape(createComponent(Index, { get each() {
        return d();
      }, children: (o) => {
        var _a;
        const C = o().date, k = o().isCurrentMonth, L = C.toDateString() === (/* @__PURE__ */ new Date()).toDateString(), T = ((_a = s()) == null ? void 0 : _a.toDateString()) === C.toDateString();
        return ssr(Ze, ssrHydrationKey() + ssrAttribute("class", escape(c.tableCell, true), false), `${`text-[1.2em] ${escape(c.cellTrigger, true)}` || ""} ${k && T ? escape(escape(c.selected, true), true) : ""} ${k ? "" : escape(escape(c.otherMonth, true), true)}`, ssrStyle(k && L && !T ? { color: c.accentSecondaryColor } : {}), `Select ${escape(C.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }), true)}`, escape(C.getDate()));
      } }))) })))];
    } })), escape(createComponent(Show, { get when() {
      return b() === "month";
    }, get children() {
      return [ssr(Ge, ssrHydrationKey() + ssrAttribute("class", escape(c.viewControl, true), false), ssrAttribute("class", escape(c.viewTrigger, true), false), escape(g())), ssr(Q, ssrHydrationKey() + ssrAttribute("class", escape(c.monthGrid, true), false), escape(Y.map((d, o) => ssr(X, ssrHydrationKey(), `${` ${escape(c.monthCell, true)}` || ""} ${a() === o ? escape(escape(c.selected, true), true) : ""}`, `Select ${escape(D[o], true)}`, escape(d)))))];
    } })), escape(createComponent(Show, { get when() {
      return b() === "year";
    }, get children() {
      return [ssr(Ue, ssrHydrationKey(), `${escape(c.viewControl, true)}`, `mt-[1vw] ${escape(c.navButton, true)}`, "mt-[1vw] text-[1.4em]", escape(h()[0]), escape(h()[11]), `mt-[1vw] ${escape(c.navButton, true)}`), ssr(Q, ssrHydrationKey() + ssrAttribute("class", escape(c.yearGrid, true), false), escape(h().map((d) => ssr(X, ssrHydrationKey(), `${escape(c.yearCell, true) || ""} ${g() === d ? escape(escape(c.selected, true), true) : ""}`, `Select year ${escape(d, true)}`, escape(d)))))];
    } })));
  } })));
}
var Xe = ["<input", ' style="', '" type="number">'], pe = ["<input", ' style="', '" type="color"', ">"], et = ["<div", ' class="input-container"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></div>"], tt = ["<label", ">", "</label>"], at = ["<div", ' class="error-message" style="', '">', "</div>"];
const [p, ee] = createSignal("");
function mt(e) {
  const s = Y(ge), P = Y(fe), v = Y(be), [E, b] = createSignal(false), [M, a] = createSignal(""), [_, g] = createSignal(false);
  onMount(() => {
    e.required ? (e.defaultError && a(e.defaultError), e.mountOn != false && r(e.name, false)) : r(e.name, true);
  }), createEffect(() => {
    if (e.type === "password" && R.passwordConfirm) {
      const l = document.querySelector('[name="passwordConfirm"]');
      if (l && l.value) {
        const h = new Event("input", { bubbles: true });
        l.dispatchEvent(h);
      }
    }
  });
  function f(l) {
    g(true);
    var h;
    if (e.type != "date" ? (h = l.target.value, ee(h), J(e.name, h)) : (h = l, ee(l), J(e.name, l)), console.log(e.name, p()), !e.required && h === "") {
      r(e.name, true);
      return;
    }
    if (e.ValidationSchema) {
      const S = e.ValidationSchema(h);
      r(e.name, S);
      return;
    }
    x(h);
  }
  async function x(l) {
    if (!l && e.required) {
      r(e.name, false), a("Provide");
      return;
    }
    switch (console.log(z), e.type) {
      case "text":
        l ? (r(e.name, true), a("")) : (r(e.name, false), a("Provide"));
        break;
      case "password":
        if (l.length < 8) {
          r(e.name, false), a("At least 8 characters");
          return;
        }
        if (!/[A-Z]/.test(l)) {
          r(e.name, false), a("At least one uppercase letter");
          return;
        }
        if (!/[0-9]/.test(l)) {
          r(e.name, false), a("At least one number");
          return;
        }
        r(e.name, true), a("");
        break;
      case "passwordConfirm":
        if (l !== R.password) {
          r(e.name, false), a("Le password non corrispondono");
          return;
        }
        if (l.length < 8) {
          r(e.name, false), a("At least 8 characters");
          return;
        }
        if (!/[A-Z]/.test(l)) {
          r(e.name, false), a("At least one uppercase letter");
          return;
        }
        if (!/[0-9]/.test(l)) {
          r(e.name, false), a("At least one number");
          return;
        }
        r(e.name, true), a("");
        break;
      case "usernameLogin":
        try {
          console.log("Validating username:", l);
          const o = await s(l);
          console.log("Username check response:", o), o === "already exist" ? (r(e.name, true), a("")) : o.startsWith("error:") ? (r(e.name, false), a(`Errore verifica username: ${o.split(":")[1]}`)) : (r(e.name, false), a("Username not found"));
        } catch (o) {
          console.error("Error in username validation:", o), b(false), r(e.name, false), a("Errore generico di verifica");
        }
        break;
      case "username":
        try {
          console.log("Validating username:", l);
          const o = await s(l);
          console.log("Username check response:", o), o === "already exist" ? (r(e.name, false), e.type == "username" ? a("Username already exist") : a("")) : o.startsWith("error:") ? (r(e.name, false), a(`Errore verifica username: ${o.split(":")[1]}`)) : (r(e.name, true), a("Username avaible"));
        } catch (o) {
          console.error("Error in username validation:", o), b(false), r(e.name, false), a("Errore generico di verifica");
        }
        break;
      case "phoneNumber":
        const h = l.replace(/[\s-]/g, "");
        if (!/^\d+$/.test(h)) {
          r(e.name, false), a("Phone number must contain only digits");
          return;
        }
        if (h.length < 7 || h.length > 10) {
          r(e.name, false), a("Invalid phone number length");
          return;
        }
        if (h.startsWith("0")) {
          r(e.name, false), a("Phone number should not start with unnecessary zeros");
          return;
        }
        const S = await P(l);
        if (S === "already exist") {
          r(e.name, false), a("Phone number already associated to another account");
          return;
        } else if (S.startsWith("error:")) {
          r(e.name, false), a(`Errore verifica phone: ${S.split(":")[1]}`);
          return;
        } else r(e.name, true), a("");
        r(e.name, true), a("");
        break;
      case "email":
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l)) a("");
        else {
          r(e.name, false), a("Inserisci un indirizzo email valido");
          return;
        }
        const D = await v(l);
        if (console.log(D), D === "already exist") {
          r(e.name, false), a("Email already associated to another account");
          return;
        } else if (D.startsWith("error:")) {
          r(e.name, false), a(`Errore verifica phone: ${D.split(":")[1]}`);
          return;
        } else r(e.name, true), a("");
        break;
      case "number":
        !isNaN(Number(l)) ? (r(e.name, true), a("")) : (r(e.name, false), a("Inserisci un numero valido"));
        break;
      case "select":
        l ? (r(e.name, true), a("")) : (r(e.name, false), a("Select something"));
        break;
      case "date":
        !isNaN(Date.parse(l)) ? (r(e.name, true), a("")) : (r(e.name, false), a("Inserisci una data valida"));
        break;
    }
  }
  return ssr(et, ssrHydrationKey(), e.label && ssr(tt, ssrHydrationKey() + ssrAttribute("for", escape(e.name, true), false), escape(e.label)), escape(createComponent(Switch, { get children() {
    return [createComponent(Match, { get when() {
      return e.type === "select";
    }, get children() {
      return createComponent(xe, { get name() {
        return e.name;
      }, onInput: f, get options() {
        return e.options;
      }, get values() {
        return e.values;
      }, get class() {
        return e.class;
      }, get style() {
        return e.style;
      }, get placeholder() {
        return e.placeholder;
      }, get initialValue() {
        return e.defaultValue;
      } });
    } }), createComponent(Match, { get when() {
      return e.type === "date";
    }, get children() {
      return createComponent(Qe, { get name() {
        return e.name;
      }, onInput: f, get class() {
        return e.class;
      }, get style() {
        return e.style;
      }, get placeholder() {
        return e.placeholder;
      }, get initialValue() {
        return e.defaultValue;
      } });
    } }), createComponent(Match, { get when() {
      return e.type === "password";
    }, get children() {
      return createComponent(K, { get name() {
        return e.name;
      }, get placeholder() {
        return e.placeholder;
      }, get class() {
        return e.class;
      }, get style() {
        return e.style;
      }, type: "password", onInput: f, get initialValue() {
        return e.defaultValue;
      } });
    } }), createComponent(Match, { get when() {
      return e.type === "passwordConfirm";
    }, get children() {
      return createComponent(K, { get name() {
        return e.name;
      }, get placeholder() {
        return e.placeholder;
      }, get class() {
        return e.class;
      }, get style() {
        return e.style;
      }, type: "password", onInput: f });
    } }), createComponent(Match, { get when() {
      return e.type === "username" || e.type === "usernameLogin";
    }, get children() {
      return createComponent(j, { get name() {
        return e.name;
      }, get placeholder() {
        return e.placeholder;
      }, get class() {
        return e.class;
      }, get style() {
        return e.style;
      }, type: "text", onInput: f });
    } }), createComponent(Match, { get when() {
      return e.type === "text";
    }, get children() {
      return createComponent(j, { get name() {
        return e.name;
      }, get placeholder() {
        return e.placeholder;
      }, get class() {
        return e.class;
      }, get style() {
        return e.style;
      }, type: "text", onInput: f, get initialValue() {
        return e.defaultValue;
      } });
    } }), createComponent(Match, { get when() {
      return e.type === "phoneNumber";
    }, get children() {
      return createComponent(j, { get name() {
        return e.name;
      }, get placeholder() {
        return e.placeholder;
      }, get class() {
        return e.class;
      }, get style() {
        return e.style;
      }, type: "text", onInput: f });
    } }), createComponent(Match, { get when() {
      return e.type === "email";
    }, get children() {
      return createComponent(j, { get name() {
        return e.name;
      }, get placeholder() {
        return e.placeholder;
      }, get class() {
        return e.class;
      }, get style() {
        return e.style;
      }, type: "text", onInput: f, get initialValue() {
        return p();
      } });
    } }), createComponent(Match, { get when() {
      return e.type === "number";
    }, get children() {
      return ssr(Xe, ssrHydrationKey() + ssrAttribute("name", escape(e.name, true), false) + ssrAttribute("placeholder", escape(e.placeholder, true), false) + ssrAttribute("class", escape(e.class, true), false), ssrStyle(e.style));
    } }), createComponent(Match, { get when() {
      return e.type === "color";
    }, get children() {
      return ssr(pe, ssrHydrationKey() + ssrAttribute("name", escape(e.name, true), false) + ssrAttribute("placeholder", escape(e.placeholder, true), false) + ssrAttribute("class", escape(e.class, true), false), ssrStyle(e.style), ssrAttribute("value", escape(e.defaultValue, true), false));
    } })];
  } })), _() && M() || e.defaultError ? ssr(at, ssrHydrationKey(), "color:var(--Secondary)", escape(M())) : escape(null));
}

export { J, dt as d, mt as m, r, ut as u };
//# sourceMappingURL=Inputs-D1T1pLkj.mjs.map

import { createComponent, ssr, ssrHydrationKey, ssrAttribute, escape } from 'solid-js/web';
import { createSignal, createMemo, onMount, onCleanup, Switch, Match, Show, For } from 'solid-js';
import { s } from './index-CI1g57kZ.mjs';
import { E as E$1 } from './server-fns-runtime-DEO2-sKc.mjs';
import * as E from 'bcryptjs';
import { c as t } from '../_/nitro.mjs';
import { Y, Q as Q$1 } from './action-CiKOD-Zz.mjs';
import { initializeApp } from 'firebase/app';
import { getAnalytics, setAnalyticsCollectionEnabled } from 'firebase/analytics';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, GoogleAuthProvider } from 'firebase/auth';
import { d as dt, r, m as mt, u as ut, J } from './Inputs-Cq_fgt2H.mjs';
import { B } from './ButtonSparkle-BxHzGCPC.mjs';

const W = E$1(async (t$1) => {
  const { username: e, passwordConfirm: a, name: l, surname: f, dateOfBirthday: m, email: n, phone: b } = t$1;
  if (console.log("username: ", e), console.log("password: ", a), console.log("name: ", l), console.log("surname: ", f), console.log("dateOfBirthday: ", m), console.log("email: ", n), console.log("phone: ", b), !a) return console.error("Password is required"), { success: false, error: "Password is required" };
  try {
    const u = String(a).trim();
    if (u.length < 6) return { success: false, error: "Password must be at least 6 characters long" };
    const S = await E.hash(u, 10), v = (await t.query(`INSERT INTO users 
      (username, password, name, surname, date_of_birth, phone_number, email)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, username`, [e, S, l, f, m, b, n])).rows[0];
    return { success: true, userId: v.id, username: v.username };
  } catch (u) {
    return console.error("Error during user insertion:", u), { success: false, error: u.message || "An unexpected error occurred" };
  }
}, "src_routes_API_Auth_registration_createUser_ts--createUser_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/registration/createUser.ts?tsr-directive-use-server="), X = Q$1(W, "createUser"), Q = { apiKey: "AIzaSyAoiPbMYiKNnK6y_HqsYMLpvs2JiXaxPhw", authDomain: "finance-tracker-pallassini.firebaseapp.com", projectId: "finance-tracker-pallassini", storageBucket: "finance-tracker-pallassini.firebasestorage.app", messagingSenderId: "106835699922", appId: "1:106835699922:web:8655c7560a7d526c64650b", measurementId: "G-EKY43CN6SB" }, C = initializeApp(Q), I = getAuth(C), Z = getAnalytics(C);
setAnalyticsCollectionEnabled(Z, true);
const ee = () => {
  window.recaptchaVerifier || (window.recaptchaVerifier = new RecaptchaVerifier(I, "recaptcha-container", { size: "invisible", callback: (t) => {
    console.log("reCAPTCHA resolved:", t);
  }, "expired-callback": () => {
    console.log("reCAPTCHA expired, please reload.");
  } }), window.recaptchaVerifier.render());
};
new GoogleAuthProvider();
var re = ["<div", ">", "</div>"], te = ["<form", ' class="', '" style="', '"><div class="flex flex-row items-center mt-50"><select', ' class="Input Prefix mr-7 border border-gray-300 p-2"><option value="+39">+39 (Italy)</option><option value="+1">+1 (USA)</option><option value="+44">+44 (UK)</option></select><!--$-->', "<!--/--></div><!--$-->", "<!--/--><!--$-->", '<!--/--><div id="recaptcha-container" class="ml-100 mt-250"></div></form>'];
const [se, Se] = createSignal(""), [p, d] = createSignal(""), [oe, h] = createSignal(""), g = () => `${$()}${dt("phone")}`, [$, _e] = createSignal("+39"), [Oe, Te] = createSignal(""), [ne, Ne] = createSignal(null);
function Re() {
  const [t, e] = createSignal("wait");
  return createMemo(() => {
    s() == 2 && r("phone", false);
  }), onMount(() => {
    console.log("Component mounted. Initializing reCAPTCHA..."), ee();
  }), onCleanup(() => {
    console.log("Component unmounted. Cleaning up reCAPTCHA..."), window.recaptchaVerifier && (window.recaptchaVerifier.clear(), window.recaptchaVerifier = null);
  }), createComponent(Switch, { get children() {
    return [createComponent(Match, { get when() {
      return t() == "wait";
    }, get children() {
      return ssr(te, ssrHydrationKey(), "w-300 mt-100", "justify-items:center", ssrAttribute("value", escape($(), true), false), escape(createComponent(mt, { type: "phoneNumber", name: "phone", placeholder: "Phone number", get mountOn() {
        return s() == 1;
      }, required: true })), escape(createComponent(Show, { get when() {
        return oe();
      }, get children() {
        return ssr(re, ssrHydrationKey(), escape(p()));
      } })), escape(createComponent(B, { shadow: 10, text: "Send code", get disabled() {
        return !ut();
      }, class: "h-50 mb-30", onClick: async () => {
        await ie(), e("sended");
      } })));
    } }), createComponent(Match, { get when() {
      return t() == "sended";
    }, get children() {
      return createComponent(me, { get code() {
        return se();
      }, get otp() {
        return ne();
      }, createUser: true });
    } })];
  } });
}
const [Ve, ae] = createSignal();
async function ie() {
  const t = g();
  J("phoneNumber", t), console.log("sendOTP called. phoneNumber:", g());
  try {
    const e = window.recaptchaVerifier;
    console.log("Sending OTP with appVerifier:", e);
    const a = await signInWithPhoneNumber(I, g(), e);
    ae(a);
  } catch (e) {
    console.error("Error sending OTP:", e), e.message == "Firebase: Error (auth/too-many-requests)." ? (d("Too-many-requests sended wait some minutes"), h(p())) : e.message == "Firebase: TOO_SHORT (auth/invalid-phone-number)." ? (d("Number lentgh is too short"), h(p())) : e.message == "Firebase: Invalid format. (auth/invalid-phone-number)." ? (d("Invalid format"), h(p())) : e.message == "Firebase: Error (auth/invalid-app-credential)." && (d("You are in local"), h(p()));
  }
}
var ce = ["<p", ' class="responseOTP">', "</p>"], le = ["<div", ' class="otp-container"><div class="otp-field">', "</div><!--$-->", "<!--/--></div>"], ue = ["<input", ' type="number" pattern="[0-9]*" inputmode="numeric" maxlength="1"', ">"], pe = ["<span", ' class="text-white text-3xl ml-10 mr-10">&#183;</span>'];
function me(t) {
  const [e, a] = createSignal(Array(6).fill("")), [l, f] = createSignal("");
  return Y(X), ssr(le, ssrHydrationKey(), escape(createComponent(For, { get each() {
    return e();
  }, children: (m, n) => [ssr(ue, ssrHydrationKey(), ssrAttribute("value", escape(m, true), false) + ssrAttribute("class", n() === 0 ? "inputLeft" : n() === 5 || n() === 2 ? "inputRight" : n() === 3 ? "inputLeft" : "", false)), n() === 2 && ssr(pe, ssrHydrationKey())] })), escape(createComponent(Show, { get when() {
    return l();
  }, get children() {
    return ssr(ce, ssrHydrationKey(), escape(l()));
  } })));
}

export { I, Re as R, X, d, ee as e, g, h, ie as i, me as m, p };
//# sourceMappingURL=otpInput-gt68IOgQ.mjs.map

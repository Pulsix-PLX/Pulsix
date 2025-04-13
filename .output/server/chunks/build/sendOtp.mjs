import { g, I, d, h, p } from './otpInput-Dlb7jUEo.mjs';
import { createSignal } from 'solid-js';
import { j } from './Inputs-CEYxPBfP.mjs';
import { signInWithPhoneNumber } from 'firebase/auth';
import 'solid-js/web';
import './index-CI1g57kZ.mjs';
import './icons-N8M97GAt.mjs';
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
import './ButtonSparkle-DNpTyev3.mjs';
import 'solid-js/store';
import 'gsap';

const [C, u] = createSignal();
async function H() {
  const s = g();
  j("phoneNumber", s), console.log("sendOTP called. phoneNumber:", g());
  try {
    const e = window.recaptchaVerifier;
    console.log("Sending OTP with appVerifier:", e);
    const a = await signInWithPhoneNumber(I, g(), e);
    u(a);
  } catch (e) {
    console.error("Error sending OTP:", e), e.message == "Firebase: Error (auth/too-many-requests)." ? (d("Too-many-requests sended wait some minutes"), h(p())) : e.message == "Firebase: TOO_SHORT (auth/invalid-phone-number)." ? (d("Number lentgh is too short"), h(p())) : e.message == "Firebase: Invalid format. (auth/invalid-phone-number)." ? (d("Invalid format"), h(p())) : e.message == "Firebase: Error (auth/invalid-app-credential)." && (d("You are in local"), h(p()));
  }
}

export { C as confirmationResult, H as default, u as setConfirmationResult };
//# sourceMappingURL=sendOtp.mjs.map

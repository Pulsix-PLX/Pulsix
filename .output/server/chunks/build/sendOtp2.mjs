import { g, I, d, h, p } from './otpInput-Jfxp9i2z.mjs';
import { createSignal } from 'solid-js';
import { j } from './Inputs-BxVpbjg0.mjs';
import { signInWithPhoneNumber } from 'firebase/auth';
import 'solid-js/web';
import './index-CI1g57kZ2.mjs';
import './icons-N8M97GAt2.mjs';
import './db.server-Cxzv6220.mjs';
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
import 'pg';
import 'bcryptjs';
import 'firebase/app';
import 'firebase/analytics';
import './ButtonSparkle-DNpTyev32.mjs';
import 'solid-js/store';
import 'gsap';

const [A, u] = createSignal();
async function C() {
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

export { A as confirmationResult, C as default, u as setConfirmationResult };
//# sourceMappingURL=sendOtp2.mjs.map

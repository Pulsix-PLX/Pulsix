import { g, I, d, h, p } from './otpInput-gt68IOgQ.mjs';
import { createSignal } from 'solid-js';
import { J } from './Inputs-Cq_fgt2H.mjs';
import { signInWithPhoneNumber } from 'firebase/auth';
import 'solid-js/web';
import './index-CI1g57kZ.mjs';
import './icons-N8M97GAt.mjs';
import './server-fns-runtime-DEO2-sKc.mjs';
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
import 'vite-plugin-node-polyfills/shims/process';
import 'vite-plugin-node-polyfills/shims/global';
import 'node:async_hooks';
import 'jsonwebtoken';
import 'pg';
import 'solid-js/store';
import 'axios';
import 'node:fs';
import 'node:path';
import 'bcryptjs';
import './action-CiKOD-Zz.mjs';
import './routing-Th2JWmJV.mjs';
import 'firebase/app';
import 'firebase/analytics';
import './ButtonSparkle-BxHzGCPC.mjs';
import 'gsap';

const [M, u] = createSignal();
async function W() {
  const s = g();
  J("phoneNumber", s), console.log("sendOTP called. phoneNumber:", g());
  try {
    const e = window.recaptchaVerifier;
    console.log("Sending OTP with appVerifier:", e);
    const a = await signInWithPhoneNumber(I, g(), e);
    u(a);
  } catch (e) {
    console.error("Error sending OTP:", e), e.message == "Firebase: Error (auth/too-many-requests)." ? (d("Too-many-requests sended wait some minutes"), h(p())) : e.message == "Firebase: TOO_SHORT (auth/invalid-phone-number)." ? (d("Number lentgh is too short"), h(p())) : e.message == "Firebase: Invalid format. (auth/invalid-phone-number)." ? (d("Invalid format"), h(p())) : e.message == "Firebase: Error (auth/invalid-app-credential)." && (d("You are in local"), h(p()));
  }
}

export { M as confirmationResult, W as default, u as setConfirmationResult };
//# sourceMappingURL=sendOtp.mjs.map

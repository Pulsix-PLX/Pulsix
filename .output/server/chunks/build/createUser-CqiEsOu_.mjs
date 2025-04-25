import { E as E$1 } from './server-fns-runtime-DEO2-sKc.mjs';
import * as E from 'bcryptjs';
import { c as t } from '../_/nitro.mjs';
import 'solid-js/web';
import 'solid-js/web/storage';
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
import 'solid-js';
import 'solid-js/store';
import 'axios';
import 'node:fs';
import 'node:path';

const b = E$1(async (u) => {
  const { username: s, passwordConfirm: e, name: o, surname: t$1, dateOfBirthday: a, email: n, phone: c } = u;
  if (console.log("username: ", s), console.log("password: ", e), console.log("name: ", o), console.log("surname: ", t$1), console.log("dateOfBirthday: ", a), console.log("email: ", n), console.log("phone: ", c), !e) return console.error("Password is required"), { success: false, error: "Password is required" };
  try {
    const r = String(e).trim();
    if (r.length < 6) return { success: false, error: "Password must be at least 6 characters long" };
    const m = await E.hash(r, 10), i = (await t.query(`INSERT INTO users 
      (username, password, name, surname, date_of_birth, phone_number, email)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, username`, [s, m, o, t$1, a, c, n])).rows[0];
    return { success: true, userId: i.id, username: i.username };
  } catch (r) {
    return console.error("Error during user insertion:", r), { success: false, error: r.message || "An unexpected error occurred" };
  }
}, "src_routes_API_Auth_registration_createUser_ts--createUser_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/registration/createUser.ts?tsr-directive-use-server=");

export { b as createUser_action };
//# sourceMappingURL=createUser-CqiEsOu_.mjs.map

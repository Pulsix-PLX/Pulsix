import { E } from './server-fns-runtime-4T1EILgx.mjs';
import { r } from './db.server-BYnrqg0d.mjs';
import * as h from 'bcryptjs';
import 'solid-js/web';
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
import 'solid-js';
import 'node:async_hooks';
import 'node:path';
import 'pg';

const I = E(async (u) => {
  const { username: s, passwordConfirm: e, name: o, surname: t, dateOfBirthday: a, email: n, phone: c } = u;
  if (console.log("username: ", s), console.log("password: ", e), console.log("name: ", o), console.log("surname: ", t), console.log("dateOfBirthday: ", a), console.log("email: ", n), console.log("phone: ", c), !e) return console.error("Password is required"), { success: false, error: "Password is required" };
  try {
    const r$1 = String(e).trim();
    if (r$1.length < 6) return { success: false, error: "Password must be at least 6 characters long" };
    const m = await h.hash(r$1, 10), i = (await r.query(`INSERT INTO users 
      (username, password, name, surname, date_of_birth, phone_number, email)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, username`, [s, m, o, t, a, c, n])).rows[0];
    return { success: true, userId: i.id, username: i.username };
  } catch (r) {
    return console.error("Error during user insertion:", r), { success: false, error: r.message || "An unexpected error occurred" };
  }
}, "src_routes_API_Auth_registration_createUser_ts--createUser_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/registration/createUser.ts?tsr-directive-use-server=");

export { I as createUser_action };
//# sourceMappingURL=createUser-B8OMM0Mu.mjs.map

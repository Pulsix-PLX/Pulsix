import { E } from './server-fns-runtime-4T1EILgx.mjs';
import { c as de } from '../_/nitro.mjs';
import { r } from './db.server-BYnrqg0d.mjs';
import * as h from 'bcryptjs';
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
import 'node:fs';
import 'solid-js';
import 'node:async_hooks';
import 'node:path';
import 'pg';

const _ = E(async (r$1) => {
  const { password: o, username: t } = r$1;
  try {
    const s = await r.query("SELECT id, username, password FROM users WHERE username = $1", [t]);
    if (s.rows.length === 0) return { success: false, message: "Credenziali non valide" };
    const e = s.rows[0];
    return await h.compare(o, e.password) ? (await (await de({ password: process.env.SESSION_SECRET, name: "auth_session" })).update({ userId: e.id, username: e.username }), console.log(`Sessione (cookie criptato) aggiornata per utente ${e.username}`), { success: true }) : { success: false, message: "Credenziali non valide" };
  } catch (s) {
    return console.error("Errore durante il login:", s), process.env.SESSION_SECRET ? { success: false, message: "Errore durante il processo di login" } : (console.error("SESSION_SECRET non \xE8 impostata!"), { success: false, message: "Errore di configurazione server." });
  }
}, "src_routes_API_Auth_login_loginUser_ts--loginUser_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/login/loginUser.ts?tsr-directive-use-server=");

export { _ as loginUser_action };
//# sourceMappingURL=loginUser-lOKuXLaT.mjs.map

import { getRequestEvent } from 'solid-js/web';
import { provideRequestEvent } from 'solid-js/web/storage';
import { h as ge } from '../_/nitro.mjs';
import s from 'pg';

function w(r, n, s) {
  if (typeof r != "function") throw new Error("Export from a 'use server' module must be a function");
  const a = "";
  return new Proxy(r, { get(c, e, o) {
    return e === "url" ? `${a}/_server?id=${encodeURIComponent(n)}&name=${encodeURIComponent(s)}` : e === "GET" ? o : c[e];
  }, apply(c, e, o) {
    const u = getRequestEvent();
    if (!u) throw new Error("Cannot call server function outside of a request");
    const t = ge(u);
    return t.locals.serverFunctionMeta = { id: n + "#" + s }, t.serverOnly = true, provideRequestEvent(t, () => r.apply(e, o));
  } });
}
const { Pool: m } = s, D = new m({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : void 0, database: process.env.DB_NAME });

export { D, w };
//# sourceMappingURL=db.server-Cxzv6220.mjs.map

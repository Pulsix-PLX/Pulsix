import { getRequestEvent } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { provideRequestEvent } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/storage/dist/storage.js';
import { a as ge } from '../_/nitro.mjs';
import s from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pg@8.14.1/node_modules/pg/lib/index.js';

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

import { getRequestEvent } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { provideRequestEvent } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/storage/dist/storage.js';
import { g as ge } from '../_/nitro.mjs';

function E(r, n, u) {
  if (typeof r != "function") throw new Error("Export from a 'use server' module must be a function");
  const i = "";
  return new Proxy(r, { get(s, e, t) {
    return e === "url" ? `${i}/_server?id=${encodeURIComponent(n)}&name=${encodeURIComponent(u)}` : e === "GET" ? t : s[e];
  }, apply(s, e, t) {
    const c = getRequestEvent();
    if (!c) throw new Error("Cannot call server function outside of a request");
    const o = ge(c);
    return o.locals.serverFunctionMeta = { id: n + "#" + u }, o.serverOnly = true, provideRequestEvent(o, () => r.apply(e, t));
  } });
}

export { E };
//# sourceMappingURL=server-fns-runtime-4T1EILgx.mjs.map

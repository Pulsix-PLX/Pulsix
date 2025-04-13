import { createComponent, ssr, ssrHydrationKey, escape } from 'solid-js/web';
import { createResource, Show } from 'solid-js';
import { A, I } from './index-2Np-G_nR.mjs';
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

var l = ["<div", ' class="CM mt-[15vw]">', "</div>"];
function W(t) {
  console.log("props", t);
  const [r, { refetch: o }] = createResource(() => t.id, A);
  return createComponent(Show, { get when() {
    return r();
  }, get children() {
    return ssr(l, ssrHydrationKey(), escape(createComponent(I, { get transactions() {
      return r();
    }, refetch: o })));
  } });
}

export { W as default };
//# sourceMappingURL=index6.mjs.map

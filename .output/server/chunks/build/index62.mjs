import { createComponent, ssr, ssrHydrationKey, escape } from 'solid-js/web';
import { createResource, Show } from 'solid-js';
import { W, H } from './index-XVT8Ct04.mjs';
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

var l = ["<div", ' class="CM mt-[15vw]">', "</div>"];
function R(t) {
  console.log("props", t);
  const [r, { refetch: o }] = createResource(() => t.id, W);
  return createComponent(Show, { get when() {
    return r();
  }, get children() {
    return ssr(l, ssrHydrationKey(), escape(createComponent(H, { get transactions() {
      return r();
    }, refetch: o })));
  } });
}

export { R as default };
//# sourceMappingURL=index62.mjs.map

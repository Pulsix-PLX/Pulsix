import { createComponent, ssr, ssrHydrationKey, escape } from 'solid-js/web';
import { createResource, Show } from 'solid-js';
import { A, I } from './index-BQH3GIDW.mjs';
import './server-fns-runtime-C3tiYEg6.mjs';
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

var l = ["<div", ' class="CM mt-[15vw]">', "</div>"];
function b(t) {
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

export { b as default };
//# sourceMappingURL=index82.mjs.map

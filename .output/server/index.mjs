import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { t as trapUnhandledNodeErrors, a as toNodeListener, u as useNitroApp } from './chunks/_/nitro.mjs';
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
import 'solid-js/web';
import 'solid-js/web/storage';
import 'solid-js/store';
import 'axios';
import 'node:fs';
import 'node:path';

const nitroApp = useNitroApp();
const listener = toNodeListener(nitroApp.h3App);
const websocket = void 0;
const handler = listener;
trapUnhandledNodeErrors();

export { handler, listener, websocket };
//# sourceMappingURL=index.mjs.map

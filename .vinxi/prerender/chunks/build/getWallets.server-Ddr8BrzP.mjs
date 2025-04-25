import { E } from './server-fns-runtime-DEO2-sKc.mjs';
import { a as t } from '../_/nitro.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/storage/dist/storage.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/destr@2.0.3/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/h3@1.15.1/node_modules/h3/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/node-mock-http@1.0.0/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vinxi@0.5.3_@types+node@22._43e8e15a4bb8f875bc590eea815050cc/node_modules/vinxi/lib/app-fetch.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vinxi@0.5.3_@types+node@22._43e8e15a4bb8f875bc590eea815050cc/node_modules/vinxi/lib/app-manifest.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ufo@1.5.4/node_modules/ufo/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vite-plugin-node-polyfills@_4e133e926bbaeb0b9cea849071ce5364/node_modules/vite-plugin-node-polyfills/shims/process/dist/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vite-plugin-node-polyfills@_4e133e926bbaeb0b9cea849071ce5364/node_modules/vite-plugin-node-polyfills/shims/global/dist/index.js';
import 'node:async_hooks';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pg@8.14.1/node_modules/pg/lib/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/store/dist/server.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/axios@1.8.3/node_modules/axios/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unctx@2.4.1/node_modules/unctx/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.1/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.1/node_modules/unstorage/drivers/fs.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.1/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';

const W = E(async function(e) {
  var _a;
  if (console.log(`[Server Function:fetchWalletsForUserId] Fetching per userId: ${e}`), isNaN(e)) throw new Error("User ID non valido fornito a fetchWalletsForUserId.");
  try {
    return (_a = (await t.query("SELECT * FROM wallets WHERE user_id = $1 ORDER BY wallet_name", [e])).rows) != null ? _a : [];
  } catch (r) {
    throw console.error("[Server Function:fetchWalletsForUserId] Errore DB:", r), new Error("Errore recupero wallets.");
  }
}, "src_routes_API_Wallets_getWallets_server_ts--getWallets_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server="), L = E(async function(e, r) {
  var _a;
  const t$1 = "[Server Function:getWalletsContainerEnhancedWithDeleteCheck]";
  if (console.log(`${t$1} Fetching per userId: ${e}, containerId: ${r}`), isNaN(e)) throw console.error(`${t$1} User ID non valido fornito.`), new Error("User ID non valido fornito.");
  if (r !== null && (typeof r != "number" || isNaN(r))) throw console.error(`${t$1} Container ID non valido fornito (Type: ${typeof r}, Value: ${r}).`), new Error("Container ID non valido fornito.");
  const l = r === null;
  try {
    const o = `
            WITH CombinedWallets AS (
                -- Selezione 1: Figli diretti (Livello N) - Devono essere NON eliminati
                SELECT
                    wn.*
                FROM
                    wallets wn
                WHERE
                    wn.user_id = $1
                    AND ${l ? "wn.container_id IS NULL" : "wn.container_id = $2"}
                    AND wn.date_of_delete IS NULL  -- <<< Aggiunto: Esclude elementi eliminati al Livello N

                UNION ALL

                -- Selezione 2: Figli dei Sotto-Container (Livello N+1)
                -- Devono essere NON eliminati E il loro genitore container (Livello N) NON deve essere eliminato
                SELECT
                    w_n_plus_1.*
                FROM
                    wallets w_n_plus_1
                JOIN
                    wallets wn ON w_n_plus_1.container_id = wn.id -- Join con il genitore (Livello N)
                WHERE
                    wn.user_id = $1                                   -- Genitore appartiene all'utente
                    AND ${l ? "wn.container_id IS NULL" : "wn.container_id = $2"} -- Genitore \xE8 al Livello N corretto
                    AND wn.type = 'container'                       -- Genitore \xE8 un container
                    AND wn.date_of_delete IS NULL                   -- <<< Aggiunto: Genitore NON deve essere eliminato
                    AND w_n_plus_1.user_id = $1                     -- Nipote appartiene all'utente
                    AND w_n_plus_1.date_of_delete IS NULL           -- <<< Aggiunto: Nipote NON deve essere eliminato
                    -- Potresti aggiungere qui "AND w_n_plus_1.type = 'wallet'" se vuoi SOLO i wallet al livello N+1
            )
            -- Seleziona tutto dalla CTE e ordina
            SELECT *
            FROM CombinedWallets
            ORDER BY
                COALESCE(container_id, -1), -- Raggruppa per genitore (root prima)
                type DESC,                  -- Container prima di wallet all'interno del gruppo
                wallet_name;                -- Ordine alfabetico per nome
        `, s = l ? [e] : [e, r];
    return (_a = (await t.query(o, s)).rows) != null ? _a : [];
  } catch (o) {
    throw console.error(`${t$1} Errore DB:`, o), o.code && console.error(`DB Error Code: ${o.code}, Message: ${o.message}`), new Error(`Errore DB durante recupero enhanced wallets (con check delete) per container ${r}.`);
  }
}, "src_routes_API_Wallets_getWallets_server_ts--getWalletsContainer_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server="), f = E(async function(e) {
  var _a, _b, _c;
  const r = "[Server Function:getRecursiveWalletBalance]";
  if (typeof e != "number" || isNaN(e) || e <= 0) throw console.error(`${r} ID container non valido fornito: ${e}`), new Error("ID container di partenza non valido.");
  try {
    const t$1 = `
            WITH RECURSIVE ContainerHierarchy AS (
                -- Anchor Member: Seleziona i figli diretti del container iniziale ($1)
                -- che NON sono stati eliminati. Include anche il tipo per filtrare dopo.
                SELECT
                    id, balance, container_id, type -- Includi 'type'
                FROM
                    public.wallets
                WHERE
                    container_id = $1
                    AND date_of_delete IS NULL -- <<< Filtro: Esclude figli diretti eliminati

                UNION ALL

                -- Recursive Member: Seleziona i figli (w) degli elementi gi\xE0 trovati (ch)
                -- assicurandosi che i figli (w) NON siano stati eliminati.
                -- La ricorsione si ferma automaticamente se un container 'ch' era eliminato
                -- perch\xE9 non sarebbe stato selezionato nel passo precedente.
                SELECT
                    w.id, w.balance, w.container_id, w.type -- Includi 'type'
                FROM
                    public.wallets w
                JOIN
                    ContainerHierarchy ch ON w.container_id = ch.id -- Join con il risultato precedente
                WHERE
                    w.date_of_delete IS NULL -- <<< Filtro: Esclude nipoti (o livelli inferiori) eliminati
            )
            -- Seleziona la somma dei bilanci dalla gerarchia risultante,
            -- MA SOLO per gli elementi che sono di tipo 'wallet'.
            -- Usa COALESCE per restituire 0 se non ci sono wallet o SUM \xE8 NULL.
            SELECT COALESCE(SUM(balance), 0) AS total_balance
            FROM ContainerHierarchy
            WHERE type = 'wallet'; -- <<< Filtro: Somma solo i bilanci dei WALLET effettivi
        `, l = [e];
    return (_c = (_b = (_a = (await t.query(t$1, l)).rows) == null ? void 0 : _a[0]) == null ? void 0 : _b.total_balance) != null ? _c : 0;
  } catch (t) {
    throw console.error(`${r} Errore DB durante calcolo somma ricorsiva per ${e}:`, t), t.code && console.error(`DB Error Code: ${t.code}, Message: ${t.message}`), new Error(`Errore recupero somma wallets per container ${e}.`);
  }
}, "src_routes_API_Wallets_getWallets_server_ts--getRecursiveWalletBalance_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server="), C = E(async function(e) {
  var _a;
  try {
    return (_a = (await t.query("SELECT wallet_name, type FROM wallets WHERE id = $1;", [e])).rows) != null ? _a : [];
  } catch (r) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", r), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_getWallets_server_ts--getWalletName_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server=");

export { f as getRecursiveWalletBalance_1, C as getWalletName_1, L as getWalletsContainer_1, W as getWallets_1 };
//# sourceMappingURL=getWallets.server-Ddr8BrzP.mjs.map

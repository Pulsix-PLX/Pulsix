import { E } from './server-fns-runtime-C3tiYEg6.mjs';
import { g as t } from '../_/nitro.mjs';

const c = E(async function(e) {
  var _a;
  if (console.log(`[Server Function:fetchWalletsForUserId] Fetching per userId: ${e}`), isNaN(e)) throw new Error("User ID non valido fornito a fetchWalletsForUserId.");
  try {
    return (_a = (await t.query("SELECT * FROM wallets WHERE user_id = $1 ORDER BY wallet_name", [e])).rows) != null ? _a : [];
  } catch (r) {
    throw console.error("[Server Function:fetchWalletsForUserId] Errore DB:", r), new Error("Errore recupero wallets.");
  }
}, "src_routes_API_Wallets_getWallets_server_ts--getWallets_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server="), p = c, u = E(async function(e, r) {
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
}, "src_routes_API_Wallets_getWallets_server_ts--getWalletsContainer_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server="), N = u;
E(async function(e) {
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
}, "src_routes_API_Wallets_getWallets_server_ts--getRecursiveWalletBalance_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server=");
const _ = E(async function(e) {
  var _a;
  try {
    return (_a = (await t.query("SELECT wallet_name, type FROM wallets WHERE id = $1;", [e])).rows) != null ? _a : [];
  } catch (r) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", r), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_getWallets_server_ts--getWalletName_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server="), g = _;

export { N, g, p };
//# sourceMappingURL=getWallets.server-C5R6kBVO.mjs.map

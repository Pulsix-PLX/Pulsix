import { walletid } from '~/routes/(Pages)/Wallets';
import { db } from '~/Server/db.server'; // Importa tipi e db client
import { wallet } from '~/Server/types/wallet';

export async function getWallets(userId: number): Promise<wallet[]> {
  'use server';
  console.log(`[Server Function:fetchWalletsForUserId] Fetching per userId: ${userId}`);
  if (isNaN(userId)) {
    // È buona norma validare l'input anche qui
    throw new Error('User ID non valido fornito a fetchWalletsForUserId.');
  }
  try {
    // La stessa logica di query di prima
    const result = await db.query<wallet>(
      'SELECT * FROM wallets WHERE user_id = $1 ORDER BY wallet_name',
      [userId]
    );
    return result.rows ?? []; // Restituisce le righe o un array vuoto
  } catch (error: any) {
    console.error('[Server Function:fetchWalletsForUserId] Errore DB:', error);
    // Rilancia l'errore per farlo gestire da chi chiama (createResource o l'action)
    throw new Error('Errore recupero wallets.');
  }
}

/**
 * Recupera i wallet e i container direttamente contenuti all'interno di un
 * container specifico per un dato utente.
 * Se containerId è null, recupera gli elementi di primo livello (root).
 *
 * @param userId L'ID dell'utente.
 * @param containerId L'ID del container genitore, o null per recuperare gli elementi root.
 * @returns Una Promise che risolve in un array di oggetti wallet.
 */

export async function getWalletsContainer(
    userId: number,
    containerId: number | null
): Promise<wallet[]> {
    'use server';
    const functionName = '[Server Function:getWalletsContainerEnhancedWithDeleteCheck]';

    console.log(
        `${functionName} Fetching per userId: ${userId}, containerId: ${containerId}`
    );

    // --- Validazione Input (Inclusa verifica NaN per containerId) ---
    if (isNaN(userId)) {
        console.error(`${functionName} User ID non valido fornito.`);
        throw new Error('User ID non valido fornito.');
    }
    if (containerId !== null && (typeof containerId !== 'number' || isNaN(containerId))) {
        console.error(`${functionName} Container ID non valido fornito (Type: ${typeof containerId}, Value: ${containerId}).`);
        throw new Error('Container ID non valido fornito.');
    }
    // --- Fine Validazione ---

    const isRootLevel = containerId === null;

    try {
        // Query SQL con CTE e filtri per date_of_delete
        const queryText = `
            WITH CombinedWallets AS (
                -- Selezione 1: Figli diretti (Livello N) - Devono essere NON eliminati
                SELECT
                    wn.*
                FROM
                    wallets wn
                WHERE
                    wn.user_id = $1
                    AND ${isRootLevel ? 'wn.container_id IS NULL' : 'wn.container_id = $2'}
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
                    AND ${ isRootLevel ? 'wn.container_id IS NULL' : 'wn.container_id = $2' } -- Genitore è al Livello N corretto
                    AND wn.type = 'container'                       -- Genitore è un container
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
        `;

        // Prepara i parametri (uguali a prima, dipendono solo da isRootLevel)
        const queryParams = isRootLevel ? [userId] : [userId, containerId];

        console.log(`${functionName} Query: ${queryText.replace(/\s+/g, ' ').trim()}, Params: ${JSON.stringify(queryParams)}`);

        // Esegui la query
        const result = await db.query<wallet>(queryText, queryParams);

        return result.rows ?? [];

    } catch (error: any) {
        console.error(`${functionName} Errore DB:`, error);
        if (error.code) { // Logga codice errore specifico se disponibile
            console.error(`DB Error Code: ${error.code}, Message: ${error.message}`);
        }
        throw new Error(`Errore DB durante recupero enhanced wallets (con check delete) per container ${containerId}.`);
    }
}


// Tipo per il risultato della query SQL (anche se poi restituiamo solo il numero)
interface TotalBalanceQueryResult {
    total_balance: number; // O string a seconda del driver/DB
}

/**
 * Calcola la somma ricorsiva dei bilanci dei SOLI WALLET contenuti
 * in un container e nei suoi sotto-container, escludendo elementi
 * (wallet o container) marcati come eliminati.
 *
 * @param containerStartId L'ID del container da cui iniziare la somma ricorsiva.
 * @returns Una Promise che risolve in un numero (la somma totale dei wallet validi).
 */
// Rinominata per chiarezza e cambiato tipo di ritorno
export async function getRecursiveWalletBalance(containerStartId: number): Promise<number> {
    'use server';
    const functionName = '[Server Function:getRecursiveWalletBalance]'; // Per i log

    console.log(`${functionName} Calcolo somma per container ID: ${containerStartId}`);

    // --- Validazione Input ---
    if (typeof containerStartId !== 'number' || isNaN(containerStartId) || containerStartId <= 0) {
        console.error(`${functionName} ID container non valido fornito: ${containerStartId}`);
        throw new Error('ID container di partenza non valido.');
    }
    // --- Fine Validazione ---

    try {
        // Query SQL con CTE ricorsiva e filtri per date_of_delete
        const queryText = `
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

                -- Recursive Member: Seleziona i figli (w) degli elementi già trovati (ch)
                -- assicurandosi che i figli (w) NON siano stati eliminati.
                -- La ricorsione si ferma automaticamente se un container 'ch' era eliminato
                -- perché non sarebbe stato selezionato nel passo precedente.
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
            -- Usa COALESCE per restituire 0 se non ci sono wallet o SUM è NULL.
            SELECT COALESCE(SUM(balance), 0) AS total_balance
            FROM ContainerHierarchy
            WHERE type = 'wallet'; -- <<< Filtro: Somma solo i bilanci dei WALLET effettivi
        `;

        // I parametri della query sono solo [containerStartId] per $1
        const queryParams = [containerStartId];

        console.log(`${functionName} Query: ${queryText.replace(/\s+/g, ' ').trim()}, Params: ${JSON.stringify(queryParams)}`);

        // Esegui la query
        const result = await db.query<TotalBalanceQueryResult>(queryText, queryParams);

        // La query restituisce sempre una riga a causa di SUM() e COALESCE.
        // Estrai il valore 'total_balance'. Usa '?? 0' per sicurezza extra.
        const totalBalance = result.rows?.[0]?.total_balance ?? 0;

        console.log(`${functionName} Somma calcolata: ${totalBalance} per container ID: ${containerStartId}`);

        // Restituisci direttamente il numero calcolato
        return totalBalance;

    } catch (error: any) {
        console.error(`${functionName} Errore DB durante calcolo somma ricorsiva per ${containerStartId}:`, error);
        if (error.code) {
            console.error(`DB Error Code: ${error.code}, Message: ${error.message}`);
        }
        throw new Error(`Errore recupero somma wallets per container ${containerStartId}.`);
    }
}

export async function getWalletName(walletid: number | null) {
  'use server'; // Nota: 'use server' va all'inizio del file o della funzione esportata

  try {
    // La query restituisce una riga con SUM(balance) AS total_balance
    const result = await db.query(
      // Usa il tipo corretto qui
      'SELECT wallet_name, type FROM wallets WHERE id = $1;',
      [walletid]
    );
    // Restituisce le righe (dovrebbe essere 0 o 1 riga) o un array vuoto
    return result.rows ?? [];
  } catch (error: any) {
    console.error('[Server Function:getWalletsSub] Errore DB:', error);
    // Rilancia l'errore per farlo gestire da chi chiama
    throw new Error('Errore recupero somma wallets.');
  }
}

import { db } from '~/Server/db.server'; // Importa tipi e db client
import { wallet } from '~/Server/types/wallet';

export async function getWallets(userId: number): Promise<wallet[]> {
    "use server";
    console.log(`[Server Function:fetchWalletsForUserId] Fetching per userId: ${userId}`);
    if (isNaN(userId)) {
        // È buona norma validare l'input anche qui
        throw new Error("User ID non valido fornito a fetchWalletsForUserId.");
    }
    try {
        // La stessa logica di query di prima
        const result = await db.query<wallet>(
            'SELECT * FROM wallets WHERE user_id = $1 ORDER BY wallet_name',
            [userId]
        );
        return result.rows ?? []; // Restituisce le righe o un array vuoto
    } catch (error: any) {
        console.error("[Server Function:fetchWalletsForUserId] Errore DB:", error);
        // Rilancia l'errore per farlo gestire da chi chiama (createResource o l'action)
        throw new Error("Errore recupero wallets.");
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


// Assumendo che la funzione si chiami così basandoci sui log
export async function getWalletsContainer(userId: number, containerId: number | null): Promise<wallet[]> {
    "use server";

    console.log(`[Server Function:getWalletsContainerEnhanced] Fetching per userId: ${userId}, containerId: ${containerId}`);

    // Validazione input
    if (isNaN(userId)) {
        console.error("[Server Function:getWalletsContainerEnhanced] User ID non valido fornito.");
        throw new Error("User ID non valido fornito.");
    }
    if (containerId !== null && typeof containerId !== 'number') {
         console.error("[Server Function:getWalletsContainerEnhanced] Container ID non valido fornito.");
         throw new Error("Container ID non valido fornito.");
    }

    // Determina se stiamo cercando gli elementi root
    const isRootLevel = containerId === null;

    try {
        // --- Usa una CTE per combinare i risultati PRIMA di ordinare ---
        const queryText = `
            WITH CombinedWallets AS (
                -- Selezione 1: Figli diretti (Livello N)
                -- Se isRootLevel è true, seleziona quelli con container_id IS NULL
                -- Altrimenti, seleziona quelli con container_id = $2
                SELECT
                    wn.*
                FROM
                    wallets wn
                WHERE
                    wn.user_id = $1
                    AND ${isRootLevel ? 'wn.container_id IS NULL' : 'wn.container_id = $2'}

                UNION ALL

                -- Selezione 2: Figli dei Sotto-Container (Livello N+1)
                -- Seleziona i wallet (w_n_plus_1) il cui genitore (wn) è un CONTAINER
                -- e quel genitore (wn) è un figlio diretto del containerId richiesto (o è root se isRootLevel)
                SELECT
                    w_n_plus_1.*
                FROM
                    wallets w_n_plus_1
                JOIN
                    wallets wn ON w_n_plus_1.container_id = wn.id -- Il genitore del nipote è il figlio diretto
                WHERE
                    wn.user_id = $1 -- Il genitore (wn) appartiene all'utente
                    AND ${isRootLevel ? 'wn.container_id IS NULL' : 'wn.container_id = $2'} -- Il genitore (wn) è al Livello N corretto
                    AND wn.type = 'container' -- Il genitore (wn) deve essere un container
                    AND w_n_plus_1.user_id = $1 -- Anche il nipote (w_n_plus_1) appartiene all'utente (sicurezza/consistenza)
            )
            -- Ora seleziona dalla CTE e applica l'ORDER BY
            SELECT *
            FROM CombinedWallets
            ORDER BY
                COALESCE(container_id, -1), -- Ordina gli elementi root (NULL) per primi
                type DESC,                 -- Ordina i 'container' prima dei 'wallet'? (dipende da cosa vuoi)
                wallet_name;               -- Infine, ordina per nome
        `;

        // Prepara i parametri: solo [userId] se root, [userId, containerId] altrimenti
        const queryParams = isRootLevel ? [userId] : [userId, containerId];

        // Log per debugging
        console.log(`[Server Function:getWalletsContainerEnhanced] Query: ${queryText.replace(/\s+/g, ' ')}`); // Query pulita per leggibilità
        console.log(`[Server Function:getWalletsContainerEnhanced] Params: ${JSON.stringify(queryParams)}`);


        // Esegui la query
        const result = await db.query<wallet>(queryText, queryParams);

        return result.rows ?? [];

    } catch (error: any) {
        console.error("[Server Function:getWalletsContainerEnhanced] Errore DB:", error);
        if (error.code) {
           console.error(`DB Error Code: ${error.code}`); // Logga il codice errore specifico
        }
        // Rilancia un errore più specifico o generico
        throw new Error(`Errore DB durante recupero enhanced wallets per container ${containerId}.`);
    }
}
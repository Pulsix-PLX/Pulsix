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
            'SELECT id, wallet_name, balance, type, container_id FROM wallets WHERE user_id = $1 ORDER BY wallet_name',
            [userId]
        );
        return result.rows ?? []; // Restituisce le righe o un array vuoto
    } catch (error: any) {
        console.error("[Server Function:fetchWalletsForUserId] Errore DB:", error);
        // Rilancia l'errore per farlo gestire da chi chiama (createResource o l'action)
        throw new Error("Errore recupero wallets.");
    }
}

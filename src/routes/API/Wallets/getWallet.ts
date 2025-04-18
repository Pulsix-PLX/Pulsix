import { wallet } from '../../../server/types/wallet';
import { db } from '../../../server/db.server';

export async function getWallet(walletid: number) {
  'use server'; // Nota: 'use server' va all'inizio del file o della funzione esportata

  try {
    // La query restituisce una riga con SUM(balance) AS total_balance
    const result = await db.query<wallet>(
      // Usa il tipo corretto qui
      'SELECT * FROM wallets WHERE id = $1;',
      [walletid]
    );
    // Restituisce le righe (dovrebbe essere 0 o 1 riga) o un array vuoto
    console.log(result.rows[0]);
    return result.rows[0] ?? [];
  } catch (error: any) {
    console.error('[Server Function:getWalletsSub] Errore DB:', error);
    // Rilancia l'errore per farlo gestire da chi chiama
    throw new Error('Errore recupero somma wallets.');
  }
}

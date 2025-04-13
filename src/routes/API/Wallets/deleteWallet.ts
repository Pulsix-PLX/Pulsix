import { action } from '@solidjs/router';
import { db } from '~/Server/db.server';

export default async function deleteWallet(walletId: number | undefined, type: string | undefined) {
  'use server'; // Nota: 'use server' va all'inizio del file o della funzione esportata
  const executionTime = new Date();

  try {
    let result;
    // La query restituisce una riga con SUM(balance) AS total_balance

      result = await db.query(
        // Usa il tipo corretto qui
        'UPDATE wallets SET date_of_delete = $1 WHERE id = $2',
        [executionTime,walletId]
      );
    

    return result?.rows ?? [];
  } catch (error: any) {
    console.error('[Server Function:getWalletsSub] Errore DB:', error);
    // Rilancia l'errore per farlo gestire da chi chiama
    throw new Error('Errore recupero somma wallets.');
  }
}

import { db } from '../../../../server/db.server';

export default async function getTransactions(walletId: number) {
  'use server'; // Nota: 'use server' va all'inizio del file o della funzione esportata
  console.log('getTransactions', walletId);
  try {
    // La query restituisce una riga con SUM(balance) AS total_balance

    const result = await db.query(
      // Usa il tipo corretto qui
      'SELECT * FROM transactions WHERE wallet_id = $1 ORDER BY date DESC',
      [walletId]
    );

    return result?.rows ?? [];
  } catch (error: any) {
    console.error('[Server Function:getWalletsSub] Errore DB:', error);
    // Rilancia l'errore per farlo gestire da chi chiama
    throw new Error('Errore recupero somma wallets.');
  }
}

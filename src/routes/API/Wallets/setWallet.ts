import { action } from "@solidjs/router";
import { db } from "~/Server/db.server";

export const setWallet = action(async (data) => {
  'use server'; // Nota: 'use server' va all'inizio del file o della funzione esportata

const category_id= parseInt(data.get('category_id'))||null // Assicurati che category_id sia un numero
  try {
    let result;
    // La query restituisce una riga con SUM(balance) AS total_balance
    if(data.get('type')=='wallet'){
     result = await db.query(
      // Usa il tipo corretto qui
      'UPDATE wallets SET wallet_name = $1, currency = $2, nation = $3, color = $4, category_id = $5 WHERE id = $6',
      [data.get('walletName'), data.get('currency'), data.get('nation'), data.get('color'), category_id, data.get('id')]
    );
    }
    if(data.get('type')=='container'){
       result = await db.query(
        // Usa il tipo corretto qui
        'UPDATE wallets SET wallet_name = $1, category_id = $2 WHERE id = $3',
        [data.get('walletName'), category_id, data.get('id')]
      );
    }

    return result?.rows ?? [];
  } catch (error: any) {
    console.error('[Server Function:getWalletsSub] Errore DB:', error);
    // Rilancia l'errore per farlo gestire da chi chiama
    throw new Error('Errore recupero somma wallets.');
  }
})
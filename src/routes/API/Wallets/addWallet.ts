import { action } from '@solidjs/router';
import { db } from '../../../server/db.server';

export const addWallet = action(async (data) => {
  'use server'; // Nota: 'use server' va all'inizio del file o della funzione esportata
  console.log(
    '-------------------------------------------------------------------------Add wallet'
  );
  const category_id = parseInt(data.get('category_id')) || null; // Assicurati che category_id sia un numero
  try {
    let result;
    console.log(data.get('type'));
    if (data.get('type') == 'wallet') {
      console.log('wallet');
      result = await db.query(
        'INSERT INTO wallets (wallet_name, type, nation, currency, category_id, user_id, container_id, color, type_ui) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);',
        [
          data.get('walletName'),
          data.get('type'),
          data.get('nation'),
          data.get('currency'),
          category_id,
          data.get('user_id'),
          data.get('container_id'),
          data.get('color'),
          data.get('type_ui'),
        ]
      );
    }
    if (data.get('type') == 'container') {
      result = await db.query(
        'INSERT INTO wallets (wallet_name, type, category_id, user_id, container_id) VALUES ($1, $2, $3, $4, $5);',
        [
          data.get('walletName'),
          data.get('type'),
          category_id,
          data.get('user_id'),
          data.get('container_id'),
        ]
      );
    }

    return 'Success';
  } catch (error: any) {
    console.error('[Server Function:getWalletsSub] Errore DB:', error);
    // Rilancia l'errore per farlo gestire da chi chiama
    throw new Error('Error.');
  }
});

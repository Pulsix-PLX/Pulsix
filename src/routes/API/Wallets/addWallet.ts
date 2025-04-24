import { action } from '@solidjs/router';
import { db } from '../../../server/db.server';
import type { APIEvent } from '@solidjs/start/server';

import { json } from '@solidjs/router';

export async function POST(event: APIEvent) {
  'use server'; // Nota: 'use server' va all'inizio del file o della funzione esportata
  console.log('ADD WALLET')
let data;
  try {
    // 1. Leggi e parsa il corpo della richiesta JSON
    data = await event.request.json();
  } catch (e) {
    // Errore se il corpo non è JSON valido o è mancante
    return json({ success: false, message: 'Corpo della richiesta non valido o mancante (JSON invalido).' }, { status: 400 });
  }

  const {
    walletName,
    type,
    nation,
    currency,
    container_id,
    color,
    type_ui,
    category_id,
  } = data;

  const user_id = event.locals.user?.id;
console.log(data)
  try {
    let result;

    if (type === 'wallet') {
      console.log('wallet');
      result = await db.query(
        'INSERT INTO public.wallets (wallet_name, type, nation, currency, category_id, user_id, container_id, color, type_ui) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);',
        [
          walletName,
          type,
          nation,
          currency,
          category_id,
          user_id,
          container_id,
          color,
          type_ui,
        ]
      );
    }

    if (type === 'container') {
      result = await db.query(
        'INSERT INTO public.wallets (wallet_name, type, category_id, user_id, container_id) VALUES ($1, $2, $3, $4, $5);',
        [walletName, type, category_id, user_id, container_id]
      );
    }

    return 'Success';
  } catch (error: any) {
    console.error('[Server Function:getWalletsSub] Errore DB:', error);
    // Rilancia l'errore per farlo gestire da chi chiama
    throw new Error('Error.');
  }
}

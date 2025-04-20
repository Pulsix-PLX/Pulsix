import { getFormValue } from '~/GlobalStores/FormStore';
import { db } from '../../../../server/db.server';
import type { APIEvent } from '@solidjs/start/server';
import { getUserId } from '~/Server/auth.server';
import { json } from '@solidjs/router';
export async function POST(event:APIEvent) {
  'use server'; // Nota: 'use server' va all'inizio del file o della funzione esportata
  let formData;
  try {
    // 1. Leggi i dati inviati dal CLIENT nel corpo della richiesta
    formData = await event.request.json();
} catch (e) {
    return json({ message: 'Corpo della richiesta non valido o mancante.' }, { status: 400 });
}

// Estrai i valori dal corpo parsato
const { cause, date, categoryId, amount, walletId, type, userId } = formData;

  console.log('cause:', cause, 'date:', date, 'categoryId:', categoryId, 'amount:', amount, 'walletId:', walletId, 'type:', type, 'userId:', userId);
  try {
    // Inserisce una nuova transazione nel database e restituisce la riga inserita
    const result = await db.query(
      'INSERT INTO public.transactions (cause, amount, wallet_id, type, category_id, date, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [cause, amount, walletId, type, categoryId, date, userId]
    );

    return result?.rows ?? [];
  } catch (error: any) {
    console.error('[Server Function:getWalletsSub] Errore DB:', error);
    // Rilancia l'errore per farlo gestire da chi chiama
    throw new Error('Errore recupero somma wallets.');
  }
}

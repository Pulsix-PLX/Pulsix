import { db } from '../../../server/db.server';
import type { APIEvent } from '@solidjs/start/server';
import { getUserId } from '~/Server/auth.server';
import { json } from '@solidjs/router';

export async function POST(event: APIEvent) {
  'use server';

  let formData;
  try {
    // 1. Leggi e parsa il corpo della richiesta JSON
    formData = await event.request.json();
  } catch (e) {
    // Errore se il corpo non è JSON valido o è mancante
    return json({ success: false, message: 'Corpo della richiesta non valido o mancante (JSON invalido).' }, { status: 400 });
  }

  // --- CONTROLLO AUTENTICAZIONE UTENTE ---
 // const userId = await getUserId();
 //userId recuperato dal middleware che lo recupera dal token
 //const locals = event.locals; 
 const userId = event.locals.user?.id;
 console.log('Tarnsaction userId', userId)
  if (!userId) { // Verifica che l'utente sia loggato
      return json(
          { success: false, message: 'Utente non autenticato o sessione scaduta.' },
          { status: 401 } // Unauthorized
      );
  }

  // Estrai i valori dal corpo parsato
  // TODO: Potresti aggiungere qui validazioni più granulari sui tipi (es. amount è numero, date è valida, etc.)
  const { cause, date, categoryId, amount, walletId, type } = formData;

  // --- VALIDAZIONI SPECIFICHE ---

  // 1. Controllo sul valore del campo 'type'
  if (type !== 'Income' && type !== 'Expense') {
      console.warn(`[API AddTransaction] Tentativo con tipo non valido: ${type} per user ${userId}`);
      return json(
          { success: false, message: 'Il campo "type" della transazione deve essere obbligatoriamente "Income" o "Expense".' },
          { status: 400 } // Bad Request - Input non valido
      );
  }

  // 2. Controllo esistenza e appartenenza del Wallet specificato (walletId)
  try {
      const walletCheckResult = await db.query(
          // Query per verificare se esiste un wallet con quell'ID associato a quell'utente
          // Assicurati che 'public.wallets' sia il nome corretto della tua tabella wallets
          'SELECT 1 FROM public.wallets WHERE id = $1 AND user_id = $2',
          [walletId, userId]
      );

      // Se rowCount è 0, significa che non esiste un wallet con quell'ID per quell'utente
      if (walletCheckResult.rowCount === 0) {
          console.warn(`[API AddTransaction] Tentativo su wallet inesistente o non appartenente: walletId ${walletId} per user ${userId}`);
          return json(
              { success: false, message: `Il wallet specificato (ID: ${walletId}) non è stato trovato o non appartiene all'utente.` },
              { status: 400 } // Bad Request - Riferimento a risorsa non valida/accessibile
          );
      }
      // Se rowCount > 0, il wallet esiste e appartiene all'utente, possiamo procedere.

  } catch (dbError: any) {
      // Errore durante l'esecuzione della query di controllo del wallet
      console.error('[API AddTransaction] Errore DB durante il controllo del wallet:', dbError);
      return json(
          { success: false, message: 'Errore interno del server durante la verifica del wallet.' },
          { status: 500 } // Internal Server Error
      );
  }

  // --- INSERIMENTO TRANSAZIONE (se tutte le validazioni precedenti sono passate) ---
  console.log('Dati validati, tentativo inserimento transazione:', { cause, date, categoryId, amount, walletId, type, userId });
  try {
    // Inserisce la nuova transazione nel database
    const result = await db.query(
      'INSERT INTO public.transactions (cause, amount, wallet_id, type, category_id, date, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [cause, amount, walletId, type, categoryId, date, userId]
    );

    // Verifica se l'inserimento è andato a buon fine e restituisci la riga inserita
    if (result.rowCount !== null && result.rowCount > 0) {
        console.log(`[API AddTransaction] Transazione inserita con successo ID: ${result.rows[0].id} per user ${userId}`);
        // Restituisce l'intera riga inserita come conferma
        return json(
            { success: true, transaction: result.rows[0] }, // Includi l'oggetto transazione creato
            { status: 201 } // HTTP Status 201 Created - Standard per POST riuscite
        );
    } else {
        // Caso anomalo: l'INSERT non ha dato errore ma non ha restituito righe
        console.error('[API AddTransaction] Inserimento transazione non riuscito (no rows returned) per user ${userId}. Dati:', formData);
        return json(
            { success: false, message: 'Errore imprevisto durante la creazione della transazione.' },
            { status: 500 }
        );
    }

  } catch (error: any) {
    // Errore durante l'INSERT della transazione
    console.error('[API AddTransaction] Errore DB durante inserimento transazione:', error);
    // Qui potresti analizzare 'error.code' per errori specifici del DB (es. violazione foreign key su category_id)
    // e restituire messaggi più mirati se necessario.
    return json(
        { success: false, message: 'Errore durante il salvataggio della transazione nel database.' },
        { status: 500 } // Internal Server Error
    );
  }
}
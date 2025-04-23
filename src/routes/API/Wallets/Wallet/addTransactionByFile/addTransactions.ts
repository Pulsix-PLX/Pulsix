import { db } from '../../../../../server/db.server'; // Il tuo accesso al DB
import type { APIEvent } from '@solidjs/start/server';
import { json } from '@solidjs/router';
// Rimuovi getUserId da qui, usiamo event.locals
// import { getUserId } from '~/Server/auth.server';
import { z } from 'zod'; // Libreria opzionale ma raccomandata per validazione input

// --- Interfacce e Tipi ---

// Tipo per una singola transazione pre-processata dal client
// Deve corrispondere all'output di processCsvData
const ProcessedTransactionSchema = z.object({
  cause: z.string().nullable(),
  amount: z.number().positive().nullable(), // Amount deve essere positivo
  date: z.string().nullable(), // Stringa data, il server la parserà/validerà
  type: z.enum(['Income', 'Expense']).nullable(),
  category_id: z.string().nullable(), // Mantenuto come stringa per ora
  subCategory_id: z.string().nullable(), // Mantenuto come stringa per ora
  // Aggiungi currency qui se la invii dal client
  // currency: z.string().length(3).nullable(),
}).strict(); // strict() per assicurarsi non ci siano campi extra

// Tipo per l'intero payload della richiesta
const ImportPayloadSchema = z.object({
   // L'ID del wallet in cui importare le transazioni. DEVE essere fornito!
  walletId: z.number().int().positive(), // O z.string() se usi UUID/stringhe come ID
  transactions: z.array(ProcessedTransactionSchema), // Un array di transazioni processate
}).strict();

type ImportPayload = z.infer<typeof ImportPayloadSchema>;
type ProcessedTransaction = z.infer<typeof ProcessedTransactionSchema>;

// Tipo per AppLocals (per accedere a event.locals.user.id)
interface AppLocals {
    user?: { id: number; tokenId: string; state: string; };
    startTime?: number;
}


export async function POST(event: APIEvent) {
  'use server';

  // 1. Ottieni l'ID Utente Autenticato dal Middleware
  const locals = event.locals as AppLocals;
  const userId = locals.user?.id;

  if (!userId) {
    // Questo non dovrebbe accadere per un endpoint protetto se il middleware funziona
    console.error('FATAL: User ID not found in event.locals for addTransactions endpoint!');
    return json({ success: false, message: 'Utente non autorizzato o errore interno.' }, { status: 401 });
  }

  // 2. Leggi e Valida il Payload JSON dal Client usando Zod
  let payload: ImportPayload;
  try {
    const rawPayload = await event.request.json();
    payload = ImportPayloadSchema.parse(rawPayload); // Valida la struttura e i tipi
     if (payload.transactions.length === 0) {
        return json({ success: false, message: 'Nessuna transazione valida fornita per l\'importazione.' }, { status: 400 });
     }
  } catch (error) {
    console.error("Errore parsing o validazione payload (Zod):", error);
     // Se l'errore è di Zod, puoi restituire dettagli più specifici
     if (error instanceof z.ZodError) {
         return json({ success: false, message: 'Payload non valido.', errors: error.errors }, { status: 400 });
     }
    return json({ success: false, message: 'Payload della richiesta non valido o malformato.' }, { status: 400 });
  }

  const { walletId, transactions } = payload;
  const errorsProcessingRows: { index: number; error: string; transaction: ProcessedTransaction }[] = [];
  const successfulInserts: any[] = []; // Potresti voler salvare gli ID inseriti

  // --- Validazione Aggiuntiva Server-Side (Es. Wallet Esistente) ---
  // È cruciale verificare che il walletId fornito esista E appartenga all'utente autenticato
  try {
      const walletCheck = await db.query('SELECT 1 FROM public.wallets WHERE id = $1 AND user_id = $2', [walletId, userId]);
      if (walletCheck.rowCount === 0) {
          console.warn(`Tentativo di import nel wallet ${walletId} non trovato o non appartenente all'utente ${userId}.`);
          return json({ success: false, message: `Wallet di destinazione (ID: ${walletId}) non trovato o non accessibile.` }, { status: 400 }); // O 403/404
      }
  } catch(dbError: any) {
       console.error(`Errore DB controllo wallet ${walletId} per utente ${userId}:`, dbError);
       return json({ success: false, message: 'Errore interno durante la verifica del wallet.' }, { status: 500 });
  }


  // --- Inserimento Massivo nel Database con Transazione ---
  const client = await db.connect(); // Ottieni una connessione dal pool
  try {
    await client.query('BEGIN'); // Inizia transazione

    console.log(`SERVER: Inizio inserimento di ${transactions.length} transazioni pre-processate nel wallet ${walletId} per user ${userId}.`);

    for (let i = 0; i < transactions.length; i++) {
        const tx = transactions[i];

        // --- Validazione Server-Side per Riga ---
        // Il client ha già fatto molto, ma validiamo l'essenziale
        if (tx.amount === null || tx.amount <= 0) {
            errorsProcessingRows.push({ index: i, error: 'Importo non valido o mancante.', transaction: tx });
            continue; // Salta questa transazione
        }
         if (tx.type === null) {
            errorsProcessingRows.push({ index: i, error: 'Tipo transazione (Income/Expense) non determinato.', transaction: tx });
            continue; // Salta questa transazione
        }
        let parsedDate: Date;
        try {
            if (!tx.date) throw new Error('Data mancante');
            parsedDate = new Date(tx.date); // Tenta il parsing
            if (isNaN(parsedDate.getTime())) throw new Error('Formato data non valido');
        } catch (dateError: any) {
             errorsProcessingRows.push({ index: i, error: `Data non valida (${dateError.message}): "${tx.date}"`, transaction: tx });
            continue; // Salta questa transazione
        }

        // Opzionale: Validazione/Lookup category_id / subCategory_id qui se necessario

        // --- Inserimento Riga ---
        try {
             // !!! Adatta nomi colonne e tipi a public.transactions !!!
            const insertQuery = `
                INSERT INTO public.transactions
                (cause, amount, wallet_id, type, category_id, subCategory_id, "date", user_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id`; // O *
            const params = [
                tx.cause,
                tx.amount,
                walletId, // ID Wallet di destinazione globale
                tx.type, //'Income' o 'Expense'
                tx.category_id, // Potrebbe necessitare conversione/validazione
                tx.subCategory_id, // Potrebbe necessitare conversione/validazione
                parsedDate.toISOString(), // Data valida in formato ISO
                userId // ID Utente autenticato
            ];
            const result = await client.query(insertQuery, params);
            if (result.rows[0]) {
                successfulInserts.push(result.rows[0].id); // Salva l'ID inserito
            }
        } catch (rowInsertError: any) {
             console.error(`Errore inserimento riga ${i} nel DB:`, rowInsertError);
             errorsProcessingRows.push({ index: i, error: `Errore DB: ${rowInsertError.message || 'Errore sconosciuto'}`, transaction: tx });
             // Continua con le altre righe? O fai rollback? Dipende dalla tua strategia
             // Per ora continuiamo, ma potresti voler fare un ROLLBACK qui se una riga fallisce.
        }
    } // Fine ciclo for

    // Se ci sono stati errori per riga E vuoi che l'intero import fallisca, fai rollback
    if (errorsProcessingRows.length > 0 /* && VOGLIO_ROLLBACK_SU_ERRORE_RIGA */) {
        console.warn(`Rollback dovuto a ${errorsProcessingRows.length} errori durante l'elaborazione delle righe.`);
        await client.query('ROLLBACK');
        return json({
            success: false,
            message: `Importazione annullata. Si sono verificati ${errorsProcessingRows.length} errori durante l'elaborazione delle righe.`,
            insertedCount: 0,
            errors: errorsProcessingRows
        }, { status: 400 }); // Bad Request a causa di errori nei dati
    } else {
        // Nessun errore bloccante, conferma la transazione
        await client.query('COMMIT');
        console.log(`SERVER: Inserimento completato per wallet ${walletId}. Righe inserite con successo: ${successfulInserts.length}. Errori per riga: ${errorsProcessingRows.length}`);
        // Restituisci Successo
        return json({
            success: true,
            message: `Importazione completata. ${successfulInserts.length} transazioni inserite. ${errorsProcessingRows.length} righe hanno avuto errori non bloccanti.`,
            insertedCount: successfulInserts.length,
            insertedIds: successfulInserts, // Opzionale
            errors: errorsProcessingRows // Restituisce eventuali errori per riga
        }, { status: 200 });
    }

  } catch (dbError: any) {
    // Errore durante BEGIN, COMMIT, o query non catturata prima
    console.error('[Server Bulk Insert] Errore transazione DB:', dbError);
    try { await client.query('ROLLBACK'); } catch (rbError) { console.error("Errore durante ROLLBACK:", rbError); }
    return json({
        success: false,
        message: 'Errore del database durante l\'operazione di importazione.',
        details: dbError.message,
        insertedCount: successfulInserts.length, // Potrebbero esserci stati inserimenti prima del commit fallito? No con rollback.
        errors: errorsProcessingRows
    }, { status: 500 });
  } finally {
    client.release(); // Rilascia sempre la connessione al pool
  }
}
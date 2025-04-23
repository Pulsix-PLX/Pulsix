import { db } from '../../../../../server/db.server'; // Il tuo accesso al DB
import type { APIEvent } from '@solidjs/start/server';
import { json } from '@solidjs/router';
import { z } from 'zod'; // Uso Zod per validazione payload

// --- Interfacce e Tipi (Invariati) ---
const ProcessedTransactionSchema = z.object({
  cause: z.string().nullable(),
  amount: z.number().positive().nullable(),
  date: z.string().nullable(),
  type: z.enum(['Income', 'Expense']).nullable(),
  category_id: z.string().nullable(),
  subCategory_id: z.string().nullable(),
}).strict();

const ImportPayloadSchema = z.object({
  walletId: z.number().int().positive(),
  transactions: z.array(ProcessedTransactionSchema),
}).strict();

type ImportPayload = z.infer<typeof ImportPayloadSchema>;
type ProcessedTransaction = z.infer<typeof ProcessedTransactionSchema>;

interface AppLocals {
    user?: { id: number; tokenId: string; state: string; };
    startTime?: number;
}

// --- Classe Errore Personalizzata (Utile per identificare l'errore di riga) ---
class RowProcessingError extends Error {
    public index: number;
    public transactionData: ProcessedTransaction;

    constructor(message: string, index: number, transactionData: ProcessedTransaction) {
        super(message);
        this.name = 'RowProcessingError';
        this.index = index;
        this.transactionData = transactionData;
    }
}

export async function POST(event: APIEvent) {
  'use server';

  // 1. Ottieni User ID (Invariato)
  const locals = event.locals as AppLocals;
  const userId = locals.user?.id;
  if (!userId) {
    console.error('FATAL: User ID not found in event.locals for addTransactions endpoint!');
    return json({ success: false, message: 'Utente non autorizzato o errore interno.' }, { status: 401 });
  }

  // 2. Leggi e Valida Payload (Invariato)
  let payload: ImportPayload;
  try {
    const rawPayload = await event.request.json();
    payload = ImportPayloadSchema.parse(rawPayload);
     if (payload.transactions.length === 0) {
        return json({ success: false, message: 'Nessuna transazione valida fornita per l\'importazione.' }, { status: 400 });
     }
  } catch (error) {
    console.error("Errore parsing o validazione payload (Zod):", error);
     if (error instanceof z.ZodError) {
         return json({ success: false, message: 'Payload non valido.', errors: error.errors }, { status: 400 });
     }
    return json({ success: false, message: 'Payload della richiesta non valido o malformato.' }, { status: 400 });
  }

  const { walletId, transactions } = payload;
  let processedCount = 0; // Contatore righe processate con successo prima dell'errore

  // --- Validazione Wallet (Invariato) ---
   try {
      const walletCheck = await db.query('SELECT 1 FROM public.wallets WHERE id = $1 AND user_id = $2', [walletId, userId]);
      if (walletCheck.rowCount === 0) {
          console.warn(`Tentativo di import nel wallet ${walletId} non trovato o non appartenente all'utente ${userId}.`);
          return json({ success: false, message: `Wallet di destinazione (ID: ${walletId}) non trovato o non accessibile.` }, { status: 400 });
      }
  } catch(dbError: any) {
       console.error(`Errore DB controllo wallet ${walletId} per utente ${userId}:`, dbError);
       return json({ success: false, message: 'Errore interno durante la verifica del wallet.' }, { status: 500 });
  }

  // --- Inserimento Atomico con Transazione ---
  const client = await db.connect();
  try {
    await client.query('BEGIN'); // Inizia transazione

    console.log(`SERVER: Inizio inserimento atomico di ${transactions.length} transazioni nel wallet ${walletId} per user ${userId}.`);

    for (let i = 0; i < transactions.length; i++) {
        const tx = transactions[i];
        // Nota: non incrementiamo processedCount qui, lo facciamo solo dopo l'insert riuscito

        // --- Validazione Server-Side per Riga (Lancia Errore) ---
        if (tx.amount === null || tx.amount <= 0) {
            throw new RowProcessingError('Importo non valido o mancante.', i, tx);
        }
        if (tx.type === null) {
             throw new RowProcessingError('Tipo transazione (Income/Expense) non determinato.', i, tx);
        }
        let parsedDate: Date;
        try {
            if (!tx.date) throw new Error('Data mancante');
            parsedDate = new Date(tx.date);
            if (isNaN(parsedDate.getTime())) throw new Error('Formato data non valido');
        } catch (dateError: any) {
             throw new RowProcessingError(`Data non valida (${dateError.message}): "${tx.date}"`, i, tx);
        }

        // --- Inserimento Riga (Lancia errore DB nel catch principale) ---
        const insertQuery = `
            INSERT INTO public.transactions
            (cause, amount, wallet_id, type, category_id, subCategory_id, "date", user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id`;
        const params = [
            tx.cause, tx.amount, walletId, tx.type,
            tx.category_id, tx.subCategory_id,
            parsedDate.toISOString(), userId
        ];
        await client.query(insertQuery, params);

        // Se l'insert è riuscito, incrementa il contatore
        processedCount++;

    } // Fine ciclo for

    // Se il ciclo è completato senza errori, esegui il COMMIT
    await client.query('COMMIT');
    console.log(`SERVER: COMMIT Eseguito. ${processedCount} transazioni inserite con successo per wallet ${walletId}, user ${userId}.`);

    // Restituisci Successo Completo
    return json({
        success: true,
        message: `Importazione completata con successo. ${processedCount} transazioni inserite.`,
        insertedCount: processedCount,
    }, { status: 200 });

  } catch (error: any) {
    // Cattura qualsiasi errore avvenuto nel blocco try
    console.error('[Server Bulk Insert] Errore durante l\'inserimento - Esecuzione ROLLBACK. Righe processate prima errore:', processedCount, 'Errore:', error.message);
    await client.query('ROLLBACK'); // Annulla TUTTA la transazione

    let responseMessage = `Errore durante l'importazione alla riga ${processedCount + 1}. Importazione annullata.`; // Riga user-friendly (parte da 1)
    let specificError = error.message || 'Errore sconosciuto';
    let statusCode = 500; // Default a Internal Server Error

    // Controlla se è l'errore specifico che abbiamo lanciato per la validazione
    if (error instanceof RowProcessingError) {
        responseMessage = `Errore alla riga ${error.index + 1}: ${error.message}. Importazione annullata.`;
        specificError = error.message; // Sovrascrive con il messaggio più specifico
        statusCode = 400; // Bad Request perché l'errore è nei dati forniti
        // Potresti loggare error.transactionData qui se utile per il debug server-side
        // console.error("Dati riga fallita:", error.transactionData);
    } else {
        // Altrimenti è probabilmente un errore DB o altro errore interno
        responseMessage = `Errore database o interno alla riga ${processedCount + 1}. Importazione annullata.`;
    }

    // Restituisci solo il messaggio di errore principale e il conteggio
    return json({
        success: false,
        message: responseMessage,
        // 'specificError' non viene incluso nella risposta JSON come richiesto,
        // ma è usato per costruire il messaggio principale.
        processedSuccessfully: processedCount // N. righe inserite con successo PRIMA dell'errore
    }, { status: statusCode });

  } finally {
    client.release(); // Rilascia sempre la connessione al pool
  }
}
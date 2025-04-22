// Esempio di struttura per il tuo endpoint server (es. in un file API di SolidStart)
import { db } from '../../../../../server/db.server'; // Il tuo accesso al DB
import type { APIEvent } from '@solidjs/start/server';
import { getUserId } from '~/Server/auth.server'; // Funzione per ottenere l'ID utente AUTENTICATO
import { json } from '@solidjs/router';

// Interfaccia per il payload atteso dal frontend
interface BulkImportPayload {
  rowsToImport: any[];                           // Array di righe (quelle da csvState.fileData.rows)
  columnMapping: Record<string, string>;       // Oggetto { csvHeader: systemFieldId }
  transactionTypeLogic: TransactionTypeLogic;  // Oggetto con la logica per Entrata/Uscita
  // Aggiungi qui altri parametri se necessari (es. walletId di destinazione globale?)
}

// Interfaccia per la logica del tipo (dovrebbe corrispondere a quella del frontend)
interface TransactionTypeLogic {
  mode: 'auto' | 'column';
  columnName?: string;
  positiveValue?: string;
  negativeValue?: string;
  negativeIsExpense: boolean;
}

export async function POST(event: APIEvent) {
  'use server'; // Assicurati sia all'inizio

  let payload: BulkImportPayload;
  let userId: number | null; // O il tipo restituito da getUserId

  // 1. Ottieni l'ID Utente Autenticato (SICUREZZA!)
  //    NON fidarti di un userId inviato nel payload dal client.
  try {
    userId = await getUserId(); // Usa la tua funzione per ottenere l'ID dalla sessione/token
    if (!userId) {
      return json({ message: 'Non autorizzato.' }, { status: 401 });
    }
  } catch (authError) {
    console.error("Errore autenticazione:", authError);
    return json({ message: 'Errore di autenticazione.' }, { status: 500 });
  }

  // 2. Leggi e valida il payload dal client
  try {
    payload = await event.request.json();
    // Aggiungi validazione più robusta qui se necessario
    if (!payload || !Array.isArray(payload.rowsToImport) || !payload.columnMapping || !payload.transactionTypeLogic) {
        throw new Error("Payload incompleto o malformato.");
    }
  } catch (e) {
    console.error("Errore parsing JSON payload:", e);
    return json({ message: 'Payload della richiesta non valido o mancante.' }, { status: 400 });
  }

  const { rowsToImport, columnMapping, transactionTypeLogic } = payload;
  const processedRowsForDb: any[] = []; // Array per contenere le righe pronte per l'INSERT
  const errorsProcessingRows: any[] = []; // Array per eventuali errori per riga

  // 3. Elabora ogni riga LATO SERVER
  console.log(`SERVER: Inizio elaborazione di ${rowsToImport.length} righe...`);
  // Crea una mappa inversa per facilitare l'accesso: { systemFieldId: csvHeaderName }
  const systemToCsvHeader: Record<string, string | undefined> = {};
  for (const [csvHeader, systemField] of Object.entries(columnMapping)) {
    systemToCsvHeader[systemField] = csvHeader;
  }

  for (let i = 0; i < rowsToImport.length; i++) {
    const originalRow = rowsToImport[i];
    try {
        // Estrai i dati usando la mappa inversa
        const amountHeader = systemToCsvHeader['amount'];
        const dateHeader = systemToCsvHeader['date'];
        const causeHeader = systemToCsvHeader['cause'];
        const currencyHeader = systemToCsvHeader['currency'];
        const walletHeader = systemToCsvHeader['walletId']; // Potrebbe non essere qui se è globale

        // --- Validazione Dati Mappati Essenziali ---
        if (!amountHeader || originalRow[amountHeader] === undefined || originalRow[amountHeader] === null) {
            throw new Error("Colonna 'amount' non mappata o valore mancante.");
        }
         if (!dateHeader || originalRow[dateHeader] === undefined || originalRow[dateHeader] === null) {
            throw new Error("Colonna 'date' non mappata o valore mancante.");
        }
        // Aggiungi controlli per altri campi obbligatori (cause?, walletId se per riga)

        // --- Parsing e Conversione Tipi ---
        const amountRaw = originalRow[amountHeader];
        const amount = parseFloat(String(amountRaw).replace(',', '.')); // Gestisce virgola e converte
        if (isNaN(amount)) {
           throw new Error(`Valore 'amount' non numerico: "${amountRaw}"`);
        }

        const dateRaw = originalRow[dateHeader];
        const date = new Date(dateRaw); // Prova a parsare la data
        if (isNaN(date.getTime())) {
            throw new Error(`Valore 'date' non valido: "${dateRaw}"`);
            // Considera librerie più robuste per parsing date se i formati sono vari
        }
        const formattedDate = date.toISOString(); // Formato standard per DB

        const cause = causeHeader ? String(originalRow[causeHeader] ?? '') : 'Import da CSV'; // Fallback per causa
        const currency = currencyHeader ? String(originalRow[currencyHeader] ?? 'EUR') : 'EUR'; // Fallback valuta
        const walletId = walletHeader ? String(originalRow[walletHeader]) : null; // Ottieni walletId se mappato per riga
        // TODO: SE walletId NON è mappato per riga, devi ottenerlo in altro modo (es. parametro globale dell'API?)

        // --- Applica Logica Tipo Transazione ---
        let type: string; // Es. 'INCOME', 'EXPENSE' o i tuoi tipi specifici
        if (transactionTypeLogic.mode === 'auto') {
            type = (amount < 0) === transactionTypeLogic.negativeIsExpense ? 'EXPENSE' : 'INCOME'; // Adatta ai tuoi tipi
        } else if (transactionTypeLogic.mode === 'column' /* && controlli aggiuntivi */) {
            const typeValue = originalRow[transactionTypeLogic.columnName!];
            if (typeValue === transactionTypeLogic.positiveValue) type = 'INCOME'; // Adatta
            else if (typeValue === transactionTypeLogic.negativeValue) type = 'EXPENSE'; // Adatta
            else {
                throw new Error(`Valore non riconosciuto ("${typeValue}") nella colonna tipo "${transactionTypeLogic.columnName}"`);
            }
        } else {
             throw new Error("Logica tipo transazione non valida.");
        }

        // --- Compila i dati per il DB ---
        // !!! Assicurati che i nomi delle colonne (amount, wallet_id, ecc.)
        // !!! e i tipi corrispondano ESATTAMENTE alla tua tabella 'public.transactions'
        const rowForDb = {
            cause: cause,
            amount: Math.abs(amount), // Salva sempre importo positivo? O mantieni segno e usa 'type'? Dipende dal tuo DB schema. Assumiamo type gestisca il segno.
            wallet_id: walletId, // Assicurati che questo ID esista e appartenga all'utente! Potrebbe servire una query di validazione qui.
            type: type,
            category_id: null, // Manca la mappatura per categoryId? Da dove viene? Mettiamo null per ora.
            date: formattedDate,
            user_id: userId // Usa l'ID utente verificato dal server!
        };

        // Aggiungi la riga processata all'array per l'inserimento bulk
        processedRowsForDb.push(rowForDb);

    } catch (rowError: any) {
      console.error(`Errore elaborazione riga ${i}:`, originalRow, rowError);
      errorsProcessingRows.push({ rowIndex: i, error: rowError.message, rowData: originalRow });
      // Decidi se continuare o fermare l'intero import se una riga fallisce
      // continue; // Continua con la prossima riga
      // break; // Ferma l'elaborazione
    }
  }

  // 4. Inserimento Massivo nel Database (se non ci sono stati errori bloccanti)
  if (processedRowsForDb.length > 0 /* && !processingShouldStop */) {
    // --- Inizio Transazione Database ---
    // La libreria/client DB che usi potrebbe avere un modo per gestire le transazioni
    // Esempio concettuale con pg (node-postgres):
    const client = await db.connect(); // Ottieni una connessione dal pool
    try {
        await client.query('BEGIN'); // Inizia transazione

        // Costruisci una query INSERT multipla (più efficiente)
        // ATTENZIONE ALLA SICUREZZA: Usa query parametrizzate!
        // Questo è un esempio concettuale, la sintassi esatta dipende dalla libreria DB.
        const values: any[] = [];
        const valuePlaceholders: string[] = [];
        let paramIndex = 1;
        processedRowsForDb.forEach(row => {
            const paramsForRow: any[] = [
                row.cause, row.amount, row.wallet_id, row.type,
                row.category_id, row.date, row.user_id
            ];
            // Aggiunge ($1, $2, $3, ...) per questa riga
            valuePlaceholders.push(`(${paramsForRow.map((_, idx) => `$${paramIndex + idx}`).join(', ')})`);
            values.push(...paramsForRow);
            paramIndex += paramsForRow.length;
        });

        const insertQuery = `
            INSERT INTO public.transactions
            (cause, amount, wallet_id, type, category_id, "date", user_id)
            VALUES ${valuePlaceholders.join(', ')}
            RETURNING id`; // O RETURNING * se vuoi indietro le righe inserite

        console.log(`SERVER: Esecuzione INSERT per ${processedRowsForDb.length} righe.`);
        const result = await client.query(insertQuery, values);

        await client.query('COMMIT'); // Conferma transazione
        console.log(`SERVER: Inserimento completato. Righe inserite: ${result.rowCount}`);

        // 5. Restituisci Successo
        return json({
            message: `Importazione completata con successo. ${result.rowCount} transazioni inserite.`,
            insertedCount: result.rowCount,
            errorsProcessing: errorsProcessingRows // Restituisce eventuali errori per riga
        }, { status: 200 });

    } catch (dbError: any) {
        await client.query('ROLLBACK'); // Annulla transazione in caso di errore DB
        console.error('[Server Bulk Insert] Errore DB:', dbError);
        return json({
            message: 'Errore del database durante l\'inserimento massivo.',
            details: dbError.message,
            errorsProcessing: errorsProcessingRows // Include errori di elaborazione precedenti
        }, { status: 500 });
    } finally {
        client.release(); // Rilascia la connessione al pool
    }
     // --- Fine Transazione Database ---

  } else {
     // Nessuna riga processata o errore bloccante durante l'elaborazione
     console.log("SERVER: Nessuna riga valida da inserire.");
     return json({
         message: `Importazione non eseguita. ${errorsProcessingRows.length > 0 ? 'Errori durante l\'elaborazione delle righe.' : 'Nessuna riga valida trovata.'}`,
         insertedCount: 0,
         errorsProcessing: errorsProcessingRows
        }, { status: 400 }); // Bad Request se nessuna riga valida
  }
}
import { type TransactionTypeLogic } from '../index'; // Assumi che l'interfaccia sia esportata o definita qui

// Interfaccia per l'oggetto transazione processato (basato sulla tua richiesta)
// Nota: category_id e subCategory_id sono string | null qui,
// il server potrebbe doverli convertire in number o fare lookup.
interface ProcessedTransaction {
  cause: string | null;
  amount: number | null; // Sempre positivo o null se non parsabile
  date: string | null; // Mantenuto come stringa, il server la parserà
  type: 'Income' | 'Expense' | null; // Tipo standardizzato
  category_id: string | null; // ID letto dal CSV (o null)
  subCategory_id: string | null; // ID letto dal CSV (o null)
  // Aggiungi altri campi se necessario, es: currency
}

// Pulisce e converte l'importo, restituendo il valore assoluto
function parseAmountValue(value: string | null | undefined): number | null {
  if (value === null || value === undefined || typeof value !== 'string' || value.trim() === '') {
      return null;
  }
  // Rimuove simboli valuta comuni (€, $, £, CHF), spazi, punti (migliaia)
  const cleaned = value
      .replace(/[€$£]|CHF/gi, '') // Rimuove simboli valuta noti
      .replace(/\s+/g, '')      // Rimuove spazi
      .replace(/\.(?=.*\.)/g, '') // Rimuove punti (separatori migliaia), tranne l'ultimo potenziale
      .replace(/,/g, '.');       // Sostituisce virgola decimale con punto
  const number = parseFloat(cleaned);
  return isNaN(number) ? null : Math.abs(number); // Restituisce sempre valore positivo o null
}

// Determina il segno originale dell'importo (usato per type='auto')
function getAmountSign(value: string | null | undefined): number {
   if (value === null || value === undefined || typeof value !== 'string' || value.trim() === '') {
      return 0; // Considera zero/nullo come segno 0
  }
   const cleaned = value
      .replace(/[€$£]|CHF/gi, '')
      .replace(/\s+/g, '')
      .replace(/\.(?=.*\.)/g, '')
      .replace(/,/g, '.');
   const number = parseFloat(cleaned);
   // Restituisce 1 per positivo, -1 per negativo, 0 per zero, 0 se NaN
   return isNaN(number) ? 0 : Math.sign(number);
}

/**
* Processa i dati grezzi del CSV basandosi sulla mappatura e sulla logica fornite.
*
* @param rawData Array di oggetti, dove ogni oggetto rappresenta una riga del CSV (Record<string, string>).
* @param columnMapping Oggetto che mappa header CSV a ID campi sistema (Record<string, string | null>). null significa ignorare.
* @param transactionTypeLogic Configurazione per determinare Income/Expense.
* @returns Un array di oggetti ProcessedTransaction pronti per l'invio al server.
*/
export function processCsvData(
  rawData: Record<string, string>[],
  columnMapping: Record<string, string | null>,
  transactionTypeLogic: TransactionTypeLogic
): ProcessedTransaction[] {

  const processedTransactions: ProcessedTransaction[] = [];

  // 1. Crea una mappa inversa per facilitare la ricerca: { systemFieldId: csvHeader | undefined }
  const systemToHeaderMap: Partial<Record<string, string>> = {};
  for (const csvHeader in columnMapping) {
      const systemFieldId = columnMapping[csvHeader];
      if (systemFieldId) { // Ignora quelli mappati a null (ignorati)
          systemToHeaderMap[systemFieldId] = csvHeader;
      }
  }

  // Header CSV mappato al campo amount (obbligatorio)
  const amountCsvHeader = systemToHeaderMap['amount'];
  // Header CSV mappato al campo che indica il tipo (se mode='column')
  const typeIndicatorCsvHeader = systemToHeaderMap['type_indicator']; // Potrebbe essere undefined

  // 2. Itera su ogni riga dei dati grezzi
  for (const row of rawData) {
      let transactionType: 'Income' | 'Expense' | null = null;
      let finalAmount: number | null = null;

      // --- Determina Amount (sempre positivo) e Tipo ---
      if (amountCsvHeader && row[amountCsvHeader] !== undefined) {
          const rawAmount = row[amountCsvHeader];
          finalAmount = parseAmountValue(rawAmount); // Ottiene valore assoluto pulito

          // Determina il tipo solo se l'importo è valido e non è zero
          if (finalAmount !== null && finalAmount !== 0) {
               if (transactionTypeLogic.mode === 'auto') {
                  const sign = getAmountSign(rawAmount); // Prendi il segno originale
                  // Se negativo E negativo significa spesa -> Expense
                  // Se positivo E negativo significa spesa -> Income
                  transactionType = (sign < 0 === transactionTypeLogic.negativeIsExpense) ? 'Expense' : 'Income';
              } else if (transactionTypeLogic.mode === 'column') {
                  // Verifica che tutti i pezzi necessari siano configurati
                  if (typeIndicatorCsvHeader &&
                      row[typeIndicatorCsvHeader] !== undefined &&
                      transactionTypeLogic.columnName && // columnName dovrebbe corrispondere a typeIndicatorCsvHeader? O è ridondante? Usiamo typeIndicatorCsvHeader.
                      transactionTypeLogic.positiveValue &&
                      transactionTypeLogic.negativeValue)
                  {
                      const typeValue = row[typeIndicatorCsvHeader]?.trim().toLowerCase();
                      const positiveMatcher = transactionTypeLogic.positiveValue.trim().toLowerCase();
                      const negativeMatcher = transactionTypeLogic.negativeValue.trim().toLowerCase();

                      if (typeValue === positiveMatcher) {
                          transactionType = 'Income';
                      } else if (typeValue === negativeMatcher) {
                          transactionType = 'Expense';
                      }
                  }
                  // Se la modalità è 'column' ma la configurazione è incompleta o il valore non corrisponde, il tipo rimane null
              }
          }
      }

      // Se l'importo non è stato mappato o non è parsabile, salta la riga?
      // Per ora la includiamo ma con amount: null e type: null
      if (finalAmount === null) {
           console.warn("Riga saltata o con importo nullo - Impossibile parsare l'importo:", row);
           // Potresti decidere di non aggiungere questa riga all'output:
           // continue;
      }


      // --- Estrai gli altri campi usando la mappa inversa ---
      const causeHeader = systemToHeaderMap['cause'];
      const dateHeader = systemToHeaderMap['date'];
      const categoryHeader = systemToHeaderMap['category_id'];
      const subCategoryHeader = systemToHeaderMap['subCategory_id'];

      const processed: ProcessedTransaction = {
          amount: finalAmount,
          type: transactionType,
          cause: causeHeader ? (row[causeHeader] ?? null) : null,
          date: dateHeader ? (row[dateHeader] ?? null) : null, // Il server dovrà validare/parsare il formato data
          category_id: categoryHeader ? (row[categoryHeader] ?? null) : null,
          subCategory_id: subCategoryHeader ? (row[subCategoryHeader] ?? null) : null,
      };

      processedTransactions.push(processed);
  }

  return processedTransactions;
}
'use server';

import axios from 'axios';
import { db } from '../../../server/db.server';

//Now only use calculateConvertedTotal

// --- Funzione Helper per costruire l'URL (invariata o spostata in utils) ---
function buildBCEQuery(queryParams: {
  flowRef: string;
  startPeriod?: string;
  format?: string;
}): string {
  'use server';
  const baseUrl = 'https://data-api.ecb.europa.eu/service/data';
  const { flowRef, startPeriod, format } = queryParams;

  let queryUrl = `${baseUrl}/${flowRef}`;

  // Usiamo URLSearchParams per gestire correttamente i parametri
  const params = new URLSearchParams();
  if (startPeriod) params.append('startPeriod', startPeriod);
  if (format) params.append('format', format);

  const queryString = params.toString();
  return queryString ? `${queryUrl}?${queryString}` : queryUrl; // Aggiungi '?' solo se ci sono parametri
}

// --- Logica di Fetching e Parsing (Estratta per Riutilizzo) ---
// Questa funzione contiene la logica principale e può essere chiamata sia dall'API che dal cron job
async function fetchLatestECBRates() {
  'use server';
  const queryParams = {
    flowRef: 'EXR/D.USD+GBP+CHF+JPY+AUD+CAD+CNY+SEK+NOK+DKK+INR+BRL+ZAR+SGD+MXN+HKD.EUR.SP00.A', // Tassi verso EUR
    startPeriod: '2020-01-01', // Potresti voler una data più recente o dinamica
    format: 'jsondata',
  };

  const url = buildBCEQuery(queryParams);


  const response = await axios.get(url);
  const result = response.data; // Tipicamente l'oggetto JSON parsato

  // Logga solo una parte se la risposta è molto grande
  // console.log('Risposta ricevuta dalla BCE (struttura iniziale):', JSON.stringify(result).substring(0, 500));

  // Estrazione dati (con controlli più robusti per undefined)
  const dataSet = result?.dataSets?.[0];
  const series = dataSet?.series; // series è un oggetto, non array
  const structure = result?.structure;
  const currenciesDimension = structure?.dimensions?.series?.find(
    (dim: { id: string }) => dim.id === 'CURRENCY'
  ); // Trova la dimensione CURRENCY
  const timeDimension = structure?.dimensions?.observation?.find(
    (dim: { id: string }) => dim.id === 'TIME_PERIOD'
  ); // Trova la dimensione TIME_PERIOD

  const currencyValues = currenciesDimension?.values || []; // Array di { id: 'USD', name: 'US dollar'}
  const timeValues = timeDimension?.values || []; // Array di { id: '2024-04-08', name: '2024-04-08'}

  if (!series || !currencyValues.length || !timeValues.length) {
    console.error('Struttura dati BCE inattesa o mancante.');
    // Considera di lanciare un errore specifico se la struttura non è valida
    // throw new Error("Struttura dati BCE non valida.");
    return []; // Restituisce array vuoto o lancia errore
  }

  let latestRates = [];

  // Itera sulle chiavi dell'oggetto 'series' (es. "0:0:0:0:0")
  for (const key in series) {
    if (Object.prototype.hasOwnProperty.call(series, key)) {
      const observations = series[key]?.observations; // observations è un oggetto { "index": [value, attr1, ...], ... }
      if (observations && Object.keys(observations).length > 0) {
        // Trova l'indice più recente (chiave numerica più alta)
        const observationIndices = Object.keys(observations).map(Number);
        const latestObservationIndex = Math.max(...observationIndices); // Indice numerico (es. 100)
        const latestObservationData = observations[String(latestObservationIndex)]; // Accedi con la stringa dell'indice

        if (!latestObservationData) continue; // Salta se non ci sono dati per l'indice max

        const latestValue = latestObservationData[0]; // Il primo valore è il tasso

        // Trova la data corrispondente all'indice dell'osservazione
        const latestDate = timeValues[latestObservationIndex]?.name || 'N/A';

        // Trova il nome della valuta corrispondente all'indice nella chiave della serie
        // La chiave è tipo "freq:currency:currency_denom:exr_type:exr_suffix"
        const seriesKeyParts = key.split(':');
        const currencyIndex = parseInt(seriesKeyParts[1], 10); // Indice della valuta (seconda parte)
        const currencyInfo = currencyValues[currencyIndex]; // Oggetto { id: 'USD', name: 'US dollar' }

        if (currencyInfo) {
          latestRates.push({
            currency: currencyInfo.id, // Usiamo l'ID (es. USD)
            currencyName: currencyInfo.name, // Nome per info (es. US dollar)
            date: latestDate,
            value: latestValue,
          });
        } else {
          console.warn(`Valuta non trovata per indice ${currencyIndex} nella chiave ${key}`);
        }
      }
    }
  }

  return latestRates;
}

//utility per il recupero del tasso di cambio

// Restituisce il tasso (number) o null se non trovato/errore non gestito
export async function getExchangeRate(currencyCode: string): Promise<number | null> {
  'use server';

  // Se la valuta richiesta è EUR (la base), il tasso è 1
  if (!currencyCode || currencyCode.toUpperCase() === 'EUR') {

    return 1;
  }


  try {
    const result = await db.query<{ rate: number }>( // Aggiungi tipo per la riga restituita
      `SELECT rate FROM exchange_rates WHERE currency_code = $1 ORDER BY observation_date DESC LIMIT 1`,
      [currencyCode.toUpperCase()] // Usa UpperCase per consistenza?
    );

    if (result.rows.length > 0) {
      const rate = result.rows[0].rate;

      return rate; // <-- RESTITUISCI IL VALORE!
    } else {
      console.warn(
        `[getExchangeRate] Tasso non trovato nel DB per ${currencyCode}. Restituisco null.`
      );
      return null; // Tasso non trovato
    }
  } catch (error) {
    console.error(`[getExchangeRate] Errore recupero tasso per ${currencyCode}:`, error);
    // Rilancia l'errore così createResource può metterlo in .error
    throw new Error(`Errore DB recupero tasso per ${currencyCode}`);
  }
}

// utility per calcolare il totale

/**
 * Calcola il tasso di cambio tra due valute (From -> To)
 * utilizzando i tassi memorizzati nel database relativi all'EUR.
 * @param fromCurrencyCode Codice ISO della valuta di partenza (es. 'USD')
 * @param toCurrencyCode Codice ISO della valuta di destinazione (es. 'GBP')
 * @returns Promise<number | null> Il tasso di cambio (quanti 'toCurrency' per 1 'fromCurrency'),
 * o null se uno dei tassi necessari non è disponibile o in caso di errore.
 */
export async function getConversionRate(
  fromCurrencyCode: string,
  toCurrencyCode: string
): Promise<number | null> {
  'use server'; // Necessario per le server functions

  // Normalizza i codici valuta in maiuscolo per consistenza
  const fromCode = fromCurrencyCode.toUpperCase();
  const toCode = toCurrencyCode.toUpperCase();



  // --- Caso Banale: Stessa valuta ---
  if (fromCode === toCode) {
  
    return 1;
  }

  try {
    // --- Recupera i tassi base rispetto a EUR usando la funzione esistente ---

    // Tasso per 1 EUR = X unità di fromCode (es. 1 EUR = 1.08 USD)
    // Nota: getExchangeRate già gestisce il caso in cui fromCode sia 'EUR', restituendo 1.
    const rateEurToFrom = await getExchangeRate(fromCode);

    // Tasso per 1 EUR = Y unità di toCode (es. 1 EUR = 0.85 GBP)
    // Nota: getExchangeRate già gestisce il caso in cui toCode sia 'EUR', restituendo 1.
    const rateEurToTo = await getExchangeRate(toCode);



    // --- Calcola il tasso di conversione richiesto ---

    // Verifica se i tassi necessari sono stati trovati nel DB
    if (rateEurToFrom === null || rateEurToTo === null) {
      console.warn(
        `[getConversionRate] Impossibile calcolare ${fromCode} -> ${toCode}. Tasso EUR->${fromCode} (${rateEurToFrom}) o EUR->${toCode} (${rateEurToTo}) mancante.`
      );
      return null; // Se manca uno dei tassi base, non possiamo calcolare
    }

    // Gestione divisione per zero (improbabile con tassi di cambio, ma per sicurezza)
    if (rateEurToFrom === 0) {
      console.error(
        `[getConversionRate] Impossibile calcolare ${fromCode} -> ${toCode}. Tasso EUR->${fromCode} è zero.`
      );
      return null;
    }

    /*
     * Logica del Cross-Rate:
     * Sappiamo che: 1 EUR = rateEurToFrom * fromCode
     * E anche:     1 EUR = rateEurToTo   * toCode
     * Quindi:      rateEurToFrom * fromCode = rateEurToTo * toCode
     * Dividendo entrambi per rateEurToFrom, otteniamo:
     * 1 * fromCode = (rateEurToTo / rateEurToFrom) * toCode
     * Il tasso (From -> To) è quindi rateEurToTo / rateEurToFrom
     */
    const finalConversionRate = rateEurToTo / rateEurToFrom;


    return finalConversionRate;
  } catch (error) {
    // Cattura eventuali errori lanciati da getExchangeRate o altri problemi
    console.error(
      `[getConversionRate] Errore durante calcolo tasso ${fromCode} -> ${toCode}:`,
      error
    );
    // Potresti rilanciare l'errore o restituire null per indicare fallimento
    // throw new Error(`Errore calcolo tasso ${fromCode}->${toCode}`);
    return null;
  }
}

// dato un containerId e una currency converte tutti i balance dei figli ricorsivamente nella currency desiderata
// utilizzato nello slug.

/**
 * Calcola il saldo totale di tutti i wallet all'interno di una gerarchia di container,
 * convertendo ogni saldo in una valuta target specificata.
 * @param containerId ID del container di partenza (null per la root).
 * @param targetCurrencyCode Codice ISO della valuta target (es. 'EUR').
 * @param userId ID dell'utente proprietario dei wallet.
 * @returns Promise<ConvertedTotalResult> Oggetto con saldo totale e valuta, o lancia un errore.
 */
// Interfacce per i tipi di ritorno e i dati interni
interface ConvertedTotalResult {
  total_balance: number;
  currency_code: string;
  warnings?: string[];
}

interface WalletInfoForTotal {
  id: number;
  balance: number;
  currency: string; // Es. 'USD', 'EUR'
}

/**
 * Calcola la somma totale dei bilanci dei SOLI WALLET validi (non eliminati,
 * con saldo e valuta non nulli) contenuti ricorsivamente in un container
 * (o a livello root), escludendo rami sotto container eliminati,
 * e converte il totale nella valuta target specificata.
 *
 * @param containerId L'ID del container da cui iniziare, o null per il livello root.
 * @param targetCurrencyCode Il codice della valuta target (es. 'EUR').
 * @param userId L'ID dell'utente.
 * @returns Una Promise che risolve in un oggetto ConvertedTotalResult.
 */
export async function calculateConvertedTotal(
  containerId: number | null,
  targetCurrencyCode: string,
  userId: number
): Promise<ConvertedTotalResult> {
  'use server';
  const functionName = '[Server Function:calculateConvertedTotalWithDeleteCheck]';

  // --- Validazione e Normalizzazione Input ---
  if (isNaN(userId) || userId <= 0) {
    console.error(`${functionName} User ID non valido: ${userId}`);
    throw new Error('User ID non valido.');
  }
  if (
    containerId !== null &&
    (typeof containerId !== 'number' || isNaN(containerId) || containerId <= 0)
  ) {
    console.error(`${functionName} Container ID non valido: ${containerId}`);
    throw new Error('Container ID non valido.');
  }
  if (typeof targetCurrencyCode !== 'string' || targetCurrencyCode.trim().length < 3) {
    // Controllo base sulla lunghezza
    console.error(`${functionName} Codice valuta target non valido: ${targetCurrencyCode}`);
    throw new Error('Codice valuta target non valido.');
  }
  const targetCode = targetCurrencyCode.toUpperCase(); // Normalizza in maiuscolo

  // --- Fine Validazione ---

  let totalInTargetCurrency = 0;
  const warnings: string[] = [];

  try {
    // --- Query SQL con CTE e filtri date_of_delete ---
    const sql = `
          WITH RECURSIVE WalletHierarchy AS (
              -- Anchor Member: Seleziona i figli diretti del container (o root)
              -- che NON sono stati eliminati.
              SELECT id, balance, currency, type, container_id
              FROM public.wallets
              WHERE user_id = $1
                AND ${containerId === null ? 'container_id IS NULL' : 'container_id = $2'}
                AND date_of_delete IS NULL -- <<< Esclude figli diretti eliminati

              UNION ALL

              -- Recursive Member: Seleziona i figli (w) degli elementi trovati (wh)
              -- assicurandosi che i figli (w) NON siano stati eliminati.
              SELECT w.id, w.balance, w.currency, w.type, w.container_id
              FROM public.wallets w
              JOIN WalletHierarchy wh ON w.container_id = wh.id -- Join con passo precedente
              WHERE w.user_id = $1 -- Verifica opzionale ma sicura
                AND w.date_of_delete IS NULL -- <<< Esclude elementi ricorsivi eliminati
                -- Non serve controllare wh.date_of_delete qui, è già filtrato prima
          )
          -- Seleziona i dettagli necessari SOLO dai WALLET validi trovati nella gerarchia
          SELECT id, balance, currency
          FROM WalletHierarchy
          WHERE type = 'wallet'           -- Considera solo i wallet
            AND balance IS NOT NULL     -- Ignora wallet con saldo nullo
            AND currency IS NOT NULL;     -- Ignora wallet con valuta nulla
      `;

    // Prepara i parametri per la query
    const params = containerId === null ? [userId] : [userId, containerId];


    // Esegui la query per ottenere la lista dei wallet validi e attivi
    const walletResult = await db.query<WalletInfoForTotal>(sql, params);
    const walletsInHierarchy = walletResult.rows ?? []; // Default a array vuoto

    // Se non ci sono wallet, il totale è 0
    if (walletsInHierarchy.length === 0) {
      return { total_balance: 0, currency_code: targetCode };
    }

    // --- Logica di Conversione (Invariata) ---

    // 2. Ottieni valute uniche (esclusa la target)
    const uniqueCurrenciesToConvert = [
      ...new Set(
        walletsInHierarchy
          .map((w) => w.currency.toUpperCase())
          .filter((code) => code !== targetCode)
      ),
    ];

    // 3. Recupera tassi di cambio
    const rateMap = new Map<string, number | null>();
    if (uniqueCurrenciesToConvert.length > 0) {

      const ratePromises = uniqueCurrenciesToConvert.map((fromCode) =>
        getConversionRate(fromCode, targetCode).catch((err) => {
          // Gestisce errori per singolo tasso
          console.error(`${functionName} Errore recupero tasso per ${fromCode}:`, err);
          return null; // Tratta l'errore come tasso non trovato
        })
      );
      const rateResults = await Promise.all(ratePromises); // Attende tutti i recuperi (o errori gestiti)

      uniqueCurrenciesToConvert.forEach((fromCode, index) => {
        const rate = rateResults[index];
        rateMap.set(fromCode, rate);
        if (rate === null) {
          const warningMsg = `Tasso di cambio non trovato o errore per ${fromCode} -> ${targetCode}. I saldi in ${fromCode} verranno ignorati.`;
          warnings.push(warningMsg);
          console.warn(`${functionName} ${warningMsg}`);
        }
      });
    }
    rateMap.set(targetCode, 1); // Tasso 1 per la valuta target stessa

    // 4. Itera, converti e somma
    for (const wallet of walletsInHierarchy) {
      const balance = wallet.balance;
      // La query SQL ha già filtrato currency non nulle, ma ricontrolliamo per sicurezza
      if (!wallet.currency) continue;
      const fromCode = wallet.currency.toUpperCase();
      const conversionRate = rateMap.get(fromCode);

      // Somma solo se il tasso è valido e non è la valuta target (già sommata implicitamente con tasso 1)
      if (typeof conversionRate === 'number' && !isNaN(conversionRate)) {
        // Arrotonda per evitare problemi di precisione floating point (opzionale ma consigliato)
        totalInTargetCurrency += Math.round(balance * conversionRate * 100) / 100;
      } else {
        // Warning già emesso prima se il tasso è null, log aggiuntivo per debug
        if (fromCode !== targetCode) {
          console.warn(
            `${functionName} Salto wallet ${wallet.id} (${balance} ${fromCode}) per tasso mancante/non valido.`
          );
        }
      }
    }
    // Arrotonda anche il risultato finale a 2 decimali
    totalInTargetCurrency = Math.round(totalInTargetCurrency * 100) / 100;


    return {
      total_balance: totalInTargetCurrency,
      currency_code: targetCode,
      warnings: warnings.length > 0 ? warnings : undefined, // Includi warnings solo se presenti
    };
  } catch (error) {
    console.error(
      `${functionName} Errore critico per container ${
        containerId ?? 'ROOT'
      } in ${targetCode}, user ${userId}:`,
      error
    );
    if (error instanceof Error && 'code' in error) {
      // Log codice DB se presente
      console.error(`DB Error Code: ${error.code}`);
    }
    // Rilancia un errore gestibile
    throw new Error(
      `Errore nel calcolo del totale convertito per container ${containerId ?? 'ROOT'}.`
    );
  }
}

///--- singola conversione ---
/**
 * Converte un dato importo (balance) da una valuta di partenza a una valuta di destinazione.
 * Utilizza la funzione getConversionRate per ottenere il tasso necessario.
 *
 * @param balance L'importo numerico da convertire. Se null, undefined o non numerico, restituisce null.
 * @param fromCurrencyCode Il codice ISO della valuta di partenza (es. 'USD'). Se null o undefined, restituisce null.
 * @param toCurrencyCode Il codice ISO della valuta di destinazione (es. 'EUR'). Se null o undefined, restituisce null.
 * @returns Promise<number | null> L'importo convertito nella valuta di destinazione,
 * oppure null se l'importo/valute non sono validi, se il tasso di cambio non è disponibile,
 * o se si verifica un errore.
 */
export async function convertBalance(
  balance: number | null | undefined,
  fromCurrencyCode: string | null | undefined,
  toCurrencyCode: string | null | undefined
): Promise<number | null> {
  'use server'; // Conferma che è una server function

  // --- Validazione Input ---
  if (balance === null || balance === undefined || isNaN(balance)) {
    console.warn(
      `[convertBalance] Ricevuto balance non valido o mancante: ${balance}. Restituisco null.`
    );
    return null;
  }
  // Considera se 0 è un balance valido (probabilmente sì)

  if (!fromCurrencyCode || !toCurrencyCode) {
    console.warn(
      `[convertBalance] Ricevuto fromCurrencyCode (${fromCurrencyCode}) o toCurrencyCode (${toCurrencyCode}) mancante. Restituisco null.`
    );
    return null;
  }

  // Normalizza i codici valuta
  const fromCode = fromCurrencyCode.toUpperCase();
  const toCode = toCurrencyCode.toUpperCase();


  // --- Caso Semplice: Stessa valuta ---
  if (fromCode === toCode) {

    return balance;
  }

  try {
    // --- Ottieni il Tasso di Conversione ---
    // Chiama la funzione che calcola il tasso (1 unità di fromCode = X unità di toCode)
    const conversionRate = await getConversionRate(fromCode, toCode);

    // --- Gestisci Tasso Non Trovato ---
    if (conversionRate === null) {
      // getConversionRate logga già il warning internamente
      console.warn(
        `[convertBalance] Tasso da ${fromCode} a ${toCode} non disponibile. Impossibile convertire.`
      );
      return null; // Indica che la conversione non è possibile
    }

    // --- Esegui la Conversione ---
    const convertedAmount = balance * conversionRate;
 // Log con più decimali per precisione

    // Restituisci il valore numerico convertito
    return convertedAmount;
  } catch (error) {
    // Gestisci eventuali errori lanciati da getConversionRate
    console.error(
      `[convertBalance] Errore durante la conversione di ${balance} ${fromCode} a ${toCode}:`,
      error
    );
    return null; // Indica fallimento restituendo null
  }
}

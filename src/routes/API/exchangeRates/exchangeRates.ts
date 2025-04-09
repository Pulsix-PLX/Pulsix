"use server";


import type { APIEvent } from "@solidjs/start/server";
import axios from 'axios';
import { db } from "~/Server/db.server";

//Now only use calculateConvertedTotal


// --- Funzione Helper per costruire l'URL (invariata o spostata in utils) ---
function buildBCEQuery(queryParams: { flowRef: string; startPeriod?: string; format?: string }): string {
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
    console.log('URL Generata per la richiesta BCE:', url);

    const response = await axios.get(url);
    const result = response.data; // Tipicamente l'oggetto JSON parsato

    // Logga solo una parte se la risposta è molto grande
    // console.log('Risposta ricevuta dalla BCE (struttura iniziale):', JSON.stringify(result).substring(0, 500));

    // Estrazione dati (con controlli più robusti per undefined)
    const dataSet = result?.dataSets?.[0];
    const series = dataSet?.series; // series è un oggetto, non array
    const structure = result?.structure;
    const currenciesDimension = structure?.dimensions?.series?.find((dim: { id: string; }) => dim.id === 'CURRENCY'); // Trova la dimensione CURRENCY
    const timeDimension = structure?.dimensions?.observation?.find((dim: { id: string; }) => dim.id === 'TIME_PERIOD'); // Trova la dimensione TIME_PERIOD

    const currencyValues = currenciesDimension?.values || []; // Array di { id: 'USD', name: 'US dollar'}
    const timeValues = timeDimension?.values || []; // Array di { id: '2024-04-08', name: '2024-04-08'}

    if (!series || !currencyValues.length || !timeValues.length) {
        console.error("Struttura dati BCE inattesa o mancante.");
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
                        value: latestValue
                    });
                } else {
                    console.warn(`Valuta non trovata per indice ${currencyIndex} nella chiave ${key}`);
                }
            }
        }
    }
     console.log(`Trovati ${latestRates.length} tassi di cambio più recenti.`);
    return latestRates;
}


// --- Handler per la rotta API GET mper il cronjob ---
export async function GET(event: APIEvent) {
    try {

        const latestRates = await fetchLatestECBRates();

        return latestRates;

    } catch (error: any) {
        console.error('Errore API /api/exchange-rates:', error.response ? error.response.data : error.message);

        const errorMessage = 'Errore nel recupero dei dati dalla BCE';
        return new Response(JSON.stringify({ error: errorMessage, details: error.message }), { // Includi più dettagli se utile (ma attento in prod)
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function updateExchangeRatesInDB() {
  'use server';
  console.log("Inizio aggiornamento tassi di cambio nel DB...");
  try {
      const latestRates = await fetchLatestECBRates();

      if (!latestRates || latestRates.length === 0) {
          console.log("Nessun tasso ricevuto dalla BCE, nessun aggiornamento del DB.");
          return;
      }

      console.log(`Aggiornamento/Inserimento di ${latestRates.length} tassi...`);
      for (const rate of latestRates) {
          await db.query(
             `INSERT INTO exchange_rates (currency_code, currency_name, rate, observation_date, updated_at)
              VALUES ($1, $2, $3, $4, NOW())
              ON CONFLICT (currency_code) DO UPDATE SET
                currency_name = EXCLUDED.currency_name,
                rate = EXCLUDED.rate,
                observation_date = EXCLUDED.observation_date,
                updated_at = NOW();`,
             [rate.currency, rate.currencyName, rate.value, rate.date]
          );

      }
      console.log("Aggiornamento tassi di cambio nel DB completato.");

  } catch (error) {
      console.error("Errore durante l'aggiornamento dei tassi nel DB:", error);

  }
}

// Restituisce il tasso (number) o null se non trovato/errore non gestito
export async function getExchangeRate(currencyCode: string): Promise<number | null> {
    'use server';
  
    // Se la valuta richiesta è EUR (la base), il tasso è 1
    if (!currencyCode || currencyCode.toUpperCase() === 'EUR') {
       console.log(`[getExchangeRate] Tasso per EUR richiesto, restituisco 1.`);
       return 1;
    }
  
    console.log(`[getExchangeRate] Recupero tasso per ${currencyCode}...`);
    try {
      const result = await db.query<{ rate: number }>( // Aggiungi tipo per la riga restituita
        `SELECT rate FROM exchange_rates WHERE currency_code = $1 ORDER BY observation_date DESC LIMIT 1`,
        [currencyCode.toUpperCase()] // Usa UpperCase per consistenza?
      );
  
      if (result.rows.length > 0) {
        const rate = result.rows[0].rate;
        console.log(`[getExchangeRate] Tasso trovato per ${currencyCode}: ${rate}`);
        return rate; // <-- RESTITUISCI IL VALORE!
      } else {
        console.warn(`[getExchangeRate] Tasso non trovato nel DB per ${currencyCode}. Restituisco null.`);
        return null; // Tasso non trovato
      }
    } catch (error) {
      console.error(`[getExchangeRate] Errore recupero tasso per ${currencyCode}:`, error);
      // Rilancia l'errore così createResource può metterlo in .error
      throw new Error(`Errore DB recupero tasso per ${currencyCode}`);
    }
  }


  /**
 * Calcola il tasso di cambio tra due valute (From -> To)
 * utilizzando i tassi memorizzati nel database relativi all'EUR.
 * @param fromCurrencyCode Codice ISO della valuta di partenza (es. 'USD')
 * @param toCurrencyCode Codice ISO della valuta di destinazione (es. 'GBP')
 * @returns Promise<number | null> Il tasso di cambio (quanti 'toCurrency' per 1 'fromCurrency'),
 * o null se uno dei tassi necessari non è disponibile o in caso di errore.
 */
export async function getConversionRate(fromCurrencyCode: string, toCurrencyCode: string): Promise<number | null> {
    'use server'; // Necessario per le server functions
  
    // Normalizza i codici valuta in maiuscolo per consistenza
    const fromCode = fromCurrencyCode.toUpperCase();
    const toCode = toCurrencyCode.toUpperCase();
  
    console.log(`[getConversionRate] Richiesto tasso da ${fromCode} a ${toCode}`);
  
    // --- Caso Banale: Stessa valuta ---
    if (fromCode === toCode) {
      console.log(`[getConversionRate] Stessa valuta (${fromCode}), tasso restituito: 1`);
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
  
      console.log(`[getConversionRate] Tasso DB (EUR -> ${fromCode}): ${rateEurToFrom}`);
      console.log(`[getConversionRate] Tasso DB (EUR -> ${toCode}): ${rateEurToTo}`);
  
      // --- Calcola il tasso di conversione richiesto ---
  
      // Verifica se i tassi necessari sono stati trovati nel DB
      if (rateEurToFrom === null || rateEurToTo === null) {
         console.warn(`[getConversionRate] Impossibile calcolare ${fromCode} -> ${toCode}. Tasso EUR->${fromCode} (${rateEurToFrom}) o EUR->${toCode} (${rateEurToTo}) mancante.`);
         return null; // Se manca uno dei tassi base, non possiamo calcolare
      }
  
      // Gestione divisione per zero (improbabile con tassi di cambio, ma per sicurezza)
      if (rateEurToFrom === 0) {
         console.error(`[getConversionRate] Impossibile calcolare ${fromCode} -> ${toCode}. Tasso EUR->${fromCode} è zero.`);
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
  
      console.log(`[getConversionRate] Tasso calcolato ${fromCode} -> ${toCode}: ${rateEurToTo} / ${rateEurToFrom} = ${finalConversionRate}`);
      return finalConversionRate;
  
    } catch (error) {
      // Cattura eventuali errori lanciati da getExchangeRate o altri problemi
      console.error(`[getConversionRate] Errore durante calcolo tasso ${fromCode} -> ${toCode}:`, error);
      // Potresti rilanciare l'errore o restituire null per indicare fallimento
      // throw new Error(`Errore calcolo tasso ${fromCode}->${toCode}`);
      return null;
    }
  }




 // TIPO CORRETTO per la riga letta dal DB (usa 'currency')
type WalletInfoForTotal = {
    id: number;
    balance: number; // Non nullo per via della clausola WHERE nel SQL
    currency: string; // Non nullo per via della clausola WHERE nel SQL. Corrisponde a DDL.
  };
  
  // Tipo per il risultato finale (invariato)
  export type ConvertedTotalResult = {
    total_balance: number;
    currency_code: string; // Valuta TARGET
    warnings?: string[];
  };
  
  /**
   * Calcola il saldo totale di tutti i wallet all'interno di una gerarchia di container,
   * convertendo ogni saldo in una valuta target specificata.
   * @param containerId ID del container di partenza (null per la root).
   * @param targetCurrencyCode Codice ISO della valuta target (es. 'EUR').
   * @param userId ID dell'utente proprietario dei wallet.
   * @returns Promise<ConvertedTotalResult> Oggetto con saldo totale e valuta, o lancia un errore.
   */
  export async function calculateConvertedTotal(
    containerId: number | null,
    targetCurrencyCode: string,
    userId: number
  ): Promise<ConvertedTotalResult> {
    'use server';
  
    const targetCode = targetCurrencyCode.toUpperCase();
    console.log(`[calculateConvertedTotal] Inizio per container ${containerId ?? 'ROOT'} -> ${targetCode}, user ${userId}`);
    let totalInTargetCurrency = 0;
    const warnings: string[] = [];
  
    try {
      const sql = `
        WITH RECURSIVE WalletHierarchy AS (
          -- Membro ancora: usa 'currency'
          SELECT id, balance, currency, type, container_id
          FROM public.wallets
          WHERE user_id = $1 AND ${containerId === null ? 'container_id IS NULL' : 'container_id = $2'}
  
          UNION ALL
  
          -- Membro ricorsivo: usa 'currency'
          SELECT w.id, w.balance, w.currency, w.type, w.container_id
          FROM public.wallets w
          JOIN WalletHierarchy wh ON w.container_id = wh.id
          WHERE w.user_id = $1
        )
        -- Seleziona: usa 'currency' e filtra per 'currency' non nullo
        SELECT id, balance, currency
        FROM WalletHierarchy
        WHERE type = 'wallet' AND balance IS NOT NULL AND currency IS NOT NULL;`; // Filtra 'currency IS NOT NULL'
  
      const params = containerId === null ? [userId] : [userId, containerId];
      // Usa il tipo corretto WalletInfoForTotal
      const walletResult = await db.query<WalletInfoForTotal>(sql, params);
      const walletsInHierarchy = walletResult.rows;
  
      console.log(`[calculateConvertedTotal] Trovati ${walletsInHierarchy.length} wallet nella gerarchia con saldo e valuta.`);
  
      if (walletsInHierarchy.length === 0) {
        return { total_balance: 0, currency_code: targetCode };
      }
  
      // 2. Ottimizzazione tassi - Usa 'currency'
      const uniqueCurrenciesToConvert = [
          ...new Set(
              // Usa w.currency
              walletsInHierarchy.map(w => w.currency.toUpperCase())
                                .filter(code => code !== targetCode)
          )
      ];
  
      // 3. Recupera tassi (logica invariata)
      const rateMap = new Map<string, number | null>();
       if (uniqueCurrenciesToConvert.length > 0) {
           console.log(`[calculateConvertedTotal] Recupero tassi per: ${uniqueCurrenciesToConvert.join(', ')} -> ${targetCode}`);
           const ratePromises = uniqueCurrenciesToConvert.map(fromCode => getConversionRate(fromCode, targetCode));
           const rates = await Promise.all(ratePromises);
           uniqueCurrenciesToConvert.forEach((fromCode, index) => {
               const rate = rates[index];
               rateMap.set(fromCode, rate);
               if (rate === null) {
                  const warningMsg = `Tasso di cambio non trovato per ${fromCode} -> ${targetCode}. I saldi in ${fromCode} verranno ignorati.`;
                  warnings.push(warningMsg);
                  console.warn(`[calculateConvertedTotal] ${warningMsg}`);
               }
           });
       }
       rateMap.set(targetCode, 1);
  
      // 4. Itera, converti e somma - Usa 'currency'
      for (const wallet of walletsInHierarchy) {
        const balance = wallet.balance;
        const fromCode = wallet.currency.toUpperCase(); // Usa wallet.currency
  
        const conversionRate = rateMap.get(fromCode);
  
        if (conversionRate !== null && conversionRate !== undefined) {
          totalInTargetCurrency += balance * conversionRate;
        } else {
          // Warning già aggiunto durante il fetch dei tassi
          console.warn(`[calculateConvertedTotal] Salto wallet ${wallet.id} (${balance} ${fromCode}) per tasso mancante.`);
        }
      }
  
      console.log(`[calculateConvertedTotal] Calcolo completato. Totale in ${targetCode}: ${totalInTargetCurrency}`);
      return {
         total_balance: totalInTargetCurrency,
         currency_code: targetCode, // Restituisce la valuta target
         warnings: warnings.length > 0 ? warnings : undefined
      };
  
    } catch (error) {
      console.error(`[calculateConvertedTotal] Errore critico per container ${containerId ?? 'ROOT'} in ${targetCode}, user ${userId}:`, error);
       throw new Error(`Errore nel calcolo del totale convertito per container ${containerId ?? 'ROOT'}. Dettagli: ${error instanceof Error ? error.message : String(error)}`);
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
    console.warn(`[convertBalance] Ricevuto balance non valido o mancante: ${balance}. Restituisco null.`);
    return null;
  }
  // Considera se 0 è un balance valido (probabilmente sì)

  if (!fromCurrencyCode || !toCurrencyCode) {
    console.warn(`[convertBalance] Ricevuto fromCurrencyCode (${fromCurrencyCode}) o toCurrencyCode (${toCurrencyCode}) mancante. Restituisco null.`);
    return null;
  }

  // Normalizza i codici valuta
  const fromCode = fromCurrencyCode.toUpperCase();
  const toCode = toCurrencyCode.toUpperCase();

  console.log(`[convertBalance] Richiesta conversione: ${balance} ${fromCode} -> ${toCode}`);

  // --- Caso Semplice: Stessa valuta ---
  if (fromCode === toCode) {
    console.log(`[convertBalance] Valute identiche (${fromCode}). Restituisco balance originale: ${balance}`);
    return balance;
  }

  try {
    // --- Ottieni il Tasso di Conversione ---
    // Chiama la funzione che calcola il tasso (1 unità di fromCode = X unità di toCode)
    const conversionRate = await getConversionRate(fromCode, toCode);

    // --- Gestisci Tasso Non Trovato ---
    if (conversionRate === null) {
      // getConversionRate logga già il warning internamente
      console.warn(`[convertBalance] Tasso da ${fromCode} a ${toCode} non disponibile. Impossibile convertire.`);
      return null; // Indica che la conversione non è possibile
    }

    // --- Esegui la Conversione ---
    const convertedAmount = balance * conversionRate;
    console.log(`[convertBalance] Convertito: ${balance} ${fromCode} * ${conversionRate} = ${convertedAmount.toFixed(4)} ${toCode}`); // Log con più decimali per precisione

    // Restituisci il valore numerico convertito
    return convertedAmount;

  } catch (error) {
    // Gestisci eventuali errori lanciati da getConversionRate
    console.error(`[convertBalance] Errore durante la conversione di ${balance} ${fromCode} a ${toCode}:`, error);
    return null; // Indica fallimento restituendo null
  }
}
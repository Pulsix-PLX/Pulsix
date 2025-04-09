
import type { APIEvent } from "@solidjs/start/server";
import axios from 'axios';
import { db } from "~/Server/db.server";

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
    const currenciesDimension = structure?.dimensions?.series?.find(dim => dim.id === 'CURRENCY'); // Trova la dimensione CURRENCY
    const timeDimension = structure?.dimensions?.observation?.find(dim => dim.id === 'TIME_PERIOD'); // Trova la dimensione TIME_PERIOD

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

export async function Get() {
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
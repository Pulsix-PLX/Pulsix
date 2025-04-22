import { createStore } from "solid-js/store";


export type stepType = 'upload' | 'preview' | 'mapping' | 'complete';
export interface dataType {
  headers: string[];
  rows: any[];
  length: number;
}
interface contextType {
  step: stepType;
  walletId:number | null;
  data: dataType | null;
  originalData: dataType | null; 
  history: any[][];           
  mappingResult: Record<string, string> | null;
  errorMessage: string | null;
}


///--- CONTEXT ---///
export const [context, setContext] = createStore<contextType>({
  step: 'upload',
  walletId:null,
  data: null, //actual headers & rows
  originalData: null, //original headers & rows
  history: [],
  mappingResult: null,
  errorMessage: null
});


/// reset context ///
export function reset() {
  console.log("CONTEXT ACTION: reset totale.");
  setContext({
    step: 'upload',
    walletId:null,
    data: null,
    originalData: null,
    history: [],
    mappingResult: null,
    errorMessage: null
  });
}


/// Import headers & rows from csv (uploadFile --> preview) ///
export function initializeData(data: { headers: string[]; rows: any[] }, walletId:number) {
  console.log("CONTEXT ACTION: initializeFileData");
  const deepCopiedRows = data.rows.map(row => ({ ...row }));
  const headers = [...data.headers, "PulsixCategory", "PulsixSubCategory"]; // Add extra headers
  setContext("data", { headers: headers, rows: deepCopiedRows, length: data.rows.length });
  setContext("originalData", { headers: headers, rows: deepCopiedRows, length: data.rows.length }); // Salva copia originale
  setContext("history", []);
  setStep('preview');
  setContext("walletId", walletId);
  setContext("errorMessage", null);
  setContext("mappingResult", null);
  logContext()
}




/// Console.log context ///
export function logContext() {
  console.log("CONTEXT ACTION: logContext ->", context);
}


/// Set Step ///
export function setStep(step: stepType) {
  console.log(`CONTEXT ACTION: setCurrentStep -> ${step}`);
  setContext("step", step);
}

/// Set Error Message ///
export function setError(message: string | null) {
  console.log(`CONTEXT ACTION: setErrorMessage -> ${message}`);
  setContext("errorMessage", message);
}


const MAX_HISTORY_SIZE = 150; // Esempio: limita la history agli ultimi 50 cambiamenti

export function updateRowsWithHistory(newData: any[]) {
  // 1. Ottieni lo stato attuale delle righe PRIMA dell'aggiornamento.
  //    Questo è lo stato che vogliamo salvare nella history.
  const previousRows = context.data?.rows;

  // Controllo di sicurezza: non dovremmo poter modificare se non ci sono dati iniziali.
  if (!previousRows) {
    console.error("CONTEXT ACTION (updateRowsWithHistory): Tentativo di aggiornare la history ma context.data.rows non è definito.");
    // Potresti voler impostare un errore o semplicemente aggiornare i dati senza history.
    // Per ora, aggiorniamo solo i dati principali.
    setContext('data', 'rows', newData);
    setContext('data', 'length', newData.length); // Aggiorna anche la lunghezza
    return;
  }

  // 2. Crea una copia profonda dello stato precedente da mettere nella history.
  //    Questo è FONDAMENTALE per evitare che modifiche future a `context.data.rows`
  //    influenzino retroattivamente lo snapshot salvato nella history.
  const previousRowsSnapshot = previousRows.map(row => ({ ...row }));

  // 3. Aggiungi la copia dello stato *precedente* alla history attuale.
  const currentHistory = context.history;
  let nextHistory = [...currentHistory, previousRowsSnapshot]; // Aggiungi il vecchio stato

  // 4. [Opzionale] Applica il limite alla dimensione della history.
  if (nextHistory.length > MAX_HISTORY_SIZE) {
    // Rimuove lo stato più vecchio (il primo elemento dell'array) per fare spazio.
    nextHistory = nextHistory.slice(nextHistory.length - MAX_HISTORY_SIZE);
    // Puoi anche usare nextHistory.slice(1) se vuoi rimuovere solo il primo
    console.log(`CONTEXT ACTION (updateRowsWithHistory): Limite history (${MAX_HISTORY_SIZE}) raggiunto. Stato più vecchio rimosso.`);
  }

  console.log(`CONTEXT ACTION (updateRowsWithHistory): Stato precedente salvato. Dimensione History: ${nextHistory.length}`);

  // 5. Aggiorna lo store di SolidJS con la nuova history e le nuove righe.
  //    Aggiorniamo prima la history, poi i dati attuali.
  setContext('history', nextHistory);
  setContext('data', 'rows', newData);
  setContext('data', 'length', newData.length); // Aggiorna anche la lunghezza

  // Opzionale: Logga lo stato del context dopo l'aggiornamento per debug
  // logContext(); // Se hai una funzione logContext()
}





export function undoLastChange() {
  console.log("CONTEXT ACTION: undoLastChange. Dimensione storico:", context.history.length);
  const currentHistory = context.history; // Leggi lo stato corrente
  if (currentHistory.length > 0) {
    const lastRowsState = currentHistory[currentHistory.length - 1]; // Prende l'ultimo

    // 1. Ripristina le righe
    if (context.data && lastRowsState) {
        setContext("data", "rows", lastRowsState);
        setContext("data", "length", lastRowsState.length); // Aggiorna lunghezza
    } else {
        console.error("CONTEXT ERROR: Impossibile fare Undo perché data è null.");
    }

    // 2. Aggiorna lo storico rimuovendo l'ultimo elemento
    setContext("history", currentHistory.slice(0, -1));
    console.log("CONTEXT: Undo completato. Dimensione storico:", context.history.length);

  } else {
      console.log("CONTEXT: Nessuna modifica da annullare.");
  }
}



// Return to original data
export function setOriginalData() {
  console.log("CONTEXT ACTION: setOriginalData");
  if (context.originalData) {
    const deepCopiedRows = context.originalData.rows.map(row => ({ ...row }));
    setContext("data", { 
      headers: context.originalData.headers, 
      rows: deepCopiedRows, 
      length: context.originalData.rows.length 
    });
    console.log("Original data has been set to data.");
  } else {
    console.error("CONTEXT ACTION: No originalData available to set to data.");
  }
}
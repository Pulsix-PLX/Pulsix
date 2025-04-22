
import { reconcile } from "solid-js/store"; // Solo reconcile, produce non serve più qui
import { createStore } from "solid-js/store";

// Interfacce FileData, StepType, CsvState (invariate dalla tua ultima versione con any[])
export interface FileData {
  headers: string[];
  rows: any[];
  length: number;
}

export type StepType = 'upload' | 'preview' | 'mapping' | 'complete';
interface CsvState {
  currentStep: StepType;
  fileData: FileData | null;
  originalRows: any[] | null; // Tipo semplificato
  history: any[][];           // Tipo semplificato
  mappingResult: Record<string, string> | null;
  errorMessage: string | null;
}

// Store (invariato)
export const [csvState, setCsvState] = createStore<CsvState>({
  currentStep: 'upload',
  fileData: null, //actual headers & rows
  originalRows: null,
  history: [],
  mappingResult: null,
  errorMessage: null
});

// --- FUNZIONI HELPER CORRETTE ---

export function setCurrentStep(step: StepType) {
  console.log(`STORE ACTION: setCurrentStep -> ${step}`);
  setCsvState("currentStep", step);
}

// Inizializzazione file (può ancora usare produce o set individuali)
export function initializeFileData(data: { headers: string[]; rows: any[] }) {
  console.log("STORE ACTION: initializeFileData");
  // Usiamo chiamate separate a setCsvState per coerenza
  const deepCopiedRows = data.rows.map(row => ({ ...row }));
  setCsvState("fileData", { headers: data.headers, rows: deepCopiedRows, length: data.rows.length });
  setCsvState("originalRows", deepCopiedRows); // Salva copia originale
  setCsvState("history", []); // Resetta storico
  setCsvState("currentStep", 'preview');
  setCsvState("errorMessage", null);
  setCsvState("mappingResult", null);
}

// Aggiorna righe e storico (SENZA produce)
export function updateRowsWithHistory(newRows: any[]) {
    console.log("STORE ACTION: updateRowsWithHistory");
    if (!csvState.fileData || !csvState.fileData.rows) {
        console.error("STORE ERROR: updateRowsWithHistory chiamato senza fileData.rows.");
        return;
    }

    const currentRowsSnapshot = csvState.fileData.rows.map(r => ({...r})); // Snapshot PRIMA di modificare

    // 1. Aggiorna lo storico
    setCsvState("history", prevHistory => [...prevHistory, currentRowsSnapshot]);
    console.log(`STORE: Snapshot aggiunto. Dimensione storico: ${csvState.history.length}`);

    // 2. Aggiorna le righe usando reconcile
    setCsvState("fileData", "rows", reconcile(newRows, { merge: true }));
    // 3. Aggiorna la lunghezza (se la usi ancora)
    setCsvState("fileData", "length", newRows.length);
    console.log("STORE: fileData.rows aggiornato.");
}


// Annulla l'ultima modifica (SENZA produce)
export function undoLastChange() {
  console.log("STORE ACTION: undoLastChange. Dimensione storico:", csvState.history.length);
  const currentHistory = csvState.history; // Leggi lo stato corrente
  if (currentHistory.length > 0) {
    const lastRowsState = currentHistory[currentHistory.length - 1]; // Prende l'ultimo

    // 1. Ripristina le righe usando reconcile
    // Verifica che fileData esista prima di tentare di aggiornare le sue rows
    if (csvState.fileData && lastRowsState) {
        setCsvState("fileData", "rows", reconcile(lastRowsState, { merge: true }));
        setCsvState("fileData", "length", lastRowsState.length); // Aggiorna lunghezza
    } else {
        console.error("STORE ERROR: Impossibile fare Undo perché fileData è null.");
    }

    // 2. Aggiorna lo storico rimuovendo l'ultimo elemento
    setCsvState("history", prevHistory => prevHistory.slice(0, -1));
    console.log("STORE: Undo completato. Dimensione storico:", csvState.history.length);

  } else {
      console.log("STORE: Nessuna modifica da annullare.");
  }
}

// Resetta ai dati originali (SENZA produce)
export function resetDataToOriginal() {
   console.log("STORE ACTION: resetDataToOriginal.");
   const originalData = csvState.originalRows; // Leggi stato corrente
   if (!originalData) {
       console.error("STORE ERROR: Reset fallito. Dati originali non disponibili.");
       return;
   }
   if (csvState.history.length === 0) {
       console.log("STORE: Nessuna modifica registrata da resettare.");
       return;
   }

   console.log(`STORE: Reset in corso. Ripristino ${originalData.length} righe.`);

   // 1. Ripristina le righe usando reconcile
   // Verifica fileData prima di aggiornare rows
   if (csvState.fileData) {
        setCsvState("fileData", "rows", reconcile(originalData as any[], { merge: true }));
        setCsvState("fileData", "length", originalData.length); // Aggiorna lunghezza
   } else {
        // Se fileData era null, potremmo volerlo ricreare? O dare errore?
        // Per ora, resettiamo solo se fileData esiste.
        console.error("STORE ERROR: Impossibile resettare perché fileData è null.");
        return; // O potresti ricreare fileData qui se ha senso nel tuo flusso
   }

   // 2. Svuota lo storico
   setCsvState("history", []);
   console.log("STORE: Reset completato.");
}

// Imposta risultato mappatura
export function setMappingResult(result: Record<string, string>) {
  console.log("STORE ACTION: setMappingResult");
  setCsvState("mappingResult", result);
}

// Imposta messaggio errore
export function setErrorMessage(message: string | null) {
  console.log(`STORE ACTION: setErrorMessage -> ${message}`);
  setCsvState("errorMessage", message);
}

export function resetProcess() {
  console.log("STORE ACTION: resetProcess totale.");
  // Usa set individuali o sovrascrivi l'intero oggetto store
  setCsvState({
    currentStep: 'upload',
    fileData: null,
    originalRows: null,
    history: [],
    mappingResult: null,
    errorMessage: null
  });
}
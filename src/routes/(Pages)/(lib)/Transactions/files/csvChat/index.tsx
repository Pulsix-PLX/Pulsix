// Percorso Esempio: src/routes/uploadCsv.tsx (o dove si trova il tuo componente principale)

import { For, Show, createMemo } from 'solid-js'; // createMemo per hasChanges
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle'; // Adatta percorso

// --- USA IL NUOVO COMPONENTE PREVIEW ---
import CsvPreviewContextualized from './preview'; 
// ---------------------------------------

import ColumnMapping from './mapper'; 
import { authStore } from '~/GlobalStores/auth'; 
import { setShowMenu } from '~/components/Menus/Menu'; 
import UploadFile from './uploadFile'; 

// --- Importa TUTTO il necessario dal contesto ---
import {
  csvState,
  setMappingResult, 
  resetProcess, 
  setCurrentStep, 
  undoLastChange, 
  resetDataToOriginal,
  setErrorMessage, 
} from './context'; 
import PathWallets from '../../utils/pathWallets';


export default function uploadCsv() {

  setShowMenu(false);

  const hasChanges = createMemo(() => (csvState.history?.length || 0) > 0);

  // Funzione per tornare alla preview dal mapping (ok)
  function backToPreview() {
    setCurrentStep('preview');
  }


  async function handleMappingComplete(
    mappingData: Record<string, string>,
    transactionTypeLogic:any // Ricevi anche la logica
  ) {
    console.log("MAP COMPLETE: Ricevuti mapping e logic", mappingData, transactionTypeLogic); // Log
    // Assicurati che i dati esistano ancora nello stato
    if (!csvState.fileData || !csvState.fileData.rows) {
        console.error("Errore critico: fileData non disponibile al momento dell'import finale.");
        setErrorMessage("Errore: Dati del file non trovati per l'importazione finale."); // Usa la tua funzione di errore
        return;
    }

    try {
      // 1. Salva il risultato della mappatura nel contesto (opzionale, se ti serve)
      setMappingResult(mappingData); // Forse non serve più se invii tutto ora

      // 2. Prepara il payload per l'API di importazione finale
      const payload = {
        rowsToImport: csvState.fileData.rows, // Le righe potenzialmente modificate
        columnMapping: mappingData,           // La mappatura definita dall'utente
        transactionTypeLogic: transactionTypeLogic // La logica Entrata/Uscita definita
        // Aggiungi altri dati se necessari (es. walletId target se non mappato, user info, etc.)
      };
      console.log("MAP COMPLETE: Invio payload finale all'API:", payload); // Log

      // 3. Esegui la chiamata API per l'importazione finale dei dati
      // Sostituisci l'endpoint con quello corretto
      const response = await authStore.api.post(
        // Questo era l'endpoint che avevi commentato, adattalo se necessario
        'API/Wallets/Wallet/addTransactionByFile/importMappedData',
        payload // Invia righe, mappatura e logica
      );

      console.log("MAP COMPLETE: Risposta API importazione finale:", response); // Log

      // Verifica la risposta dell'API se necessario
      if (response.status === 200 || response.status === 201) { // O altri codici di successo
            // 4. SOLO SE L'IMPORTAZIONE API VA A BUON FINE, passa allo step finale
            setCurrentStep('complete');
      } else {
           // Gestisci risposta API non riuscita
            console.error("Importazione fallita:", response);
             // Usa setErrorMessage con un messaggio specifico dalla risposta API se disponibile
            setErrorMessage(response.data?.message || "Errore sconosciuto durante l'importazione finale.");
      }

    } catch (error: any) {
      console.error("Errore durante l'invio/importazione dei dati finali:", error);
      // Usa setErrorMessage con un messaggio dall'errore
      setErrorMessage(error.response?.data?.message || error.message || "Errore di rete o del server durante l'importazione finale.");
    }
}

  return (
    <div class="container mx-auto p-4">
     
      {/* === NUOVO: Pulsanti Undo/Reset globali per lo step Preview === */}
      <Show when={csvState.currentStep === 'preview'}>
        <div class="my-4 flex justify-start space-x-2">
          <button
            class="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={resetDataToOriginal} 
            disabled={!hasChanges()}
            title="Annulla tutte le modifiche fatte nella tabella"
          >
            Resetta Modifiche Tabella
          </button>
          <button
            class="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={undoLastChange} 
            disabled={!hasChanges()}
            title="Annulla l'ultima modifica fatta nella tabella"
          >
            Annulla Ultima Modifica
          </button>
        </div>
      </Show>
      {/* =========================================================== */}
      {/* Step 1: Upload del file */}
      <Show when={csvState.currentStep === 'upload'}>
        {/* Assicurati che UploadFile chiami initializeFileData la prima volta! */}
        <UploadFile />
        <div class='mt-300'>
          <PathWallets/>
        </div>
      </Show>
      {/* Step 2: Preview del file */}
      <Show when={csvState.currentStep === 'preview' && csvState.fileData}>
        {/* Usa il componente contestualizzato */}
        <CsvPreviewContextualized
          headers={csvState.fileData?.headers || []}
          rows={csvState.fileData?.rows || []} // Passa le righe CORRENTI dal contesto
          tableHeight={600}
          tableWidth="100%" 
          rowHeight={48}
          cellPadding="py-3 px-4"
        />
      </Show>

      {/* Step 3: Mapping */}
      <Show when={csvState.currentStep === 'mapping'}>
           {/* Considera se mostrare Undo/Reset anche qui */}
           <ColumnMapping
               csvHeaders={csvState.fileData?.headers || []} 
               onMappingComplete={handleMappingComplete}
               onCancel={backToPreview}
               rows={csvState.fileData?.rows || []}
           />
            <div class="mt-4 flex justify-between">
                 <button onClick={backToPreview} class="px-4 py-2 bg-gray-200 rounded">Indietro</button>
                 {/* Bottone per confermare mappatura */}
              
            </div>
      </Show>
      {/* Step 4: Complete */}
      <Show when={csvState.currentStep === 'complete'}>
        <div>
          <h2 class="text-2xl font-bold text-green-600">Importazione Completata!</h2>
          {/* Bottone per ricominciare */}
          <button
            onClick={resetProcess}
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Inizia Nuovo Import
          </button>
        </div>
      </Show>
      {/* Mostra Errori (Opzionale) */}
      <Show when={csvState.errorMessage}>
        <div class="mt-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
          <strong>Errore:</strong> {csvState.errorMessage}
        </div>
      </Show>
    </div>
  );
}

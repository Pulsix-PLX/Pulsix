// uploadFile.tsx
import { createMemo, createSignal, Show } from 'solid-js';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';
import { authStore } from '~/GlobalStores/auth';
import { setCurrentStep, initializeFileData , setErrorMessage, csvState } from './context';

export default function UploadFile() {
  const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
  const isSubmitDisabled = createMemo(() => !selectedFile());
  let fileInputRef: HTMLInputElement | undefined;

  /// 1. Check upload file extension ///
  function handleFileChange(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0]; // Prende il primo file selezionato

    if (file) {
      // Controlla se il nome del file termina con .csv (ignorando maiuscole/minuscole)
      if (file.name.toLowerCase().endsWith('.csv')) {
        setSelectedFile(file);
        setErrorMessage(null);
      } else {
        // Il file NON è un CSV, resetta lo stato e mostra un errore
        setSelectedFile(null);
        setErrorMessage(
          'Errore: Il file selezionato non è un CSV. Per favore, scegli un file con estensione .csv.'
        );
        if (fileInputRef) {
          fileInputRef.value = '';
        }
      }
    } else {
      setSelectedFile(null);
      setErrorMessage(null);
    }
  }

  /// 2. Upload file ///
  // Dentro la funzione sendFile
async function sendFile(e: Event) {
  e.preventDefault();
  const file = selectedFile();
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await authStore.api.post(
      'API/Wallets/Wallet/addTransactionByFile/uploadFile',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    // --- MODIFICA QUI ---
    // Verifica che la risposta contenga headers e rows
    if (res.data && Array.isArray(res.data.headers) && Array.isArray(res.data.rows)) {
        // Chiama la NUOVA funzione per inizializzare lo stato
        initializeFileData({ headers: res.data.headers, rows: res.data.rows });
        // setCurrentStep('preview') viene già chiamato dentro initializeFileData (se l'hai lasciata così)
        // quindi potresti poter rimuovere la riga qui sotto, verifica il tuo csvStore.ts
        // setCurrentStep('preview');

        console.log("File caricato e stato inizializzato. Step attuale:", csvState.currentStep);
    } else {
        // Se manca headers o rows, gestisci l'errore
        console.error('Risposta API non contiene headers o rows validi:', res.data);
        setErrorMessage('Risposta dal server non valida o malformata (mancano headers/rows).');
    }
    // --- FINE MODIFICA ---

  } catch (error: any) {
    console.error(error);
    setErrorMessage("Errore durante l'upload: " + error.message);
  }
}
  return (
    <>
      <div class="CM">
        <h1>Carica Estratto Conto (CSV)</h1>

        {/* Step 1: Upload del file */}
        <form enctype="multipart/form-data" onSubmit={sendFile}>
          <div>
            <label for="csv-file-input" class="text-white">
              Seleziona file CSV:
            </label>
            <input
              ref={fileInputRef}
              id="csv-file-input"
              type="file"
              name="csv"
              accept=".csv"
              required
              onChange={handleFileChange}
            />
          </div>

          <ButtonSparkle type="submit" disabled={isSubmitDisabled()} text="Submit file" />
        </form>

        <Show when={csvState.errorMessage}>
          <p style={{ color: 'red', 'margin-top': '10px' }}>{csvState.errorMessage}</p>
        </Show>
      </div>
    </>
  );
}

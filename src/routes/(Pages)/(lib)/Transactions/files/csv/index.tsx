import { createMemo, createSignal, Show } from 'solid-js';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';
import CsvPreview from './preview';
import { authStore } from '~/GlobalStores/auth';

export default function uploadCsv() {
  const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
  const isSubmitDisabled = createMemo(() => !selectedFile());

  const [errorMessage, setErrorMessage] = createSignal<string | null>(null);

  let fileInputRef: HTMLInputElement | undefined;

  /// Check upload file extention ///
  const handleFileChange = (event: Event) => {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0]; // Prende il primo file selezionato

    if (file) {
      // Controlla se il nome del file termina con .csv (ignorando maiuscole/minuscole)
      if (file.name.toLowerCase().endsWith('.csv')) {
        // Il file è un CSV, aggiorna lo stato e pulisci eventuali errori
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
  };
  /// 1. send file ///
  interface fileData {
    headers: string[];
    rows: any[];
    lenght: number;
  }
  const [fileData, setFileData] = createSignal<any>();

  async function sendFile(e:Event) {
    e.preventDefault();
    
    const file = selectedFile();
    if (!file) {
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await authStore.api.post(
        'API/Wallets/Wallet/addTransactionByFile/uploadFile', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      
      // Verifica che i dati contengano tutte le proprietà necessarie
    if (res.data && res.data.headers && res.data.rows && typeof res.data.length === 'number') {
      setFileData(res.data);
      setPreview(true);
    } else {
      // Se manca qualche proprietà necessaria, gestisci l'errore
      console.error("Risposta API incompleta:", res.data);
      setErrorMessage("Risposta dal server incompleta o malformata");
    }
      setFileData(res.data);
      setPreview(true);
    } catch (error:any) {
      console.error(error);
      setErrorMessage("Errore durante l'upload: " + error.message);
    }
  }

  /// 2. preview file ///
  const [preview, setPreview] = createSignal<boolean>(false);

  return (
    <div class="CM">
      <h1>Carica Estratto Conto (CSV)</h1>

      {/* Il form invierà i dati all'action specificata SOLO se il submit non viene bloccato */}
      <form enctype="multipart/form-data" onSubmit={sendFile}>
        <div>
          {/* Associamo la label all'input tramite id e for per accessibilità */}
          <label for="csv-file-input" class="text-white">
            Seleziona file CSV:
          </label>
          <input
            ref={fileInputRef} // Collega il riferimento all'elemento input
            id="csv-file-input"
            type="file"
            name="csv" // Il nome 'csv' verrà usato sul server per recuperare il file
            accept=".csv" // Suggerimento per il browser
            required
            onChange={handleFileChange}
          />
        </div>

        {/* Mostra il messaggio di errore solo se presente */}
        <Show when={errorMessage()}>
          <p style={{ color: 'red', 'margin-top': '10px' }}>{errorMessage()}</p>
        </Show>

        <ButtonSparkle type="submit" disabled={isSubmitDisabled()} text="Submit file" />
      </form>

      <Show when={preview() && fileData()}>
      <CsvPreview
  headers={fileData().headers}
  rows={fileData().rows}
  totalRows={fileData().length}
  tableHeight={800}     // Puoi specificare un'altezza personalizzata qui (default: 800px)
  tableWidth="1200px"     // Puoi specificare una larghezza personalizzata (default: 100%)
  rowHeight={48}        // Altezza di ogni riga in pixel (default: 48px)
  cellPadding="py-3 px-4" // Padding interno celle (default: "py-3 px-4")
/>
      </Show>
    </div>
  );
}

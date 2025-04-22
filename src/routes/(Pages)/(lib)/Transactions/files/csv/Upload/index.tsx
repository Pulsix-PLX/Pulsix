import { createSignal, Show } from 'solid-js';
import { authStore } from '~/GlobalStores/auth';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';
import { context, initializeData, setError } from '../context';
import ModernDropzone from './DropZone';
import { allInputsValid, getFormValue } from '~/GlobalStores/FormStore';
import PathWallets from '../../../utils/pathWallets';

export default function UploadFile() {
  const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
  let fileInputRef: HTMLInputElement | undefined;

  /// 1. Check upload file extension ///
  function handleFileChange(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0]; // Prende il primo file selezionato

    if (file) {
      if (file.name.toLowerCase().endsWith('.csv')) {
        setSelectedFile(file);
        setError(null);
      } else {
        // Il file NON è un CSV, resetta lo stato e mostra un errore
        setSelectedFile(null);
        setError('File selected is not a csv file');
        if (fileInputRef) {
          fileInputRef.value = '';
        }
      }
    } else {
      setSelectedFile(null);
      setError(null);
    }
  }

  /// 2. Upload file ///
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

      if (res.data && Array.isArray(res.data.headers) && Array.isArray(res.data.rows)) {
        initializeData(
          { headers: res.data.headers, rows: res.data.rows },
          getFormValue('walletId')
        );
      } else {
        console.error('Risposta API non contiene headers o rows validi:', res.data);
        setError('Response from server malformed or empty (mancano headers/rows).');
      }
    } catch (error: any) {
      console.error(error);
      setError('Error during upload: ' + error.message);
    }
  }

  return (
    <>
      <div class="CM">
        <h1>Carica Estratto Conto (CSV)</h1>

        {/* Upload file */}
        <form enctype="multipart/form-data" onSubmit={sendFile} class="">
          <ModernDropzone
            ref={(el) => (fileInputRef = el)}
            id="csv-file-input" // Pass necessary IDs/names
            name="csv"
            accept=".csv" // Specify accepted types
            required={true} // Pass required attribute
            onChange={handleFileChange} // Pass your change handler
            label={
              <>
                Drag & drop your <strong>CSV file</strong> here,
                <br /> or click to select
              </>
            }
            draggingLabel="Release to drop the CSV file!"
            // icon={<YourCustomIcon />} // You could pass a custom SVG/component icon
          />

          {/* file name */}
          <Show when={selectedFile()}>
            <p style={{ 'margin-top': '1rem', color: '#e2e8f0' }}>
              Selected file: <strong>{selectedFile()?.name}</strong>
            </p>
          </Show>
          {/* Error */}
          <Show when={context.errorMessage}>
            <p style={{ color: 'red', 'margin-top': '10px' }}>{context.errorMessage}</p>
          </Show>
          {/* Wallet select */}
          <PathWallets />

          <ButtonSparkle
            type="submit"
            disabled={!selectedFile() || !allInputsValid()}
            text="Submit file"
            class="ml-130 mt-100"
          />
        </form>
      </div>
    </>
  );
}

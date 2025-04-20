// src/routes/import-csv.tsx
import { createSignal, Show } from "solid-js";
import CsvUpload from "./index";
import CsvPreview from "./preview";
import ColumnMapper from "./";

export default function ImportCsv() {
  const [csvData, setCsvData] = createSignal<any | null>(null);
  const [mappings, setMappings] = createSignal<Record<string, string> | null>(null);
  const [processing, setProcessing] = createSignal<boolean>(false);
  const [result, setResult] = createSignal<any | null>(null);
  const [error, setError] = createSignal<string | null>(null);

  const handleDataLoaded = (data: any) => {
    setCsvData(data);
    setMappings(null);
    setResult(null);
    setError(null);
  };

  const handleMappingComplete = async (columnMappings: Record<string, string>) => {
    setMappings(columnMappings);
    setProcessing(true);
    setError(null);
    
    try {
      // Invio dati + mappature al server per l'inserimento
      const response = await fetch("/api/import-csv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mappings: columnMappings,
          data: csvData()?.allRows || []
        })
      });
      
      if (!response.ok) {
        throw new Error("Errore durante l'importazione");
      }
      
      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      setResult(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Si è verificato un errore sconosciuto");
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div class="container mx-auto py-8">
      <h1 class="text-2xl font-bold mb-6">Importa dati da CSV</h1>
      
      <Show when={!csvData()}>
        <CsvUpload onDataLoaded={handleDataLoaded} />
      </Show>
      
      <Show when={csvData() && !mappings()}>
        <CsvPreview 
          headers={csvData()?.headers || []} 
          rows={csvData()?.previewRows || []} 
          totalRows={csvData()?.totalRows || 0} 
        />
        
        <ColumnMapper 
          csvHeaders={csvData()?.headers || []} 
          onMappingComplete={handleMappingComplete} 
        />
      </Show>
      
      <Show when={processing()}>
        <div class="p-4 border rounded mb-4">
          <p class="text-center">Elaborazione in corso...</p>
        </div>
      </Show>
      
      <Show when={result()}>
        <div class="p-4 border rounded bg-green-50 mb-4">
          <h2 class="text-xl font-bold mb-2">Importazione completata</h2>
          <p>Sono state importate {result()?.imported || 0} righe con successo.</p>
          
          <button
            onClick={() => {
              setCsvData(null);
              setMappings(null);
              setResult(null);
            }}
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Importa un altro file
          </button>
        </div>
      </Show>
      
      <Show when={error()}>
        <div class="p-4 border rounded bg-red-50 mb-4 text-red-700">
          <h2 class="font-bold mb-1">Errore</h2>
          <p>{error()}</p>
        </div>
      </Show>
    </div>
  );
}
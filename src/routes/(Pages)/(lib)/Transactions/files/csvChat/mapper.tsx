import { createSignal, For, Show, createMemo } from 'solid-js';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';
import { authStore } from '~/GlobalStores/auth';

interface MappingProps {
  csvHeaders: string[];
  rows: any[]; // Aggiungiamo i dati di esempio per preview
  onMappingComplete: (
    mappingData: Record<string, string>,
    transactionTypeLogic: TransactionTypeLogic
  ) => void;
  onCancel: () => void;
}

// Definizione della logica per determinare il tipo di transazione
interface TransactionTypeLogic {
  mode: 'auto' | 'column'; // auto = basato sul segno dell'importo, column = basato su una colonna specifica
  columnName?: string; // nome della colonna per mode='column'
  positiveValue?: string; // valore che indica un'entrata (es. "guadagno", "income", "entrata")
  negativeValue?: string; // valore che indica un'uscita (es. "spesa", "expense", "uscita")
  negativeIsExpense: boolean; // se true, gli importi negativi sono spese, altrimenti sono entrate
}

export default function ColumnMapping(props: MappingProps) {
  // Array di campi del sistema per mappare le colonne CSV
  const systemFields = [
    { id: 'cause', label: 'Cause' },
    { id: 'amount', label: 'Amount' },
    { id: 'currency', label: 'Currency' },
    { id: 'date', label: 'Date' },
  ];
  // Campi richiesti per la validazione
  const requiredFields = ['amount', 'walletId', 'currency'];

  // Definisci gli ID dei campi di sistema che vogliamo mostrare nella preview
  const previewSystemIds = ['cause', 'amount', 'currency', 'date'];

  // Inizializza mappatura vuota
  const [mappings, setMappings] = createSignal<Record<string, string>>({});
  const [draggedHeader, setDraggedHeader] = createSignal<string | null>(null);
  const [dragOverField, setDragOverField] = createSignal<string | null>(null);
  const [validationError, setValidationError] = createSignal<string | null>(null);

  // Stato per la logica del tipo di transazione
  const [transactionTypeLogic, setTransactionTypeLogic] = createSignal<TransactionTypeLogic>({
    mode: 'auto',
    negativeIsExpense: true,
  });

  // Mostra un esempio di come vengono interpretate le transazioni
  const [showExamplePreview, setShowExamplePreview] = createSignal(false);

  // Verifica se la mappatura è valida
  const isFormValid = createMemo(() => {
    const mappedFields = Object.values(mappings());
    const basicValidation = requiredFields.every((field) => mappedFields.includes(field));

    // Validazione aggiuntiva per la logica del tipo di transazione
    if (transactionTypeLogic().mode === 'column') {
      return (
        basicValidation &&
        !!transactionTypeLogic().columnName &&
        !!transactionTypeLogic().positiveValue &&
        !!transactionTypeLogic().negativeValue
      );
    }

    return basicValidation;
  });

  // Funzioni di gestione del drag and drop
  const onDragStart = (header: string) => (e: DragEvent) => {
    setDraggedHeader(header);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      try {
        e.dataTransfer.setData('text/plain', header);
      } catch (err) {
        console.error('Error setting drag data:', err);
      }
    }
  };

  const onDragOver = (fieldId: string) => (e: DragEvent) => {
    e.preventDefault();
    setDragOverField(fieldId);
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const onDragLeave = () => {
    setDragOverField(null);
  };

  const onDrop = (fieldId: string) => (e: DragEvent) => {
    e.preventDefault();
    const header = draggedHeader();

    if (header) {
      setMappings((prev) => {
        // Rimuovi il campo se era già mappato a un altro campo
        const updated = { ...prev };

        // Verifica se questo header era già mappato a un altro campo
        if (updated[header]) {
          // Se lo stesso campo viene rilasciato nella stessa destinazione, non fare nulla
          if (updated[header] === fieldId) {
            setDragOverField(null);
            setDraggedHeader(null);
            return prev;
          }
        }

        // Controlla se un altro header era già mappato a questo campo
        Object.keys(updated).forEach((key) => {
          if (updated[key] === fieldId) {
            delete updated[key];
          }
        });

        // Aggiungi la nuova mappatura
        updated[header] = fieldId;
        return updated;
      });
    }

    setDragOverField(null);
    setDraggedHeader(null);
  };

  // Rimuovi una mappatura
  const removeMappingFromField = (fieldId: string) => {
    setMappings((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (updated[key] === fieldId) {
          delete updated[key];
        }
      });
      return updated;
    });
  };

  // Rimuovi uno specifico header mappato
  const removeHeaderMapping = (header: string) => {
    setMappings((prev) => {
      const updated = { ...prev };
      delete updated[header];
      return updated;
    });
  };

  // Aggiorna la logica per il tipo di transazione
  const updateTransactionTypeLogic = (updates: Partial<TransactionTypeLogic>) => {
    setTransactionTypeLogic((prev) => ({ ...prev, ...updates }));
  };

  // Invia la mappatura al server
  const submitMapping = async () => {
    console.log('eee')
    /*
    if (!isFormValid()) {
      let errorMsg = `È necessario mappare almeno i campi: ${requiredFields
        .map((id) => systemFields.find((f) => f.id === id)?.label || id)
        .join(', ')}`;

      if (
        transactionTypeLogic().mode === 'column' &&
        (!transactionTypeLogic().columnName ||
          !transactionTypeLogic().positiveValue ||
          !transactionTypeLogic().negativeValue)
      ) {
        errorMsg += '. Completa anche la configurazione del tipo di transazione.';
      }

      setValidationError(errorMsg);
      return;
    }
*/
    try {
      // Prepara i dati per l'invio
      const mappingData = mappings();
      const typeLogic = transactionTypeLogic();
console.log('sent')
      // Invia al server
      await authStore.api.post('API/Wallets/Wallet/addTransactionByFile/addTransactions', {
        columnMapping: mappingData,
        transactionTypeLogic: typeLogic,
      });

      // Notifica il componente genitore che la mappatura è completa
      props.onMappingComplete(mappingData, typeLogic);
    } catch (error: any) {
      console.error("Errore durante l'invio della mappatura:", error);
      setValidationError(error.message || "Errore durante l'invio della mappatura");
    }
  };

  // Ottieni l'header mappato a un campo specifico
  const getMappedHeader = (fieldId: string) => {
    const entries = Object.entries(mappings());
    // Usa trim per robustezza contro spaziature extra
    const found = entries.find(
      ([_, value]) => typeof value === 'string' && value.trim() === fieldId
    );
    return found ? found[0] : null;
  };

  // Genera esempi di come verranno interpretate le transazioni
  const transactionExamples = createMemo(() => {
    console.log('Calculating transactionExamples (detailed)...');
    const currentMappings = mappings();
    // console.log("DEBUG Memo: Mappings ricevuti:", JSON.stringify(currentMappings));

    if (!props.rows || props.rows.length === 0) {
      console.log('DEBUG Memo: props.rows è vuoto.');
      return [];
    }

    // Crea una mappa { systemId: csvHeaderName | undefined } per un accesso rapido
    const headerMap: Record<string, string | undefined> = {};
    previewSystemIds.forEach((sysId) => {
      headerMap[sysId] = Object.entries(currentMappings).find(
        ([_, value]) => typeof value === 'string' && value.trim() === sysId
      )?.[0];
    });

    const sampleRows = props.rows.slice(0, 5);
    const amountFieldId = 'amount'; // ID cercato
    console.log(
      `DEBUG Memo: Cerco il valore ID: "${amountFieldId}" (Tipo: ${typeof amountFieldId})`
    );

    const mappingEntries = Object.entries(currentMappings);
    console.log('DEBUG Memo: Controllo queste entries:', JSON.stringify(mappingEntries));

    let foundHeader: string | undefined = undefined;
    let matchFound = false; // Flag per fermarsi al primo match se necessario

    // Log Dettagliato del Confronto per ogni entry
    mappingEntries.forEach(([key, value]) => {
      const valueType = typeof value;
      // Confronto diretto
      const directMatch = value === amountFieldId;
      // Confronto con trim (solo se è stringa)
      const trimmedValue = valueType === 'string' ? value.trim() : value;
      const trimmedMatch = trimmedValue === amountFieldId;

      // Stampa TUTTO quello che stiamo confrontando
      console.log(
        `-- DEBUG Memo Entry: Chiave="<span class="math-inline">\{key\}", Valore\="</span>{value}" (Tipo: <span class="math-inline">\{valueType\}\)\. Confronto diretto \('</span>{amountFieldId}'): <span class="math-inline">\{directMatch\}\. Confronto con trim \('</span>{amountFieldId}'): ${trimmedMatch}`
      );

      // Usiamo il confronto con trim per trovare l'header
      if (trimmedMatch && !matchFound) {
        foundHeader = key;
        matchFound = true;
      }
    });

    // Usa l'header trovato dal loop forEach
    const importoHeader = headerMap['amount'];
    if (!importoHeader) {
      console.log('DEBUG Memo: Amount header non mappato, impossibile calcolare esempi completi.');
      // Restituiamo array vuoto se 'amount' non è mappato
      return [];
    }

    console.log("DEBUG: Header mappato per 'amount' (Risultato finale find):", importoHeader);

    if (!importoHeader) {
      console.log('DEBUG Memo: Amount header NON trovato, ritorno array vuoto.');
      return [];
    }

    // --- Resto del calcolo degli esempi ---
    console.log(`DEBUG Memo: Amount header trovato: "${importoHeader}". Calcolo esempi...`);
    const examples = sampleRows.map((row, index) => {
      // Estrai i valori usando la headerMap. Se non mappato o valore nullo, indica N/D o Non Mappato.
      const walletValue = headerMap.walletId ? row[headerMap.walletId] ?? 'N/D' : 'Non Mappato';
      const causeValue = headerMap.cause ? row[headerMap.cause] ?? 'N/D' : 'Non Mappato';
      const currencyValue = headerMap.currency ? row[headerMap.currency] ?? 'N/D' : 'Non Mappato';
      const dateValue = headerMap.date ? row[headerMap.date] ?? 'N/D' : 'Non Mappato';

      // Calcola importo e tipo (logica come prima)
      const importoRaw = row[importoHeader!]; // Sappiamo che importoHeader esiste
      const importo = parseFloat(importoRaw);
      let tipo = 'Non determinato';
      const typeLogic = transactionTypeLogic();

      if (typeLogic.mode === 'auto') {
        tipo = importo < 0 === typeLogic.negativeIsExpense ? 'Uscita' : 'Entrata';
      } else if (
        typeLogic.mode === 'column' &&
        typeLogic.columnName &&
        typeLogic.positiveValue &&
        typeLogic.negativeValue
      ) {
        const tipoValore = row[typeLogic.columnName!];
        if (tipoValore === typeLogic.positiveValue) tipo = 'Entrata';
        else if (tipoValore === typeLogic.negativeValue) tipo = 'Uscita';
      }

      // Determina la valuta da usare per la formattazione, fallback su EUR
      const currencyCode =
        currencyValue && currencyValue !== 'Non Mappato' && currencyValue !== 'N/D'
          ? currencyValue
          : 'EUR';

      return {
        // Proprietà che verranno usate nella tabella di preview
        walletId: walletValue,
        cause: causeValue,
        // Nota: amount qui è il valore numerico formattato
        amount: isNaN(importo)
          ? 'N/A'
          : new Intl.NumberFormat('it-IT', { style: 'currency', currency: currencyCode }).format(
              importo
            ),
        currency: currencyValue,
        date: dateValue,
        interpretation: tipo, // L'interpretazione calcolata
      };
    });
    console.log(`DEBUG: Esempi dettagliati calcolati: ${examples.length}`);
    return examples;
  });

  return (
    <div class="p-6 border rounded-lg shadow-lg mb-6 bg-white">
      <h2 class="text-2xl font-bold mb-3">Mappatura Colonne</h2>
      <p class="text-sm text-gray-600 mb-4">
        Trascina le colonne del CSV nei campi del sistema corrispondenti
      </p>

      <Show when={validationError()}>
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {validationError()}
        </div>
      </Show>

      <div class="flex gap-6">
        {/* Colonna sinistra: intestazioni CSV disponibili */}
        <div class="w-1/2 bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-3">Colonne CSV</h3>
          <p class="text-sm text-gray-500 mb-3">Trascina queste colonne nei campi a destra</p>

          <div class="space-y-2">
            <For each={props.csvHeaders}>
              {(header) => {
                // Verifica se questo header è già mappato
                const isMapped = createMemo(() => Object.keys(mappings()).includes(header));

                return (
                  <div
                    class={`p-3 rounded-md cursor-grab ${
                      isMapped()
                        ? 'bg-gray-300 text-gray-600'
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                    }`}
                    draggable={!isMapped()}
                    onDragStart={onDragStart(header)}
                  >
                    <div class="flex justify-between items-center">
                      <span>{header}</span>
                      <Show when={isMapped()}>
                        <button
                          class="text-gray-600 hover:text-red-600"
                          onClick={() => removeHeaderMapping(header)}
                          title="Rimuovi mappatura"
                        >
                          ✕
                        </button>
                      </Show>
                    </div>
                  </div>
                );
              }}
            </For>
          </div>
        </div>

        {/* Colonna destra: campi del sistema */}
        <div class="w-1/2 bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-3">Campi Sistema</h3>
          <p class="text-sm text-gray-500 mb-3">Rilascia le colonne CSV qui</p>

          <div class="space-y-2">
            <For each={systemFields}>
              {(field) => {
                const mappedHeader = createMemo(() => getMappedHeader(field.id));
                const isRequired = requiredFields.includes(field.id);

                return (
                  <div
                    class={`p-3 rounded-md border-2 ${
                      dragOverField() === field.id
                        ? 'border-blue-500 bg-blue-50'
                        : mappedHeader()
                        ? 'border-green-500 bg-green-50'
                        : isRequired
                        ? 'border-yellow-300 bg-yellow-50'
                        : 'border-gray-300 bg-white'
                    }`}
                    onDragOver={onDragOver(field.id)}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop(field.id)}
                  >
                    <div class="flex justify-between items-center">
                      <div>
                        <span class="font-medium">{field.label}</span>
                        {isRequired && <span class="text-red-500 ml-1">*</span>}
                      </div>

                      <Show when={mappedHeader()}>
                        <div class="flex items-center">
                          <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                            {mappedHeader()}
                          </span>
                          <button
                            class="text-gray-500 hover:text-red-600"
                            onClick={() => removeMappingFromField(field.id)}
                            title="Rimuovi mappatura"
                          >
                            ✕
                          </button>
                        </div>
                      </Show>
                    </div>
                  </div>
                );
              }}
            </For>

            {/* Campo per ignorare colonne */}
            <div
              class={`p-3 rounded-md border-2 ${
                dragOverField() === 'non_utilizzare'
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 bg-white'
              }`}
              onDragOver={onDragOver('non_utilizzare')}
              onDragLeave={onDragLeave}
              onDrop={onDrop('non_utilizzare')}
            >
              <div class="flex justify-between items-center">
                <span class="font-medium text-gray-500">Non utilizzare</span>
                <div class="flex flex-wrap gap-1 max-w-xs">
                  <For each={Object.entries(mappings())}>
                    {([header, field]) => (
                      <Show when={field === 'non_utilizzare'}>
                        <span class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs flex items-center">
                          {header}
                          <button
                            class="ml-1 text-gray-500 hover:text-red-600"
                            onClick={() => removeHeaderMapping(header)}
                          >
                            ✕
                          </button>
                        </span>
                      </Show>
                    )}
                  </For>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Configurazione del tipo di transazione */}
      <div class="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 class="text-lg font-semibold mb-3">Configurazione Tipo Transazione</h3>

        <div class="space-y-4">
          <div>
            <p class="font-medium mb-2">
              Come determinare se una transazione è un'entrata o un'uscita?
            </p>

            <div class="flex items-center space-x-4">
              <label class="flex items-center">
                <input
                  type="radio"
                  name="transactionType"
                  value="auto"
                  checked={transactionTypeLogic().mode === 'auto'}
                  onChange={() => updateTransactionTypeLogic({ mode: 'auto' })}
                />
                <span class="ml-2">Dal segno dell'importo</span>
              </label>

              <label class="flex items-center">
                <input
                  type="radio"
                  name="transactionType"
                  value="column"
                  checked={transactionTypeLogic().mode === 'column'}
                  onChange={() => updateTransactionTypeLogic({ mode: 'column' })}
                />
                <span class="ml-2">Da una colonna specifica</span>
              </label>
            </div>
          </div>

          {/* Configurazione per modalità "auto" */}
          <Show when={transactionTypeLogic().mode === 'auto'}>
            <div>
              <p class="font-medium mb-2">Interpretazione del segno:</p>

              <div class="flex items-center space-x-4">
                <label class="flex items-center">
                  <input
                    type="radio"
                    name="signInterpretation"
                    value="negativeIsExpense"
                    checked={transactionTypeLogic().negativeIsExpense === true}
                    onChange={() => updateTransactionTypeLogic({ negativeIsExpense: true })}
                  />
                  <span class="ml-2">Importi negativi = Uscite, Importi positivi = Entrate</span>
                </label>
              </div>
              <div class="flex items-center space-x-4 mt-2">
                <label class="flex items-center">
                  <input
                    type="radio"
                    name="signInterpretation"
                    value="negativeIsIncome"
                    checked={transactionTypeLogic().negativeIsExpense === false}
                    onChange={() => updateTransactionTypeLogic({ negativeIsExpense: false })}
                  />
                  <span class="ml-2">Importi negativi = Entrate, Importi positivi = Uscite</span>
                </label>
              </div>
            </div>
          </Show>

          {/* Configurazione per modalità "column" */}
          <Show when={transactionTypeLogic().mode === 'column'}>
            <div class="space-y-3">
              <div>
                <label class="block font-medium mb-1">Colonna che indica il tipo:</label>
                <select
                  class="w-full p-2 border rounded"
                  value={transactionTypeLogic().columnName || ''}
                  onChange={(e) =>
                    updateTransactionTypeLogic({ columnName: e.currentTarget.value })
                  }
                >
                  <option value="">-- Seleziona colonna --</option>
                  <For each={props.csvHeaders}>
                    {(header) => <option value={header}>{header}</option>}
                  </For>
                </select>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block font-medium mb-1">Valore per Entrate:</label>
                  <input
                    type="text"
                    class="w-full p-2 border rounded"
                    value={transactionTypeLogic().positiveValue || ''}
                    placeholder="es. entrata, income, guadagno"
                    onChange={(e) =>
                      updateTransactionTypeLogic({ positiveValue: e.currentTarget.value })
                    }
                  />
                </div>

                <div>
                  <label class="block font-medium mb-1">Valore per Uscite:</label>
                  <input
                    type="text"
                    class="w-full p-2 border rounded"
                    value={transactionTypeLogic().negativeValue || ''}
                    placeholder="es. uscita, expense, spesa"
                    onChange={(e) =>
                      updateTransactionTypeLogic({ negativeValue: e.currentTarget.value })
                    }
                  />
                </div>
              </div>
            </div>
          </Show>
        </div>
      </div>

      {/* Preview degli esempi di transazioni */}
      <div class="mt-4">
        <button
          onClick={() => setShowExamplePreview(!showExamplePreview())}
          class="text-blue-600 hover:text-blue-800 text-sm flex items-center"
        >
          {showExamplePreview() ? '▼ ' : '► '}
          Mostra anteprima interpretazione transazioni
        </button>

        <Show when={showExamplePreview()}>
          {/* && getMappedHeader('amount') && transactionExamples().length > 0*/}
          <div class="mt-4">
            <button
              onClick={() => setShowExamplePreview(!showExamplePreview())}
              class="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              {showExamplePreview() ? '▼ ' : '► '}
              Mostra anteprima dati interpretati (prime 5 righe)
            </button>

            {/* Mostra solo se il toggle è attivo e ci sono esempi (amount deve essere mappato) */}
            <Show when={showExamplePreview() && transactionExamples().length > 0}>
              <div class="mt-2 p-4 bg-gray-50 rounded-lg overflow-x-auto">
                <p class="text-xs text-gray-600 mb-2">
                  Questa è un'anteprima di come verranno interpretati i dati in base alla mappatura
                  e alla logica del tipo transazione attuale. 'N/D' significa che il valore nella
                  riga originale era vuoto o nullo. 'Non Mappato' significa che il campo sistema non
                  è stato associato a nessuna colonna CSV.
                </p>
                <table class="w-full min-w-max text-sm">
                  {' '}
                  {/* min-w-max per evitare wrapping eccessivo */}
                  <thead>
                    <tr class="border-b-2 border-gray-300 text-left">
                      {/* Intestazioni tabella basate sulle etichette dei campi sistema */}
                      <For each={systemFields}>
                        {(field) => <th class="p-2 font-semibold">{field.label}</th>}
                      </For>
                      <th class="p-2 font-semibold">Interpretazione</th>{' '}
                      {/* Colonna extra per Entrata/Uscita */}
                    </tr>
                  </thead>
                  <tbody>
                    <For each={transactionExamples()}>
                      {(example) => (
                        <tr class="border-b border-gray-200">
                          {/* Mostra i dati estratti per ogni campo */}
                          <td class="p-2">{example.cause}</td>
                          <td class="p-2">{example.amount}</td>
                          <td class="p-2">{example.currency}</td>
                          <td class="p-2">{example.date}</td>
                          {/* Mostra l'interpretazione con colore */}
                          <td
                            class={`p-2 font-medium ${
                              example.interpretation === 'Entrata'
                                ? 'text-green-600'
                                : example.interpretation === 'Uscita'
                                ? 'text-red-600'
                                : 'text-gray-600'
                            }`}
                          >
                            {example.interpretation}
                          </td>
                        </tr>
                      )}
                    </For>
                  </tbody>
                </table>
              </div>
            </Show>
            {/* Mostra messaggio se la preview è attiva ma amount non è mappato */}
            <Show when={showExamplePreview() && !getMappedHeader('amount')}>
              <p class="mt-2 text-sm text-orange-600">
                Per vedere l'anteprima dell'interpretazione, mappa prima il campo "Amount".
              </p>
            </Show>
          </div>
        </Show>
      </div>

      <div class="mt-6 flex justify-between">
        <button
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          onClick={props.onCancel}
        >
          Annulla
        </button>
        <ButtonSparkle
          onClick={submitMapping}
         // disabled={!isFormValid()}
          text="Conferma mappatura"
        />
      </div>

      <div class="mt-4 text-sm text-gray-500">
        <p>* I campi contrassegnati sono obbligatori</p>
      </div>
    </div>
  );
}

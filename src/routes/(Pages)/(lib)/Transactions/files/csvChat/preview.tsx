// Percorso Esempio: src/components/CsvPreview/CsvPreviewContextualized.tsx

import {
  createSignal,
  For,
  Show,
  onMount,
  onCleanup,
  createEffect,
  createMemo,
  type Component
} from 'solid-js';

// --- Importazioni Contesto AGGIORNATE ---
import {
    csvState,               // Legge lo stato per originalRows (nel reset DENTRO questo file se lo mantieni qui)
    resetProcess,           // Usato dal bottone Annulla Processo
    setCurrentStep,         // Usato da proceedToMapping
    updateRowsWithHistory,  // <-- Azione usata per salvare
    // setFileData NON più usata per le righe da qui
    // undoLastChange,      // Non più usata da qui (spostata nel genitore)
    // resetDataToOriginal  // Non più usata da qui (spostata nel genitore)
 } from './context'; // Adatta il percorso!
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle'; // Adatta il percorso!
// --- FINE IMPORT ---

interface VirtualTableProps {
  headers: string[];
  rows: any[]; // Dati CORRENTI passati come props
  rowHeight?: number;
  tableHeight?: number;
  tableWidth?: string;
  cellPadding?: string;
}

/**
 * Componente CsvPreview CONTESTUALIZZATO:
 * Non gestisce più lo storico/undo/reset internamente.
 * Chiama updateRowsWithHistory del contesto per salvare le modifiche.
 */
const CsvPreviewContextualized: Component<VirtualTableProps> = (props) => {
  // --- Configurazione ---
  const rowHeight = props.rowHeight || 48;
  const tableHeight = props.tableHeight || 800;
  const tableWidth = props.tableWidth || '100%';
  const cellPadding = props.cellPadding || 'py-3 px-4';

  // --- Stati Locali ---
  const [editableData, setEditableData] = createSignal<any[]>([]); // Sincronizzato con props.rows
  const [editingCell, setEditingCell] = createSignal<{ visibleRowIndex: number; header: string } | null>(null);
  const [scrollTop, setScrollTop] = createSignal(0);
  // NO history interna
  let containerRef: HTMLDivElement | undefined;

  // --- Valori Derivati (Memoized) ---
  const actualContainerHeight = createMemo(() => {
    // Assicurati che window sia definito (per SSR)
    if (typeof window !== 'undefined') {
      // Usa Math.min per scegliere il minore tra l'altezza fissa e quella della finestra
      return Math.min(tableHeight, window.innerHeight * 0.8);
    }
    // Fallback se window non è definito
    return tableHeight;
  });
  const visibleRowCount = createMemo(() => Math.ceil(actualContainerHeight() / rowHeight) + 5); // Come prima
  const startIndex = createMemo(() => Math.max(0, Math.floor(scrollTop() / rowHeight))); // Come prima
  const visibleRows = createMemo(() => { // Come prima
    const data = editableData();
    if (!data) return [];
    const start = startIndex();
    const count = visibleRowCount();
    const end = Math.min(start + count, data.length);
    return data.slice(start, end);
  });
  const totalHeight = createMemo(() => editableData()?.length * rowHeight || 0); // Come prima
  // NO hasChanges interno

  // --- Effetti ---
  // Sincronizza editableData con props.rows
  createEffect(() => {
    const currentRows = props.rows;
    // console.log(`CsvPreview Effect: Ricevute props.rows. Lunghezza: ${currentRows?.length || 0}`);
    const newDataFromProps = currentRows?.map(row => ({ ...row })) || [];
    // Aggiorna sempre per riflettere le props più recenti arrivate dal contesto
    setEditableData(newDataFromProps);
    // console.log("CsvPreview Effect: editableData sincronizzato con props.");
  });

  // --- Logica e Gestori Eventi ---

  const handleScroll = (e: Event) => { setScrollTop((e.target as HTMLDivElement).scrollTop); };

  // Funzione: Prepara i dati e chiama l'azione del contesto per salvare
  const saveDataToContext = (visibleRowIndex: number, header: string, newValue: string) => {
    const absoluteRowIndex = startIndex() + visibleRowIndex;
    const currentLocalData = editableData(); // Legge lo stato locale corrente

    if (!currentLocalData || absoluteRowIndex < 0 || absoluteRowIndex >= currentLocalData.length) {
      console.error("saveDataToContext: Indice riga non valido o dati non pronti:", absoluteRowIndex);
      return;
    }

    const oldValue = currentLocalData[absoluteRowIndex]?.[header];
    if (String(oldValue ?? '') === String(newValue ?? '')) { return; }

    // Crea il nuovo array di dati da inviare al contesto
    const newData = [...currentLocalData];
    const newRow = { ...newData[absoluteRowIndex] };
    newRow[header] = newValue;
    newData[absoluteRowIndex] = newRow;

    console.log(`✅ Dati pronti per CONTEXT => Riga Assoluta: ${absoluteRowIndex}, Header: "${header}", Nuovo Valore: "${newValue}"`);

    // Chiama l'azione del contesto (che gestirà storico e aggiornamento stato globale)
    updateRowsWithHistory(newData);

    // Non fare altro qui (niente setEditableData, setHistory, setFileData)
  };

  // Funzione: Annulla solo lo stato di editing visivo
  const cancelEditingVisualState = () => { if(editingCell() !== null) { setEditingCell(null); } };

  // Inizia la modifica
  const startEditing = (visibleRowIndex: number, header: string) => {
    const currentEdit = editingCell();
    if(currentEdit?.visibleRowIndex === visibleRowIndex && currentEdit?.header === header) return;
    setEditingCell({ visibleRowIndex, header });
  };

  // Gestore per onBlur dell'input (chiama saveDataToContext)
  const handleInputBlur = (event: FocusEvent) => {
      const cellState = editingCell();
      if(cellState) {
          saveDataToContext(cellState.visibleRowIndex, cellState.header, (event.target as HTMLInputElement).value);
      }
  };

  // Gestore per keydown sull'input (chiama saveDataToContext o annulla)
  const handleInputKeyDown = (event: KeyboardEvent) => {
     const cellState = editingCell();
     if (!cellState) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      saveDataToContext(cellState.visibleRowIndex, cellState.header, (event.target as HTMLInputElement).value);
      cancelEditingVisualState();
    } else if (event.key === 'Escape') {
      cancelEditingVisualState();
    }
  };

  // Gestore per click esterni (annulla solo stato visuale)
  const handleOutsideClick = (event: MouseEvent) => {
    if (editingCell() && containerRef && !containerRef.contains(event.target as Node)) {
       cancelEditingVisualState();
    }
  };

  // NO handleUndo / handleReset interni

  // Ciclo di vita
  onMount(() => {
    if (containerRef) { containerRef.addEventListener('scroll', handleScroll); }
    document.addEventListener('mousedown', handleOutsideClick);
    console.log("Componente CsvPreview CONTESTUALIZZATO montato.");
  });
  onCleanup(() => {
    if (containerRef) { containerRef.removeEventListener('scroll', handleScroll); }
    document.removeEventListener('mousedown', handleOutsideClick);
    console.log("Componente CsvPreview CONTESTUALIZZATO smontato.");
  });

  // Funzione per procedere
  function proceedToMapping() {
    cancelEditingVisualState();
    if ((csvState.fileData?.headers ?? []).length > 0) {
      console.log(csvState.fileData)
         setCurrentStep('mapping');
    } else {
         console.warn("Impossibile procedere: dati/headers mancanti nel context.");
    }
  }

  // --- Struttura JSX ---
  return (
    <>
      <div class="p-6 border rounded-lg shadow-lg mb-6 bg-white">
         <h2 class="text-2xl font-bold mb-3">Anteprima Dati (Contestualizzata)</h2>
         <p class="text-sm text-gray-600 mb-4">
            Dataset con {props.rows?.length || 0} righe totali -{' '}
            <span class="font-medium text-blue-600">Clicca su una cella per modificare</span>
             (Salvataggio automatico uscendo dalla cella)
         </p>

        {/* Contenitore Scrollabile e Tabella */}
        <div ref={containerRef} class="overflow-auto border border-gray-200 rounded-lg relative" style={{ height: `${actualContainerHeight()}px`, width: tableWidth }}>
          <div style={{ height: `${totalHeight()}px`, position: 'relative' }}>
            <table class="w-full bg-white border-separate border-spacing-0" style={{ position: 'absolute', top: `${startIndex() * rowHeight}px`, width: '100%' }}>
              <thead class="sticky top-0 z-10 bg-gray-100">
                 {/* ... header ... */}
                 <tr><For each={props.headers}>{(h)=><th class={`${cellPadding} ...`}>{h}</th>}</For></tr>
              </thead>
              <tbody>
                <For each={visibleRows()}>
                  {(row, visibleRowIndex) => (
                    <tr class="hover:bg-gray-50 border-b border-gray-200" style={{ height: `${rowHeight}px` }}>
                      <For each={props.headers}>
                        {(header) => {
                          const absoluteRowIndex = createMemo(() => startIndex() + visibleRowIndex());
                          const isCurrentCellEditing = createMemo(() => {
                             const cell = editingCell();
                             return cell !== null && cell.visibleRowIndex === visibleRowIndex() && cell.header === header;
                          });
                          // Memo per leggere il valore CORRENTE da editableData (sincronizzato con props)
                          const cellDisplayValue = createMemo(() => {
                              const data = editableData();
                              const absIdx = absoluteRowIndex();
                              const val = data?.[absIdx]?.[header] ?? '';
                              return val;
                          });

                          return (
                            <td class={`${cellPadding} border-gray-200`} style={{ padding: isCurrentCellEditing() ? '0' : undefined, position: 'relative' }}>
                              <Show when={isCurrentCellEditing()}
                                fallback={
                                  <div class="w-full h-full flex items-center cursor-pointer" onClick={() => startEditing(visibleRowIndex(), header)} title={`Riga ${absoluteRowIndex()}, Colonna ${header}`}>
                                    {cellDisplayValue()}
                                  </div>
                                }>
                                <input type="text" class="w-full h-full px-4 py-3 ..."
                                  value={cellDisplayValue()} // Mostra valore corrente
                                  onBlur={handleInputBlur}
                                  onKeyDown={handleInputKeyDown}
                                  ref={el => setTimeout(() => el.focus(), 0)}
                                  onClick={e => e.stopPropagation()}
                                  onMouseDown={e => e.stopPropagation()}
                                />
                              </Show>
                            </td>
                          );
                        }}
                      </For>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </div>
        <div class="mt-4 text-sm text-gray-500">
           <p>Scorri per visualizzare più righe. Clicca una cella per modificarla (Invio salva ed esce, Esc annulla, click su altra cella/fuori salva).</p>
        </div>
      </div>

      {/* Bottoni Azione (Senza Undo/Reset locali) */}
      <div class="mt-6 flex justify-end items-center"> {/* Allineati a destra */}
         <div class="flex space-x-2">
             <button class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300" onClick={resetProcess} title="Annulla l'intero processo di importazione">
               Annulla Processo
             </button>
            <Show when={typeof ButtonSparkle !== 'undefined'} fallback={<button onClick={proceedToMapping} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Procedi</button>}>
                <ButtonSparkle onClick={proceedToMapping} text="Procedi con la mappatura" />
            </Show>
         </div>
      </div>
    </>
  );
}

export default CsvPreviewContextualized;
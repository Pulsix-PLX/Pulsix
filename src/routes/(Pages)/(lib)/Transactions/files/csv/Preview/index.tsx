import { createEffect, createMemo, createSignal, For, onCleanup, onMount, Show } from 'solid-js';
import {
  context,
  reset,
  setOriginalData,
  setStep,
  undoLastChange,
  updateRowsWithHistory,
} from '../context';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';

export default function Preview() {
  // --- Stati Locali ---
  const [editingCell, setEditingCell] = createSignal<{
    visibleRowIndex: number;
    header: string;
  } | null>(null);
  const [scrollTop, setScrollTop] = createSignal(0);

  let containerRef: HTMLDivElement | undefined;
  const hasChanges = createMemo(() => (context.history?.length || 0) > 0);

  // ---  Ciclo di vita
  onMount(() => {
    if (containerRef) {
      containerRef.addEventListener('scroll', handleScroll);
    }
    document.addEventListener('mousedown', handleOutsideClick);
    console.log('Componente CsvPreview CONTESTUALIZZATO montato.');
  });
  onCleanup(() => {
    if (containerRef) {
      containerRef.removeEventListener('scroll', handleScroll);
    }
    document.removeEventListener('mousedown', handleOutsideClick);
    console.log('Componente CsvPreview CONTESTUALIZZATO smontato.');
  });

  // --- Style ---
  const rowHeight = 48;
  const tableHeight = 800;
  const tableWidth = '70%';
  const cellPadding = 'py-3 px-4';
  // table height
  const actualContainerHeight = createMemo(() => {
    if (typeof window !== 'undefined') {
      return Math.min(tableHeight, window.innerHeight * 0.8);
    }
    return tableHeight;
  });

  const visibleRowCount = createMemo(() => Math.ceil(actualContainerHeight() / rowHeight) + 5);
  const startIndex = createMemo(() => Math.max(0, Math.floor(scrollTop() / rowHeight)));
  const visibleRows = createMemo(() => {
    const data = Array.isArray(context.data?.rows) ? context.data?.rows : [];
    if (!data) return [];
    const start = startIndex();
    const count = visibleRowCount();
    const end = Math.min(start + count, data.length);
    return data.slice(start, end);
  });
  const totalHeight = createMemo(() => (context.data?.rows?.length ?? 0) * rowHeight);

  // --- helpers
  // Funzione: Annulla solo lo stato di editing visivo
  const cancelEditingVisualState = () => {
    if (editingCell() !== null) {
      setEditingCell(null);
    }
  };
  const handleScroll = (e: Event) => {
    setScrollTop((e.target as HTMLDivElement).scrollTop);
  };
  const handleOutsideClick = (event: MouseEvent) => {
    if (editingCell() && containerRef && !containerRef.contains(event.target as Node)) {
      cancelEditingVisualState();
    }
  };
  // Inizia la modifica
  const startEditing = (visibleRowIndex: number, header: string) => {
    const currentEdit = editingCell();
    if (currentEdit?.visibleRowIndex === visibleRowIndex && currentEdit?.header === header) return;
    setEditingCell({ visibleRowIndex, header });
  };

  /// Save new value and update history context ///
  const saveDataToContext = (visibleRowIndex: number, header: string, newValue: string) => {
    const absoluteRowIndex = startIndex() + visibleRowIndex;
    const currentLocalData = context.data?.rows;

    if (!currentLocalData || absoluteRowIndex < 0 || absoluteRowIndex >= currentLocalData.length) {
      console.error(
        'saveDataToContext: Indice riga non valido o dati non pronti:',
        absoluteRowIndex
      );
      return;
    }

    const oldValue = currentLocalData[absoluteRowIndex]?.[header];
    if (String(oldValue ?? '') === String(newValue ?? '')) {
      return;
    }

    // Crea il nuovo array di dati da inviare al contesto
    const newData = [...currentLocalData];
    const newRow = { ...newData[absoluteRowIndex] };
    newRow[header] = newValue;
    newData[absoluteRowIndex] = newRow;
    updateRowsWithHistory(newData);
  };

  // Gestore per onBlur dell'input (chiama saveDataToContext)
  const handleInputBlur = (event: FocusEvent) => {
    const cellState = editingCell();
    if (cellState) {
      saveDataToContext(
        cellState.visibleRowIndex,
        cellState.header,
        (event.target as HTMLInputElement).value
      );
    }
  };

  // Gestore per keydown sull'input (chiama saveDataToContext o annulla)
  const handleInputKeyDown = (event: KeyboardEvent) => {
    const cellState = editingCell();
    if (!cellState) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      saveDataToContext(
        cellState.visibleRowIndex,
        cellState.header,
        (event.target as HTMLInputElement).value
      );
      cancelEditingVisualState();
    } else if (event.key === 'Escape') {
      cancelEditingVisualState();
    }
  };

  // Funzione per procedere
  function proceedToMapping() {
    cancelEditingVisualState();
    if ((context.data?.headers ?? []).length > 0) {
      console.log(context.data);
      setStep('mapping');
    } else {
      console.warn('Impossibile procedere: dati/headers mancanti nel context.');
    }
  }


  return (
    <>
      <div class="p-6 border rounded-lg shadow-lg mb-6 ">
        <h2 class="text-2xl font-bold mb-3">Anteprima Dati (Contestualizzata)</h2>
        <p class="text-sm text-gray-600 mb-4">
          Dataset con {context.data?.rows?.length || 0} righe totali -{' '}
          <span class="font-medium text-blue-600">Clicca su una cella per modificare</span>
          (Salvataggio automatico uscendo dalla cella)
        </p>

        {/* Contenitore Scrollabile e Tabella */}
        <div
          ref={containerRef}
          class="overflow-auto border border-gray-200 rounded-lg relative"
          style={{ height: `${actualContainerHeight()}px`, width: tableWidth }}
        >
          <div style={{ height: `${totalHeight()}px`, position: 'relative' }}>
            <table
              class="w-full bg-white border-separate border-spacing-0"
              style={{ position: 'absolute', top: `${startIndex() * rowHeight}px`, width: '100%' }}
            >
              <thead class="sticky top-0 z-10 bg-gray-100">
                {/* ... header ... */}
                <tr>
                  <For each={context.data?.headers}>
                    {(h) => <th class={`${cellPadding} ...`}>{h}</th>}
                  </For>
                </tr>
              </thead>
              <tbody>
                <For each={visibleRows()}>
                  {(row, visibleRowIndex) => (
                    <tr
                      class="hover:bg-gray-50 border-b border-gray-200"
                      style={{ height: `${rowHeight}px` }}
                    >
                      <For each={context.data?.headers}>
                        {(header) => {
                         
                        
                          const absoluteRowIndex = createMemo(
                            () => startIndex() + visibleRowIndex()
                          );
                          const isCurrentCellEditing = createMemo(() => {
                            const cell = editingCell();
                            return (
                              cell !== null &&
                              cell.visibleRowIndex === visibleRowIndex() &&
                              cell.header === header
                            );
                          });
                          // Memo per leggere il valore CORRENTE da editableData (sincronizzato con props)
                          const cellDisplayValue = createMemo(() => {
                            const data = context.data?.rows;
                            const absIdx = absoluteRowIndex();
                            const val = data?.[absIdx]?.[header] ?? '';
                            return val;
                          });

                          return (
                            <td
                              class={`${cellPadding} border-gray-200`}
                              style={{
                                padding: isCurrentCellEditing() ? '0' : undefined,
                                position: 'relative',
                              }}
                            >
                              <Show
                                when={isCurrentCellEditing()}
                                fallback={
                                  <div
                                    class="w-full h-full flex items-center cursor-pointer"
                                    onClick={() => startEditing(visibleRowIndex(), header)}
                                    title={`Riga ${absoluteRowIndex()}, Colonna ${header}`}
                                  >
                                    {cellDisplayValue()}
                                  </div>
                                }
                              >
                                <input
                                  type="text"
                                  class="w-full h-full px-4 py-3 ..."
                                  value={cellDisplayValue()}
                                  onBlur={handleInputBlur}
                                  onKeyDown={handleInputKeyDown}
                                  ref={(el) => setTimeout(() => el.focus(), 0)}
                                  onClick={(e) => e.stopPropagation()}
                                  onMouseDown={(e) => e.stopPropagation()}
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
        {/* Back to upload / Next to mapper */}
        <div class="mt-6 flex justify-end items-center">
          <div class="flex space-x-2">
            <button
              class=" bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              onClick={reset}
              title="Annulla l'intero processo di importazione"
            >
              Back to upload file
            </button>
            <Show
              when={typeof ButtonSparkle !== 'undefined'}
              fallback={
                <button
                  onClick={proceedToMapping}
                  class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Next to mapper
                </button>
              }
            >
              <ButtonSparkle onClick={proceedToMapping} text="Procedi con la mappatura" />
            </Show>
          </div>
        </div>
        {/* Undo last change / Back to originalData */}
        <div class="my-4 flex justify-start space-x-2">
          <button
            class="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={setOriginalData}
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
      </div>
    </>
  );
}

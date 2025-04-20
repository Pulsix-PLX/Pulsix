import { createSignal, For, onMount, onCleanup, createEffect } from "solid-js";

interface VirtualTableProps {
  headers: string[];
  rows: any[];
  totalRows: number;
  rowHeight?: number;
  tableHeight?: number;
  tableWidth?: string;
  cellPadding?: string;
}

export default function CsvPreview(props: VirtualTableProps) {
  // Opzioni configurabili con valori di default
  const rowHeight = props.rowHeight || 48; // Altezza maggiore per ogni riga
  const tableHeight = props.tableHeight || 800; // Altezza maggiore di default (800px)
  const tableWidth = props.tableWidth || "100%"; // Larghezza di default
  const cellPadding = props.cellPadding || "py-3 px-4"; // Padding maggiore per le celle
  
  const [visibleRows, setVisibleRows] = createSignal<any[]>([]);
  const [startIndex, setStartIndex] = createSignal(0);
  const [containerHeight, setContainerHeight] = createSignal(tableHeight);
  const [scrollTop, setScrollTop] = createSignal(0);
  
  let containerRef: HTMLDivElement | undefined;

  // Calcola l'altezza totale che la tabella avrebbe se tutte le righe fossero renderizzate
  const totalHeight = () => props.rows.length * rowHeight;
  
  // Calcola quante righe possono essere visualizzate contemporaneamente
  const visibleRowCount = () => Math.ceil(containerHeight() / rowHeight) + 4; // +4 per un buffer maggiore
  
  // Aggiorna le righe visibili in base alla posizione di scorrimento
  const updateVisibleRows = () => {
    if (!containerRef) return;
    
    const scrollTopVal = scrollTop();
    const start = Math.floor(scrollTopVal / rowHeight);
    const visibleCount = visibleRowCount();
    
    // Limita l'indice di inizio per evitare problemi con l'array
    const safeStart = Math.max(0, Math.min(start, props.rows.length - visibleCount));
    
    setStartIndex(safeStart);
    setVisibleRows(props.rows.slice(safeStart, safeStart + visibleCount));
  };
  
  // Handler per l'evento di scorrimento
  const handleScroll = (e: Event) => {
    if (e.target) {
      setScrollTop((e.target as HTMLDivElement).scrollTop);
    }
  };
  
  // Imposta l'altezza del container quando il componente è montato
  onMount(() => {
    if (containerRef) {
      const actualHeight = Math.min(tableHeight, window.innerHeight * 0.8); // Limita al 80% dell'altezza della viewport
      setContainerHeight(actualHeight);
      updateVisibleRows();
    }
    
    if (containerRef) {
      containerRef.addEventListener('scroll', handleScroll);
    }
  });
  
  // Pulisci gli event listener quando il componente viene smontato
  onCleanup(() => {
    if (containerRef) {
      containerRef.removeEventListener('scroll', handleScroll);
    }
  });
  
  // Aggiorna le righe visibili quando lo scrollTop cambia
  createEffect(() => {
    scrollTop(); // Traccia la dipendenza
    updateVisibleRows();
  });
  
  return (
    <div class="p-6 border rounded-lg shadow-lg mb-6 bg-white">
      <h2 class="text-2xl font-bold mb-3">Anteprima dati</h2>
      <p class="text-sm text-gray-600 mb-4">
        Dataset con {props.totalRows} righe totali
      </p>
      
      <div 
        ref={containerRef} 
        class="overflow-auto border border-gray-200 rounded-lg" 
        style={{ height: `${tableHeight}px`, width: tableWidth }}
      >
        {/* Container con l'altezza totale per abilitare lo scrolling */}
        <div style={{ height: `${totalHeight()}px`, position: "relative" }}>
          {/* Tabella posizionata in modo assoluto all'interno del container */}
          <table 
            class="w-full bg-white"
            style={{ 
              position: "absolute", 
              top: `${startIndex() * rowHeight}px`,
              width: "100%",
              "border-collapse": "separate",
              'border-spacing': "0"
            }}
          >
            <thead class="sticky top-0 z-10">
              <tr class="bg-gray-100 text-left">
                <For each={props.headers}>
                  {(header) => (
                    <th class={`${cellPadding} font-semibold border-b-2 border-gray-300`}>{header}</th>
                  )}
                </For>
              </tr>
            </thead>
            <tbody>
              <For each={visibleRows()}>
                {(row) => (
                  <tr class="hover:bg-gray-50 border-b border-gray-200" style={{ height: `${rowHeight}px` }}>
                    <For each={props.headers}>
                      {(header) => (
                        <td class={`${cellPadding} border-gray-200`}>
                          {row[header] !== undefined ? row[header] : ''}
                        </td>
                      )}
                    </For>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="mt-4 text-sm text-gray-500">
        <p>Scorrere per visualizzare più righe</p>
      </div>
    </div>
  );
}
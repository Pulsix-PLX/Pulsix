// src/components/ColumnMapper.tsx
import { createSignal, For, Show } from "solid-js";
import { DragDropProvider, DragDropSensors, DragOverlay, createDraggable, createDroppable } from "@thisbeyond/solid-dnd";

// Definizione delle interfacce
interface DbColumn {
  name: string;
  required: boolean;
  description: string;
}

// Le colonne del database (da personalizzare in base al tuo schema)
const DB_COLUMNS: DbColumn[] = [
  { name: "date", required: true, description: "Data della transazione" },
  { name: "description", required: true, description: "Descrizione della transazione" },
  { name: "amount", required: true, description: "Importo" },
  { name: "category", required: false, description: "Categoria" },
  { name: "notes", required: false, description: "Note aggiuntive" },
];

interface ColumnMapperProps {
  csvHeaders: string[];
  onMappingComplete: (mapping: Record<string, string>) => void;
}

export default function ColumnMapper(props: ColumnMapperProps) {
  const [mappings, setMappings] = createSignal<Record<string, string>>({});
  const [activeDraggable, setActiveDraggable] = createSignal<string | null>(null);

  // Una funzione per gestire il drag and drop
  const handleDragEnd = (event: any) => {
    const { draggable, droppable } = event;
    
    if (droppable) {
      // Aggiorna lo stato di mappatura
      setMappings(prev => {
        // Prima rimuovi eventuali mappature precedenti per questa colonna DB
        const newMappings = { ...prev };
        
        // Trova e rimuovi la mappatura precedente se esiste
        Object.keys(newMappings).forEach(csvCol => {
          if (newMappings[csvCol] === droppable.id) {
            delete newMappings[csvCol];
          }
        });
        
        // Aggiungi la nuova mappatura
        newMappings[draggable.id] = droppable.id;
        
        return newMappings;
      });
    }
    
    setActiveDraggable(null);
  };

  const isDbColumnMapped = (dbColumnName: string) => {
    return Object.values(mappings()).includes(dbColumnName);
  };

  const getMappedCsvColumn = (dbColumnName: string) => {
    const entries = Object.entries(mappings());
    const found = entries.find(([_, dbCol]) => dbCol === dbColumnName);
    return found ? found[0] : null;
  };

  const handleSubmit = () => {
    // Verifica che tutti i campi obbligatori abbiano un mapping
    const requiredColumns = DB_COLUMNS.filter(col => col.required).map(col => col.name);
    const missingRequired = requiredColumns.filter(col => !isDbColumnMapped(col));
    
    if (missingRequired.length > 0) {
      alert(`Mancano mappature per i seguenti campi obbligatori: ${missingRequired.join(", ")}`);
      return;
    }
    
    // Invia il mapping completo al genitore
    props.onMappingComplete(mappings());
  };

  const removeMappingForDbColumn = (dbColumnName: string) => {
    const csvColumn = getMappedCsvColumn(dbColumnName);
    if (csvColumn) {
      setMappings(prev => {
        const newMappings = { ...prev };
        delete newMappings[csvColumn];
        return newMappings;
      });
    }
  };
  
  return (
    <div class="p-4 border rounded mb-4">
      <h2 class="text-xl font-bold mb-4">Mappa le colonne</h2>
      <p class="mb-4 text-gray-600">
        Trascina le colonne del CSV nella corrispondente colonna del database.
      </p>
      
      <DragDropProvider onDragEnd={handleDragEnd}>
        <DragDropSensors>
          <div class="flex flex-col md:flex-row gap-8">
            {/* Colonne CSV (sorgente) */}
            <div class="w-full md:w-1/2">
              <h3 class="font-bold mb-2">Colonne del CSV</h3>
              <div class="space-y-2">
                <For each={props.csvHeaders}>
                  {(header) => {
                    const draggable = createDraggable(header);
                    const isMapped = Object.keys(mappings()).includes(header);
                    
                    return (
                      <div
                        draggable
                        class={`p-3 border rounded cursor-move ${
                          isMapped ? "bg-gray-100 opacity-50" : "bg-white hover:bg-blue-50"
                        }`}
                        classList={{ "opacity-50": activeDraggable() === header }}
                      >
                        {header}
                        {isMapped && (
                          <span class="ml-2 text-sm text-green-600">
                            → {mappings()[header]}
                          </span>
                        )}
                      </div>
                    );
                  }}
                </For>
              </div>
            </div>
            
            {/* Colonne DB (destinazione) */}
            <div class="w-full md:w-1/2">
              <h3 class="font-bold mb-2">Colonne del Database</h3>
              <div class="space-y-2">
                <For each={DB_COLUMNS}>
                  {(column) => {
                    const droppable = createDroppable(column.name);
                    const isMapped = isDbColumnMapped(column.name);
                    const mappedColumn = getMappedCsvColumn(column.name);
                    
                    return (
                      <div class="mb-4">
                        <div
                          
                          class={`p-3 border rounded min-h-[60px] ${
                            isMapped
                              ? "bg-green-50 border-green-500"
                              : "bg-gray-50 hover:bg-gray-100"
                          }`}
                        >
                          <div class="flex justify-between items-center">
                            <div>
                              <span class="font-medium">{column.name}</span>
                              {column.required && (
                                <span class="text-red-500 ml-1">*</span>
                              )}
                            </div>
                            
                            {isMapped && (
                              <button
                                type="button"
                                onClick={() => removeMappingForDbColumn(column.name)}
                                class="text-red-500 hover:text-red-700"
                              >
                                ×
                              </button>
                            )}
                          </div>
                          
                          <div class="text-sm text-gray-600">{column.description}</div>
                          
                          {isMapped && (
                            <div class="mt-2 font-medium text-green-600">
                              Mappato: {mappedColumn}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }}
                </For>
              </div>
            </div>
          </div>
          
          <DragOverlay>
            {activeDraggable() && (
              <div class="p-3 border rounded bg-blue-100 opacity-80">
                {activeDraggable()}
              </div>
            )}
          </DragOverlay>
        </DragDropSensors>
      </DragDropProvider>
      
      <div class="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Conferma mappatura e continua
        </button>
      </div>
    </div>
  );
}
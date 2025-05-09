import { createSignal, onMount } from 'solid-js';
import Input from '~/components/Inputs/Inputs';
import { SetForm, SetFormValues } from '~/GlobalStores/FormStore';
import { getWallets } from '~/routes/API/Wallets/getWallets.server';
import { getUserId } from '~/Server/auth.server';
interface ProcessedWalletItem {
  id: number;
  wallet: string;
  path: string;
  type?: string; // Manteniamo il tipo per il filtraggio
  container_id?: number | null; // Utile per debug o logica futura
}

interface WalletData {
  id: number;
  wallet_name: string;
  container_id?: number | null;
  balance?: number; // Aggiungo altre proprietà opzionali che potresti avere
  currency?: string;
  color?: string;
  type?: string; // <<< Proprietà importante per la nuova logica
  // ... altre proprietà
}

export default function PathWallets() {
  const [userId, setUserId] = createSignal<number | null>(null);
  const [rawData, setRawData] = createSignal<WalletData[] | undefined>(undefined); // Tipizzazione più specifica
  const [walletPaths, setWalletPaths] = createSignal<string[]>([]);
  const [walletIds, setWalletIds] = createSignal<number[]>([]);

  // Caricamento path wallets
  onMount(async () => {
    SetForm({});
    SetFormValues({});
    try {
      const id = await getUserId();
      if (id === undefined || id === null) {
        console.warn('[onMount] getUserId ha restituito null/undefined.');
        setUserId(null);
        setRawData(undefined);
        setWalletPaths([]);
        setWalletIds([]);
      } else {
        setUserId(id);
        const fetchedData = await getWallets(id); // getWallets dovrebbe restituire WalletData[]
        setRawData(fetchedData);

        const currentRawData = rawData();

        if (!currentRawData || !Array.isArray(currentRawData)) {
          console.warn('[onMount] Dati non validi o non presenti.');
          setWalletPaths([]);
          setWalletIds([]);
          return;
        }

        const processedItemsMap = new Map<number, ProcessedWalletItem>(); // Mappa per trovare genitori velocemente
        const allItemsProcessed: ProcessedWalletItem[] = []; // Array per contenere TUTTI gli elementi processati (anche container)

        // --- Fase 1: Processa TUTTI gli elementi per costruire percorsi e mappa ---
        currentRawData.forEach((w: WalletData) => {
          // Controllo validità di base
          if (
            !w ||
            typeof w !== 'object' ||
            w.id === undefined ||
            w.id === null ||
            !w.wallet_name
          ) {
            console.warn('Elemento non valido o incompleto, saltato:', w);
            return;
          }

          let processedItem: ProcessedWalletItem | null = null;
          let currentPath: string;

          // Determina il percorso
          if (w.container_id === null || w.container_id === undefined) {
            // Elemento Top-Level
            currentPath = w.wallet_name;
          } else {
            // Elemento Figlio - cerca il genitore nella mappa
            const parent = processedItemsMap.get(w.container_id);
            if (parent) {
              currentPath = `${parent.path}/${w.wallet_name}`;
            } else {
              // Genitore non trovato (orfano o dati non ordinati correttamente all'origine)
              console.warn(
                `Genitore con id '${w.container_id}' non trovato per '${w.wallet_name}' (id: ${w.id}). Sarà trattato come orfano.`
              );
              currentPath = `__ORPHANED__/${w.wallet_name}`;
            }
          }

          // Crea l'oggetto processato (includendo il tipo originale)
          processedItem = {
            id: w.id,
            wallet: w.wallet_name,
            path: currentPath,
            type: w.type, // <<< Assicurati che 'type' esista nei dati da getWallets
            container_id: w.container_id,
          };

          // Aggiungi TUTTI gli elementi processati alla lista temporanea e alla mappa
          allItemsProcessed.push(processedItem);
          processedItemsMap.set(processedItem.id, processedItem);
        });

        // --- Fase 2: Filtra, Ordina e Estrai i dati finali ---

        // 1. Filtra: Escludi gli elementi di tipo 'container'
        const finalItemsToDisplay = allItemsProcessed.filter((item) => item.type !== 'container');

        // 2. Ordina: Ordina gli elementi filtrati in base al percorso per ottenere l'ordine gerarchico
        finalItemsToDisplay.sort((a, b) => {
          // localeCompare è robusto per l'ordinamento di stringhe che rappresentano percorsi
          return a.path.localeCompare(b.path);
        });

        // 3. Estrai: Crea gli array finali di path e id dagli elementi filtrati e ordinati
        const finalPaths = finalItemsToDisplay.map((item) => item.path);
        const finalIds = finalItemsToDisplay.map((item) => item.id);

        // --- Fase 3: Aggiorna i segnali ---
        setWalletPaths(finalPaths);
        setWalletIds(finalIds);

        console.log('Paths Ordinati (no container):', walletPaths());
        console.log('IDs Ordinati (no container):', walletIds());
      }
    } catch (error) {
      console.error('[onMount] Errore durante recupero dati o elaborazione:', error);
      setUserId(null);
      setRawData(undefined);
      setWalletPaths([]);
      setWalletIds([]);
    }
  });
  return (
    <>
      {/* Wallet */}
      <Input
        type="select"
        name="walletId"
        options={walletPaths()}
        values={walletIds()}
        placeholder="Wallet"
        class="ml-30"
        required
      />
    </>
  );
}

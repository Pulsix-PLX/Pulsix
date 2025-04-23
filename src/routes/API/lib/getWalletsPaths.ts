import type { APIEvent } from '@solidjs/start/server';
import { json } from '@solidjs/router';
import { getUserId } from '~/Server/auth.server';
import { getWallets } from '../Wallets/getWallets.server';

// Interfacce dati in ingresso (devono corrispondere a getWallets)
interface WalletData {
  id: number;
  wallet_name: string;
  container_id?: number | null;
  type?: string;
}

// Interfaccia interna per l'elaborazione
interface ProcessedWalletItem {
  id: number;
  wallet: string;
  path: string;
  type?: string;
  container_id?: number | null;
}

// Interfaccia per l'oggetto restituito nell'array finale
interface WalletPathId {
  id: number;
  path: string;
}

export async function POST(event: APIEvent) {
  'use server';

  try {
    const id = await getUserId();
    if (id === undefined || id === null) {
      return json(
        { success: false, message: 'Utente non autenticato.' },
        { status: 401 }
      );
    }

    const currentRawData: WalletData[] | undefined = await getWallets(id);

    if (!currentRawData || !Array.isArray(currentRawData)) {
      console.warn(`[API Endpoint] Nessun dato wallet trovato o formato non valido per user id: ${id}.`);
      // Restituisce un array vuoto di wallet
      return json(
        { success: true, wallets: [] }, // Modificato qui
        { status: 200 }
      );
    }

    const processedItemsMap = new Map<number, ProcessedWalletItem>();
    const allItemsProcessed: ProcessedWalletItem[] = [];

    // Fase 1: Processa TUTTI gli elementi (Invariato)
    currentRawData.forEach((w: WalletData) => {
       if (!w || typeof w !== 'object' || w.id === undefined || w.id === null || !w.wallet_name || typeof w.wallet_name !== 'string') {
        console.warn('[API Endpoint] Elemento wallet non valido o incompleto, saltato:', w);
        return;
      }
      let currentPath: string;
      if (w.container_id === null || w.container_id === undefined) {
        currentPath = w.wallet_name;
      } else {
        const parent = processedItemsMap.get(w.container_id);
        if (parent) {
          currentPath = `${parent.path}/${w.wallet_name}`;
        } else {
           console.warn(
            `[API Endpoint] Genitore con id '${w.container_id}' non trovato per '${w.wallet_name}' (id: ${w.id}). Sarà trattato come orfano.`
          );
          currentPath = `__ORPHANED__/${w.wallet_name}`;
        }
      }
      const processedItem: ProcessedWalletItem = {
        id: w.id,
        wallet: w.wallet_name,
        path: currentPath,
        type: w.type,
        container_id: w.container_id,
      };
      allItemsProcessed.push(processedItem);
      processedItemsMap.set(processedItem.id, processedItem);
    });

    // Fase 2: Filtra e Ordina (Invariato)
    const finalItemsToDisplay = allItemsProcessed
      .filter((item) => item.type !== 'container')
      .sort((a, b) => a.path.localeCompare(b.path));

    // --- MODIFICA QUI ---
    // Fase 3: Estrai: Crea l'array finale di oggetti { id, path }
    const walletsWithPathAndId: WalletPathId[] = finalItemsToDisplay.map((item) => ({
      id: item.id,
      path: item.path,
      // Puoi aggiungere altre proprietà qui se necessario, es: item.wallet per il nome semplice
    }));
    // --- FINE MODIFICA ---

    // 4. Restituisci il risultato JSON con la nuova struttura
    // Usiamo una chiave 'wallets' per contenere l'array di oggetti
    return json(
      { success: true, wallets: walletsWithPathAndId },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('[API Endpoint: POST /tuo/percorso] Errore durante elaborazione:', error);
    return json(
      { success: false, message: 'Errore interno del server durante l\'elaborazione dei wallet.' },
      { status: 500 }
    );
  }
}

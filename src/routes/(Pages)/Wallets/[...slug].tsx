import { createResource, createSignal, For, Match, onMount, Switch, Show, createMemo } from 'solid-js'; // Aggiunto Show e createMemo
import Title from '~/components/Title';
import { getWallets, getWalletsContainer } from '~/routes/API/Wallets/getWallets.server';
import { getUser, getUserId } from '~/Server/auth.server';
import type { wallet } from '~/Server/types/wallet'; // Importa il tipo
import Card from './_components/cardHolder/Card/Card';
import CardContainer, { card } from './_components/cardHolder';
import Wallet from './_components/Wallet';
import { A, useLocation, useParams } from '@solidjs/router';
import { setWalletId, walletid } from '.';

export default function Container() {
  const [userId, setUserId] = createSignal<number | null>(null);

  /// --- recupero l'ID utente immediatamente --- ///
  onMount(async () => {
    const id = await getUserId();
    setUserId(id);
  });
  const params = useParams();

  // --- Memo per calcolare l'ID del container corrente dallo slug ---
  // Questo ci serve per filtrare i dati da visualizzare
  const currentContainerId = createMemo<number | null>(() => {
    const fullSlug = params.slug ?? "";
    const segments = fullSlug.split('/');
    // Prendiamo l'ultimo segmento NON VUOTO (gestisce trailing slash)
    const lastValidSegment = segments.filter(s => s !== '').pop();
    const segmentAsInteger = parseInt(lastValidSegment || "", 10); // Usa "" se non c'è ultimo segmento valido
    const id = !isNaN(segmentAsInteger) ? segmentAsInteger : null;
    console.log("Memo [currentContainerId]: Calculated from slug:", fullSlug, "->", id);
    return id;
  }, null); // Valore iniziale null

  /// --- Recupero wallets in base allo slug (ottiene Livello N + Livello N+1 wallets) ---
  const [data, { mutate, refetch }] = createResource(
    // La source dipende ancora da userId e params.slug per triggerare il fetch
    () => ({
      userId: userId(),
      slug: params.slug
    }),
    // Il fetcher chiama la funzione server aggiornata
    async ({ userId, slug }) => {
      if (!userId) {
        console.log("Fetcher: User ID non disponibile, skip fetch.");
        return undefined;
      }
       // Ricalcoliamo l'ID qui specificamente per il fetch, usando la stessa logica del memo
       const fullSlug = slug ?? "";
       const segments = fullSlug.split('/');
       const lastValidSegment = segments.filter(s => s !== '').pop();
       const segmentAsInteger = parseInt(lastValidSegment || "", 10);
       const containerIdForFetch = !isNaN(segmentAsInteger) ? segmentAsInteger : null;
       console.log(`Workspaceer: Calling getWalletsContainer for User ID: ${userId}, Container ID: ${containerIdForFetch}`);

      // Chiama la funzione fetcher API aggiornata (che restituisce N e N+1)
      return getWalletsContainer(userId, containerIdForFetch);
    }
  );

  /// --- Funzione getCards (invariata) ---
  ///      Filtra l'array completo `data()` per trovare i figli di un container specifico
  function getCards(parentId: number): card[] {
    // console.log(`getCards: called for parentId ${parentId}`);
    const allData = data();
    if (!allData) return [];
    const filteredCards = allData
      .filter((wallet: wallet) => wallet.container_id == parentId && wallet.type == 'wallet') // Assicurati sia un wallet!
      .map((wallet: wallet): card => ({ // Usa map per trasformare
        color: wallet.color,
        wallet: wallet.wallet_name,
        balance: wallet.balance,
      }));
    // console.log(`getCards: found ${filteredCards.length} cards for parentId ${parentId}`);
    return filteredCards;
  }


  /// --- Funzione createWalletPath (invariata) ---
  const createWalletPath = (currentPath: string, walletId: number | string): string => {
    const basePath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
    return `${basePath}/${walletId}`;
  };

  const location = useLocation();
  const currentPathname = location.pathname;

  // --- Memo per Filtrare i Dati da Visualizzare nella Griglia Principale ---
  //    Questo memo prende l'array completo `data()` e restituisce solo
  //    gli elementi il cui `container_id` corrisponde al `currentContainerId` calcolato dallo slug.
  const displayData = createMemo(() => {
    const allFetchedData = data(); // Dati combinati (N e N+1)
    const targetLevelId = currentContainerId(); // ID del livello N (o null per root)

    if (!allFetchedData) {
        console.log("Memo [displayData]: No fetched data available.");
        return [];
    }
     console.log(`Memo [displayData]: Filtering for targetLevelId: ${targetLevelId}`);
    // Filtra per tenere solo gli elementi del livello N
    const filtered = allFetchedData.filter(wallet => wallet.container_id === targetLevelId);
    console.log(`Memo [displayData]: Found ${filtered.length} items for current level.`);
    return filtered;
  });

  return (
    <>
      <Show when={data.loading}><div>Caricamento...</div></Show>
      <Show when={data.error}><div>Errore nel caricamento: {data.error?.message}</div></Show>
      <Switch>
        {/* Usa !data.loading invece di data() per mostrare la griglia anche se vuota */}
        <Match when={!data.loading && !data.error}>
          <div class={`ml-[13vw] mt-[20vw] grid grid-cols-3 gap-x-0 gap-y-300`}>
            {/* Containers -> Itera su displayData (solo livello N) */}
            <For each={displayData()}>
              {(wallet: wallet, i) => (
                <Switch>
                  <Match when={wallet.type == 'container'}>
                    <A class="z-30" href={createWalletPath(currentPathname, wallet.id)} onclick={() => {/*...*/ }}>
                      {/* getCards continua a usare l'array completo data() per trovare i figli N+1 */}
                      <CardContainer data={getCards(wallet.id)} id={wallet.id} name={wallet.wallet_name}></CardContainer>
                    </A>
                  </Match>
                </Switch>
              )}
            </For>
            {/* Wallets -> Itera su displayData (solo livello N) */}
            <For each={displayData()}>
              {(wallet: wallet, i) => (
                <Switch>
                  <Match when={wallet.type == 'wallet'}>
                    <div class="mb-50 mt-50 z-50">
                      <Wallet name={wallet.wallet_name}></Wallet>
                    </div>
                  </Match>
                </Switch>
              )}
            </For>
          </div>
        </Match>
      </Switch>
    </>
  );
}
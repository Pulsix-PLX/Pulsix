import { A, useLocation, useParams } from '@solidjs/router';
import {
  createMemo,
  createResource,
  createSignal,
  For,
  Match,
  onMount,
  Show,
  Switch,
} from 'solid-js';
import Title from '~/components/Title';
import { getWalletName, getWalletsContainer } from '~/routes/API/Wallets/getWallets.server';
import { getUserId } from '~/Server/auth.server';
import type { wallet } from '~/Server/types/wallet';
import { setWalletId } from '.';
import Card from './_components/Card';
import CardContainer, { card, edit } from './_components/cardHolder';
import Wallet from './Wallet';
import { calculateConvertedTotal } from '~/routes/API/exchangeRates/exchangeRates';
import SetWallet from './_components/SetWallet';
import { getWallet } from '~/routes/API/Wallets/getWallet';

// Tipo per l'input del fetcher
type ResourceSourceInput = {
  userId: number; // Garantito not-null quando il fetcher parte
  containerId: number | null;
};
type WalletNameInfo = {
  wallet_name: string;
  type: 'container' | 'wallet';
};
type CombinedItemInfo = {
  name: string | null;
  type: 'container' | 'wallet' | null;
  content: wallet[] | null;
  wallet?: any;
};

export default function Container() {
  const [userId, setUserId] = createSignal<number | null>(null);

  // --- Recupero userId
  onMount(async () => {
    try {
      const id = await getUserId();
      if (id === undefined || id === null) {
        console.warn('[onMount] getUserId ha restituito null/undefined.');
        setUserId(null);
      } else {
        setUserId(id);
      }
    } catch (error) {
      console.error('[onMount] Errore durante recupero userId:', error);
      setUserId(null);
    }
  });

  // --- Calculate CurrentContainerId from slug
  const params = useParams();
  const currentContainerId = createMemo<number | null>(() => {
    const fullSlug = params.slug ?? '';
    const segments = fullSlug.split('/');
    const lastValidSegment = segments.filter((s) => s !== '').pop();
    const segmentAsInteger = parseInt(lastValidSegment || '', 10);
    const id = !isNaN(segmentAsInteger) ? segmentAsInteger : null;
    return id;
  }, null);

  // --- unique resource for name, type, content

  const [combinedData] = createResource(
    // Source: userId e currentContainerId e edit()
    (): ResourceSourceInput | null | false => {
      const uId = userId();
      const cId = currentContainerId();
      const a = edit();
      if (uId !== null && uId !== undefined) {
        return { userId: uId, containerId: cId };
      } else {
        return null;
      }
    },

    // Fetcher
    async (sourceInput: ResourceSourceInput): Promise<CombinedItemInfo | undefined> => {
      const { userId, containerId: itemId } = sourceInput;

      try {
        let itemName: string | null = null;
        let itemType: 'container' | 'wallet' | null = null;
        let itemContent: wallet[] | null  = null;
        let wallet: any = null; // Initialize wallet as null
        if (itemId === null) {
          // Case Root unused
          itemName = 'My Wallets';
          itemType = 'container';
          console.log('[Fetcher Updated] Caso ROOT, recupero contenuto...');
          itemContent = (await getWalletsContainer(userId, null)) ?? [];
        } else {
          // Case Item: get name and type
          const nameTypeResult: WalletNameInfo[] = await getWalletName(itemId); //return name and type

          if (nameTypeResult && nameTypeResult.length > 0) {
            const itemInfo = nameTypeResult[0];
            itemName = itemInfo.wallet_name;
            itemType = itemInfo.type; // <-- Ecco il tipo!

            // Get only if it is a container
            if (itemType === 'container') {
              itemContent = (await getWalletsContainer(userId, itemId)) ?? [];
            } else {
              console.log(`[Fetcher Updated] È ${itemType}, non recupero contenuto.`);
            }
            // Get only if it is a wallet
            if (itemType === 'wallet') {
              wallet = (await getWallet(itemId)) ?? [];
            } else {
              console.log(`[Fetcher Updated] È ${itemType}, non recupero contenuto.`);
            }
          } else {
            console.warn(`[Fetcher Updated] Item non trovato per ID: ${itemId}`);
            itemName = 'Elemento Non Trovato';
          }
        }

        const result: CombinedItemInfo = { name: itemName, type: itemType, content: itemContent, wallet:wallet };
        return result;
      } catch (error) {
        console.error('[Fetcher Updated] Errore:', error);
        throw error;
      }
    }
  );

  // --- Funzioni Ausiliarie (getCards, displayData, createWalletPath) ---

  //Get cards for cardHolder
  function getCards(parentId: number): card[] {
    const allDataContent = combinedData()?.content;
    if (!allDataContent) return [];
    const filteredCards = allDataContent
      .filter((w) => w.container_id === parentId && w.type === 'wallet')
      .map(
        (w): card => ({
          color: w.color,
          wallet: w.wallet_name,
          balance: w.balance,
          currency: w.currency,
          id: w.id,
        })
      );
    return filteredCards;
  }

  //filter for only the wallets/containers that are in the current container
  const displayData = createMemo(() => {
    const allFetchedContent = combinedData()?.content;
    const targetLevelId = currentContainerId();
    if (!allFetchedContent) return [];
    const filtered = allFetchedContent.filter((w) => w.container_id === targetLevelId);
    return filtered;
  });

  //path creation
  const createWalletPath = (currentPath: string, walletId: number | string): string => {
    const basePath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
    return `${basePath}/${walletId}`;
  };

  const location = useLocation();
  const currentPathname = location.pathname;

  /// --- Converted total current container ---

  // Base currency for conversion
  const TARGET_DISPLAY_CURRENCY = 'EUR';

  const [convertedTotalData] = createResource(
    () => ({
      containerId: currentContainerId(),
      targetCurrency: TARGET_DISPLAY_CURRENCY,
      edit: edit(),
    }),

    async (sourceData) => {
      const { containerId, targetCurrency } = sourceData;

      try {
        const userId = await getUserId();
        if (userId === null) {
          throw new Error('Utente non autenticato per calcolo totale.');
        }

        const result = await calculateConvertedTotal(containerId, targetCurrency, userId);
        return result;
      } catch (error) {
        console.error(
          `[ConvertedTotalResource] Error fetching/calculating total for container ${containerId}:`,
          error
        );
        throw error;
      }
    }
  );

  return (
    <>
      <Show when={combinedData.state === 'ready'} fallback={<Title title={'Loading title...'} />}>
        <Title title={combinedData()?.name ?? 'Wallet'} />
      </Show>
      {/* Error data */}
      <Show when={combinedData.error}>
        <div class="text-red-500 ml-[13vw] mt-2">
          Error loading data: {combinedData.error.message}
        </div>
      </Show>

      {/* Loading data */}
      <Show when={combinedData.loading || combinedData.state === 'unresolved'}>
        <div class="ml-[13vw] mt-5">Loading...</div>
      </Show>

      {/* Container */}
      <Show when={combinedData()?.type === 'container'}>
        {/* Total */}
        <p class="CM mt-100">
          {(convertedTotalData()?.total_balance ?? 0).toLocaleString('it-IT', {
            style: 'currency',
            currency: convertedTotalData()?.currency_code ?? TARGET_DISPLAY_CURRENCY,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <Switch>
          {/* Data avaible */}
          <Match when={combinedData.state === 'ready' && combinedData() && edit() == null}>
            <div class={`ml-[13vw] mt-[20vw] grid grid-cols-3 gap-x-0 gap-y-300`}>
              {/* Containers */}
              <For each={displayData().filter((item) => item.type === 'container')}>
                {(container: wallet) => (
                  <CardContainer
                    data={getCards(container.id)}
                    id={container.id}
                    name={container.wallet_name}
                    currency={container.currency}
                    href={createWalletPath(currentPathname, container.id)}
                    onclick={() => {
                      setWalletId(container.id);
                    }}
                  />
                )}
              </For>
              {/* Cards */}
              <For each={displayData().filter((item) => item.type === 'wallet')}>
                {(wallet: wallet) => (
                  <div class="mb-50 mt-50 z-50 px-2">
                    <Card
                      name={wallet.wallet_name}
                      balance={wallet.balance}
                      currency={wallet.currency}
                      nation={wallet.nation}
                      category={wallet.category_id}
                      color={wallet.color}
                      href={createWalletPath(currentPathname, wallet.id)}
                      onClick={() => setWalletId(wallet.id)}
                      id={wallet.id}
                    />
                  </div>
                )}
              </For>
            </div>
            {/* Container empty */}
            <Show when={displayData().length === 0 && combinedData.state === 'ready'}>
              <div class="CM mt-400 text-gray-500">Nothing in this container</div>
            </Show>
          </Match>
          <Match when={edit()}>
            <SetWallet />
          </Match>
        </Switch>
      </Show>

      {/* Wallet */}
      <Show when={combinedData()?.type === 'wallet'}>
        <Wallet
          id={combinedData()?.wallet?.id}
          wallet_name={combinedData()?.wallet?.wallet_name ?? 'null'}
          currency={combinedData()?.wallet?.currency ?? 'null'}
          category_id={combinedData()?.wallet?.category_id ?? 0}
          nation={combinedData()?.wallet?.nation ?? 'null'}
          balance={combinedData()?.wallet?.balance ?? 0}
          type={combinedData()?.wallet?.type ?? 'wallet'}
          description={combinedData()?.wallet?.description ?? ''}
          user_id={combinedData()?.wallet?.user_id ?? 0}
          date_of_add={new Date()}
          container_id={combinedData()?.wallet?.container_id ?? 0}
          color={combinedData()?.wallet?.color ?? 'null'}
        ></Wallet>
      </Show>
    </>
  );
}

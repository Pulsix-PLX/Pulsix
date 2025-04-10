import { A } from '@solidjs/router';
import { createResource, createSignal, For, Match, onMount, Show, Switch } from 'solid-js';
import Title from '~/components/Title';
import { getWallets } from '~/routes/API/Wallets/getWallets.server';
import { getUserId } from '~/Server/auth.server';
import type { wallet } from '~/Server/types/wallet'; // Importa il tipo
import Card from './_components/Card';
import CardContainer, { card, edit } from './_components/cardHolder';
import {
  calculateConvertedTotal,
  getConversionRate,
} from '~/routes/API/exchangeRates/exchangeRates';
import { ThreeDCardDemo } from '~/components/3dImageRotation/prova';
import './index.scss';
import SetWallet from './_components/SetWallet';
export const [walletid, setWalletId] = createSignal<number | null>(null);
export const [walletName, setWalletName] = createSignal<string | null>(null);
export default function Wallets() {
  const [userId, setUserId] = createSignal<number | null>(null);

  onMount(async () => {
    const id = await getUserId();
    setUserId(id);
  });

  const [data, { mutate, refetch }] = createResource(
    () => {
      // Restituisce un oggetto contenente tutti i segnali trigger
      return {
        user: userId(),
        editState: edit() // Includi lo stato di edit
      };
    },
    async (sourceData) => {
       return getWallets(sourceData.user!);

    }
  );

  function getCards(id: number) {
    const cards: card[] = [];
    data()
      ?.filter((wallet: wallet) => wallet.container_id == id && wallet.type == 'wallet')
      .forEach((wallet: wallet) => {
        cards.push({
          color: wallet.color,
          wallet: wallet.wallet_name,
          balance: wallet.balance,
          currency: wallet.currency,
          position: cards.length,
          id: wallet.id,
        });
      });
    return cards;
  }

  /// --- Converted total current container ---

  // Base currency for conversion
  const TARGET_DISPLAY_CURRENCY = 'EUR';

  const [Total] = createResource(
    () => ({
      containerId: null,
      targetCurrency: TARGET_DISPLAY_CURRENCY,
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
      <Title title="Wallets"></Title>
      {/* Total */}
      <p class="CM mt-100">
        {(Total()?.total_balance ?? 0).toLocaleString('it-IT', {
          style: 'currency',
          currency: Total()?.currency_code ?? TARGET_DISPLAY_CURRENCY,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
      <Switch>
        <Match when={data() && edit() == null}>
          <div class={`ml-[13vw] mt-[20vw] grid grid-cols-3 gap-x-0 gap-y-300`}>
            {/* Containers before */}
            <For each={data()}>
              {(wallet: wallet, i) => (
                <Switch>
                  <Match when={wallet.type == 'container' && wallet.container_id == null}>
                    <CardContainer
                      data={getCards(wallet.id)}
                      id={wallet.id}
                      name={wallet.wallet_name}
                      currency={wallet.currency}
                      href={`/wallets/${wallet.id}`}
                      onclick={() => {
                        setWalletId(wallet.id);
                      }}
                    ></CardContainer>
                  </Match>
                </Switch>
              )}
            </For>
            {/* Wallets after */}
            <For each={data()}>
              {(wallet: wallet, i) => (
                <Switch>
                  <Match when={wallet.type == 'wallet' && wallet.container_id == null}>
                      <Card
                        balance={wallet.balance}
                        name={wallet.wallet_name}
                        nation={wallet.nation}
                        currency={wallet.currency}
                        category={wallet.category_id}
                        color={wallet.color}
                        href={`/wallets/${wallet.id}`}
                        onClick={() =>setWalletId(wallet.id)}
                        id={wallet.id}
                      ></Card>
                  </Match>
                </Switch>
              )}
            </For>
          </div>
        </Match>
        <Match when={edit()}>
          <SetWallet></SetWallet>
        </Match>
      </Switch>
    </>
  );
}

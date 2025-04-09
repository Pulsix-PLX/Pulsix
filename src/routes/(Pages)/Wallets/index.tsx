import { A } from '@solidjs/router';
import { createResource, createSignal, For, Match, onMount, Switch } from 'solid-js';
import Title from '~/components/Title';
import { getWallets } from '~/routes/API/Wallets/getWallets.server';
import { getUserId } from '~/Server/auth.server';
import type { wallet } from '~/Server/types/wallet'; // Importa il tipo
import Card from './_components/Card';
import CardContainer, { card } from './_components/cardHolder';
import { updateExchangeRatesInDB } from '~/routes/API/exchangeRates/exchangeRates';

export const [walletid, setWalletId] = createSignal<number | null>(null);
export const [walletName, setWalletName] = createSignal<string | null>(null);
export default function Wallets() {
  const [userId, setUserId] = createSignal<number | null>(null);

  onMount(async () => {
    const id = await getUserId();
    setUserId(id);
  });

  const [data, { mutate, refetch }] = createResource(
    userId, // Source Signal
    getWallets // Fetcher Function
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
        });
      });
    return cards;
  }

  return (
    <>
      <Title title="Wallets"></Title>
      {/* Total */}
      <p class="CM mt-100">$ {data()?.reduce((sum, wallet) => sum + wallet.balance, 0)}</p>
      <Switch>
        <Match when={data()}>
          <div class={`ml-[13vw] mt-[20vw] grid grid-cols-3 gap-x-0 gap-y-300`}>
            {/* Containers before */}
            <For each={data()}>
              {(wallet: wallet, i) => (
                <Switch>
                  <Match when={wallet.type == 'container' && wallet.container_id == null}>
                    <A
                      class="z-30"
                      href={`/wallets/${wallet.id}`}
                      onclick={() => {
                        setWalletId(wallet.id);
                        console.log('walletId: ', walletid());
                      }}
                    >
                      <CardContainer
                        data={getCards(wallet.id)}
                        id={wallet.id}
                        name={wallet.wallet_name}
                        currency={wallet.currency}
                      ></CardContainer>
                    </A>
                  </Match>
                </Switch>
              )}
            </For>
            {/* Wallets after */}
            <For each={data()}>
              {(wallet: wallet, i) => (
                <Switch>
                  <Match when={wallet.type == 'wallet' && wallet.container_id == null}>

                    <A
                      class="z-30"
                      href={`/wallets/${wallet.id}`}
                      onclick={() => {
                        setWalletId(wallet.id);
                        console.log('walletId: ', walletid());
                      }}
                    >
                      <Card balance={wallet.balance} name={wallet.wallet_name}></Card>
                    </A>
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

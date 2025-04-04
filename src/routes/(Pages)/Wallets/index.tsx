import { createResource, createSignal, For, Match, onCleanup, onMount, Switch } from 'solid-js';
import Title from '~/components/Title';
import { getWallets } from '~/routes/API/Wallets/getWallets.server';
import { getUser, getUserId } from '~/Server/auth.server';
import type { wallet } from '~/Server/types/wallet'; // Importa il tipo
import Card from './_components/cardHolder/Card/Card';
import CardContainer, { card } from './_components/cardHolder';
import Wallet from './_components/Wallet';
import { A } from '@solidjs/router';


export const [walletid, setWalletId] = createSignal<number | null>(null);
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
      ?.filter((wallet: wallet) => wallet.container_id == id)
      .forEach((wallet: wallet, index: number) => {
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
      <Switch>
        <Match when={data()}>
          <div class={`ml-[13vw] mt-[30vw] grid grid-cols-3 gap-x-0 gap-y-300`}>
            {/* Containers before */}
          <For each={data()}>
          {(wallet: wallet, i) => ( 
              <Switch>
                <Match when={wallet.type == 'container' && wallet.container_id == null}>
                  <A class="z-30" href={`/wallets/${wallet.id}`} onclick={()=>{setWalletId(wallet.id); console.log('walletId: ',walletid())}}>
                    
                    <CardContainer data={getCards(wallet.id)} id={wallet.id} name={wallet.wallet_name}></CardContainer>
                   
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
                  <div class="mb-50 mt-50 z-50">
                    <Wallet></Wallet>
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


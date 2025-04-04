import { createResource, createSignal, For, Match, onCleanup, onMount, Switch } from 'solid-js';
import Title from '~/components/Title';
import { getWallets } from '~/routes/API/Wallets/getWallets.server';
import { getUser } from '~/Server/auth.server';
import type { wallet } from '~/Server/types/wallet'; // Importa il tipo
import Card from './_components/Card/Card';
import CardContainer, { card } from './_components/cardHolder';

import CardSingola from '../Wallets/_components/Card/Card'
function MyWalletComponent() {
  const [userIdSignal, setUserIdSignal] = createSignal(5);

  const [data, { mutate, refetch }] = createResource(
    () => userIdSignal(), // Source Function
    getWallets // Fetcher Function
  );

  const fixedUserId = 10;

  // CORRETTO per valore fisso (anche se () => fixedUserId è leggermente più esplicito)
  const [dataFixed, { mutate: mutateFixed, refetch: refetchFixed }] = createResource(
    () => fixedUserId, // Source function (restituisce sempre 3)
    getWallets
  );

    function getCards(id: number) {
    const cards: card[] = [];
    data()
      ?.filter((wallet: wallet) => wallet.container_id == id )
      .forEach((wallet: wallet, index:number) => {
      cards.push({
        color: '#AA5733',
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
          <div class={`ml-400 mt-200 flex flex-col gap-150`}>
            {data()?.map((wallet: wallet, index: number) => (
              
              <Switch>
                <Match when={wallet.type == 'container'}>
                  <div class='z-30'>
                    <CardContainer data={getCards(wallet.id)}></CardContainer>
                    </div>
                </Match>
                <Match when={wallet.type == 'wallet'}>
                <div class='mb-50 mt-50 z-50'>
                    <Card
                      wallet={wallet.wallet_name}
                      balance={wallet.balance}
                      color="red"
                      position={index}
                    ></Card>
                     </div>
                
                </Match>
              </Switch>
             
            ))}
             </div>
          </Match>
        </Switch>
      
    </>
  );
}

export default MyWalletComponent;

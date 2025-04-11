import { createResource, Show } from 'solid-js';
import getTransactions from '~/routes/API/Wallets/Wallet/getTransactions';
import { wallet } from '~/Server/types/wallet';
import TableWallet from './components/table.tsx';

export default function Wallet(props: wallet) {
  console.log('props', props);
  const [transactionsResource, { refetch: refetchTransactions }] = createResource(
    () => props.id,
    getTransactions
  );
  return (
    <>
      <Show when={transactionsResource()}>
        <div class="CM mt-[15vw]">
          <TableWallet
            transactions={transactionsResource()}
            refetch={refetchTransactions}
          ></TableWallet>
        </div>
      </Show>
    </>
  );
}

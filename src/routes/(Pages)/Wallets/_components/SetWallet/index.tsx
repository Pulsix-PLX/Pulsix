import { createResource, Match, Show, Switch } from 'solid-js';
import Input from '~/components/Inputs/Inputs';
import { getWallet } from '~/routes/API/Wallets/Wallet/getWallet';
import { edit, setEdit } from '../cardHolder';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';
import { setWallet } from '~/routes/API/Wallets/setWallet';

export default function SetWallet() {
  const [wallet] = createResource(
    edit(), // Source Signal
    getWallet // Fetcher Function
  );

  return (
    <>
      <Show when={wallet()}>
        <Switch>
          {/* Container */}
          <Match when={wallet()?.type == 'container'}>
          <img src="/icons/Delete.png" class=' CM w-20 h-20 mt-[27vh] ml-[11vw] z-50' onclick={()=>setEdit(null)}></img>
            <form
              action={setWallet}
              method="post"
              class="CM w-[25vw] mt-[25vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw] min-w-[280px] min-h-[200px]"
              style={{ border: '2px solid rgba(255, 255, 255, 0.3)', 'border-radius': '40px' }}
            >
              {/* Hidden for pass other parameters easely */}
              <input type="hidden" name="id" value={wallet()?.id} />
              <input type="hidden" name="type" value={wallet()?.type} />
              <Input
                type="text"
                name="walletName"
                placeholder="Wallet Name"
                defaultValue={wallet()?.wallet_name}
              />
              <Input
                type="text"
                name="category_id"
                placeholder="Category"
                defaultValue={wallet()?.category_id}
              />
              <ButtonSparkle
                text={`Set ${wallet()?.type == 'container' ? 'Container' : 'Wallet'}`}
                class="ml-[auto] mr-[auto]"
                onClick={() => setTimeout(() => setEdit(null), 500)}
              ></ButtonSparkle>
            </form>
          </Match>
          {/* Wallet */}
          <Match when={wallet()?.type == 'wallet'}>
          <img src="/icons/Delete.png" class=' CM w-20 h-20 mt-[24vh] ml-[11vw] z-50' onclick={()=>setEdit(null)}></img>
            <form
              action={setWallet}
              method="post"
              class="CM w-[25vw] mt-[22vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw]"
              style={{ border: '2px solid var(--Secondary)', 'border-radius': '40px' }}
            >
              
              <input type="hidden" name="id" value={wallet()?.id} />
              <input type="hidden" name="type" value={wallet()?.type} />
              <Input
                type="text"
                name="walletName"
                placeholder="Wallet Name"
                defaultValue={wallet()?.wallet_name}
              />
              <Input
                type="text"
                name="currency"
                placeholder="Currency"
                defaultValue={wallet()?.currency}
              />
              <Input
                type="text"
                name="category_id"
                placeholder="Category"
                defaultValue={wallet()?.category_id}
              />

              <Input
                type="text"
                name="nation"
                placeholder="nation"
                defaultValue={wallet()?.nation}
              />
              <Input type="color" name="color" placeholder="Color" defaultValue={wallet()?.color} class='ml-[41%]' />
              <ButtonSparkle
                text={`Set ${wallet()?.type == 'container' ? 'Container' : 'Wallet'}`}
                class="ml-[auto] mr-[auto]"
                size={'large'}
                onClick={() => setTimeout(() => setEdit(null), 500)}
                
              ></ButtonSparkle>
            </form>
          </Match>
        </Switch>
      </Show>
    </>
  );
}

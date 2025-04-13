import {
  createEffect,
  createResource,
  createSignal,
  lazy,
  Match,
  on,
  Show,
  Suspense,
  Switch,
  
} from 'solid-js';
import Input from '~/components/Inputs/Inputs';
import { getWallet } from '~/routes/API/Wallets/getWallet';
import { edit, setEdit } from '../cardHolder';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';
import { setWallet } from '~/routes/API/Wallets/setWallet';
import '@thednp/solid-color-picker/style.css';
import GlowButton from '~/components/Buttons/GlowButton';

import deleteWallet from '~/routes/API/Wallets/deleteWallet';
import { addWallet } from '~/routes/API/Wallets/addWallet';
const LazyDefaultColorPicker = lazy(() =>
  import('@thednp/solid-color-picker').then((module) => ({ default: module.DefaultColorPicker }))
);
export default function FormAddWallet({
  container_id,
  user_id,
}: {
  container_id: number | null;
  user_id: number | null;
}) {
  const [typeToAdd, setTypeToAdd] = createSignal<string | null>(null); // State for color
  const [typeCard, setTypeCard] = createSignal<string | null>(null); // State for color

  const [color, setColor] = createSignal('grey'); // State for color
  const [confirmDelete, setConfirmDelete] = createSignal<boolean>(false); // State for color
  const [hoverDelete, setHoverDelete] = createSignal<'cancel' | 'confirm' | null>(null); // State for color

  return (
    <>
      <Show when={edit() == -1}>
        <img
          src="/icons/Delete.png"
          class=" CM w-16 h-16 mt-[27vh] ml-[11vw] z-50"
          onclick={() => {
            setEdit(null);
            setTypeToAdd(null);
          }}
        ></img>
        <Switch>
          {/* Wallet / Container */}
          <Match when={!typeToAdd()}>
            <form
              class="CM w-[25vw] mt-[25vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw] min-w-[280px] min-h-[200px]"
              style={{ border: '3px solid rgba(255, 255, 255, 0.3)', 'border-radius': '40px' }}
              onSubmit={(e) => {
                e.preventDefault(); // Prevent default form submission
              }}
            >
              <div class="flex flex-row gap-100">
                <button onclick={() => setTypeToAdd('container')}>Container</button>
                <button onclick={() => setTypeToAdd('wallet')}>Wallet</button>
              </div>
            </form>
          </Match>

          {/* Wallet */}
          <Match when={typeToAdd() == 'wallet'}>
            <form
              action={addWallet}
              method="post"
              class="CM w-[25vw] mt-[22vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw]"
              style={{ border: `3px solid ${color()}`, 'border-radius': '40px' }}
            >
              <input type="hidden" name="type" value={typeToAdd() || 'null'} />
              <input type="hidden" name="user_id" value={user_id || 'null'} />
              <input type="hidden" name="container_id" value={container_id || 'null'} />

              <Input type="text" name="walletName" placeholder="Wallet Name" />
              <select name='currency'>
                  <option value="USD">USD</option>
                  <option value="EUR" selected>EUR</option>
                  <option value="CHF">CHF</option>
         
                </select>
              <Input type="text" name="category_id" placeholder="Category" />

              <Input type="text" name="nation" placeholder="nation" />
              <select
                name="type_ui"
                onChange={(e) => setTypeCard(e.currentTarget.value)}
                class="mb-[2vw]"
              >
                <option value="card">Card</option>
                <option value="3D">3D</option>
              </select>
              <Switch>
                <Match when={typeCard() == 'card'}>
                  <div class="color-picker-container" style={{ 'margin-bottom': '2rem' }}>
                    <Suspense fallback={<div>Loading Color Picker...</div>}>
                      <LazyDefaultColorPicker
                        value={color()}
                        onChange={(color) => setColor(color)}
                        format="hex"
                      />
                    </Suspense>
                  </div>
                </Match>
                <Match when={typeCard() == '3D'}>
                  <div style={{ 'margin-bottom': '2rem' }}>
                    <select name="color" value={'black'} onChange={(e) => setColor(e.currentTarget.value)}>
                      <option value="black">Black</option>
                      <option value="purple">Purple</option>
                    </select>
                  </div>
                </Match>
              </Switch>

              {/* Input hidden for color */}
              <input type="hidden" value={color()} name="color" />

              {/* Send */}
              <ButtonSparkle
                text={`Add Wallet`}
                class="ml-[auto] mr-[auto]"
                size={'large'}
                shadowColor={`${color()}`}
                shadow={10}
                onClick={() => setTimeout(() => setEdit(null), 500)}
              />
            </form>
          </Match>
          {/* Container */}
          <Match when={typeToAdd() == 'container'}>
            <button onclick={() => setTypeToAdd('wallet')}>Wallet</button>
          </Match>
        </Switch>
      </Show>
    </>
  );
}

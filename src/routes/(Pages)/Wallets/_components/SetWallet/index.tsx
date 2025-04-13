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
import style from './index.module.scss';
import deleteWallet from '~/routes/API/Wallets/deleteWallet';
const LazyDefaultColorPicker = lazy(() =>
  import('@thednp/solid-color-picker').then((module) => ({ default: module.DefaultColorPicker }))
);
export default function SetWallet() {
  const [wallet] = createResource(
    edit(), // Source Signal
    getWallet // Fetcher Function
  );
  const [color, setColor] = createSignal(); // State for color
  const [confirmDelete, setConfirmDelete] = createSignal<boolean>(false); // State for color
  const [hoverDelete, setHoverDelete] = createSignal<'cancel' | 'confirm' | null>(null); // State for color

  return (
    <>
      <Show when={wallet()}>
        <Switch>
          {/* Container */}
          <Match when={wallet()?.type == 'container'}>
            <img
              src="/icons/Delete.png"
              class=" CM w-20 h-20 mt-[27vh] ml-[11vw] z-50"
              onclick={() => setEdit(null)}
            ></img>
            <form
              action={setWallet}
              method="post"
              class="CM w-[25vw] mt-[25vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw] min-w-[280px] min-h-[200px]"
              style={{ border: '3px solid rgba(255, 255, 255, 0.3)', 'border-radius': '40px' }}
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
                defaultValue={wallet()?.category_id?.toString()}
              />
              <ButtonSparkle
                text={`Set ${wallet()?.type == 'container' ? 'Container' : 'Wallet'}`}
                class="ml-[auto] mr-[auto]"
                onClick={() => setTimeout(() => setEdit(null), 500)}
              ></ButtonSparkle>
              {/* Delete */}
              <button
                type="button"
                class={` text-white font-bold py-2 px-4 rounded ml-[auto] mr-[auto] mt-[1vw] ${style.buttonDelete}`}
                style={{
                  border: '2px solid red',
                  'border-radius': '20px',
                  width: '100px',
                  height: '50px',
                }}
                onClick={() => {
                  setConfirmDelete(true);
                }}
              >
                Delete
              </button>
            </form>
          </Match>
          {/* Wallet */}
          <Match when={wallet()?.type == 'wallet'}>
            <img
              src="/icons/Delete.png"
              class=" CM w-20 h-20 mt-[24vh] ml-[11vw] z-50"
              onclick={() => setEdit(null)}
            ></img>
            <form
              action={setWallet}
              method="post"
              class="CM w-[25vw] mt-[22vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw]"
              style={{ border: `3px solid ${color() || 'grey'}`, 'border-radius': '40px' }}
            >
              <input type="hidden" name="id" value={wallet()?.id} />
              <input type="hidden" name="type" value={wallet()?.type} />
              <Input
                type="text"
                name="walletName"
                placeholder="Wallet Name"
                defaultValue={wallet()?.wallet_name}
              />
              <select name='currency' value={
                     wallet()?.currency
                     }>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="CHF">CHF</option>
         
                </select>
              <Input
                type="text"
                name="category_id"
                placeholder="Category"
                defaultValue={wallet()?.category_id?.toString()}
              />

              <Input
                type="text"
                name="nation"
                placeholder="nation"
                defaultValue={wallet()?.nation}
              />
            <Switch>
              <Match when={wallet()?.type_ui == 'card'}>
              <div class="color-picker-container" style={{ 'margin-bottom': '2rem' }}>
                <Suspense fallback={<div>Loading Color Picker...</div>}>
                  <LazyDefaultColorPicker
                    value={
                      color() || wallet()?.color || '#ff000000'
                    } /* init with wallet.color then set the color and use color(). if there isn't color*/
                    onChange={(color) => setColor(color)}
                    format="hex"
                  />
                </Suspense>
              </div>
              </Match>
              <Match when={wallet()?.type_ui == '3D'}>
                <select name='color' value={
                     wallet()?.color
                    }  onChange={(e) => setColor(e.target.value)}>
                  <option value="black">Black</option>
                  <option value="purple">Purple</option>
                  {/* Add more colors as needed */}
                </select>
              </Match>
            </Switch>

              {/* Input nascosto rimane uguale */}
              <input type="hidden" value={color() || wallet()?.color || '#ff000000'} name="color" />

              {/* Send */}
              <ButtonSparkle
                text={`Set ${wallet()?.type == 'container' ? 'Container' : 'Wallet'}`}
                class="ml-[auto] mr-[auto]"
                size={'large'}
                shadowColor={`${color()}`}
                shadow={10}
                onClick={() => setTimeout(() => setEdit(null), 500)}
              />
              {/* Delete */}
              <button
                type="button"
                class={` text-white font-bold py-2 px-4 rounded ml-[auto] mr-[auto] mt-[1vw] ${style.buttonDelete}`}
                style={{
                  border: '2px solid red',
                  'border-radius': '20px',
                  width: '100px',
                  height: '50px',
                }}
                onClick={() => {
                  setConfirmDelete(true);
                }}
              >
                Delete
              </button>
            </form>
          </Match>
        </Switch>
        {/* Conbfirm delete */}
        <Show when={confirmDelete()}>
          <div class="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-40"></div>
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[17vw] w-[27vw] rounded shadow-md z-50"
            style={{
              'background-color': '#151515',
              'border-radius': '40px',
              border: `3px solid ${color() || '#ffffffff'}`,
            }}
          >
            <p class={`${style.text} text-[1.4vw] font-bold text-center`}>
              Are you sure to delete this wallet?
            </p>
            <p
              class={`${
                hoverDelete() == 'cancel'
                  ? style.textCancel
                  : hoverDelete() == 'confirm'
                  ? style.textDelete
                  : style.paragraf
              } text-[1vw] font-bold text-center mt-[2vw]`}
            >
              It will be in the trash
            </p>
            <p
              class={`${
                hoverDelete() == 'cancel'
                  ? style.textCancel
                  : hoverDelete() == 'confirm'
                  ? style.textDelete
                  : style.paragraf
              } text-[1vw] font-bold text-center mt-[0.5vw]`}
            >
              you can restore it in 30 days
            </p>
            <div class="flex flex-row justify-center items-center gap-34 mt-[3vw]">
              <ButtonSparkle
                text="Cancel"
                onClick={() => setConfirmDelete(false)}
                shadowColor={'hsl(0, 100%, 54%)'}
                onMouseEnter={() => setHoverDelete('cancel')}
                onMouseLeave={() => setHoverDelete(null)}
                shadow={10}
              />
              <ButtonSparkle
                shadowColor={'hsla(155, 100%, 50%, 0.922)'}
                text="Delete"
                shadow={10}
                onClick={async () => {
                  await deleteWallet(wallet()?.id, wallet()?.type);
                  setTimeout(() => setEdit(null), 500);
                }}
                onMouseEnter={() => setHoverDelete('confirm')}
                onMouseLeave={() => setHoverDelete(null)}
              />
            </div>
          </div>
        </Show>
      </Show>
    </>
  );
}

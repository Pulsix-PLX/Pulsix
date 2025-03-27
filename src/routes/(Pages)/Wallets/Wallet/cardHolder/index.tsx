import { createSignal, For } from 'solid-js';
import style from './index.module.scss';
import Card from './Card';
export default function CardHolder() {
  const [backCardHolderSize, setBackCardHolderSize] = createSignal(20);

  const cards = [
    {
      color: 'white',
      wallet: 'revolut',
      balance: 1000,
    },
    {
      color: 'red',
      wallet: 'revolut',
      balance: 1000,
    },
  ];
  return (
    <>
      {/* Back */}
      <img
        src="/public/img/wallets/backCardHolder.png"
        class={` ${style.backCardHolder}`}
        style={{
          height: `${backCardHolderSize()}rem`,
        }}
      />
      {/* Cards */}
      <For each={cards}>
        {(card,index) => <Card color={card.color} wallet={card.wallet} balance={card.balance} position={index()+4}/>}
      </For>
      {/* Front */}
      <img src="/public/img/wallets/frontCardHolder.png" class={`z-20 ${style.frontCardHolder}`} />
      {/* Cuciture */}
      <div id="dashed" class={`CM ml-22 -mt-5`}>
        <svg width="290" height="240" viewBox="0 0 290 240">
          <rect
            x="10"
            y="10"
            width="18.8rem"
            height={backCardHolderSize() - 1.4 + `rem`}
            rx="20"
            ry="20"
            fill="none"
            stroke="hsla(0, 0%, 73%, 0.433)"
            stroke-width="1.2"
            stroke-dasharray="10 10"
          />
        </svg>
      </div>
    </>
  );
}

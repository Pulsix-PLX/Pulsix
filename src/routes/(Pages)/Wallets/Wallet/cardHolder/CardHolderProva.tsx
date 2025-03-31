import { createSignal, For } from 'solid-js';
import style from './index.module.scss';
import Card from './Card';

export default function CardHolderProva() {
  const cards = [
    {
      color: '#FF5733', // Bright orange-red
      wallet: 'revolut',
      balance: 1000,
    },
    {
      color: '#AA5733', // Bright orange-red
      wallet: 'revolut',
      balance: 1000,
    },
  ];

  return (
    <>
     {/* Cards */}
     <For each={cards}>
        {(card, index) => (
          <Card
            color={card.color}
            wallet={card.wallet}
            balance={card.balance}
            position={index()} // Smaller increment to create overlap
          />
        )}
      </For>
      {/* Back */}
      <img
        src="/public/img/wallets/backCardHolder.png"
        class={` w-[40vh] ${style.backCardHolder}`}
        style={{
          height: `${cards.length * 4.5+15}vh`,
          "z-index":-10
        }}
      />
      {/* Front*/}
      <img src="/public/img/wallets/frontCardHolder.png" class="w-[40vh] relative -mt-82" />

      {/* Cuciture
  <svg

    viewBox="0 0 290 240"
    preserveAspectRatio="xMinYMin slice"
    class="absolute top-0 left-0 pointer-events-none"
    style={{
      height: `${cards.length * 5}vh`,
      
    }}
  >
    <rect
      x="10"
      y="10"
      width="220"
      height="220"
      rx="20"
      ry="20"
      fill="none"
      stroke="hsla(0, 0%, 73%, 0.433)"
      stroke-width="1.2"
      stroke-dasharray="10 10"
    />
  </svg>
*/}
    </>
  );
}

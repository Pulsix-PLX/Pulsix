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
    <div class="relative w-full max-w-[350px] mx-auto">
      {/* Back */}
      <img
        src="/public/img/wallets/backCardHolder.png"
        class={`w-full ${style.backCardHolder}`}
        style={{
          height: `${backCardHolderSize() * 2}%`,
        }}
      />

      {/* Front Card Holder with Overlapping Cards */}
      <div class="absolute top-[44%] left-0 w-full z-20">
        <div class="relative h-[20%]">
          <For each={cards}>
            {(card, index) => (
              <Card
                color={card.color}
                wallet={card.wallet}
                balance={card.balance}
                position={index() * 5} // Smaller increment to create overlap
              />
            )}
          </For>
        </div>

        <img
          src="/public/img/wallets/frontCardHolder.png"
          class="w-full absolute top-0 left-0"
        />
      </div>

      {/* Cuciture */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 290 240"
        preserveAspectRatio="xMidYMid meet"
        class="absolute -top-26 left-0 w-full h-full pointer-events-none"
      >
        <rect
          x="10"
          y="10"
          width="270"
          height="220"
          rx="20"
          ry="20"
          fill="none"
          stroke="hsla(0, 0%, 73%, 0.433)"
          stroke-width="1.2"
          stroke-dasharray="10 10"
        />
      </svg>
    </div>
  );
}

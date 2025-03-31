// Card.tsx
import style from './Card.module.scss';

interface CardProps {
  color: string;
  wallet: string;
  balance: number;
  position: number;
}

export default function Card(props: CardProps) {
  return (
    <div
      class={`absolute w-[38vh] h-[20vh] ml-[1vh] ${style.card}`}
      style={{
        'background-color': props.color,
        'margin-top': `-${props.position * 2}%`,
        "z-index": -props.position - 1
      }}
    >
      <div class="flex flex-col justify-between h-full p-4">
        <p class="text-white font-bold">{props.wallet}</p>
        <p class="text-white text-right">${props.balance.toLocaleString()}</p>
      </div>
    </div>
  );
}

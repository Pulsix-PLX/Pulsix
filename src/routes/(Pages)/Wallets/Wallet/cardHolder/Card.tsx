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
      class={`absolute w-full h-full border-borderRadius-md ${style.card}`}
      style={{
        'background-color': props.color,
        top: `${props.position}%`,
        'z-index':- props.position
      }}
    >
      <div class="flex flex-col justify-between h-full p-4">
        <p class="text-black font-bold">{props.wallet}</p>
        <p class="text-black text-right text-xl font-semibold">€{props.balance.toLocaleString()}</p>
      </div>
    </div>
  );
}

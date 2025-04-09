// Card.tsx

import { A } from '@solidjs/router';
import style from './Card.module.scss';
import SetWallet from '../../SetWallet';

interface CardProps {
  color: string;
  wallet: string;
  balance: number;
  position: number;
  currency:string
  id:number;
}

export default function Card(props: CardProps) {

  return (
    <>
    <A
    href={`/wallets/${props.id}`}
    class={`absolute w-[16.7vw] h-[10vw] ml-[0.5vw] ${style.card} flex justify-end items-start pr-[1vw]`} // 
    style={{
      'background-color': `${props.color}`,
      'margin-top': `-${props.position * 2 + 2}%`,
      "z-index": -props.position - 1,

    }}
  >

    <div class="">
      <p class={` ${style.name} text-${props.color=='white'?'black':'white'} text-right break-words`}>{props.wallet}</p>
      <p class={` ${style.balance} text-right`}>{props.balance}{props.currency=='USD'?'$':props.currency=='EUR'? '€': props.currency}</p>
    </div>
  </A>
  </>
  );
}

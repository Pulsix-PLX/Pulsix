import Title from '~/components/Title';
import './index.scss';
import { onMount } from 'solid-js';
import { SetForm, allInputsValid } from '~/GlobalStores/FormStore';
import Input from '~/components/Inputs/Inputs';
import CanvasAnimation from '~/routes/UI/Waves';
import CardHolder from './Wallet/cardHolder';

export default function Wallets() {
  onMount(() => {
    SetForm({});
  });

  return (
    <>
      <Title title="Wallets"></Title>
      <div class='CM ml-100'>
      <CardHolder/>
      </div>
    </>
  );
}

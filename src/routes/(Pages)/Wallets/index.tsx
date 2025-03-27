import Title from '~/components/Title';
import './index.scss';
import { onMount } from 'solid-js';
import { Form, SetForm, allInputsValid } from '~/GlobalStores/FormStore';
import Input from '~/components/Inputs/Inputs';
import CanvasAnimation from '~/routes/UI/Waves';
import CardHolder from './Wallet/cardHolder';

export default function Wallets() {
  onMount(() => {
   // SetForm({});
    console.log(Form)
  });

  return (
    <>
      <Title title="Wallets"></Title>
      <div class='CM'>
      <CardHolder/>
      </div>
    </>
  );
}

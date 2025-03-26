import Title from '~/components/Title';
import './index.scss';
import { onMount } from 'solid-js';
import { SetForm, allInputsValid } from '~/GlobalStores/FormStore';
import Input from '~/components/Inputs/Inputs';
import CanvasAnimation from '~/routes/UI/Waves';

export default function Wallets() {
  onMount(() => {
    SetForm({});
  });

  return (
    <>
      <Title title="Wallets"></Title>
    </>
  );
}

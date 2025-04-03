import { onMount } from 'solid-js';
import { Form } from '~/GlobalStores/FormStore';
import Title from '~/components/Title';
import CardHolderProva from './_components/cardHolder';
import './index.scss';

export default function Wallets() {
  onMount(() => {
    // SetForm({});
    console.log(Form);
  });

  return (
    <>
      <Title title="Wallets"></Title>
<div class='flex flex-row mt-400 ml-200'>

        <CardHolderProva></CardHolderProva>


        <CardHolderProva></CardHolderProva>

      </div>
    </>
  );
}

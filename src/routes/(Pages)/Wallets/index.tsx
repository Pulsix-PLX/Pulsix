import Title from '~/components/Title'
import './index.scss'
import { onMount } from 'solid-js';
import { SetForm,allInputsValid } from '~/GlobalStores/FormStore';
import Input from '~/components/Inputs/Inputs';


export default function Wallets() {


onMount(() => {
    SetForm({});
  });
  
  return (<>
    <Title title='Wallets'></Title>
    <form
        action={''}
        method="post"
        class='CM mt-100'
        onSubmit={(e) => {
          if (!allInputsValid()) {
            e.preventDefault();
            alert("Controlla i tuoi input!");
          }
        }}
      >
        <Input
          name="password"
          type="password"
          required={true}
          placeholder="Password"
        />
           <Input
          name="password"
          type="password"
          required={true}
          placeholder="Password"
        />
         <Input
          name="text"
          type="text"
          required={true}
          placeholder="Password"
        />
                <button type="submit" disabled={!allInputsValid()}>
          Verifica
        </button>
      </form>
      <div class='mt-110'>

      </div>
    </>
  )
}


import Input from '~/components/Inputs/Inputs';
import { onMount } from 'solid-js';
import { allInputsValid, SetForm, SetFormValues } from '~/GlobalStores/FormStore';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';

import style from './index.module.scss'
import Title from '~/components/Title';
import { db } from '~/Server/DB';
import axios from 'axios';
import { usernameAlreadyexist,prova } from '~/routes/API/Auth/usernameAlreadyexist';
import { useAction } from '@solidjs/router';
export default function Credentials() {


  onMount(async() => {
    // Imposta esplicitamente i campi richiesti come non validi all'avvio
    SetForm({});
    SetFormValues({});
    const checkUsername = useAction(prova);
    const response = await checkUsername('mattep');
    console.log('Risposta controllo username:', response);
  });
  return (
    <>
    <div class={` w-500 ${style.formContainer} ${allInputsValid()? style.valid : ''}`} style={{"justify-items":'center'}}>

       <Title title='Credentials' class='-mt-40'></Title>

      <form action={''} method="post" class={`w-300 mt-100`} style={{"justify-items":'center'}}>
        <Input name="username" type="username" placeholder="Username" required />
        <Input name="password" type="password" placeholder="Password" required />
        <Input
          name="passwordConfirm"
          type="passwordConfirm"
          placeholder="Confirm"
          required
        />
        <Input name="name" type="text" placeholder="Name" required />
        <Input name="surmane" type="text" placeholder="Surmane" required />
        <Input name="dateOfBirthday" type="date" placeholder="Surmane" required />
        
        <ButtonSparkle shadow={10} text='Next' disabled={!allInputsValid()} class='h-50'></ButtonSparkle>
       </form>
      </div>
    </>
  );
}

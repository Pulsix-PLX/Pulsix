import { Navigate } from '@solidjs/router';
import Input from '~/components/Inputs/Inputs';
import InputPassword from './InputPassword';
import InputPasswordConfirm from './InputPasswordConfirm';
import { onMount } from 'solid-js';
import { allInputsValid, SetForm, SetFormValues } from '~/GlobalStores/FormStore';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';

export default function Credentials() {
  onMount(() => {
    // Imposta esplicitamente i campi richiesti come non validi all'avvio
    SetForm({});
    SetFormValues({});
  });
  return (
    <>
    <div>
      <form action={''} method="post" class=' w-200 h-700'style={{"justify-items":'center'}}>
        <Input name="username" type="text" placeholder="Username" required />
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
        
        <ButtonSparkle text='Continue' disabled={!allInputsValid()}></ButtonSparkle>
       </form>
      </div>
    </>
  );
}

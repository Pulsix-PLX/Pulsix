import { createResource, onMount } from 'solid-js';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';
import Input from '~/components/Inputs/Inputs';
import { allInputsValid, SetForm, SetFormValues } from '~/GlobalStores/FormStore';

import { useAction } from '@solidjs/router';
import Title from '~/components/Title';
import style from './index.module.scss';
import { api } from '~/Server/Axios';
import axios from 'axios';
export default function Credentials() {
  onMount(async () => {
    SetForm({});
    SetFormValues({});
   
  });
  return (
    <>
      <div
        class={` w-500 ${style.formContainer} ${allInputsValid() ? style.valid : ''}`}
        style={{ 'justify-items': 'center' }}
      >
        <Title title="Credentials" class="-mt-40"></Title>

        <form
          action={''}
          method="post"
          class={`w-300 mt-100`}
          style={{ 'justify-items': 'center' }}
        >
          <Input name="username" type="username" placeholder="Username" required />
          <Input name="password" type="password" placeholder="Password" required />
          <Input name="passwordConfirm" type="passwordConfirm" placeholder="Confirm" required />
          <Input name="name" type="text" placeholder="Name" required />
          <Input name="surmane" type="text" placeholder="Surmane" required />
          <Input name="dateOfBirthday" type="date" placeholder="Surmane" required />

          <ButtonSparkle
            shadow={10}
            text="Next"
            disabled={!allInputsValid()}
            class="h-50"
          ></ButtonSparkle>
        </form>
      </div>
    </>
  );
}

import { onMount } from 'solid-js';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';
import Input from '~/components/Inputs/Inputs';
import Title from '~/components/Title';
import { allInputsValid, Form, FormValues, getFormValue, removeFormField, resetAllFormData, SetForm, SetFormValues } from '~/GlobalStores/FormStore';
import { next, setNext } from '../components/ProgressBar';
import style from './index.module.scss';

export default function Credentials() {
  onMount(() => {
    SetForm({});
    SetFormValues({});
  });

  return (
    <>
      <div
        class={`w-500 ${style.formContainer} ${allInputsValid() ? style.valid : ''}`}
        style={{ 'justify-items': 'center' }}
      >
        <Title title="Credentials" class="-mt-40"></Title>

        <form
          class={`w-300 mt-100`}
          style={{ 'justify-items': 'center' }}
          onSubmit={(e) => e.preventDefault()} // This prevents the form from submitting
        >
          <Input name="username" type="username" placeholder="Username" required />
          <Input name="password" type="password" placeholder="Password" required />
          <Input name="passwordConfirm" type="passwordConfirm" placeholder="Confirm" required />
          <Input name="name" type="text" placeholder="Name" required />
          <Input name="surname" type="text" placeholder="Surmane" required />
          <Input name="dateOfBirthday" type="date" placeholder="Surmane" required />

          <ButtonSparkle
            shadow={10}
            text="Next"
            disabled={!allInputsValid()}
            class="h-50"
            onClick={() => {
              setNext(next() + 1);
            }}
          ></ButtonSparkle>
        </form>
      </div>
    </>
  );
}

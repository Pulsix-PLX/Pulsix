import { onCleanup, onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';

import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';
import Input from '~/components/Inputs/Inputs';
import { setShowMenu } from '~/components/Menus/Menu';
import { allInputsValid, getFormValue, SetForm, SetFormValues } from '~/GlobalStores/FormStore';

import { authStore } from '../../../../GlobalStores/auth'; // Assicurati che il percorso sia corretto
import axios from 'axios';

export default function Login() {

  onMount(() => {
    setShowMenu(false);
    SetForm({});
    SetFormValues({});
  });


  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    console.log('in');
    const username = getFormValue('username');
    const password = getFormValue('password');

    if (!username || !password) {
      console.error('Username or password missing from form store');
      return;
    }
    console.log('username:', username, 'password:', password);
    const success = await authStore.login(username,password)
    SetForm({});
    SetFormValues({});
    if (success) {
      window.location.href='/Transactions' //used to reset the global store values 
    } else {
      console.log('Login failed, error:', authStore.error);
    }
  };

  return (
    <>
      {authStore.error && <p class="text-red-500">{authStore.error}</p>}

      <form class="CM" method="post" onSubmit={handleSubmit}>
        <Input type="usernameLogin" name="username" placeholder="Username" required />
        <Input type="password" name="password" placeholder="Password" required />
        <ButtonSparkle text="Login" class="ml-[auto] mr-[auto]" disabled={!allInputsValid()} />
      </form>
      <div class="auth-links text-center mt-4">
        <a href="/register" class="text-blue-600 hover:underline">
          Need an account? Register
        </a>
        <span class="mx-2">|</span>
        <a href="/forgot-password" class="text-blue-600 hover:underline">
          Forgot password?
        </a>
      </div>
    </>
  );
}

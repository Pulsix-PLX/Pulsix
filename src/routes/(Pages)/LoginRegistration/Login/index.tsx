import { onCleanup, onMount } from 'solid-js';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';
import Input from '~/components/Inputs/Inputs';
import { setShowMenu } from '~/components/Menus/Menu';
import { allInputsValid, getFormValue, SetForm, SetFormValues } from '~/GlobalStores/FormStore';
import { loginUser } from '~/routes/API/Auth/login/loginUser';
import { createSignal } from 'solid-js';

import { useAction, useNavigate } from '@solidjs/router';

export default function Login() {
  onMount(() => {
    setShowMenu(false);
    SetForm({});
    SetFormValues({});
    console.log(getFormValue('username'));
    console.log(getFormValue('password'));

  });
  onCleanup(() => {
    setShowMenu(true);
  });

  const [error, setError] = createSignal('');
  const loginAction = useAction(loginUser);
  const navigate= useNavigate();
  const handleSubmit = async (event: Event) => {
    event.preventDefault(); // Previene il comportamento di default del form
    const data={
      username: getFormValue('username'),
      password: getFormValue('password')
    }
    const response = await loginAction(data);

    if (response.success) {
      navigate('/');
    } else {
      setError(' error'); // Mostra il messaggio di errore
    }
  };

  return (
    <>

      {error() && <p class="text-red-500">{'Wrong credentials'}</p>} {/* Messaggio di errore se il login fallisce */}
      <form class="CM" method="post" onSubmit={handleSubmit}>
        <Input type="usernameLogin" name="username" placeholder="Username" required />
        <Input type="password" name="password" placeholder="Password" required />
        <ButtonSparkle text="Login" class="ml-[auto] mr-[auto]"disabled={!allInputsValid()} />
      </form>
    </>
  );
}



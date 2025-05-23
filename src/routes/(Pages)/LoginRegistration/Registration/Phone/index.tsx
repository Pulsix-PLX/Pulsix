
import OTPInput from '../components/inputOtp/otpInput';


import { createMemo, createResource, createSignal, Match, onCleanup, onMount, Show, Switch } from 'solid-js';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';
import Input from '~/components/Inputs/Inputs';
import { allInputsValid, getFormValue, SetForm } from '~/GlobalStores/FormStore';
import { phoneAlreadyexist } from '@API/Auth/registration/phone/phoneAlreadyexist';
import { auth, setupRecaptcha, signInWithPhoneNumber } from "../../../../../Server/firebase.config";
import sendOTP from './sendOtp';
import { next } from '../components/ProgressBar';
export const [code, setCode] = createSignal('');
export const [message, setMessage] = createSignal('');
export const [showAlert, setShowAlert] = createSignal('');
export const fullNumber = () => `${prefix()}${getFormValue('phone')}`;
export const [prefix, setPrefix] = createSignal('+39'); // Prefisso iniziale
export const [phoneNumber, setPhoneNumber] = createSignal('');
export const [otpVerify, setOtp] = createSignal(null);
export default function Phone() {

  const [state, setState] = createSignal<'wait' | 'sended' | ''>('wait');

    createMemo(() => {
      if(next() == 2){
      SetForm('phone', false);
      }
    })
    
  onMount(() => {
    console.log("Component mounted. Initializing reCAPTCHA...");
    // Setup reCAPTCHA quando il componente è montato
    setupRecaptcha();

  });

  onCleanup(() => {
    console.log("Component unmounted. Cleaning up reCAPTCHA...");
    // Pulisce il reCAPTCHA quando il componente viene smontato
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
  });
  return (
    <>
      <Switch>
        <Match when={state() == 'wait'}>
          <form
            class={`w-300 mt-100`}
            style={{ 'justify-items': 'center' }}
            onSubmit={(e) => e.preventDefault()} // This prevents the form from submitting
          >
            <div class="flex flex-row items-center mt-50">
              <select
                value={prefix()}
                onChange={(e) => setPrefix(e.target.value)}
                class="Input Prefix mr-7 border border-gray-300 p-2"
              >
                <option value="+39">+39 (Italy)</option>
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
                {/* Aggiungi altri prefissi se necessario */}
              </select>
              <Input type="phoneNumber" name="phone" placeholder="Phone number" mountOn={next()==1? true : false} required />
            </div>
            <Show when={showAlert()}>
                 <div>{message()}</div>
            </Show>
            <ButtonSparkle
              shadow={10}
              text="Send code"
             disabled={!allInputsValid()}
              class="h-50 mb-30"
              onClick={async () => {
                await sendOTP();
                setState('sended');
              }}
            ></ButtonSparkle>
            <div id="recaptcha-container" class="ml-100 mt-250"></div>
          </form>
          
        </Match>
        <Match when={state() == 'sended'}>
          <OTPInput code={code()} otp={otpVerify()} createUser={true} />
        </Match>
      </Switch>
    </>
  );
}


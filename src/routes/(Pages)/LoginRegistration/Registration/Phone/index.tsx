import { useAction } from '@solidjs/router';
import OTPInput from '../components/inputOtp/otpInput';
import axios from 'axios';
import { createResource, createSignal, Match, Switch } from 'solid-js';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';
import Input from '~/components/Inputs/Inputs';
import { allInputsValid, getFormValue } from '~/GlobalStores/FormStore';
import { phoneAlreadyexist } from '@API/Auth/registration/phone/phoneAlreadyexist';

export const [code, setCode] = createSignal('');
export default function Email() {
  const [state, setState] = createSignal<'wait' | 'sended' | ''>('wait');
  const [prefix, setPrefix] = createSignal('+39'); // Prefisso iniziale
  const [phoneNumber, setPhoneNumber] = createSignal('');
  const fullNumber = () => `${prefix()}${phoneNumber()}`;
  //action

  const [otp, setOtp] = createSignal('');
  const [confirmationResult, setConfirmationResult] = createSignal(null);
  const [message, setMessage] = createSignal('');
  const [AlertVisible, SetAlertVisible] = createSignal();

  async function sendOTP() {
    console.log("sendOTP called. phoneNumber:", fullNumber);
    try {/*
      const appVerifier = window.recaptchaVerifier;
      console.log("Sending OTP with appVerifier:", appVerifier);
      
      const result = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);
      */
    } catch (error: any) {}
  }

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
              <Input type="phoneNumber" name="phone" placeholder="Phone number" required />
            </div>
            <ButtonSparkle
              shadow={10}
              text="Send code"
              disabled={!allInputsValid()}
              class="h-50 mb-30"
              onClick={() => {
                sendOTP();
                setState('sended');
              }}
            ></ButtonSparkle>
          </form>
          <div id="recaptcha-container" class="ml-100 mt-250"></div>
        </Match>
        <Match when={state() == 'sended'}>
          <OTPInput code={code()} />
        </Match>
      </Switch>
    </>
  );
}

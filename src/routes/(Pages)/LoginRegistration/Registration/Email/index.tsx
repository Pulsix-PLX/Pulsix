import axios from 'axios';
import { createSignal, Match, Switch } from 'solid-js';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';
import Input from '~/components/Inputs/Inputs';
import { allInputsValid, getFormValue } from '~/GlobalStores/FormStore';
import OTPInput from '../components/inputOtp/otpInput';

export const [code, setCode] = createSignal('');
export default function Email() {
  const [state, setState] = createSignal<'wait' | 'sended' | ''>('wait');
  const [stateOTP, setStateOTP] = createSignal<'success' | 'error' | ''>('');



  // invio OTP
  async function sendOTP() {
    try {
      // Genera un codice numerico di 6 cifre
      setCode(Math.floor(100000 + Math.random() * 900000).toString());

      // Utilizza una variabile d'ambiente per l'API key
      const apiKey = import.meta.env.VITE_BREVO_API_KEY;

      // Invia l'email usando Brevo API
      const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
          sender: {
            name: 'Pulsix',
            email: 'pulsixcustomer@outlook.com',
          },
          to: [
            {
              email: getFormValue('email'),
            },
          ],
          subject: 'Pulsix verification code',
          htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              .code {
                font-size: 24px;
                font-weight: bold;
                color: #4a4a4a;
                background-color: #000000;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                letter-spacing: 5px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <h2>Pulsix verification code</h2>
            <p>Ecco il tuo codice di verifica:</p>
            
            <div class="code">${code()}</div>
            
            <p>Inserisci questo codice nella pagina di verifica per completare la registrazione.</p>
            <p>Se non hai richiesto questa verifica, puoi ignorare questa email.</p>
            <p>Cordiali saluti,<br>Il tuo team</p>
          </body>
          </html>
        `,
        },
        {
          headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      setStateOTP('success');
    } catch (error: any) {
      console.error('Error sending email:', error);
      setStateOTP('error');
    }
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
            <Input type="email" name="email" placeholder="Email" required></Input>
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
        </Match>
        <Match when={state() == 'sended'}>
          <OTPInput code={code()} />
        </Match>
      </Switch>
    </>
  );
}

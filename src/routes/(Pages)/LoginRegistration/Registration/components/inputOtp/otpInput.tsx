import { createSignal, For, Show } from 'solid-js';
import './otpInput.scss';

import { next, setNext } from '../ProgressBar';
export default function OTPInput({ code }: any) {
  const [otp, setOtp] = createSignal(Array(6).fill(''));
  const [otpResponse, setOtpResponse] = createSignal<string>('');
  const inputRefs: HTMLInputElement[] = [];
  const handleInput = (index: number, e: InputEvent) => {
    const input = e.target as HTMLInputElement;
    const value = input.value;

    // Validate input (only numbers)
    const isValidInput = /[0-9]/g.test(value);

    // Update OTP state
    const newOtp = [...otp()];
    newOtp[index] = isValidInput ? value[0] : '';
    setOtp(newOtp);

    // Move focus or submit
    if (isValidInput && index < otp().length - 1) {
      inputRefs[index + 1]?.focus();
    }

    // Check if all inputs are filled
    if (newOtp.every((val) => val !== '')) {
      submit(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent) => {
    const input = e.target as HTMLInputElement;
    setOtpResponse('');
    // Handle backspace
    if (e.key === 'Backspace') {
      const newOtp = [...otp()];

      // Se l'input corrente ha un valore, cancellalo e passa al precedente
      if (input.value !== '') {
        newOtp[index] = '';
        setOtp(newOtp);

        // Se non è il primo input, sposta il focus al precedente
        if (index > 0) {
          inputRefs[index - 1]?.focus();
        }
      }
      // Se l'input corrente è vuoto, cancella il precedente
      else if (index > 0) {
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData?.getData('text') || '';
    const pastedValues = pasteData.slice(0, otp().length).split('');

    // Filtra solo i numeri
    const numericPastedValues = pastedValues.filter((val) => /[0-9]/.test(val));

    if (numericPastedValues.length === otp().length) {
      setOtp(numericPastedValues);
      submit(numericPastedValues.join(''));
    }
  };

  const submit = (otpValue: string) => {
    if (otpValue.length === otp().length) {
      //verifica otp
      if (otpValue == code) {
        setNext(next() + 1);
      } else {
        setOtpResponse('wrong code');
      }
    }
  };

  return (
    <div class="otp-container">
      <div class="otp-field">
        <For each={otp()}>
          {(value, index) => (
            <>
              <input
                ref={(el) => (inputRefs[index()] = el)}
                type="number"
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength={1}
                value={value}
                onInput={(e) => handleInput(index(), e)}
                onKeyDown={(e) => handleKeyDown(index(), e)}
                onPaste={handlePaste}
                class={
                  index() === 0
                    ? 'inputLeft'
                    : index() === 5
                    ? 'inputRight'
                    : index() === 2
                    ? 'inputRight'
                    : index() === 3
                    ? 'inputLeft'
                    : ''
                }
              />
              {index() === 2 && <span class="text-white text-3xl ml-10 mr-10">&#183;</span>}
            </>
          )}
        </For>
      </div>
      <Show when={otpResponse()}>
        <p class="responseOTP">{otpResponse()}</p>
      </Show>
    </div>
  );
}

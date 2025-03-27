import { auth, setupRecaptcha, signInWithPhoneNumber } from "~/Server/firebase.config";

declare global {
  interface Window {
    recaptchaVerifier?: any;
  }
}
import { fullNumber, message, setMessage, setOtp, setShowAlert } from ".";
import { createSignal, onCleanup, onMount } from "solid-js";
import { SetFormValues } from "~/GlobalStores/FormStore";
export const [confirmationResult, setConfirmationResult] = createSignal();
export default async function sendOTP() {

  const phoneNum = fullNumber();
  //salvo il numberPhone nello store
    SetFormValues('phoneNumber', phoneNum);

    console.log("sendOTP called. phoneNumber:", fullNumber());
    try {
      const appVerifier = window.recaptchaVerifier;
      console.log("Sending OTP with appVerifier:", appVerifier);
      
      const result = await signInWithPhoneNumber(auth, fullNumber(), appVerifier);
      setConfirmationResult(result);
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      if(error.message == "Firebase: Error (auth/too-many-requests)."){
      setMessage("Too-many-requests sended wait some minutes");
      setShowAlert(message());
        }else if(error.message == "Firebase: TOO_SHORT (auth/invalid-phone-number)."){
        setMessage("Number lentgh is too short");
        setShowAlert(message());
      }else if(error.message == "Firebase: Invalid format. (auth/invalid-phone-number)."){
        setMessage("Invalid format");
        setShowAlert(message());
    }else if(error.message == "Firebase: Error (auth/invalid-app-credential)."){
      setMessage("You are in local");
      setShowAlert(message());
    }
    }
  }



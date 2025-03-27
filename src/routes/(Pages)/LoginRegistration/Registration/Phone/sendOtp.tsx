import { auth, setupRecaptcha, signInWithPhoneNumber } from "~/Server/firebase.config";

declare global {
  interface Window {
    recaptchaVerifier?: any;
  }
}
import { fullNumber, message, setMessage, setOtp, setShowAlert } from ".";
import { onCleanup, onMount } from "solid-js";

export default async function sendOTP() {

  const phoneNum = fullNumber();
  
  // Basic validation
  if (!phoneNum || phoneNum.length < 10) {
    setMessage("Invalid phone number");
    return;
  }
    console.log("sendOTP called. phoneNumber:", fullNumber());
    try {
      const appVerifier = window.recaptchaVerifier;
      console.log("Sending OTP with appVerifier:", appVerifier);
      
      const result = await signInWithPhoneNumber(auth, fullNumber(), appVerifier);
      setOtp(result)
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



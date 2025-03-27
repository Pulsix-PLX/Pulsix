import { initializeApp } from "firebase/app";
import {
  getAnalytics,
  setAnalyticsCollectionEnabled,
} from "firebase/analytics";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoiPbMYiKNnK6y_HqsYMLpvs2JiXaxPhw",
  authDomain: "finance-tracker-pallassini.firebaseapp.com",
  projectId: "finance-tracker-pallassini",
  storageBucket: "finance-tracker-pallassini.firebasestorage.app",
  messagingSenderId: "106835699922",
  appId: "1:106835699922:web:8655c7560a7d526c64650b",
  measurementId: "G-EKY43CN6SB"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Gestisci l'autenticazione
const auth = getAuth(app);

// Gestisci Analytics
const analytics = getAnalytics(app);
setAnalyticsCollectionEnabled(analytics, true);

// Funzione per inizializzare reCAPTCHA
const setupRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: (response) => {
        console.log("reCAPTCHA resolved:", response);
      },
      "expired-callback": () => {
        console.log("reCAPTCHA expired, please reload.");
      },
    });
    window.recaptchaVerifier.render();
  }
};

// **🔹 Login con Google**
const googleProvider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Estrarre i dati dell'utente
    const userData = {
      nome: user.displayName,
      email: user.email,
      foto: user.photoURL,
      uid: user.uid,
      provider: user.providerData[0]?.providerId,
    };

    console.log("Dati utente:", userData);
    return userData;
  } catch (error) {
    console.error("Errore durante il login con Google:", error);
    throw error;
  }
}

// **🔹 Registrazione e invio email di verifica**
export async function createUserWithEmail(email, password) {
  try {
    // Crea un utente con l'email e la password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Invia l'email di verifica
    await sendEmailVerification(user);
    console.log("✅ Email di verifica inviata a:", email);
  } catch (error) {
    console.error("❌ Errore durante la creazione dell'utente:", error.message);
    throw error;
  }
}

// **🔹 Invia email di verifica dopo il login**
export async function sendVerificationEmail() {
  try {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      console.log("✅ Email di verifica inviata!");
    } else {
      console.error("❌ Nessun utente autenticato.");
    }
  } catch (error) {
    console.error("❌ Errore durante l'invio della verifica email:", error.message);
  }
}

// **🔹 Esporta tutto**
export {
  analytics,
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  setupRecaptcha,
};

// src/store/auth.ts
import { createSignal, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import axios, { AxiosError } from 'axios'; // Importa axios e AxiosError
import { api } from '~/Server/Axios';
declare module 'axios' {
  // Estende l'interfaccia di configurazione della richiesta interna di Axios
  export interface InternalAxiosRequestConfig {
    _retry?: boolean; // Aggiunge la nostra proprietà opzionale _retry
  }
}


interface User {
  id: string;
  email: string;
  fullName?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}





// Create the auth store
export function createAuthStore() {
  const [accessToken, setAccessToken] = createSignal<string | null>(null);

  // User state (invariato)
  const [state, setState] = createStore<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true, // Inizia come loading per l'inizializzazione
    error: null
  });

  // --- Funzioni di Interazione API (ora usano api) ---

  // Fetch user data using the access token (ora interna, usata dopo login/refresh)
  async function fetchUserData() {
    // Non serve passare il token, l'interceptor lo aggiungerà
    // Evita fetch se non c'è token (anche se l'interceptor non lo aggiungerebbe)
    if (!accessToken()) {
        setState({ user: null, isAuthenticated: false });
        return;
    }
    setState({ isLoading: true });
    try {
      // L'interceptor aggiungerà 'Authorization: Bearer ...'
      const response = await api.get<{id: string; email: string; fullName?: string}>('API/user/me'); // Assicurati che l'endpoint esista
      setState({
        user: response.data,
        isAuthenticated: true,
        error: null
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Se fetchUserData fallisce anche con un token (potrebbe essere scaduto e refresh fallito), fai logout
      handleApiError(error, 'Failed to fetch user data');
      await logout(); // Assicura lo stato di logout
    } finally {
       setState({ isLoading: false });
    }
  }

  // Initialize auth on app load
  async function initialize() {
    setState({ isLoading: true, error: null });
    try {
      // Prova a fare il refresh. L'interceptor gestirà eventuali 401 iniziali (improbabile qui)
      // ma `withCredentials: true` è cruciale per inviare il cookie.
      const response = await api.post<{ accessToken: string }>('Api/Auth/refresh');
      setAccessToken(response.data.accessToken);
      await fetchUserData(); // Carica dati utente se il refresh ha successo
    } catch (error) {
      // Se il refresh fallisce (es. no cookie, cookie scaduto), è normale all'avvio
      console.log('Initialization: No valid refresh token found or refresh failed.');
      setAccessToken(null);
      setState({ isAuthenticated: false, error: null }); // Non è un errore bloccante all'avvio
    } finally {
      setState({ isLoading: false });
    }
  }

  // Gestore errori API generico per aggiornare lo stato
  function handleApiError(error: unknown, defaultMessage: string) {
    let message = defaultMessage;
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>; // Tipizza l'errore axios
      // Prova a estrarre il messaggio dall'errore API, altrimenti usa il messaggio axios o il default
      message = axiosError.response?.data?.error || axiosError.response?.data?.message || axiosError.message || defaultMessage;
      // Gestisci dettagli di validazione se presenti (esempio per Zod)
       if (axiosError.response?.data?.details) {
           message = Object.values(axiosError.response.data.details)
                .map((fieldErrors: any) => fieldErrors._errors.join(', '))
                .join('; ');
       }
    } else if (error instanceof Error) {
        message = error.message;
    }
    console.error(`${defaultMessage} Error:`, error);
    setState({ error: message });
  }

  // Login
  async function login(username: string, password: string): Promise<boolean> {
    setState({ isLoading: true, error: null });
    console.log('store')
    try {
      const response = await api.post<{ accessToken: string }>('API/Auth/login', { username, password });
      setAccessToken(response.data.accessToken);
      return true;
    } catch (error) {
      handleApiError(error, 'Login failed'); // handleApiError dovrebbe già gestire l'errore axios
      return false;
    } finally {
      setState({ isLoading: false });
    }
  }
/*
  // Assicurati che il resto dello store (es. handleApiError, fetchUserData, ecc.) sia presente...
  // ... (resto del codice dello store) ...

  // Register
  async function register(email: string, password: string, fullName: string): Promise<boolean> {
    setState({ isLoading: true, error: null });
    try {
      // Non ci aspettiamo un corpo specifico nella risposta di successo (solo status 201)
      await api.post('/api/auth/register', { email, password, fullName });
      // Nessun errore, registrazione OK
      return true;
    } catch (error) {
      handleApiError(error, 'Registration failed');
      return false;
    } finally {
      setState({ isLoading: false });
    }
  }
*/
  // Logout
  async function logout() {
     // Set loading only if not already loading to avoid flicker
    if (!state.isLoading) {
        setState({ isLoading: true });
    }
    const currentToken = accessToken(); // Get token before clearing state

    // Immediately clear local state for faster UI update
    setAccessToken(null);
    setState({
      user: null,
      isAuthenticated: false,
      error: null
    });

    try {
      // Invia richiesta al backend. `withCredentials: true` nell'istanza invia il cookie.
      // L'interceptor aggiungerà il Bearer token se presente (anche se spesso non serve per logout)
      await api.post('API/Auth/logout');
    } catch (error) {
      // Logga l'errore ma lo stato frontend è già pulito, quindi non è critico
      console.error('Logout API call error:', error);
    } finally {
        
        setState({ isLoading: false });
    }
  }


  // --- Axios Interceptors ---
  // Gli interceptor gestiscono l'aggiunta automatica del token e il refresh su 401.
  // Vengono configurati UNA VOLTA quando lo store viene creato.

  // 1. Request Interceptor: Aggiunge il token Bearer alle richieste uscenti
  api.interceptors.request.use(
    (config) => {
      const token = accessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Flag per prevenire loop di refresh
  let isRefreshing = false;
  // Array per memorizzare le richieste in attesa durante il refresh
  let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; config: any }[] = [];

  const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        // Aggiorna l'header della richiesta in coda e riesegui
        prom.config.headers['Authorization'] = `Bearer ${token}`;
        api(prom.config).then(prom.resolve).catch(prom.reject);
      }
    });
    failedQueue = [];
  };


  // 2. Response Interceptor: Gestisce errori 401 e tenta il refresh
  api.interceptors.response.use(
    (response) => {
      // Risposta OK (2xx), restituiscila normalmente
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config;

      // Se è un errore 401 e non è una richiesta di refresh essa stessa
      if (error.response?.status === 401 && originalRequest && originalRequest.url !== 'API/Auth/refresh') {

        if (isRefreshing) {
           // Se un refresh è già in corso, metti in coda la richiesta fallita
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject, config: originalRequest });
            }).catch(err => {
                return Promise.reject(err); // Rigetta la promessa se la coda fallisce
            });
        }

        // Mark as refreshing and prevent retries in the same cycle for this specific request
        originalRequest._retry = true;
        isRefreshing = true;
        console.log('Axios interceptor: 401 detected, attempting refresh...');

        try {
          // Tenta di ottenere un nuovo token
          const refreshResponse = await api.post<{ accessToken: string }>('API/Auth/refresh');
          const newAccessToken = refreshResponse.data.accessToken;
          setAccessToken(newAccessToken); // Aggiorna il token nello store
          console.log('Axios interceptor: Token refreshed successfully.');

           // Aggiorna l'header della richiesta originale fallita
          if(originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          }

          // Processa la coda delle richieste in attesa con il nuovo token
          processQueue(null, newAccessToken);

          // Riesegui la richiesta originale con il nuovo token
          return api(originalRequest);

        } catch (refreshError: any) {
          console.error('Axios interceptor: Refresh token failed.', refreshError);
          // Se il refresh fallisce, esegui il logout (o pulisci lo stato)
          processQueue(refreshError, null); // Rigetta tutte le richieste in coda
          await logout(); // Chiama la funzione di logout definita sopra
          // Rigetta la promise originale con l'errore di refresh
          return Promise.reject(refreshError);
        } finally {
           isRefreshing = false; // Resetta il flag di refresh
        }
      }

      // Per tutti gli altri errori (non 401, o 401 sulla richiesta di refresh, ecc.)
      // rigetta semplicemente la promise
      return Promise.reject(error);
    }
  );

  // --- Ritorno dello Store ---
  return {
    // State (read-only accessors)
    get user() { return state.user; },
    get isAuthenticated() { return state.isAuthenticated; },
    get isLoading() { return state.isLoading; },
    get error() { return state.error; },

    // Methods
    initialize,
    login,
    logout,
    // Non esportiamo authenticatedFetch, gli interceptor lo gestiscono
    // Potremmo esportare api se serve fare chiamate API dirette da fuori lo store
    api: api
  };
}

// Create a global instance
export const authStore = createAuthStore();

// Esempio d'uso dell'api da un componente (se esportato):
// import { authStore } from './authStore';
// async function loadSomeData() {
//   try {
//     const response = await authStore.api.get('/some-protected-data');
//     console.log(response.data);
//   } catch (error) {
//     console.error("Failed to load protected data:", error);
//   }
// }
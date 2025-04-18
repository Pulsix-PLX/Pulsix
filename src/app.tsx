// src/App.tsx

import { MetaProvider, Title } from '@solidjs/meta';
import { Router, useLocation, useNavigate, RouteSectionProps } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense, onMount, Show, createEffect, Component, JSX } from 'solid-js';
import './app.css';
import './Style/Layout.scss';
import './Style/Components.scss';
import { MenuView } from './components/Menus/Menu'; 
import CustomCursor from './routes/UI/Cursor';     
import { authStore } from './GlobalStores/auth';   
import FancySpinner from './routes/UI/Loading';

// Definisci le route pubbliche ESATTE che non richiedono login
const AUTH_PATHS = ['/LoginRegistration']; // Pagine specifiche di auth/reg
const PUBLIC_PATHS_ALLOWED_WHEN_LOGGED_OUT = ['/', '/LoginRegistration', '/LoginRegistration/Registration', '/LoginRegistration/Login']; // Pagine accessibili da sloggato


const RootLayout: Component<RouteSectionProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  let isAuthPage;
  createEffect(() => {
    // Leggi i valori una volta per l'esecuzione corrente dell'effetto
    const loading = authStore.isLoading;
    const authenticated = authStore.isAuthenticated;
    const path = location.pathname;

    // Non fare nulla finché l'inizializzazione non è completa
    if (loading) {
      console.log("Effect Exit: Still loading.");
      return;
    }

    // Determina se siamo su una pagina pubblica o di autenticazione
     isAuthPage = AUTH_PATHS.includes(path);
    const isAllowedPublic = PUBLIC_PATHS_ALLOWED_WHEN_LOGGED_OUT.includes(path);

    // --- Logica di Reindirizzamento ---

    // CASO 1: Utente NON autenticato
    if (!authenticated) {
      // Se NON è su una delle pagine pubbliche permesse da sloggato...
      if (!isAllowedPublic) {
        console.log(`NOT AUTHENTICATED on PROTECTED path (${path}). Redirecting to /LoginRegistration.`);
        // ...reindirizza al login
        navigate('/LoginRegistration', { replace: true });
      } else {
         // Altrimenti è su una pagina pubblica permessa, non fare nulla
      }
    }
    
  }); 


  return (
    <MetaProvider>
      <Title>Pulsix</Title>
      <CustomCursor />

      <Show when={!authStore.isLoading}
            fallback={
                <div class={`${isAuthPage?'bg-black': ''} fixed inset-0 flex items-center justify-center z-50`}>
                     <FancySpinner />
                </div>
            }
      >
              <MenuView />
        <Suspense fallback={<div>Caricamento route...</div>}>
          {props.children}
        </Suspense>
      </Show>
    </MetaProvider>
  );
};


export default function App() {
  onMount(() => {
    if (!authStore.isAuthenticated) {
        authStore.initialize();
    }
  });

  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}

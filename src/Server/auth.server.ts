// src/Server/auth.server.ts
import { useSession } from "vinxi/http"; // Assumendo sia l'import corretto per il tuo setup

// Tipo per i dati grezzi nella sessione
type AuthSessionData = {
  userId?: string;   // L'ID è memorizzato come stringa nella sessione
  username?: string;
};

// Tipo per l'oggetto utente completo (lo manteniamo se serve altrove)
export interface CurrentUser {
    id: string; // ID come stringa, come da sessione
    username: string;
}

// --- Funzione Helper Interna (Non Esportata) ---
// Mettiamo qui la logica comune per recuperare i dati della sessione
async function getSessionData(): Promise<AuthSessionData | null> {
    // Controlla la secret (fondamentale)
    if (!process.env.SESSION_SECRET) {
        console.error("SESSION_SECRET non è impostata! Impossibile recuperare la sessione.");
        // Considera di lanciare un errore qui in produzione per bloccare l'operazione
        return null;
    }

    try {
        // Recupera la sessione
        const session = await useSession<AuthSessionData>({
            password: process.env.SESSION_SECRET,
            name: process.env.JWT_ISSUER, // Nome consistente con il login
        });
        // Restituisce i dati della sessione (o null se non ci sono dati)
        // Usiamo '?? null' per assicurarci di restituire null se session.data fosse undefined
        return session.data ?? null;
    } catch (error) {
        console.error('Errore durante il recupero/decodifica della sessione:', error);
        // In caso di errore (es. cookie corrotto, secret sbagliata), restituisci null
        return null;
    }
}

/**
 * Recupera SOLO l'ID numerico dell'utente loggato dalla sessione corrente.
 * Esegue la conversione da stringa a numero.
 * Funziona solo in contesti server-side.
 * @returns L'ID (number) se l'utente è loggato e l'ID è valido, altrimenti null.
 */
export async function getUserId(): Promise<number | null> {
    'use server'; // Direttiva per RPC
    const sessionData = await getSessionData();

    if (sessionData?.userId) {
        // Tenta di convertire l'ID stringa in numero intero (base 10)
        const numericId = parseInt(sessionData.userId, 10);

        // Controlla se la conversione è andata a buon fine (restituisce un numero valido)
        if (!isNaN(numericId)) {
            return numericId; // Successo: restituisci l'ID numerico
        } else {
            // L'ID nella sessione non era un numero valido
            console.error(`ID utente nella sessione non è un numero valido: "${sessionData.userId}"`);
            return null;
        }
    }
    // Se non c'erano dati di sessione o userId, restituisci null
    return null;
}

/**
 * Recupera SOLO lo username dell'utente loggato dalla sessione corrente.
 * Funziona solo in contesti server-side.
 * @returns Lo username (string) se l'utente è loggato e lo username è presente, altrimenti null.
 */
export async function getUsername(): Promise<string | null> {
    'use server'; // Direttiva per RPC
    const sessionData = await getSessionData();

    // Restituisce lo username se presente, altrimenti l'espressione ?? restituisce null
    return sessionData?.username ?? null;
}


// --- Funzione getUser Originale (Opzionale) ---
// Puoi decidere se mantenerla, modificarla o rimuoverla.
// Qui la lascio come era, restituendo l'oggetto con ID come stringa.
/**
 * Recupera l'oggetto utente completo { id, username } dalla sessione corrente.
 * L'ID restituito è una stringa.
 * Funziona solo in contesti server-side.
 * @returns L'oggetto utente se loggato, altrimenti null.
 */
export async function getUser(): Promise<CurrentUser | null> {
    'use server';
    const sessionData = await getSessionData();
    if (sessionData?.userId && sessionData?.username) {
       return { id: sessionData.userId, username: sessionData.username };
    }
    return null;
}

/* Se invece volessi MODIFICARE getUser per restituire l'ID come numero:
export interface CurrentUserWithNumericId { id: number; username: string; }
export async function getUser(): Promise<CurrentUserWithNumericId | null> {
    'use server';
    const sessionData = await _getSessionData();
    if (sessionData?.userId && sessionData?.username) {
        const numericId = parseInt(sessionData.userId, 10);
        if (!isNaN(numericId)) {
            return { id: numericId, username: sessionData.username };
        } else {
             console.error(`ID utente nella sessione non è un numero valido: "${sessionData.userId}"`);
             return null;
        }
    }
    return null;
}
*/
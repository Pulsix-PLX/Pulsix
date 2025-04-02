import { useSession } from "vinxi/http";

// Riutilizza lo stesso tipo definito per il login
type AuthSessionData = {
  userId?: string;
  username?: string;
};

// Interfaccia per l'oggetto utente che restituiamo (opzionale ma buona pratica)
export interface CurrentUser {
    id: string;
    username: string;
}

/**
 * Recupera i dati dell'utente loggato dalla sessione corrente.
 * Funziona solo in contesti server-side (server$, loaders, API routes).
 * @returns L'oggetto utente { id, username } se loggato, altrimenti null.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
    'use server'; // Necessario se la definisci come funzione server a sé stante

    // Controlla se la secret è impostata, fondamentale per la sicurezza
    if (!process.env.SESSION_SECRET) {
        console.error("SESSION_SECRET non è impostata! Impossibile recuperare la sessione.");
        // In produzione potresti voler lanciare un errore o gestirla diversamente
        return null;
    }

    try {
        const session = await useSession<AuthSessionData>({
            password: process.env.SESSION_SECRET,
            name: "auth_session", // DEVE corrispondere al nome usato nel login!
        });

        // Accedi ai dati recuperati dalla sessione
        const { userId, username } = session.data;

        // Verifica se i dati essenziali (userId) sono presenti
        if (userId && username) {
            // Utente trovato nella sessione
            return { id: userId, username: username };
        }

        // Nessun dato utente valido trovato nella sessione
        return null;

    } catch (error) {
        console.error('Errore durante il recupero della sessione utente:', error);
        // Potrebbe esserci stato un errore nella decriptazione/verifica (es. secret errata, cookie corrotto)
        return null;
    }
}
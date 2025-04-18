// src/routes/API/Auth/refresh.ts
import { json } from '@solidjs/router';
import type { APIEvent } from '@solidjs/start/server';
import bcrypt from 'bcryptjs';
import { deleteCookie, getCookie, useSession } from 'vinxi/http';
import { db } from '../../../server/db.server';
import { generateAccessToken } from './login/utils'; // Assumendo sia qui
import { getUserId } from '~/Server/auth.server'; // Per ottenere userId dal token di accesso (se presente) o dalla sessione

// Helper per la pulizia centralizzata
async function invalidateSessionAndClearCookie(event: APIEvent, userId: number | string | undefined |null) {
    console.warn(`Invalidating session/token for userId: ${userId || 'unknown'}`);
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        path: '/',
    };

    // 1. Cancella il cookie dal client
    try {
        deleteCookie(event.nativeEvent, 'refresh_token', { ...cookieOptions, maxAge: -1 });
        console.log(`[invalidateSession] Refresh token cookie deletion instruction sent.`);
    } catch (cookieError) {
        console.error('[invalidateSession] Error clearing refresh token cookie:', cookieError);
        // Non bloccare per questo, prova a pulire il DB
    }

    // 2. Invalida nel DB (se abbiamo userId)
    if (userId && db) {
        try {
            // Adatta la query alla tua tabella (auth.refresh_tokens o auth.active_sessions)
            const deleteAllRefreshSql = 'DELETE FROM auth.active_sessions WHERE user_id = $1';
            const result = await db.query(deleteAllRefreshSql, [userId]);
            console.log(`[invalidateSession] Invalidated DB refresh tokens/sessions for user ${userId}. Rows: ${result.rowCount}`);
        } catch (dbError) {
            console.error(`[invalidateSession] Error invalidating DB tokens/sessions for user ${userId}:`, dbError);
        }
    } else {
         console.log('[invalidateSession] No userId provided, skipping DB invalidation.');
    }

     // 3. Pulisci sessione server-side (se usi useSession)
     try {
        type AuthSessionData = { userId?: string; username?: string; };
        const session = await useSession<AuthSessionData>(event.nativeEvent, {
            password: process.env.SESSION_SECRET!,
            name: process.env.JWT_ISSUER, // Usa stesso nome
            cookie: { /* ... opzioni ... */ },
        });
        await session.clear();
        console.log('[invalidateSession] Server-side session cleared.');
    } catch (sessionError) {
        console.error('[invalidateSession] Error clearing server-side session:', sessionError);
    }
}


export async function POST(event: APIEvent) {
    console.log('API Route: /api/auth/refresh [POST] hit');
    let userId: number | null |undefined; // Usiamo number internamente

    // --- 1. Leggi Refresh Token dal Cookie ---
    let refreshToken: string | undefined;
    try {
        refreshToken = getCookie(event.nativeEvent, 'refresh_token');
        if (!refreshToken) {
            console.log('/api/auth/refresh [REFRESH] Cookie refresh_token non trovato.');
            // Se non c'è cookie, non c'è nulla da pulire, semplicemente non è autorizzato
            return json({ message: 'Authentication required (missing refresh token).' }, { status: 401 });
        }
    } catch (err) {
        console.error('Errore lettura cookie refresh_token:', err);
        // Errore tecnico lettura cookie, considera 500 o 400
         return json({ message: 'Error reading authentication token.' }, { status: 500 });
    }

    // --- 2. Verifica Refresh Token nel DB e Ottieni User ID ---
    let dbTokenHash: string | undefined;
    let dbExpiry: Date | undefined;
    try {
        // Questo è il punto debole: come otteniamo l'userId SOLO dal refreshToken?
        // Se il refresh token è opaco (non JWT), devi cercare l'hash nel DB.
        // Se il refresh token è un JWT, puoi verificarlo e estrarre l'userId.
        // Qui assumiamo che tu cerchi l'HASH nel DB per trovare l'utente,
        // MA questo implica che il refresh token nel cookie NON SIA l'hash.
        // Rivediamo la logica originale: sembrava cercasse prima l'userId e poi l'hash.
        // Tentativo 1: Ottenere userId dalla sessione (se esiste e valida)
        try {
             userId = await getUserId(); // Modifica getUserId per accettare l'evento
             if (!userId) console.log('Refresh: No userId from potential session/access token.');
        } catch {
             console.log('Refresh: Failed to get userId from session/access token.');
        }

        // Tentativo 2: Se non abbiamo userId, dobbiamo trovarlo dal refresh token.
        // Questo richiede che il refresh token nel DB sia cercabile (es. hash del token nel cookie)
        // O che il refresh token stesso contenga l'userId (se è un JWT).
        // *** IPOTESI: Stai salvando un HASH di refreshToken in active_sessions ***
        // *** E devi poter cercare per HASH per trovare l'userId ***
        // *** Questa parte è CRUCIALE e dipende da come salvi i token ***

        // Esempio IPOTETICO se cercassi per HASH (ADATTA ALLA TUA LOGICA):
        // const potentialMatch = await db.query<{user_id: number, expires_at: Date}>(
        //     'SELECT user_id, expires_at FROM auth.active_sessions WHERE token_hash = $1',
        //     [hashDelRefreshTokenCookie] // Dovresti calcolare l'hash del token letto dal cookie
        // );
        // if (potentialMatch.rows.length > 0) {
        //      userId = potentialMatch.rows[0].user_id;
        //      dbExpiry = potentialMatch.rows[0].expires_at;
        //      dbTokenHash = hashDelRefreshTokenCookie; // L'hash cercato
        // }

        // --- Logica attuale basata sul codice fornito (cerca per userId) ---
        // Questa logica presuppone che `getUserId()` abbia funzionato (improbabile se access token è scaduto)
        // O che tu abbia un altro modo per ottenere userId PRIMA di verificare il refresh token
        if (!userId) {
             console.warn('/api/auth/refresh [REFRESH] Cannot determine user ID to verify refresh token.');
             // Non possiamo procedere senza userId in questo scenario
             await invalidateSessionAndClearCookie(event, undefined); // Pulisci cookie per sicurezza
             return json({ message: 'Unable to identify user for refresh.' }, { status: 401 });
        }

        // Ora cerca il token hash per l'userId trovato
        const tokenResult = await db.query<{ token_hash: string; expires_at: Date }>(
             'SELECT token_hash, expires_at FROM auth.active_sessions WHERE user_id = $1', // Assumendo un solo token per utente? O devi cercare il token specifico?
             [userId]
         );

        if (tokenResult.rows.length === 0 || !tokenResult.rows[0]?.token_hash) {
            console.log(`/api/auth/refresh [REFRESH] Nessun refresh token valido trovato nel DB per user ${userId}.`);
            await invalidateSessionAndClearCookie(event, userId); // Pulisci tutto
            return json({ message: 'Session not found or invalid.' }, { status: 401 });
        }

        dbTokenHash = tokenResult.rows[0].token_hash;
        dbExpiry = tokenResult.rows[0].expires_at;

        // Verifica hash
        const isValidHash = await bcrypt.compare(refreshToken, dbTokenHash);
        if (!isValidHash) {
            console.warn(`/api/auth/refresh [REFRESH] Corrispondenza hash fallita per user ${userId}.`);
            await invalidateSessionAndClearCookie(event, userId); // Pulisci tutto
            return json({ message: 'Invalid session token.' }, { status: 401 });
        }

        // Verifica scadenza
        if (dbExpiry < new Date()) {
            console.log(`/api/auth/refresh [REFRESH] Refresh token scaduto nel DB per user ${userId}.`);
            await invalidateSessionAndClearCookie(event, userId); // Pulisci tutto (include già la pulizia DB)
            return json({ message: 'Session expired.' }, { status: 401 });
        }

    } catch (error) {
        console.error('Errore critico durante verifica refresh token:', error);
        await invalidateSessionAndClearCookie(event, userId); // Tenta pulizia anche su errori generici
        return json({ message: 'Internal server error during refresh validation.' }, { status: 500 });
    }

    // --- 3. Controlla Stato Utente (ORA che sappiamo che il refresh token è valido) ---
     try {
         const userResult = await db.query<{ state: string }>( // Basta lo stato qui
             'SELECT state FROM auth.users WHERE id = $1',
             [userId]
         );
         // Non serve controllare se l'utente esiste, l'abbiamo implicitamente verificato tramite il refresh token
         const userState = userResult.rows[0].state;

         if (userState === 'suspended' || userState === 'blocked') { // Adatta stati
             console.warn(`Refresh: Tentativo di refresh per utente ${userId} con stato ${userState}. Accesso negato e logout forzato.`);
             // Pulisci TUTTO perché l'utente non deve più accedere
             await invalidateSessionAndClearCookie(event, userId);
             // Restituisci 403 Forbidden
             return json({ message: `User account is ${userState}. Session terminated.`, code: `USER_${userState.toUpperCase()}` }, { status: 403 });
         }
     } catch (dbError) {
         console.error(`Refresh: Errore DB durante controllo stato utente ${userId}:`, dbError);
          // In caso di errore DB qui, potremmo voler invalidare la sessione per sicurezza
         await invalidateSessionAndClearCookie(event, userId);
         return json({ message: 'Internal server error during user state check.' }, { status: 500 });
     }


    /// --- 4. Se siamo qui, Refresh Token VALIDO e Utente ATTIVO --- ///

    // Genera un NUOVO Access Token
    const newAccessToken = generateAccessToken(userId.toString()); // generateAccessToken vuole stringa

    // [Opzionale] Ruota Refresh Token (più sicuro)
    // Se vuoi ruotare il refresh token ad ogni refresh:
    // 1. Genera un nuovo refresh token (stringa lunga casuale)
    // const newRefreshToken = crypto.randomBytes(64).toString('hex');
    // 2. Calcola l'hash del nuovo token
    // const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 12);
    // 3. Calcola la nuova data di scadenza
    // const newRefreshTokenExpiry = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS); // Calcola scadenza
    // 4. Aggiorna il DB: sostituisci il vecchio hash con il nuovo e aggiorna la scadenza/last_active
    //    await db.query('UPDATE auth.active_sessions SET token_hash = $1, expires_at = $2, last_active = CURRENT_TIMESTAMP WHERE user_id = $3 AND token_hash = $4',
    //                   [newRefreshTokenHash, newRefreshTokenExpiry, userId, dbTokenHash]); // Usa il vecchio hash per trovare la riga
    // 5. Imposta il NUOVO refresh token (non l'hash!) nel cookie
    //    setCookie(event.nativeEvent, 'refresh_token', newRefreshToken, { ...cookieOptions, maxAge: REFRESH_TOKEN_EXPIRY_SECONDS });

    // Se NON ruoti il token, almeno aggiorna last_active:
    try {
         await db.query('UPDATE auth.active_sessions SET last_active = CURRENT_TIMESTAMP WHERE user_id = $1 AND token_hash = $2', [userId, dbTokenHash] );
    } catch (updateError) { console.warn('Impossibile aggiornare last_active (non critico):', updateError); }

    // Aggiorna sessione server-side se usata
    try {
        type AuthSessionData = { userId?: string; username?: string; };
        
const session = await useSession<AuthSessionData>(event.nativeEvent, {
  password: process.env.SESSION_SECRET!,
  name: process.env.JWT_ISSUER,
  cookie: {
    maxAge: 60 * 60 * 24, // 1 day
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
  },
});
        // Potresti voler aggiornare la sessione con l'ID utente o altre info se necessario
        // await session.update({ userId: userId.toString() });
    } catch (sessionError) { console.error('Refresh: Errore aggiornamento sessione:', sessionError); }

    // Restituisci il nuovo access token al client
    console.log(`Refresh: Nuovo access token generato per utente ${userId}`);
    return json({ accessToken: newAccessToken });
}

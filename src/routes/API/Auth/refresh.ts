// src/routes/API/Auth/refresh.ts
import { json } from '@solidjs/router';
import type { APIEvent } from '@solidjs/start/server';
import bcrypt from 'bcryptjs';
// Rimuovi import di getUserId se non serve più qui
// import { getUserId } from '~/Server/auth.server';
import { deleteCookie, getCookie, useSession } from 'vinxi/http';
import { db } from '../../../server/db.server';
import { generateAccessToken } from './login/utils'; // Verifica percorso

// Helper per la pulizia centralizzata - Rimane invariato
async function invalidateSessionAndClearCookie(event: APIEvent, userId: number | undefined | null) {
  // Converti userId in stringa per log se necessario, o gestisci null/undefined
  const logUserId = userId !== null && userId !== undefined ? String(userId) : 'unknown';
  console.warn(`Invalidating session/token for userId: ${logUserId}`);
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
  }

  // 2. Invalida nel DB SOLO se abbiamo trovato l'userId
  if (userId !== null && userId !== undefined && db) {
    try {
      const deleteAllRefreshSql = 'DELETE FROM auth.active_sessions WHERE user_id = $1';
      // Assicurati che userId sia passato come tipo corretto (es. number)
      const result = await db.query(deleteAllRefreshSql, [userId]);
      console.log(
        `[invalidateSession] Invalidated DB refresh tokens/sessions for user ${userId}. Rows: ${result.rowCount}`
      );
    } catch (dbError) {
      console.error(
        `[invalidateSession] Error invalidating DB tokens/sessions for user ${userId}:`,
        dbError
      );
    }
  } else {
    console.log('[invalidateSession] No valid userId provided for DB invalidation.');
  }

  // 3. Pulisci sessione server-side (useSession) - Mantenuto se usi useSession altrove
  try {
    type AuthSessionData = { userId?: string; username?: string };
    const session = await useSession<AuthSessionData>(event.nativeEvent, {
      password: process.env.SESSION_SECRET!,
      name: process.env.JWT_ISSUER,
      cookie: { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' }, // Opzioni minimali qui se servono solo per clear
    });
    await session.clear();
    console.log('[invalidateSession] Server-side session (useSession) cleared.');
  } catch (sessionError) {
    console.error('[invalidateSession] Error clearing server-side session:', sessionError);
  }
}

export async function POST(event: APIEvent) {
  console.log('API Route: /api/auth/refresh [POST] hit');

  // --- 1. Leggi Refresh Token dal Cookie --- (Invariato)
  let plainTokenFromCookie: string | undefined;
  try {
    plainTokenFromCookie = getCookie(event.nativeEvent, 'refresh_token');
    if (!plainTokenFromCookie) {
      console.log('/api/auth/refresh [REFRESH] Cookie refresh_token non trovato.');
      return json({ message: 'Authentication required (missing refresh token).' }, { status: 401 });
    }
  } catch (err) {
    console.error('Errore lettura cookie refresh_token:', err);
    return json({ message: 'Error reading authentication token.' }, { status: 500 });
  }

  // --- 2. Verifica Refresh Token Iterando nel DB --- (Logica Modificata)
  let foundUserId: number | null = null; // User ID trovato dopo il confronto
  let matchedSessionData: { user_id: number; token_hash: string; expires_at: Date } | null = null; // Dati della riga corrispondente

  try {
    // Query per recuperare TUTTI i token non scaduti (user_id e hash)
    // Assicurati che il tipo di user_id (number) corrisponda a quello nel DB
    const potentialTokensResult = await db.query<{
      user_id: number;
      token_hash: string;
      expires_at: Date;
    }>(
      'SELECT user_id, token_hash, expires_at FROM auth.active_sessions WHERE expires_at > NOW()' // Indice su expires_at è utile qui!
    );

    console.log(`Refresh: Found ${potentialTokensResult.rowCount} potential tokens to check.`);

    // Itera sui risultati e confronta con bcrypt
    for (const row of potentialTokensResult.rows) {
      // Controlla se il token hash esiste prima di confrontare
      if (!row.token_hash) continue;

      const isMatch = await bcrypt.compare(plainTokenFromCookie, row.token_hash);
      if (isMatch) {
        // Trovato! Memorizza i dati necessari e esci dal loop
        foundUserId = row.user_id;
        matchedSessionData = row; // Salva l'intera riga trovata
        console.log(`Refresh: bcrypt match found for user ${foundUserId}`);
        break; // Esci dal ciclo appena trovi la corrispondenza
      }
    }

    // Controlla se è stato trovato un match dopo il ciclo
    if (!foundUserId || !matchedSessionData) {
      console.log(
        '/api/auth/refresh [REFRESH] Nessun refresh token valido corrispondente trovato nel DB dopo verifica.'
      );
      // Invalida il cookie specifico se vuoi (buona pratica)
      try {
        deleteCookie(event.nativeEvent, 'refresh_token', {
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: -1,
        });
      } catch (e) {
        console.error('Failed to delete potentially invalid refresh token cookie', e);
      }
      return json({ message: 'Session not found or invalid.' }, { status: 401 });
    }

    // Abbiamo trovato l'utente (foundUserId) e i dati della sessione (matchedSessionData)
    // La verifica della scadenza è già stata fatta implicitamente dalla query SQL (expires_at > NOW())
    // e il confronto hash è stato fatto con successo.
  } catch (error) {
    console.error('Errore critico durante verifica refresh token (iterazione):', error);
    // Non sappiamo quale userId pulire qui, quindi passiamo null a invalidateSessionAndClearCookie
    await invalidateSessionAndClearCookie(event, null); // Tenta pulizia cookie client + session useSession
    return json({ message: 'Internal server error during refresh validation.' }, { status: 500 });
  }

  // --- 3. Controlla Stato Utente (ORA che abbiamo foundUserId) ---
  try {
    // Usa foundUserId ottenuto dal ciclo
    const userResult = await db.query<{ state: string }>(
      'SELECT state FROM auth.users WHERE id = $1',
      [foundUserId]
    );

    // Se l'utente non esiste più nel DB (raro, ma possibile se cancellato tra login e refresh)
    if (userResult.rows.length === 0) {
      console.warn(
        `Refresh: User ${foundUserId} associated with valid refresh token not found in users table. Invalidating session.`
      );
      await invalidateSessionAndClearCookie(event, foundUserId); // Passa l'ID per pulire il DB se possibile
      return json(
        { message: 'User associated with token no longer exists.', code: 'USER_NOT_FOUND' },
        { status: 401 }
      );
    }

    const userState = userResult.rows[0].state;
    if (userState === 'suspended' || userState === 'blocked') {
      // Adatta stati
      console.warn(
        `Refresh: Tentativo di refresh per utente ${foundUserId} con stato ${userState}. Accesso negato e logout forzato.`
      );
      await invalidateSessionAndClearCookie(event, foundUserId); // Pulisci TUTTO
      return json(
        {
          message: `User account is ${userState}. Session terminated.`,
          code: `USER_${userState.toUpperCase()}`,
        },
        { status: 403 }
      );
    }
  } catch (dbError) {
    console.error(`Refresh: Errore DB durante controllo stato utente ${foundUserId}:`, dbError);
    await invalidateSessionAndClearCookie(event, foundUserId); // Tenta pulizia sessione per sicurezza
    return json({ message: 'Internal server error during user state check.' }, { status: 500 });
  }

  /// --- 4. Se siamo qui, Refresh Token VALIDO e Utente ATTIVO --- ///

  // Genera un NUOVO Access Token usando foundUserId
  // Assicurati che generateAccessToken accetti il tipo number se userId è number
  const newAccessToken = generateAccessToken(foundUserId);

  // [Opzionale] Rotazione Refresh Token: La logica di rotazione richiederebbe crypto per
  // generare un nuovo token e il suo hash bcrypt. Senza crypto, la rotazione è difficile.
  // Quindi, per ora, ci limitiamo ad aggiornare 'last_active'.

  // Aggiorna last_active nel DB usando user_id e token_hash trovati
  try {
    // Usa i dati dalla riga trovata (matchedSessionData) per identificare la sessione specifica
    await db.query(
      'UPDATE auth.active_sessions SET last_active = CURRENT_TIMESTAMP WHERE user_id = $1 AND token_hash = $2',
      [foundUserId, matchedSessionData.token_hash]
    );
  } catch (updateError) {
    console.warn('Impossibile aggiornare last_active (non critico):', updateError);
  }

  // Aggiorna sessione server-side (useSession) - Mantenuto se lo usi altrove
  // Potrebbe non essere strettamente necessario aggiornarla qui se si basa solo sul login iniziale
  try {
    type AuthSessionData = { userId?: string; username?: string };
    const session = await useSession<AuthSessionData>(event.nativeEvent, {
      password: process.env.SESSION_SECRET!,
      name: process.env.JWT_ISSUER,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
      },
    });
    // Potresti aggiornare la sessione se necessario, ad es. per estenderne la durata se l'utente è attivo
    // await session.update({ userId: foundUserId.toString() }); // Esempio
    
  } catch (sessionError) {
    console.error('Refresh: Errore aggiornamento sessione (useSession):', sessionError);
  }

  // Restituisci il nuovo access token al client
  console.log(`Refresh: Nuovo access token generato per utente ${foundUserId}`);
  return json({ accessToken: newAccessToken });
}

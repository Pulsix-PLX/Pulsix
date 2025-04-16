import type { APIEvent } from '@solidjs/start/server';
import { getCookie, deleteCookie, useSession } from 'vinxi/http';
import { json } from '@solidjs/router';
import crypto from 'node:crypto';
import { generateAccessToken } from './login/utils';
import { db } from '~/Server/db.server';
import bcrypt from 'bcryptjs';

interface RefreshTokenInfo {
  user_id: string;
  expires_at: Date;
}

export async function POST(event: APIEvent) {
  const BCRYPT_COST = Number(process.env.BCRYPT_COST) || 12;

  console.log('API Route: /api/auth/refresh [POST] hit');

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
  };

  // Funzione helper interna per gestire gli errori 401 (token non valido/scaduto)
  // Pulisce il cookie e restituisce la risposta JSON di errore.
  const clearCookieAndFail = async (message: string) => {
    console.warn(`Refresh failed: ${message}`);
    try {
      // Tenta di cancellare il cookie anche se il token non è valido
      deleteCookie(event.nativeEvent, 'refresh_token', cookieOptions);
    } catch (cookieErr) {
      console.error('Error trying to delete cookie during refresh failure:', cookieErr);
    }
    return json({ message }, { status: 401 });
  };

  // Leggi il refresh token dal cookie in arrivo
  let refreshToken: string | undefined;
  try {
    refreshToken = getCookie(event.nativeEvent, 'refresh_token');
  } catch (err) {
    console.error('Errore lettura cookie refresh_token:', err);
  }

  // Se manca il cookie, l'utente non è autenticato (o il cookie è stato cancellato)
  if (!refreshToken) {
    console.log('Refresh handler: Cookie refresh_token mancante.');
    return json({ message: 'Autenticazione richiesta.' }, { status: 401 });
  }

  try {
    // Crea l'hash del token ricevuto per cercarlo nel DB
    let tokenHash: string;
    try {
      tokenHash = await bcrypt.hash(refreshToken, BCRYPT_COST);
    } catch (hashError) {
      console.error('CRITICO: Impossibile usare node:crypto per hashare!', hashError);
      return json({ message: 'Errore interno del server (crypto).' }, { status: 500 });
    }

    // Cerca l'hash nel DB
    const findTokenSql =
      'SELECT user_id, expires_at FROM auth.refresh_tokens WHERE token_hash = $1';
    const result = await db.query<RefreshTokenInfo>(findTokenSql, [tokenHash]);
    const tokenInfo = result.rows[0];

    // Valida: Token non trovato? (Invalido o revocato)
    if (!tokenInfo) {
      return await clearCookieAndFail('Sessione non valida o token revocato.');
    }

    // Valida: Token scaduto?
    if (tokenInfo.expires_at < new Date()) {
      // Pulisci il token scaduto dal DB prima di fallire
      try {
        await db.query('DELETE FROM auth.refresh_tokens WHERE token_hash = $1', [tokenHash]);
      } catch (cleanupError) {
        console.error('Errore durante pulizia token scaduto nel DB:', cleanupError);
      }
      return await clearCookieAndFail('Sessione scaduta.');
    }

    /// --- Se siamo qui, il Refresh Token è VALIDO --- ///

    // Ottieni l'ID utente
    const userId = tokenInfo.user_id;

    // Genera un NUOVO Access Token
    const newAccessToken = generateAccessToken(userId.toString());

    // ---- update Session (used for server functions) ---- //
    type AuthSessionData = {
      userId?: string;
      username?: string;
    };
    try {
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
      console.log(`Refresh: Sessione server-side aggiornata per userId: ${userId}`);
    } catch (sessionError) {
      console.error('Refresh: Errore aggiornamento sessione server-side:', sessionError);
    }
    // 9. [Opzionale ma consigliato] Aggiorna l'ultimo utilizzo del refresh token nel DB
    try {
      await db.query(
        'UPDATE auth.refresh_tokens SET last_active = CURRENT_TIMESTAMP WHERE token_hash = $1',
        [tokenHash]
      );
    } catch (updateError) {
      console.warn(
        'Impossibile aggiornare last_active del refresh token (non critico):',
        updateError
      );
    }

    // Restituisci il nuovo access token al client!
    console.log(`Refresh handler: Nuovo access token generato per utente ${userId}`);
    return json({ accessToken: newAccessToken }); // Status 200 OK (default di json())
  } catch (error: any) {
    // Errore generico durante il processo (es. errore DB inatteso)
    console.error('Errore critico durante il processo di refresh:', error);
    return json({ message: 'Errore interno del server durante il refresh.' }, { status: 500 });
  }
}

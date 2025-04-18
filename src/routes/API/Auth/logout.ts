import { deleteCookie, getCookie, useSession } from 'vinxi/http';

import type { APIEvent } from '@solidjs/start/server';

import { json } from '@solidjs/router';
import bcrypt from 'bcryptjs';
import { db } from '../../../server/db.server';
import { getUserId } from '~/Server/auth.server';

export async function POST(event: APIEvent) {
  // ---- update Session (used for server functions) ---- //
  type AuthSessionData = {
    userId?: string;
    username?: string;
  };
  console.log('Logout')
  const sessionId = await getUserId()
  console.log(sessionId)
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
    await session.clear();
    console.log('Logout: Sessione server-side pulita.');
  } catch (sessionError) {
    console.error('Logout: Errore aggiornamento sessione server-side:', sessionError);
  }
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
  };

  // 2. Cancella cookie dal client
  try {
    deleteCookie(event.nativeEvent, 'refresh_token', cookieOptions);
    console.log('Refresh token cookie deletion instruction sent.');
  } catch (cookieError) {
    console.error('Error clearing refresh token cookie during logout:', cookieError);
  }

  // 3. Cancella active_sessions (Opzionale - vedi sotto)
  // Accedi all'ID utente tramite il contesto dell'evento nativo
  const userId = sessionId; // Accedi tramite nativeEvent
  if (userId) {
    try {
      // ATTENZIONE: Questo cancella TUTTE le sessioni attive per l'utente.
      // È questo il comportamento desiderato per un logout singolo?
      // Spesso si invalida solo il refresh token specifico (fatto al punto 1).
      const deleteSessionSql = 'DELETE FROM auth.active_sessions WHERE user_id = $1';
      await db.query(deleteSessionSql, [userId]);
      console.log(`Cleared active_sessions for user: ${userId}`);
    } catch (error) {
      console.error('Error clearing active session during logout:', error);
    }
  } else {
    console.log('No userId found in nativeEvent context, skipping active_sessions clear.');
  }


  return json({ success: true });
}

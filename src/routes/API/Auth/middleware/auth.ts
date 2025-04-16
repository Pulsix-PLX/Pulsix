import { createError, defineEventHandler, getHeader, H3Event } from 'h3';
import { Pool } from 'pg';
import { verifyAccessToken } from '../utils/auth.server'; // Adatta percorso

// Type augmentation (invariata)
declare module 'h3' {
  interface H3EventContext {
    db?: Pool;
    auth?: {
      userId: string;
      tokenId: string; // jti
    };
    // userId?: string; // Rimosso perché ridondante
  }
}

// Middleware di autenticazione (probabilmente in src/server/middleware/auth.ts o simile)
export default defineEventHandler(async (event: H3Event) => {
  // Verifica se applicare a questa route (opzionale, dipende da come il fw applica i middleware)
  // Esempio: non applicare a /api/auth/*
  // if (event.path?.startsWith('/api/auth/')) {
  //   return; // Salta questo middleware per le route di autenticazione
  // }

  // 1. Ottieni DB dal contesto (impostato da middleware precedente)
  const db = event.context.db;
  if (!db) {
    console.error('requireAuth: DB non trovato nel contesto');
    throw createError({ statusCode: 500, statusMessage: 'Errore Configurazione Server (DB)' });
  }

  // 2. Controlla Header Authorization Bearer
  const authHeader = getHeader(event, 'authorization') || '';
  if (!authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Autenticazione richiesta (Header mancante o malformato)',
      data: { code: 'NO_AUTH_HEADER' },
    });
  }

  // 3. Estrai e Verifica Access Token
  const token = authHeader.substring(7);
  const payload = verifyAccessToken(token); // Assicurati gestisca errori interni

  if (!payload) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Token non valido o scaduto',
      data: { code: 'INVALID_TOKEN' },
    });
  }

  // 4. Allega info utente al contesto per gli handler successivi
  // Usa solo la struttura annidata 'auth' per coerenza
  event.context.auth = { userId: payload.userId, tokenId: payload.jti };

  // 5. [RIMOSSO] Aggiornamento 'active_sessions'
  // Rimosso per ridurre carico DB. Considera di farlo altrove (es. su refresh) se necessario.
  /*
  try {
    const sql = `UPDATE auth.active_sessions SET last_active = CURRENT_TIMESTAMP WHERE user_id = $1`;
    await db.query(sql, [payload.userId]);
  } catch (error) {
    console.error('Error updating session activity:', error);
  }
  */

  // Se arrivi qui, l'utente è autenticato, il middleware passa alla prossima fase (handler della route)
  console.log(`requireAuth: User ${payload.userId} authenticated.`);
});
